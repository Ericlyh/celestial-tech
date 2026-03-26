'use client'

import { Calendar, Clock, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/i18n'
import MarkdownRenderer from './MarkdownRenderer'
import CopyButton from '@/app/blog/[slug]/CopyButton'

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

const CATEGORY_COLORS: Record<string, string> = {
  Cybersecurity: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20',
  AI: 'bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20',
}

interface BilingualBlogContentProps {
  post: PostData
  relatedPosts: Pick<PostData, 'id' | 'title' | 'titleZh' | 'slug' | 'category' | 'readTime'>[]
}

export default function BilingualBlogContent({ post, relatedPosts }: BilingualBlogContentProps) {
  const { locale, toggleLocale } = useTranslation()
  const lang = locale === 'zh-Hant' ? 'zh' : 'en'
  const categoryColor = CATEGORY_COLORS[post.category] || 'bg-white/10 text-white border-white/20'

  const title = lang === 'zh' ? post.titleZh : post.title
  const excerpt = lang === 'zh' ? post.excerptZh : post.excerpt
  const content = lang === 'zh' ? post.contentZh : post.content
  const author = lang === 'zh' ? post.authorZh : post.author

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'zh' ? 'zh-Hant' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const shareUrl = `https://celestialtech.io/blog/${post.slug}`
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`

  return (
    <article className="relative z-10 container-main pt-32 pb-24 max-w-4xl">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyber-cyan transition-colors mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {lang === 'zh' ? '返回洞察' : 'Back to Insights'}
      </Link>

      {/* Category badge */}
      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border mb-6 ${categoryColor}`}>
        {post.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
        {title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10 pb-8 border-b border-white/5">
        <span className="text-white/70 font-medium">{author}</span>
        <span className="text-white/20">·</span>
        <div className="flex items-center gap-1.5">
          <Calendar size={13} />
          <span>{formattedDate}</span>
        </div>
        <span className="text-white/20">·</span>
        <div className="flex items-center gap-1.5">
          <Clock size={13} />
          <span>{post.readTime} {lang === 'zh' ? '分鐘閱讀' : 'min read'}</span>
        </div>
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

      {/* Share buttons + Language toggle */}
      <div className="flex items-center gap-3 mb-12">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Share2 size={14} />
          <span>{lang === 'zh' ? '分享' : 'Share'}:</span>
        </div>
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-200"
        >
          X
        </a>
        <CopyButton text={shareUrl} />
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${lang === 'zh' ? 'border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan' : 'border-white/10 text-gray-500 hover:text-white'}`}
          >
            {lang === 'zh' ? '中文 ✓' : '中文'}
          </button>
          <button
            onClick={toggleLocale}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${lang === 'en' ? 'border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan' : 'border-white/10 text-gray-500 hover:text-white'}`}
          >
            {lang === 'en' ? 'EN ✓' : 'EN'}
          </button>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-3xl">
        <MarkdownRenderer content={content} />
      </div>

      {/* Source attribution */}
      {post.sourceUrl && (
        <div className="mt-12 p-6 rounded-xl bg-white/[0.03] border border-white/6">
          <p className="text-sm text-gray-400">
            <strong className="text-white">{lang === 'zh' ? '來源' : 'Source'}:</strong>{' '}
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
      {relatedPosts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-white/5">
          <h2 className="text-2xl font-bold text-white mb-8">
            {lang === 'zh' ? '相關文章' : 'Related Insights'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyber-cyan/30 transition-all duration-300"
              >
                <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border mb-3 ${categoryColor}`}>
                  {related.category}
                </span>
                <h3 className="text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors line-clamp-2">
                  {lang === 'zh' ? related.titleZh : related.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  {related.readTime} {lang === 'zh' ? '分鐘閱讀' : 'min read'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 border border-white/[0.06] text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          {lang === 'zh' ? '走在威脅之前' : 'Stay Ahead of Emerging Threats'}
        </h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          {lang === 'zh'
            ? '讓我們的團隊評估您的安全態勢，並為您的組織量身定制路線圖。'
            : "Let our team assess your security posture and build a roadmap tailored to your organization's unique challenges."}
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-cyan text-deep-space font-semibold hover:bg-white transition-colors"
        >
          {lang === 'zh' ? '聯絡我們 →' : 'Talk to Our Team →'}
        </Link>
      </section>
    </article>
  )
}
