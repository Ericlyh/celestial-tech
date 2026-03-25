import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import CopyButton from './CopyButton'

// Static params for SSG
export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return [
      { slug: 'ai-powered-soc-future-threat-detection' },
      { slug: 'reactive-to-predictive-traditional-cybersecurity-failing' },
      { slug: 'convergence-ai-cybersecurity-enterprises-2026' },
    ]
  }
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | Celestial Tech`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  Cybersecurity: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20',
  AI: 'bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20',
}

interface PostData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  coverImage: string | null
  author: string
  readTime: number
  publishedAt: string
  sourceUrl: string | null
  sourceName: string | null
}

const STATIC_POSTS: Record<string, PostData> = {
  'ai-powered-soc-future-threat-detection': {
    id: '1',
    title: 'AI-Powered SOC: The Future of Threat Detection is Here',
    slug: 'ai-powered-soc-future-threat-detection',
    excerpt:
      "Security Operations Centers are being transformed by artificial intelligence. Here's how AI-powered SOCs are redefining threat detection and why your organization needs one.",
    category: 'Cybersecurity',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    author: 'Celestial Tech Team',
    readTime: 6,
    publishedAt: '2026-03-20T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## The Evolution of Security Operations

The traditional Security Operations Center (SOC) was built on a simple premise: human analysts monitoring dashboards, triaging alerts, and responding to incidents. But as attack surfaces expanded and threat actors grew more sophisticated, the model began to crack under its own weight.

**The numbers tell a grim story:** The average enterprise now generates over **2 million security events per day**. A team of 10 analysts cannot possibly keep pace. The result? Alert fatigue, missed threats, and breaches that go undetected for weeks.

## Enter AI-Powered SOC

Artificial intelligence is fundamentally reshaping how SOCs operate. Here's what's changing:

- **Speed**: AI systems analyze millions of events per second — something impossible for human teams
- **Accuracy**: Machine learning models reduce false positives by up to 90% by learning from historical data
- **Context**: AI correlates signals across disparate data sources to paint a complete threat picture
- **Continuous Learning**: Unlike static rules, AI models improve with every interaction

## Key Capabilities of AI-Powered SOC

### 1. Behavioral Threat Detection

Rather than relying on known threat signatures, AI-powered SOCs establish baseline behavior for every user, device, and system. When activity deviates from the norm — even by a fraction — the system flags it for investigation.

### 2. Automated Incident Response

When a threat is confirmed, AI-driven SOAR (Security Orchestration, Automation, and Response) platforms can automatically contain affected systems, block malicious IPs, and isolate compromised accounts — often within seconds of detection.

### 3. Predictive Threat Intelligence

AI doesn't just react to current threats — it predicts emerging ones. By analyzing global threat patterns, vulnerability disclosures, and dark web chatter, AI systems can warn organizations about risks before they're actively exploited.

## Why Your SOC Needs AI Now

The threat landscape has never been more hostile. Nation-state actors, ransomware gangs, and supply chain attackers are operating with unprecedented sophistication. Relying on human-only SOC operations is no longer a viable strategy.

**Celestial Tech's AI-Powered SOC** combines advanced machine learning with expert human analysts to deliver continuous, proactive protection. Our hybrid approach catches what tools miss and responds faster than any pure-play SOC.

Ready to transform your security operations? [Contact our team](/#contact) to learn how we can build an AI-powered SOC tailored to your organization.`,
  },
  'reactive-to-predictive-traditional-cybersecurity-failing': {
    id: '2',
    title: 'From Reactive to Predictive: Why Traditional Cybersecurity is Failing',
    slug: 'reactive-to-predictive-traditional-cybersecurity-failing',
    excerpt:
      "Traditional cybersecurity waits for something to break. Predictive security stops threats before they happen. Here's why the paradigm shift is urgent — and inevitable.",
    category: 'Cybersecurity',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    author: 'Celestial Tech Team',
    readTime: 5,
    publishedAt: '2026-03-18T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## The Reactive Trap

For decades, cybersecurity operated on a reactive model. Wait for something bad to happen. Detect it. Respond to it. Recover from it. The entire industry — firewalls, antivirus, SIEMs — was built around this cycle.

**The problem?** Reactive security is fundamentally asymmetric. Attackers only need to succeed once. Defenders have to succeed every single time.

The average cost of a data breach now exceeds **$4.4 million**. More alarming: the average dwell time — the period between initial compromise and detection — is **207 days**. By the time most organizations detect a breach, the damage is done.

## What Predictive Security Actually Means

Predictive security isn't just a marketing buzzword. It's a fundamentally different approach:

### Proactive Threat Hunting

Instead of waiting for alerts, predictive SOCs actively search for indicators of compromise that existing tools haven't flagged. Expert analysts combined with AI analysis actively pursue threats that dwell silently in your environment.

### Threat Modeling

Predictive organizations model their adversaries. Who is likely to target you? What are their tactics, techniques, and procedures (TTPs)? By building threat models specific to your industry and organization, security teams can prioritize defenses where they matter most.

### Attack Surface Monitoring

Continuous monitoring of your external attack surface — exposed APIs, forgotten subdomains, misconfigured cloud buckets — surfaces vulnerabilities before attackers find them.

## The Three Pillars of Predictive Security

| Pillar | Description | Outcome |
|--------|-------------|---------|
| **Intelligence** | Real-time threat feeds + dark web monitoring | Know what's coming |
| **Automation** | AI-driven detection + SOAR playbooks | Respond in seconds |
| **Expertise** | Human analysts + machine learning | No alert goes unchecked |

## The Cost of Inaction

Every day your organization runs on reactive security is a day your adversaries have the advantage. The security talent gap means you can't hire your way out of the problem — there simply aren't enough skilled analysts to staff traditional SOCs at the scale required.

**The answer isn't more analysts. It's smarter architecture.**

Celestial Tech's predictive security platform combines AI-powered monitoring, expert-led threat hunting, and round-the-clock response capabilities — giving your organization the proactive defense it deserves.

Don't wait for the breach. [Get ahead of it](/#contact).`,
  },
  'convergence-ai-cybersecurity-enterprises-2026': {
    id: '3',
    title: 'The Convergence of AI and Cybersecurity: What Enterprises Need to Know in 2026',
    slug: 'convergence-ai-cybersecurity-enterprises-2026',
    excerpt:
      "AI and cybersecurity are no longer separate disciplines — they're converging into a single imperative. Here's what forward-thinking enterprises are doing differently.",
    category: 'AI',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    author: 'Celestial Tech Team',
    readTime: 7,
    publishedAt: '2026-03-15T00:00:00Z',
    sourceUrl: null,
    sourceName: 'Editorial',
    content: `## Two Worlds Colliding

In 2026, the line between AI strategy and cybersecurity strategy has effectively disappeared. Organizations that treat them as separate domains are already falling behind. Those that are fusing them are building unassailable competitive advantages.

**The convergence isn't theoretical.** It's playing out in real time:

- AI is being weaponized by threat actors to create more convincing phishing attacks, bypass authentication systems, and automate vulnerability discovery
- Simultaneously, AI is the most powerful defensive tool ever created — capable of identifying patterns human analysts would never see
- The enterprises winning in this environment are those using AI defensively faster than attackers can use it offensively

## The AI-Powered Threat Landscape

### AI-Generated Social Engineering

Generative AI has made spear-phishing nearly indistinguishable from legitimate communications. Attackers now craft personalized, context-aware messages at industrial scale — targeting CFOs with fake invoice requests, engineers with fabricated Jira notifications, and executives with convincing urgent requests.

### Autonomous Attack Systems

Nation-state actors have deployed AI systems that autonomously scan, exploit, and propagate through networks. These aren't theoretical threats — they're operational today. The average enterprise network faces thousands of automated attack attempts daily.

### Deepfake Fraud

Voice cloning and video synthesis have enabled a new category of fraud. CEO fraud, investment scams, and identity theft powered by deepfakes have cost enterprises billions.

## How Leading Enterprises Are Responding

The organizations ahead of the curve are doing five things differently:

### 1. Unified Security + AI Leadership

Forward-thinking enterprises now have CISOs and Chief AI Officers working in tandem — or in some cases, a single executive accountable for both. Siloed security and AI strategies are being replaced by integrated "Secure AI" frameworks.

### 2. AI-Native Security Architecture

Instead of bolting AI onto legacy security stacks, leading organizations are rebuilding on AI-native foundations. AI-powered SOCs, autonomous threat response, and continuous AI model security are now standard practice.

### 3. Red Teaming AI Systems

Just as penetration testing has been standard for decades, "AI red teaming" — adversarial testing of AI systems themselves — is becoming mandatory. Organizations must secure their AI models from prompt injection, data poisoning, and model extraction attacks.

### 4. Security-Aware AI Governance

AI governance is no longer purely an ethics and compliance concern. Security teams are at the table for every AI deployment decision, ensuring models are not only accurate but also resistant to manipulation.

### 5. AI-Powered Supply Chain Security

Third-party AI services introduce new attack vectors. Leading enterprises are extending their security perimeters to cover AI model supply chains, training data provenance, and inference infrastructure.

## The Imperative for Action

The convergence of AI and cybersecurity isn't a future trend — it's a present reality. The question isn't whether to address it. The question is how fast you can move.

**Celestial Tech** specializes in helping enterprises navigate this convergence. From AI-powered SOC deployment to AI red teaming and Secure AI framework development, we help organizations build defenses that match the threat landscape they're actually facing.

The time to act is now. [Speak with our team](/#contact) to understand your exposure and build a path forward.`,
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  let post: PostData | null = STATIC_POSTS[params.slug] ?? null

  try {
    const dbPost = await prisma.post.findUnique({ where: { slug: params.slug } })
    if (dbPost) {
      post = dbPost as unknown as PostData
    }
  } catch {
    // DB not available, use static data
  }

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const categoryColor = CATEGORY_COLORS[post.category] || 'bg-white/10 text-white border-white/20'
  const shareUrl = `https://celestialtech.io/blog/${post.slug}`
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`

  // Related posts
  const allPosts = Object.values(STATIC_POSTS).filter(p => p.slug !== params.slug && p.category === post.category)

  return (
    <main className="relative min-h-screen bg-deep-space overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[120px]" />

      <article className="relative z-10 container-main pt-32 pb-24 max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyber-cyan transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        {/* Category badge */}
        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border mb-6 ${categoryColor}`}>
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10 pb-8 border-b border-white/5">
          <span className="text-white/70 font-medium">{post.author}</span>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>{formattedDate}</span>
          </div>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1.5">
            <Clock size={13} />
            <span>{post.readTime} min read</span>
          </div>
          {post.sourceName && (
            <>
              <span className="text-white/20">·</span>
              <span className="text-gray-500">Source: {post.sourceName}</span>
            </>
          )}
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Share buttons */}
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Share2 size={14} />
            <span>Share:</span>
          </div>
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-200"
          >
            Post on X
          </a>
          <CopyButton text={shareUrl} />
        </div>

        {/* Article content */}
        <div className="max-w-3xl">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Source attribution */}
        {post.sourceUrl && (
          <div className="mt-12 p-6 rounded-xl bg-white/[0.03] border border-white/6">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Source:</strong>{' '}
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-cyan hover:text-white underline"
              >
                {post.sourceUrl}
              </a>
            </p>
          </div>
        )}

        {/* Related Posts */}
        {allPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-8">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allPosts.slice(0, 3).map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyber-cyan/30 transition-all duration-300"
                >
                  <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border mb-3 ${categoryColor}`}>
                    {related.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">{related.readTime} min read</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 border border-white/[0.06] text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Stay Ahead of Emerging Threats</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Let our team assess your security posture and build a roadmap tailored to your organization&apos;s unique challenges.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-cyan text-deep-space font-semibold hover:bg-white transition-colors"
          >
            Talk to Our Team →
          </Link>
        </section>
      </article>
    </main>
  )
}
