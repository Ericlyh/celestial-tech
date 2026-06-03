'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { useTranslation } from '@/i18n'

interface Insight {
  id: string
  title: string
  titleZh: string
  slug: string
  excerpt: string
  excerptZh: string
  category: string
  readTime: number
  publishedAt: string
}

const POSTS: Insight[] = [
  {
    id: '1',
    title: 'AI-Powered SOC: The Future of Threat Detection is Here',
    titleZh: 'AI 驅動 SOC：威脅檢測的未來已來',
    slug: 'ai-powered-soc-future-threat-detection',
    excerpt: "AI-powered SOCs are redefining threat detection. Here's how forward-looking organizations are staying ahead.",
    excerptZh: 'AI 驅動的 SOC 正在重新定義威脅檢測。以下是有遠見的組織如何保持領先。',
    category: 'Cybersecurity',
    readTime: 6,
    publishedAt: '2026-03-20',
  },
  {
    id: '3',
    title: 'The Convergence of AI and Cybersecurity in 2026',
    titleZh: 'AI 與網絡安全的融合：2026 年企業需要知道的事',
    slug: 'convergence-ai-cybersecurity-enterprises-2026',
    excerpt: "AI and cybersecurity are no longer separate disciplines — they're converging into a single imperative.",
    excerptZh: 'AI 與網絡安全不再是兩個獨立領域——兩者正融合為一個共同的必然要求。',
    category: 'AI',
    readTime: 7,
    publishedAt: '2026-03-15',
  },
  {
    id: '4',
    title: 'Multi-Agent Patterns: From AI Chatbot to Execution Engine',
    titleZh: '構建自主執行引擎：OpenClaw 多代理模式',
    slug: 'openclaw-multi-agent-patterns-autonomous-execution-engine',
    excerpt: "Six months of building with multi-agent systems: what works, what doesn't, and how to ship.",
    excerptZh: '六個月的多代理系統開發經驗：甚麼有效、甚麼無效，以及如何交付。',
    category: 'AI',
    readTime: 8,
    publishedAt: '2026-04-01',
  },
]

const CATEGORY_TONE: Record<string, { dot: string; text: string; accent: string }> = {
  Cybersecurity: { dot: 'bg-stellar-cyan', text: 'text-stellar-cyan', accent: 'group-hover:text-stellar-cyan' },
  AI: { dot: 'bg-cosmic-violet', text: 'text-cosmic-violet-soft', accent: 'group-hover:text-cosmic-violet-soft' },
}

export default function InsightsTeaser() {
  const { t, locale } = useTranslation()
  const ref = useRef(null)
  const [isInView] = useState(true) // simple — keep visible for SSR consistency
  const lang = locale === 'zh-Hant' ? 'zh' : 'en'

  return (
    <section
      ref={ref}
      id="insights"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-cosmic-violet/[0.05] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="container-main max-w-6xl relative">
        {/* Section header — editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stellar-cyan font-mono">
                {t('blog_eyebrow')}
              </span>
              <span className="h-px w-10 bg-stellar-cyan/30" />
            </div>
            <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight max-w-2xl">
              {t('blog_title')}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-stellar-cyan hover:text-stellar-cyan-soft font-mono group whitespace-nowrap"
          >
            <span>{lang === 'zh' ? '查看所有通訊' : 'View all dispatches'}</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {POSTS.map((post, i) => {
            const tone = CATEGORY_TONE[post.category] || CATEGORY_TONE.Cybersecurity
            const formattedDate = new Date(post.publishedAt).toLocaleDateString(
              lang === 'zh' ? 'zh-Hant' : 'en-US',
              { year: 'numeric', month: 'short', day: 'numeric' }
            )
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="relative h-full flex flex-col p-6 sm:p-7 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-stellar-cyan/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden hover:-translate-y-1">
                    {/* Top row: category + dispatch number */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${tone.text}`}>
                          {post.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/30">
                        {post.id.padStart(3, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-display text-xl sm:text-2xl text-white leading-snug mb-3 line-clamp-2 transition-colors ${tone.accent}`}>
                      {lang === 'zh' ? post.titleZh : post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-ink-300 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
                      {lang === 'zh' ? post.excerptZh : post.excerpt}
                    </p>

                    {/* Footer: meta + arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                      <div className="flex items-center gap-3 text-[11px] text-ink-400 font-mono">
                        <div className="flex items-center gap-1">
                          <Calendar size={11} />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>{post.readTime} {lang === 'zh' ? '分鐘' : 'min'}</span>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-stellar-cyan opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </div>
                  </article>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Footnote: subscribe hint */}
        <div className="mt-10 text-center text-xs text-ink-400 font-mono">
          {lang === 'zh' ? '每月兩次 · 沒有灌水 · 隨時取消' : 'Twice a month · No filler · Unsubscribe anytime'}
        </div>
      </div>
    </section>
  )
}
