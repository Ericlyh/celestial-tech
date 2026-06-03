'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowUpRight, Sparkles, Search } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import NewsletterSignup from '@/components/NewsletterSignup'
import { useTranslation } from '@/i18n'

interface Post {
  id: string
  title: string
  titleZh: string
  slug: string
  excerpt: string
  excerptZh: string
  category: string
  coverImage: string | null
  author: string
  authorZh: string
  readTime: number
  publishedAt: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any },
  }),
}

const CATEGORY_TONE: Record<string, { dot: string; text: string; bg: string; border: string; accent: string }> = {
  Cybersecurity: {
    dot: 'bg-stellar-cyan',
    text: 'text-stellar-cyan',
    bg: 'bg-stellar-cyan/10',
    border: 'border-stellar-cyan/20',
    accent: 'group-hover:text-stellar-cyan',
  },
  AI: {
    dot: 'bg-cosmic-violet',
    text: 'text-cosmic-violet-soft',
    bg: 'bg-cosmic-violet/10',
    border: 'border-cosmic-violet/20',
    accent: 'group-hover:text-cosmic-violet-soft',
  },
}

function FeaturedCard({ post }: { post: Post }) {
  const { locale } = useTranslation()
  const lang = locale === 'zh-Hant' ? 'zh' : 'en'
  const tone = CATEGORY_TONE[post.category] || CATEGORY_TONE.Cybersecurity

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'zh' ? 'zh-Hant' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <motion.div
      variants={fadeInUp}
      custom={0}
      initial="hidden"
      animate="visible"
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <article className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 lg:gap-10 items-center rounded-2xl overflow-hidden bg-white/[0.025] border border-white/[0.06] hover:border-stellar-cyan/30 transition-all duration-500">
          {/* Cover */}
          {post.coverImage && (
            <div className="relative h-72 lg:h-[28rem] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent lg:bg-gradient-to-r" />
              {/* Floating dispatch number */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 text-right">
                <div className="text-[10px] uppercase tracking-[0.2em] text-stellar-cyan/80 font-mono">
                  Featured
                </div>
                <div className="text-2xl font-display text-white/90">
                  {post.id.padStart(3, '0')}
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-10 lg:py-12">
            <div className="flex items-center gap-3 mb-5">
              <span className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border ${tone.bg} ${tone.text} ${tone.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tone.dot} animate-pulse`} />
                {post.category}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-ink-400">
                · {post.readTime} {lang === 'zh' ? '分鐘' : 'min read'}
              </span>
            </div>

            <h2 className={`font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-[1.1] tracking-tight mb-5 transition-colors ${tone.accent}`}>
              {lang === 'zh' ? post.titleZh : post.title}
            </h2>

            <p className="text-ink-200 leading-relaxed text-base lg:text-lg mb-6 line-clamp-3">
              {lang === 'zh' ? post.excerptZh : post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-sm text-ink-300 font-mono">
                <Calendar size={13} className="text-stellar-cyan" />
                {formattedDate}
              </div>
              <div className="inline-flex items-center gap-1.5 text-stellar-cyan text-sm font-mono group-hover:gap-2.5 transition-all">
                <span>{lang === 'zh' ? '閱讀全文' : 'Read dispatch'}</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const { locale, t } = useTranslation()
  const lang = locale === 'zh-Hant' ? 'zh' : 'en'
  const tone = CATEGORY_TONE[post.category] || CATEGORY_TONE.Cybersecurity

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'zh' ? 'zh-Hant' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  )

  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <article className="relative h-full flex flex-col bg-white/[0.025] rounded-2xl border border-white/[0.06] hover:border-stellar-cyan/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden hover:-translate-y-1">
          {/* Cover */}
          {post.coverImage && (
            <div className="relative h-44 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-space/90 via-deep-space/30 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
                <span className={`text-[10px] font-mono uppercase tracking-[0.18em] ${tone.text}`}>
                  {post.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/40">
                {post.id.padStart(3, '0')}
              </div>
            </div>
          )}

          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <h3 className={`font-display text-lg sm:text-xl text-white leading-snug mb-3 line-clamp-2 transition-colors ${tone.accent}`}>
              {lang === 'zh' ? post.titleZh : post.title}
            </h3>

            <p className="text-ink-300 text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
              {lang === 'zh' ? post.excerptZh : post.excerpt}
            </p>

            <div className="flex items-center justify-between text-[11px] text-ink-400 font-mono pt-4 border-t border-white/[0.05]">
              <div className="flex items-center gap-1.5">
                <Calendar size={11} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={11} />
                <span>{post.readTime} {lang === 'zh' ? '分鐘' : 'min'}</span>
              </div>
            </div>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            <ArrowUpRight size={16} className="text-stellar-cyan" />
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

export default function BlogPage() {
  const { t, locale } = useTranslation()
  const [activeTab, setActiveTab] = useState<'All' | 'AI' | 'Cybersecurity'>('All')
  const [search, setSearch] = useState('')
  const lang = locale === 'zh-Hant' ? 'zh' : 'en'

  // Static posts for client-side rendering
  const allPosts: Post[] = useMemo(
    () =>
      [
        {
          id: '1',
          title: 'AI-Powered SOC: The Future of Threat Detection is Here',
          titleZh: 'AI 驅動 SOC：威脅檢測的未來已來',
          slug: 'ai-powered-soc-future-threat-detection',
          excerpt:
            "Security Operations Centers are being transformed by artificial intelligence. Here's how AI-powered SOCs are redefining threat detection and why your organization needs one.",
          excerptZh: '人工智能正在徹底改變安全運營中心。以下是 AI 驅動的 SOC 如何重新定義威脅檢測，以及您的組織為何需要它。',
          category: 'Cybersecurity',
          authorZh: 'Celestial Tech 團隊',
          coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80',
          author: 'Celestial Tech Team',
          readTime: 6,
          publishedAt: '2026-03-20T00:00:00Z',
        },
        {
          id: '2',
          title: 'From Reactive to Predictive: Why Traditional Cybersecurity is Failing',
          titleZh: '從被動到主動：為何傳統網絡安全正在失效',
          slug: 'reactive-to-predictive-traditional-cybersecurity-failing',
          excerpt:
            'Traditional cybersecurity waits for something to break. Predictive security stops threats before they happen. Here\'s why the paradigm shift is urgent — and inevitable.',
          excerptZh: '傳統網絡安全等待事情破裂後才行動。主動式安全在威脅發生前就阻止它們。呢度解釋點解呢個典範轉移迫切且不可避免。',
          category: 'Cybersecurity',
          coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=80',
          author: 'Celestial Tech Team',
          authorZh: 'Celestial Tech 團隊',
          readTime: 5,
          publishedAt: '2026-03-18T00:00:00Z',
        },
        {
          id: '3',
          title: 'The Convergence of AI and Cybersecurity: What Enterprises Need to Know in 2026',
          titleZh: 'AI 與網絡安全的融合：企業在 2026 年需要知道什麼',
          slug: 'convergence-ai-cybersecurity-enterprises-2026',
          excerpt:
            "AI and cybersecurity are no longer separate disciplines — they're converging into a single imperative. Here's what forward-thinking enterprises are doing differently.",
          excerptZh: 'AI 與網絡安全不再係獨立學科——它們正在融合成一個必需品。呢度係有遠見的企業做嘢不同的地方。',
          category: 'AI',
          authorZh: 'Celestial Tech 團隊',
          coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80',
          author: 'Celestial Tech Team',
          readTime: 7,
          publishedAt: '2026-03-15T00:00:00Z',
        },
        {
          id: '4',
          title: 'Building an Autonomous Execution Engine: Multi-Agent Patterns with OpenClaw',
          titleZh: '構建自主執行引擎：OpenClaw 多代理模式',
          slug: 'openclaw-multi-agent-patterns-autonomous-execution-engine',
          excerpt:
            "Six months of building with OpenClaw taught me that the gap between 'AI chatbot' and 'autonomous execution engine' is exactly this: moving from 'AI answers questions' to 'AI completes projects.' Here's what multi-agent orchestration looks like in practice.",
          excerptZh: '六個月嘅 OpenClaw 開發經驗告訴我，「AI 聊天機械人」和「自主執行引擎」之間的差距就係：從「AI 回答問題」到「AI 完成項目」。呢度係多代理編排在實踐中的樣子。',
          category: 'AI',
          authorZh: 'Celestial Tech 團隊',
          coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80',
          author: 'Celestial Tech Team',
          readTime: 8,
          publishedAt: '2026-04-01T00:00:00Z',
        },
      ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    []
  )

  const filtered = useMemo(() => {
    let result = activeTab === 'All' ? allPosts : allPosts.filter((p) => p.category === activeTab)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.titleZh.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.excerptZh.toLowerCase().includes(q)
      )
    }
    return result
  }, [allPosts, activeTab, search])

  const featured = filtered[0]
  const rest = filtered.slice(1)
  const tabs: Array<'All' | 'AI' | 'Cybersecurity'> = ['All', 'AI', 'Cybersecurity']
  const counts: Record<string, number> = {
    All: allPosts.length,
    AI: allPosts.filter((p) => p.category === 'AI').length,
    Cybersecurity: allPosts.filter((p) => p.category === 'Cybersecurity').length,
  }

  return (
    <main className="relative min-h-screen bg-deep-space overflow-x-hidden">
      <Navbar />

      {/* Background atmosphere */}
      <div className="fixed inset-0 hero-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-stellar-cyan/[0.04] rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      {/* ───────────── HERO ───────────── */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 px-4">
        <div className="container-main max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center sm:text-left"
          >
            <div className="flex items-center gap-2 mb-5 justify-center sm:justify-start">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stellar-cyan font-mono">
                {t('blog_eyebrow')}
              </span>
              <span className="h-px w-12 bg-stellar-cyan/30" />
            </div>

            <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.02] tracking-tight mb-6 max-w-4xl">
              {t('blog_title')}
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-3 text-ink-300 font-normal">
                {t('blog_subtitle')}
              </span>
            </h1>

            {/* Search + filter row */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mt-10 max-w-3xl">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={lang === 'zh' ? '搜尋通訊...' : 'Search dispatches...'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-ink-400 focus:outline-none focus:border-stellar-cyan/40 focus:bg-white/[0.06] transition-all font-mono text-sm"
                />
              </div>
              <div className="flex items-center gap-1 p-1 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.06] w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-stellar-cyan/10 text-stellar-cyan border border-stellar-cyan/30'
                        : 'text-ink-300 hover:text-white border border-transparent'
                    }`}
                  >
                    {tab}
                    <span className="ml-1.5 text-[10px] opacity-60">{counts[tab]}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── FEATURED ───────────── */}
      {featured && activeTab === 'All' && !search && (
        <section className="px-4 pb-16">
          <div className="container-main max-w-6xl">
            <FeaturedCard post={featured} />
          </div>
        </section>
      )}

      {/* ───────────── DISPATCH GRID ───────────── */}
      <section className="px-4 pb-20">
        <div className="container-main max-w-6xl">
          {(activeTab !== 'All' || search) && filtered.length > 0 && (
            <div className="flex items-baseline gap-3 mb-8">
              <h2 className="font-display text-2xl text-white">
                {activeTab === 'All'
                  ? (lang === 'zh' ? '所有通訊' : 'All dispatches')
                  : activeTab}
              </h2>
              <span className="text-xs font-mono text-ink-400">
                {filtered.length} {lang === 'zh' ? '篇' : 'items'}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {(activeTab === 'All' && !search ? rest : filtered).map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <Sparkles size={32} className="text-ink-400 mx-auto mb-4" />
              <p className="text-ink-300 font-mono text-sm">{t('blog_noPosts')}</p>
            </div>
          )}
        </div>
      </section>

      {/* ───────────── NEWSLETTER ───────────── */}
      <section className="px-4 pb-24">
        <div className="container-main max-w-4xl">
          <NewsletterSignup />
        </div>
      </section>
    </main>
  )
}
