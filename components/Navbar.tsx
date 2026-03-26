'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { usePathname } from 'next/navigation'

const navLinks = [
  { key: 'nav_home', href: '#home' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_whyUs', href: '#about' },
  { key: 'nav_caseStudies', href: '#case-studies' },
  { key: 'nav_openclaw', href: '/openclaw-hosting' },
  { key: 'nav_blog', href: '/blog' },
  { key: 'nav_contact', href: '#contact' },
]

export default function Navbar() {
  const { t, locale, toggleLocale } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll: add glass effect once page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Absolute paths navigate normally
    if (href.startsWith('/')) {
      window.location.href = href
      return
    }
    // Hash links: on homepage, smooth scroll; on subpages, go to homepage first
    if (href.startsWith('#')) {
      const isHomepage = pathname === '/'
      if (isHomepage) {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = `/${href}`
      }
      return
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <Shield
                size={28}
                className="text-cyber-cyan transition-all duration-300 group-hover:text-cyber-purple"
                strokeWidth={2}
              />
              {/* Glow ring */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)',
                  transform: 'scale(1.3)',
                }}
              />
            </div>
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">
              <span className="text-pure-white">Celestial</span>{' '}
              <span className="text-gradient-cyan">Tech</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="body-md text-pure-white/70 hover:text-cyber-cyan transition-colors duration-200 relative group"
              >
                {t(link.key as any)}
                {/* Underline hover effect */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyber-cyan rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-cyber-cyan text-sm"
            >
              {t('nav_getProtected')}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="px-3 py-1.5 text-xs font-medium rounded border border-white/20 text-pure-white/70 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors duration-200"
              aria-label="Toggle language"
            >
              {locale === 'en' ? 'EN' : '繁'}
            </button>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('nav_closeMenu') : t('nav_openMenu')}
            >
              {isOpen ? (
                <X size={22} className="text-pure-white" />
              ) : (
                <Menu size={22} className="text-pure-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-nav border-t border-white/5"
          >
            <div className="container-main py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="py-3 px-4 rounded-lg text-pure-white/80 hover:text-cyber-cyan hover:bg-white/5 transition-all duration-200 font-medium"
                >
                  {t(link.key as any)}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 mt-2 flex items-center justify-between">
                <button
                  onClick={toggleLocale}
                  className="px-3 py-1.5 text-xs font-medium rounded border border-white/20 text-pure-white/70 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors duration-200"
                  aria-label="Toggle language"
                >
                  {locale === 'en' ? '🌐 EN' : '🌐 繁'}
                </button>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="btn-cyber-cyan text-sm px-6"
                >
                  {t('nav_getProtected')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
