'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/i18n'
import Navbar from '@/components/Navbar'

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
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

const CATEGORY_COLORS: Record<string, string> = {
  Cybersecurity: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20',
  AI: 'bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20',
}

function BlogCard({ post, index }: { post: Post; index: number }) {
  const { t, locale } = useTranslation()
  const categoryColor = CATEGORY_COLORS[post.category] || 'bg-white/10 text-white border-white/20'
  const lang = locale === 'zh-Hant' ? 'zh' : 'en'

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(lang === 'zh' ? 'zh-Hant' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/[0.06] hover:border-cyber-cyan/30 transition-all duration-500 overflow-hidden h-full flex flex-col">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative h-52 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
              {/* Category Badge */}
              <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full border ${categoryColor} backdrop-blur-sm`}>
                {post.category}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors duration-300 mb-3 line-clamp-2">
              {lang === 'zh' ? post.titleZh : post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
              {lang === 'zh' ? post.excerptZh : post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="mt-4 flex items-center gap-1.5 text-cyber-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>{t('blog_readMore')}</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'All' | 'AI' | 'Cybersecurity'>('All')

  // Static posts for client-side rendering
  const _allPosts: Post[] = [
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
      coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
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
      coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
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
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
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
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      author: 'Celestial Tech Team',
      readTime: 8,
      publishedAt: '2026-04-01T00:00:00Z',
    },
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  const posts = _allPosts

  const filteredPosts =
    activeTab === 'All' ? posts : posts.filter((p) => p.category === activeTab)

  const tabs: Array<'All' | 'AI' | 'Cybersecurity'> = ['All', 'AI', 'Cybersecurity']

  return (
    <main className="relative min-h-screen bg-deep-space overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 hero-grid opacity-30" />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-cyan/5 rounded-full blur-[100px]" />

        <div className="container-main relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full border border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5 mb-5 sm:mb-6">
              Celestial Tech Insights
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
              {t('blog_title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              {t('blog_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-10 sm:pb-12 px-4">
        <div className="container-main">
          <div className="flex items-center gap-2 p-1 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.06] w-fit mx-auto overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 sm:pb-24 px-4">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>{t('blog_noPosts')}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
