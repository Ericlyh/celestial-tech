'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTranslation } from '@/i18n'
import type { LocaleKey } from '@/locales/en'
import { motion } from 'framer-motion'

interface Section {
  titleKey: LocaleKey
  contentKey: LocaleKey
}

interface LegalPageProps {
  titleKey: LocaleKey
  subtitleKey: LocaleKey
  lastUpdatedKey: LocaleKey
  sections: Section[]
}

export default function LegalPage({
  titleKey,
  subtitleKey,
  lastUpdatedKey,
  sections,
}: LegalPageProps) {
  const { t, locale } = useTranslation()
  const isZh = locale === 'zh-Hant'

  return (
    <main className="relative min-h-screen bg-deep-space overflow-x-hidden">
      <div className="hero-grid-overlay" />
      <div className="hero-radial-overlay" />
      <Navbar />
      <div className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-cyber-cyan text-sm font-medium tracking-widest uppercase mb-4">
              {t(lastUpdatedKey as LocaleKey)}
            </p>
            <h1 className="heading-xl text-pure-white mb-6">
              {t(titleKey as LocaleKey)}
            </h1>
            <p className="body-lg text-pure-white/50 max-w-2xl mx-auto">
              {t(subtitleKey as LocaleKey)}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-12 space-y-12"
          >
            {sections.map((section, i) => (
              <div key={i} className={i < sections.length - 1 ? 'pb-10 border-b border-white/5' : ''}>
                <h2 className="text-xl font-bold text-pure-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-cyber-cyan/40" />
                  {t(section.titleKey as LocaleKey)}
                </h2>
                <div className="text-pure-white/60 leading-relaxed space-y-3 text-sm">
                  {t(section.contentKey).split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
