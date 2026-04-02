'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, Shield } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { usePathname } from 'next/navigation'

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Github, href: '#', label: 'GitHub' },
]

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function Footer() {
  const { t, locale, toggleLocale } = useTranslation()
  const pathname = usePathname()
  const isOpenClaw = pathname?.startsWith('/openclaw-hosting')

  const quickLinks = [
    { labelKey: 'footer_home' as const, href: isOpenClaw ? '/' : '#' },
    { labelKey: 'footer_services' as const, href: isOpenClaw ? '/#services' : '#services' },
    { labelKey: 'nav_caseStudies' as const, href: isOpenClaw ? '/#case-studies' : '#case-studies' },
    { labelKey: 'footer_about' as const, href: isOpenClaw ? '/#founder' : '#founder' },
    { labelKey: 'footer_contact' as const, href: isOpenClaw ? '/openclaw-hosting#contact' : '#contact' },
  ]

  const legalLinks = [
    { labelKey: 'footer_privacy' as const, href: '/privacy-policy' },
    { labelKey: 'footer_terms' as const, href: '/terms-of-service' },
  ]

  return (
    <footer className="relative bg-[#060608] border-t border-white/[0.05] overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00F0FF]/20 blur-lg rounded-lg" />
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#8B5CF6]/20
                                border border-[#00F0FF]/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#00F0FF]" />
                </div>
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight">Celestial Tech</span>
                <span className="block text-[10px] text-[#00F0FF] tracking-[0.2em] uppercase -mt-1">
                  {t('footer_tagline')}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              {t('footer_description')}
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08]
                             flex items-center justify-center text-gray-500
                             hover:text-[#00F0FF] hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/5
                             transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">{t('footer_nav')}</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a
                    href={href}
                    className="text-gray-500 hover:text-[#00F0FF] text-sm transition-colors duration-300
                               inline-block hover:translate-x-1"
                    style={{ transition: 'color 0.3s, transform 0.2s' }}
                  >
                    {t(labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">{t('footer_legal')}</h4>
            <ul className="space-y-3">
              {legalLinks.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a
                    href={href}
                    className="text-gray-500 hover:text-[#00F0FF] text-sm transition-colors duration-300"
                  >
                    {t(labelKey)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Status indicator */}
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-gray-600 text-xs">{t('footer_soc')}</span>
            </div>

            {/* Language toggle */}
            <div className="mt-4">
              <button
                onClick={toggleLocale}
                className="px-3 py-1.5 text-xs font-medium rounded border border-white/10 text-gray-500 hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-colors duration-200"
                aria-label="Toggle language"
              >
                {locale === 'en' ? '🌐 EN' : '🌐 繁'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row
                     justify-between items-center gap-4"
        >
          <p className="text-gray-600 text-sm">
            © 2026 Celestial Tech. {t('footer_rights')}
          </p>
          <p className="text-gray-700 text-xs">
            Crafted with precision. Secured with intelligence.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
