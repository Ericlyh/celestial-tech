'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { usePathname } from 'next/navigation'

const navLinks = [
  { key: 'nav_home', href: '#home' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_whyUs', href: '#about' },
  { key: 'nav_caseStudies', href: '#case-studies' },
  { key: 'nav_openclaw', href: '/hermes-agent-hosting' },
  { key: 'nav_blog', href: '/blog' },
  { key: 'nav_contact', href: '#contact' },
]

export default function Navbar() {
  const { t, locale, toggleLocale } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Throttled with rAF — only check once per animation frame, and only
    // setState if the boolean actually changes. Without this, the navbar
    // re-renders on every scroll event (~hundreds per second on a trackpad).
    let frame = 0
    const handleScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setScrolled((prev) => {
          const next = window.scrollY > 20
          return next === prev ? prev : next
        })
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('/')) {
      window.location.href = href
      return
    }
    if (href.startsWith('#')) {
      const isHomepage = pathname === '/'
      if (isHomepage) {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = `/${href}`
      }
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-nav py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo — Fraunces serif for editorial feel */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-2.5 group"
          >
            {/* Stellar dot mark */}
            <span className="relative w-7 h-7 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-stellar-cyan/20 blur-md group-hover:bg-stellar-cyan/40 transition-all" />
              <span className="relative w-2 h-2 rounded-full bg-stellar-cyan shadow-[0_0_8px_rgba(94,234,212,0.8)]" />
            </span>
            <span className="font-display text-lg sm:text-xl tracking-tight whitespace-nowrap">
              <span className="text-white">Celestial</span>{' '}
              <span className="text-stellar-cyan italic">Tech</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive =
                (link.href === '/blog' && pathname?.startsWith('/blog')) ||
                (link.href === '/hermes-agent-hosting' && pathname?.startsWith('/hermes-agent-hosting'))
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-200 relative group ${
                    isActive ? 'text-stellar-cyan' : 'text-ink-200 hover:text-white'
                  }`}
                >
                  {t(link.key as any)}
                  <span className={`absolute -bottom-1 left-0 h-px bg-stellar-cyan transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              )
            })}
          </div>

          {/* Desktop CTA + lang toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLocale}
              aria-label="Toggle language"
              className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.1em] rounded border border-white/[0.1] text-ink-300 hover:text-stellar-cyan hover:border-stellar-cyan/40 transition-colors"
            >
              {locale === 'en' ? '繁中' : 'EN'}
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-4 py-2 text-[13px] font-semibold rounded-lg bg-stellar-cyan text-deep-space hover:bg-stellar-cyan-soft transition-colors shadow-[0_0_20px_rgba(94,234,212,0.25)] hover:shadow-[0_0_28px_rgba(94,234,212,0.4)]"
            >
              {t('nav_getProtected')}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLocale}
              aria-label="Toggle language"
              className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.1em] rounded border border-white/[0.1] text-ink-300"
            >
              {locale === 'en' ? '繁中' : 'EN'}
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('nav_closeMenu') : t('nav_openMenu')}
            >
              {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[68px] left-0 right-0 z-40 glass-nav border-t border-white/[0.06]"
          >
            <div className="container-main py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="py-3 px-3 rounded-lg text-ink-200 hover:text-stellar-cyan hover:bg-white/[0.04] transition-all font-medium text-sm"
                >
                  {t(link.key as any)}
                </a>
              ))}
              <div className="pt-3 border-t border-white/[0.06] mt-2">
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-3 rounded-lg bg-stellar-cyan text-deep-space font-semibold text-sm"
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
