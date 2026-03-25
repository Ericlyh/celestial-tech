import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import { prisma } from '@/lib/prisma'

const LOCK_FILE = '/tmp/celestial-blog-cron.lock'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80)
}

async function acquireLock(): Promise<boolean> {
  if (existsSync(LOCK_FILE)) return false
  await writeFile(LOCK_FILE, process.pid.toString(), 'utf-8')
  return true
}

async function releaseLock() {
  try {
    await unlink(LOCK_FILE)
  } catch {}
}

async function getLastRunDate(): Promise<string | null> {
  try {
    const meta = await prisma.meta.findUnique({ where: { key: 'last_blog_run' } })
    return meta?.value ?? null
  } catch {
    return null
  }
}

async function setLastRunDate(date: string): Promise<void> {
  try {
    await prisma.meta.upsert({
      where: { key: 'last_blog_run' },
      update: { value: date },
      create: { key: 'last_blog_run', value: date },
    })
  } catch {}
}

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function GET(request: NextRequest) {
  // CRON_SECRET protection
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Idempotency: skip if already ran today
  const today = getToday()
  const lastRun = await getLastRunDate()
  if (lastRun === today) {
    return NextResponse.json({ success: true, skipped: true, message: 'Already ran today' })
  }

  // Acquire lock
  const lockAcquired = await acquireLock()
  if (!lockAcquired) {
    return NextResponse.json({ error: 'Cron already running' }, { status: 409 })
  }

  try {
    const newsApiKey = process.env.NEWS_API_KEY
    const groqApiKey = process.env.GROQ_API_KEY

    if (!newsApiKey || !groqApiKey || newsApiKey === 'demo' || groqApiKey === 'demo') {
      // Demo mode — return a simulated success
      await setLastRunDate(today)
      return NextResponse.json({
        success: true,
        post: { title: 'Demo Post (configure API keys for live content)', slug: 'demo-post' },
        message: 'Demo mode: API keys not configured. Post skipped.',
        demo: true,
      })
    }

    // Fetch news from NewsAPI
    const newsUrls = [
      `https://newsapi.org/v2/everything?q=AI+cybersecurity&sortBy=publishedAt&pageSize=5&apiKey=${newsApiKey}&language=en`,
      `https://newsapi.org/v2/top-headlines?category=technology&pageSize=5&apiKey=${newsApiKey}&language=en`,
    ]

    let articles: Array<{ title: string; url: string; description: string; source: { name: string } }> = []

    for (const url of newsUrls) {
      try {
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          if (data.articles && data.articles.length > 0) {
            articles = articles.concat(
              data.articles
                .filter((a: { title: string; description: string }) => a.title && a.title !== '[Removed]' && a.description)
                .slice(0, 3)
            )
          }
        }
      } catch (e) {
        console.error('NewsAPI fetch error:', e)
      }
    }

    // Pick top 1-2 relevant articles
    const topArticles = articles.slice(0, 2)
    if (topArticles.length === 0) {
      await setLastRunDate(today)
      return NextResponse.json({ success: true, skipped: true, message: 'No suitable articles found today' })
    }

    // Pick the best article
    const article = topArticles[0]

    // Generate content with Groq
    let attempts = 0
    const maxAttempts = 2
    let generatedContent: { title: string; description: string; excerpt: string; content: string; category: string } | null = null

    while (attempts < maxAttempts && !generatedContent) {
      attempts++
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: `You are the content team at Celestial Tech, a premium cybersecurity and AI company. Write a professional, trustworthy blog post. Tone: expert, forward-thinking, authoritative but accessible. 

IMPORTANT: Return ONLY valid JSON in this exact format — no markdown, no code blocks, no explanation:
{"title":"...","description":"...","excerpt":"...","content":"...","category":"..."}

Rules:
- title: max 60 characters, compelling and clickable
- description: 1 sentence meta description
- excerpt: 2 sentences max
- content: full blog post in markdown format, 400-600 words, with ## headings, **bold** key terms, and bullet lists where appropriate. Include a subtle CTA at the end linking to relevant services (use /#contact).
- category: either "AI" or "Cybersecurity" — pick based on the source article topic
- Do NOT use placeholder text. Write complete, publishable content.`
              },
              {
                role: 'user',
                content: `Write a blog post based on: ${article.title}. Description: ${article.description || 'No description'}. Source: ${article.url}`
              }
            ],
            temperature: 0.7,
            max_tokens: 1200,
          }),
          signal: AbortSignal.timeout(30000),
        })

        if (!groqRes.ok) {
          const err = await groqRes.text()
          console.error(`Groq API error (attempt ${attempts}):`, err)
          if (attempts < maxAttempts) {
            await sleep(2000)
            continue
          }
          throw new Error(`Groq API error: ${groqRes.status}`)
        }

        const groqData = await groqRes.json()
        const rawContent = groqData.choices?.[0]?.message?.content?.trim()

        if (rawContent) {
          // Strip markdown code blocks if present
          const cleaned = rawContent.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
          generatedContent = JSON.parse(cleaned)
        }
      } catch (e) {
        console.error(`Content generation attempt ${attempts} failed:`, e)
        if (attempts < maxAttempts) await sleep(2000)
      }
    }

    if (!generatedContent) {
      await setLastRunDate(today)
      return NextResponse.json({ success: true, skipped: true, message: 'Content generation failed after retries, skipping.' })
    }

    // Create slug and save to DB
    const baseSlug = slugify(generatedContent.title)
    let slug = baseSlug
    let counter = 1

    // Ensure unique slug
    while (true) {
      try {
        const existing = await prisma.post.findUnique({ where: { slug } })
        if (!existing) break
        slug = `${baseSlug}-${counter++}`
      } catch {
        break
      }
    }

    const post = await prisma.post.create({
      data: {
        title: generatedContent.title,
        slug,
        excerpt: generatedContent.excerpt,
        content: generatedContent.content,
        category: generatedContent.category,
        published: true,
        publishedAt: new Date(),
        coverImage: `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80`,
        sourceUrl: article.url,
        sourceName: article.source?.name || 'NewsAPI',
        readTime: Math.max(4, Math.ceil(generatedContent.content.split(' ').length / 200)),
        author: 'Celestial Tech Team',
      },
    })

    await setLastRunDate(today)

    return NextResponse.json({
      success: true,
      post: { title: post.title, slug: post.slug, category: post.category },
      message: 'Post created successfully',
    })
  } catch (error) {
    console.error('Cron error:', error)
    return NextResponse.json(
      { error: 'Failed', details: String(error) },
      { status: 500 }
    )
  } finally {
    await releaseLock()
  }
}
