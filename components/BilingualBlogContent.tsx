'use client'

import { useState, useCallback, useMemo } from 'react'
import { Calendar, Clock, ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/i18n'
import MarkdownRenderer from './MarkdownRenderer'
import TableOfContents from './TableOfContents'
import ReadingProgress from './ReadingProgress'
import ShareBar from './ShareBar'
import NewsletterSignup from './NewsletterSignup'

interface PostData {
  id: string
  title: string
  titleZh: string
  slug: string
  excerpt: string
  excerptZh: string
  content: string
  contentZh: string
  category: string
  coverImage: string | null
  author: string
  authorZh: string
  readTime: number
  publishedAt: string
  sourceUrl: string | null
  sourceName: string | null
}

const CATEGORY_TONE: Record<string, { dot: string; text: string; bg: string; border: string }> = {
  Cybersecurity: { dot: 'bg-stellar-cyan', text: 'text-stellar-cyan', bg: 'bg-stellar-cyan/10', border: 'border-stellar-cyan/20' },
  AI: { dot: 'bg-cosmic-violet', text: 'text-cosmic-violet-soft', bg: 'bg-cosmic-violet/10', border: 'border-cosmic-violet/20' },
}

interface BilingualBlogContentProps {
  post: PostData
  relatedPosts: Pick<PostData, 'id' | 'title' | 'titleZh' | 'slug' | 'category' | 'readTime'>[]
}

export default function BilingualBlogContent({ post, relatedPosts }: BilingualBlogContentProps) {
  const { locale, toggleLocale } = useTranslation()
  const lang = locale === 'zh-Hant' ? 'zh' : 'en'
  const tone = CATEGORY_TONE[post.category] || CATEGORY_TONE.Cybersecurity

  const title = lang === 'zh' ? post.titleZh : post.title
  const excerpt = lang === 'zh' ? post.excerptZh : post.excerpt
  const content = lang === 'zh' ? post.contentZh : post.content
  const author = lang === 'zh' ? post.authorZh : post.author

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'zh' ? 'zh-Hant' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  // Word count + estimated reading time
  const wordCount = useMemo(() => {
    const stripped = content.replace(/```[\s\S]*?```/g, '').replace(/[#*`_\->\[\]\(\)]/g, '')
    const words = stripped.split(/\s+/).filter(Boolean).length
    const cjkChars = (stripped.match(/[一-鿿]/g) || []).length
    // Mixed CJK + English: CJK chars count as ~1.5 words each
    return words + Math.round(cjkChars * 0.5)
  }, [content])

  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])
  const onHeadings = useCallback((h: typeof headings) => setHeadings(h), [])

  const shareUrl = `https://celestialtech.io/blog/${post.slug}`

  return (
    <article className="relative z-10 pb-24">
      <ReadingProgress />

      {/* ───────────── HERO ───────────── */}
      <header className="relative pt-32 pb-12 sm:pb-16 px-4 overflow-hidden">
        {/* Background — subtle grid + radial glow */}
        <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-stellar-cyan/[0.06] rounded-full blur-[120px]" aria-hidden="true" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-cosmic-violet/[0.05] rounded-full blur-[100px]" aria-hidden="true" />

        <div className="container-main relative max-w-5xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-stellar-cyan transition-colors mb-10 group font-mono"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-wide">{lang === 'zh' ? '返回洞察' : 'Back to Insights'}</span>
          </Link>

          {/* Eyebrow row: category + dispatch ID */}
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] rounded-full border ${tone.bg} ${tone.text} ${tone.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${tone.dot} animate-pulse`} />
              {post.category}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-400">
              {lang === 'zh' ? '通訊編號' : 'Dispatch'} · {post.id.padStart(3, '0')}
            </span>
          </div>

          {/* Title — Fraunces serif for editorial weight */}
          <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-7 max-w-4xl">
            {title}
          </h1>

          {/* Subtitle (excerpt) */}
          <p className="text-ink-200 text-lg sm:text-xl leading-relaxed max-w-3xl mb-10">
            {excerpt}
          </p>

          {/* Metadata strip — monospace data treatment */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-white/[0.07] text-sm">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-stellar-cyan/30 to-cosmic-violet/30 border border-white/10 flex items-center justify-center font-mono text-[10px] text-stellar-cyan font-semibold">
                {author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              <div>
                <div className="text-white/90 font-medium leading-tight">{author}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-ink-400 font-mono">
                  {lang === 'zh' ? '作者' : 'Author'}
                </div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/[0.07]" />
            <div>
              <div className="text-white/90 flex items-center gap-1.5 leading-tight">
                <Calendar size={13} className="text-stellar-cyan" />
                {formattedDate}
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-ink-400 font-mono">
                {lang === 'zh' ? '發佈日期' : 'Published'}
              </div>
            </div>
            <div>
              <div className="text-white/90 flex items-center gap-1.5 leading-tight">
                <Clock size={13} className="text-stellar-cyan" />
                {post.readTime} {lang === 'zh' ? '分鐘' : 'min'}
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-ink-400 font-mono">
                {wordCount.toLocaleString()} {lang === 'zh' ? '字' : 'words'}
              </div>
            </div>
            {post.sourceUrl && (
              <>
                <div className="hidden sm:block w-px h-8 bg-white/[0.07]" />
                <div>
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stellar-cyan hover:text-stellar-cyan-soft flex items-center gap-1.5 leading-tight text-sm"
                  >
                    {post.sourceName || (lang === 'zh' ? '來源' : 'Source')}
                    <ArrowUpRight size={12} />
                  </a>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-ink-400 font-mono">
                    {lang === 'zh' ? '原始資料' : 'Source'}
                  </div>
                </div>
              </>
            )}
            <div className="ml-auto flex items-center gap-1.5">
              <button
                onClick={toggleLocale}
                aria-label="Switch language"
                className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.1em] rounded border transition-colors ${
                  lang === 'zh'
                    ? 'border-stellar-cyan/40 bg-stellar-cyan/10 text-stellar-cyan'
                    : 'border-white/[0.1] text-ink-300 hover:text-white hover:border-white/30'
                }`}
              >
                中文
              </button>
              <button
                onClick={toggleLocale}
                aria-label="Switch language"
                className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.1em] rounded border transition-colors ${
                  lang === 'en'
                    ? 'border-stellar-cyan/40 bg-stellar-cyan/10 text-stellar-cyan'
                    : 'border-white/[0.1] text-ink-300 hover:text-white hover:border-white/30'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ───────────── COVER IMAGE ───────────── */}
      {post.coverImage && (
        <figure className="container-main max-w-5xl px-4 mb-12">
          <div className="relative h-72 md:h-[28rem] rounded-2xl overflow-hidden border border-white/[0.07]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space/60 via-transparent to-transparent" />
          </div>
        </figure>
      )}

      {/* ───────────── BODY: TOC | ARTICLE | (mobile share strip) ───────────── */}
      <div className="container-main max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_220px] gap-10">
        {/* Left rail — TOC (desktop only) */}
        <aside className="hidden lg:block">
          <TableOfContents headings={headings} label={lang === 'zh' ? '本文目錄' : 'In this article'} />
        </aside>

        {/* Article body */}
        <div id="article-body" className="min-w-0 max-w-3xl">
          <MarkdownRenderer content={content} onHeadingsExtracted={onHeadings} />

          {/* Inline share — appears at the end of the article */}
          <div className="mt-16 pt-8 border-t border-white/[0.07]">
            <ShareBar url={shareUrl} title={title} excerpt={excerpt} />
          </div>

          {/* Source attribution card */}
          {post.sourceUrl && (
            <div className="mt-8 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
              <Sparkles size={16} className="text-nova-amber flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400 font-mono mb-1">
                  {lang === 'zh' ? '資料來源' : 'Source'}
                </div>
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stellar-cyan hover:text-stellar-cyan-soft underline underline-offset-2 break-all text-sm"
                >
                  {post.sourceUrl}
                </a>
              </div>
            </div>
          )}

          {/* Author bio */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-stellar-cyan/[0.05] to-cosmic-violet/[0.05] border border-white/[0.08] flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-stellar-cyan/40 to-cosmic-violet/40 border border-white/10 flex items-center justify-center font-display text-xl text-white flex-shrink-0">
              {author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400 font-mono mb-1">
                {lang === 'zh' ? '關於作者' : 'About the author'}
              </div>
              <div className="font-display text-lg text-white mb-1">{author}</div>
              <p className="text-ink-300 text-sm leading-relaxed">
                {lang === 'zh'
                  ? 'Celestial Tech 團隊在網絡安全與人工智能的交匯處工作，協助企業在快速演變的威脅環境中保持領先。'
                  : 'The Celestial Tech team operates at the intersection of cybersecurity and AI, helping organizations stay ahead in a rapidly evolving threat landscape.'}
              </p>
            </div>
          </div>

          {/* Inline newsletter — post-conversion */}
          <div className="mt-12">
            <NewsletterSignup variant="inline" />
            <p className="text-xs text-ink-400 font-mono mt-3 text-center">
              {lang === 'zh' ? '想收到下一篇通訊？' : 'Want the next one in your inbox?'}
            </p>
          </div>
        </div>

        {/* Right rail — empty on lg, populated on xl with meta+share */}
        <aside className="hidden xl:block">
          <div className="sticky top-32 self-start space-y-6">
            <ShareBar url={shareUrl} title={title} excerpt={excerpt} />
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400 font-mono mb-2">
                {lang === 'zh' ? '標籤' : 'Tags'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-ink-200">
                  {post.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-ink-200">
                  {lang === 'zh' ? '人工智能' : 'AI'}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-ink-200">
                  {lang === 'zh' ? '網絡安全' : 'Cybersecurity'}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ───────────── RELATED POSTS ───────────── */}
      {relatedPosts.length > 0 && (
        <section className="container-main max-w-6xl px-4 mt-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-white">
              {lang === 'zh' ? '相關通訊' : 'Related dispatches'}
            </h2>
            <Link href="/blog" className="text-sm text-stellar-cyan hover:text-stellar-cyan-soft font-mono inline-flex items-center gap-1.5">
              {lang === 'zh' ? '查看全部' : 'View all'} <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedPosts.slice(0, 3).map((related) => {
              const rTone = CATEGORY_TONE[related.category] || CATEGORY_TONE.Cybersecurity
              return (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-stellar-cyan/30 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-1.5 h-1.5 rounded-full ${rTone.dot}`} />
                    <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${rTone.text}`}>
                      {related.category}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg text-white group-hover:text-stellar-cyan transition-colors line-clamp-2 leading-snug mb-3">
                    {lang === 'zh' ? related.titleZh : related.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-ink-400 font-mono">
                    <Clock size={11} />
                    <span>{related.readTime} {lang === 'zh' ? '分鐘' : 'min'}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ───────────── END-OF-ARTICLE CTA ───────────── */}
      <section className="container-main max-w-4xl px-4 mt-24">
        <div className="relative overflow-hidden rounded-2xl border border-stellar-cyan/15 bg-gradient-to-r from-stellar-cyan/[0.08] via-cosmic-violet/[0.06] to-nova-amber/[0.05] p-8 sm:p-10 text-center">
          <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" aria-hidden="true" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.25em] text-stellar-cyan/80 font-mono mb-3">
              {lang === 'zh' ? '下一步' : 'Next step'}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">
              {lang === 'zh' ? '走在威脅之前' : 'Stay ahead of emerging threats'}
            </h2>
            <p className="text-ink-200 mb-7 max-w-xl mx-auto leading-relaxed">
              {lang === 'zh'
                ? '讓我們的團隊評估你的安全態勢，並為你的組織量身定制路線圖。'
                : "Let our team assess your security posture and build a roadmap tailored to your organization's unique challenges."}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-stellar-cyan text-deep-space font-semibold hover:bg-stellar-cyan-soft transition-colors"
            >
              {lang === 'zh' ? '聯絡我們' : 'Talk to our team'} →
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
