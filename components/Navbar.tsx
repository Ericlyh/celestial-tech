'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { usePathname } from 'next/navigation'

type NavLink = {
  key: string
  href: string
  children?: { key: string; href: string }[]
}

const navLinks: NavLink[] = [
  { key: 'nav_home', href: '#home' },
  {
    key: 'nav_services',
    href: '/cybersecurity/sme',
    children: [
      { key: 'nav_services_sme', href: '/cybersecurity/sme' },
      { key: 'nav_services_personal', href: '/cybersecurity/personal' },
    ],
  },
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
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesWrapRef = useRef<HTMLDivElement>(null)

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

  // Close the desktop Services dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return
    const onClick = (e: MouseEvent) => {
      if (
        servicesWrapRef.current &&
        !servicesWrapRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [servicesOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
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

  const isServicesActive =
    pathname?.startsWith('/cybersecurity/sme') ||
    pathname?.startsWith('/cybersecurity/personal')

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

              // Services — dropdown trigger
              if (link.children) {
                return (
                  <div
                    key={link.key}
                    ref={servicesWrapRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`group text-[13px] font-medium tracking-wide transition-colors duration-200 relative flex items-center gap-1 ${
                        isServicesActive ? 'text-stellar-cyan' : 'text-ink-200 hover:text-white'
                      }`}
                    >
                      {t(link.key as any)}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                      <span className={`absolute -bottom-1 left-0 h-px bg-stellar-cyan transition-all duration-300 ${
                        isServicesActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          role="menu"
                          className="absolute top-full left-0 mt-2 min-w-[220px] rounded-xl glass-nav border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.45)] py-2"
                        >
                          {link.children.map((child) => {
                            const childActive = pathname?.startsWith(child.href)
                            return (
                              <a
                                key={child.key}
                                href={child.href}
                                role="menuitem"
                                onClick={(e) => { e.preventDefault(); handleNavClick(child.href) }}
                                className={`block px-4 py-2.5 text-[13px] font-medium transition-colors ${
                                  childActive
                                    ? 'text-stellar-cyan bg-white/[0.04]'
                                    : 'text-ink-200 hover:text-white hover:bg-white/[0.04]'
                                }`}
                              >
                                {t(child.key as any)}
                              </a>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

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
              {navLinks.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.key} className="rounded-lg overflow-hidden">
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="w-full flex items-center justify-between py-3 px-3 text-ink-200 hover:text-stellar-cyan hover:bg-white/[0.04] transition-all font-medium text-sm"
                      >
                        <span>{t(link.key as any)}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 flex flex-col gap-1 pb-1">
                              {link.children.map((child) => (
                                <a
                                  key={child.key}
                                  href={child.href}
                                  onClick={(e) => { e.preventDefault(); handleNavClick(child.href) }}
                                  className="py-2 px-3 rounded-lg text-ink-300 hover:text-stellar-cyan hover:bg-white/[0.04] transition-all font-medium text-sm"
                                >
                                  {t(child.key as any)}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="py-3 px-3 rounded-lg text-ink-200 hover:text-stellar-cyan hover:bg-white/[0.04] transition-all font-medium text-sm"
                  >
                    {t(link.key as any)}
                  </a>
                )
              })}
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
