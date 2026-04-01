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
  slug: string
  excerpt: string
  category: string
  coverImage: string | null
  author: string
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
  const { t } = useTranslation()
  const categoryColor = CATEGORY_COLORS[post.category] || 'bg-white/10 text-white border-white/20'

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
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
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
              {post.excerpt}
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
  const posts: Post[] = [
    {
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
    },
    {
      id: '2',
      title: 'From Reactive to Predictive: Why Traditional Cybersecurity is Failing',
      slug: 'reactive-to-predictive-traditional-cybersecurity-failing',
      excerpt:
        'Traditional cybersecurity waits for something to break. Predictive security stops threats before they happen. Here\'s why the paradigm shift is urgent — and inevitable.',
      category: 'Cybersecurity',
      coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
      author: 'Celestial Tech Team',
      readTime: 5,
      publishedAt: '2026-03-18T00:00:00Z',
    },
    {
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
    },
    {
      id: '4',
      title: 'Building an Autonomous Execution Engine: Multi-Agent Patterns with OpenClaw',
      slug: 'openclaw-multi-agent-patterns-autonomous-execution-engine',
      excerpt:
        "Six months of building with OpenClaw taught me that the gap between 'AI chatbot' and 'autonomous execution engine' is exactly this: moving from 'AI answers questions' to 'AI completes projects.' Here's what multi-agent orchestration looks like in practice.",
      category: 'AI',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      author: 'Celestial Tech Team',
      readTime: 8,
      publishedAt: '2026-04-01T00:00:00Z',
    },
  ]

  const filteredPosts =
    activeTab === 'All' ? posts : posts.filter((p) => p.category === activeTab)

  const tabs: Array<'All' | 'AI' | 'Cybersecurity'> = ['All', 'AI', 'Cybersecurity']

  return (
    <main className="relative min-h-screen bg-deep-space overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 hero-grid opacity-30" />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-cyan/5 rounded-full blur-[100px]" />

        <div className="container-main relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full border border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5 mb-6">
              Celestial Tech Insights
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {t('blog_title')}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('blog_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="container-main">
          <div className="flex items-center gap-2 p-1 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.06] w-fit mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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
      <section className="pb-24">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
