'use client'

// HomeA2 — Direction A2 ("Threat Atlas" — was "Stellar Cartography" pre-OOP-4066 round 6) for the home page only.
// Self-contained: does NOT touch Navbar/Footer/Contact used by other pages.
// Other 6 pages keep their existing treatment; user can roll A2 across after
// accepting the home.
// Round 9 (2026-08-25): wired useTranslation() across every section so the home
// page honours the language toggle. Adds ~95 locale keys under the `a2_` prefix
// (en.ts / zh-Hant.ts). Heading simplified to "Why us?" per user feedback — the
// "not a global cloud" framing read as comparing to a competitor.

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from '@/i18n'

// Locale-aware tag class. The English design uses monospace + uppercase + wide
// tracking as part of the editorial-tech aesthetic. CJK characters don't have
// case, mono fonts render them with uneven metrics, and wide tracking makes
// Chinese labels feel unmoored from the numbers above them. When the locale is
// zh-Hant we drop mono, drop uppercase, and use normal tracking — and lean on
// the natural rhythm of CJK glyphs instead. Numbers and Latin sub-strings are
// unaffected.
const TAG_CLS_EN = 'font-mono tracking-[0.18em] uppercase'
const TAG_CLS_ZH = 'font-sans tracking-normal normal-case'
function useTagCls(wide = false) {
  const { locale } = useTranslation()
  if (locale === 'zh-Hant') return TAG_CLS_ZH
  return wide ? `${TAG_CLS_EN}` : TAG_CLS_EN
}

function Eyebrow({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'amber' | 'violet' }) {
  const { locale } = useTranslation()
  const cls =
    color === 'cyan'
      ? 'text-stellar-cyan'
      : color === 'amber'
      ? 'text-nova-amber'
      : 'text-cosmic-violet'
  const tagCls = locale === 'zh-Hant' ? TAG_CLS_ZH : TAG_CLS_EN
  return (
    <div className={`text-[11px] sm:text-[12px] ${tagCls} ${cls} mb-4 sm:mb-5`}>
      {children}
    </div>
  )
}

function SectionTitle({ children, accent }: { children: React.ReactNode; accent?: React.ReactNode }) {
  return (
    <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.98] tracking-[-0.025em] mb-6 sm:mb-8">
      {children} {accent && <em className="italic text-cosmic-violet font-normal">{accent}</em>}
    </h2>
  )
}

function A2Nav() {
  const { locale, toggleLocale, t } = useTranslation()
  const links = [
    { label: t('a2_nav_services' as any), href: '/cybersecurity/sme', children: [
      { label: t('nav_services_sme' as any), href: '/cybersecurity/sme' },
      { label: t('nav_services_personal' as any), href: '/cybersecurity/personal' },
    ] },
    { label: t('a2_nav_hosting' as any), href: '/hermes-agent-hosting' },
    { label: t('a2_nav_whyUs' as any), href: '#why-us' },
    { label: t('a2_nav_blog' as any), href: '/blog' },
    { label: t('a2_nav_contact' as any), href: '#contact' },
  ]
  const linkCls = locale === 'zh-Hant' ? 'tracking-normal normal-case' : 'uppercase tracking-[0.08em]'
  const langCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono uppercase tracking-[0.1em]'
  const ctaCls = locale === 'zh-Hant' ? 'tracking-normal normal-case' : 'uppercase tracking-[0.1em]'

  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesWrapRef = useRef<HTMLLIElement>(null)
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

  const handleAnchorClick = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-10 py-5 bg-deep-space/80 backdrop-blur-xl border-b border-stellar-cyan/10">
      <a href="#home" className="font-display font-black text-lg sm:text-xl tracking-tight flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-stellar-cyan shadow-[0_0_18px_rgba(94,234,212,0.7)]" />
        Celestial Tech
      </a>
      <ul className="hidden md:flex gap-7 list-none items-center">
        {links.map((l) => {
          if (l.children) {
            return (
              <li
                key={l.label}
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
                  className={`text-ink-50 font-medium text-[13px] ${linkCls} hover:text-stellar-cyan transition-colors flex items-center gap-1`}
                >
                  {l.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div
                    role="menu"
                    className="absolute top-full left-0 mt-3 min-w-[220px] rounded-xl border border-white/[0.08] bg-deep-space/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] py-2"
                  >
                    {l.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        role="menuitem"
                        className="block px-4 py-2.5 text-[13px] font-medium text-ink-50 hover:bg-white/[0.05] hover:text-stellar-cyan transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            )
          }
          return (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={handleAnchorClick(l.href)}
                className={`text-ink-50 font-medium text-[13px] ${linkCls} hover:text-stellar-cyan transition-colors`}
              >
                {l.label}
              </a>
            </li>
          )
        })}
      </ul>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLocale}
          aria-label="Toggle language"
          className={`px-2.5 py-1 text-[10px] ${langCls} rounded border border-white/[0.1] text-ink-300 hover:text-stellar-cyan hover:border-stellar-cyan/40 transition-colors`}
        >
          {locale === 'en' ? '繁中' : 'EN'}
        </button>
        <a
          href="#contact"
          className={`hidden md:inline-block px-4 py-2 border border-stellar-cyan rounded-full text-stellar-cyan text-[12px] ${ctaCls} hover:bg-stellar-cyan/10 transition-colors`}
        >
          {t('a2_nav_cta' as any)} →
        </a>
      </div>
    </nav>
  )
}

function A2Hero() {
  const { t, locale } = useTranslation()
  const eyebrowCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.18em] uppercase'
  const btnCls = locale === 'zh-Hant' ? 'tracking-normal normal-case' : 'uppercase tracking-[0.1em]'
  return (
    <header id="home" className="px-5 sm:px-10 lg:px-10 pt-16 sm:pt-24 pb-12 max-w-[1440px] mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
      <div>
        <div className={`text-[11px] sm:text-[12px] ${eyebrowCls} text-stellar-cyan mb-6`}>
          {t('a2_hero_eyebrow' as any)}
        </div>
        <h1 className="font-display font-light italic text-[64px] sm:text-[88px] lg:text-[120px] xl:text-[160px] leading-[0.92] tracking-[-0.035em] mb-8 bg-gradient-to-br from-white via-white to-ink-200 bg-clip-text text-transparent">
          {t('a2_hero_title_1' as any)}<br />
          {t('a2_hero_title_2' as any)}<sup className="font-display not-italic font-light text-[0.35em] text-cosmic-violet align-super">*</sup><br />
          <span className="not-italic text-stellar-cyan">{t('a2_hero_title_3' as any)}</span>
        </h1>
        <p className="font-display font-light italic text-lg sm:text-xl lg:text-2xl text-ink-200 leading-relaxed max-w-[540px] mb-9">
          {t('a2_hero_sub' as any)}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className={`px-7 py-4 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] ${btnCls} hover:bg-stellar-cyan-soft transition-colors`}
          >
            {t('a2_hero_cta_primary' as any)}
          </a>
          <a
            href="/hermes-agent-hosting"
            className={`px-7 py-4 border border-ink-200 text-ink-50 rounded-full text-[13px] ${btnCls} hover:border-stellar-cyan hover:text-stellar-cyan transition-colors`}
          >
            {t('a2_hero_cta_secondary' as any)}
          </a>
        </div>
      </div>
      <div
        className="relative aspect-square max-w-[480px] mx-auto w-full"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 35% 40%, rgba(94,234,212,0.35), transparent 60%), radial-gradient(circle at 60% 60%, rgba(167,139,250,0.35), transparent 65%), radial-gradient(circle at 50% 50%, rgba(244,184,96,0.18), transparent 70%)',
          borderRadius: '48% 52% 47% 53% / 50% 45% 55% 50%',
        }}
      >
        <div
          className="absolute inset-[10%]"
          style={{
            backgroundImage:
              'radial-gradient(2px 2px at 20% 30%, #F4F6FB 50%, transparent 51%), radial-gradient(1.5px 1.5px at 60% 70%, #5EEAD4 50%, transparent 51%), radial-gradient(1.5px 1.5px at 80% 25%, #A78BFA 50%, transparent 51%), radial-gradient(1px 1px at 40% 80%, #F4B860 50%, transparent 51%), radial-gradient(2px 2px at 90% 60%, #F4F6FB 50%, transparent 51%), radial-gradient(1px 1px at 30% 50%, #5EEAD4 50%, transparent 51%)',
            opacity: 0.9,
          }}
        />
      </div>
    </header>
  )
}

function A2Marquee() {
  const { t } = useTranslation()
  const items = [t('a2_marquee_private' as any), t('a2_marquee_protected' as any), t('a2_marquee_audited' as any)]
  return (
    <div className="border-y border-stellar-cyan/20 bg-gradient-to-r from-space-mid via-space-soft to-space-mid overflow-hidden py-5 my-12 sm:my-16">
      <div className="a2-marquee-track inline-flex gap-14 items-center font-display italic font-medium text-3xl sm:text-4xl text-stellar-cyan whitespace-nowrap">
        {[0, 1].map((dup) => (
          <span key={dup} className="inline-flex items-center gap-14">
            {items.map((word, i) => (
              <span key={`${dup}-${i}`} className="inline-flex items-center gap-14">
                <span>{word}</span>
                <em className="not-italic font-bold text-2xl text-cosmic-violet">·</em>
              </span>
            ))}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes a2-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .a2-marquee-track { animation: a2-scroll 28s linear infinite; will-change: transform; }
      `}</style>
    </div>
  )
}

function A2About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16">
      <div>
        <Eyebrow>{t('a2_about_eyebrow' as any)}</Eyebrow>
        <SectionTitle accent={t('a2_about_title_accent' as any)}>{t('a2_about_title' as any)}</SectionTitle>
      </div>
      <div className="space-y-5 text-base sm:text-lg text-ink-200 leading-relaxed">
        <p>{t('a2_about_p1' as any)}</p>
        <p>{t('a2_about_p2' as any)}</p>
      </div>
    </section>
  )
}

function A2Stats() {
  const { t, locale } = useTranslation()
  const stats = [
    { n: '100', sup: '%', l: t('a2_stats_1_label' as any) },
    { n: '4', sup: '×', l: t('a2_stats_2_label' as any) },
    { n: '0', sup: '·', l: t('a2_stats_3_label' as any) },
    { n: '<2', sup: 'min', l: t('a2_stats_4_label' as any) },
  ]
  const labelCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.18em] uppercase'
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 max-w-[1440px] mx-auto px-5 sm:px-10 py-10 sm:py-14 border-y border-cosmic-violet/25">
      {stats.map((s) => (
        <div key={s.l}>
          <div className="font-display font-light text-5xl sm:text-6xl lg:text-7xl text-ink-50 leading-none">
            {s.n}
            <sup className="text-2xl sm:text-3xl text-stellar-cyan align-super ml-1">{s.sup}</sup>
          </div>
          <div className={`text-[10px] sm:text-[11px] ${labelCls} text-ink-300 mt-3`}>
            {s.l}
          </div>
        </div>
      ))}
    </section>
  )
}

function A2Services() {
  const { t, locale } = useTranslation()
  const tag = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.18em]'
  const tagU = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.14em] uppercase'
  return (
    <section id="services" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow color="amber">{t('a2_services_eyebrow' as any)}</Eyebrow>
      <SectionTitle accent={t('a2_services_title_accent' as any)}>{t('a2_services_title' as any)}</SectionTitle>
      <p className="font-display italic font-light text-lg sm:text-xl text-ink-200 max-w-[720px] leading-relaxed mb-10 sm:mb-12">
        {t('a2_services_subtitle' as any)}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Cybersecurity for Business — primary lane */}
        <div className="relative bg-space-soft border border-stellar-cyan/30 rounded p-6 sm:p-7 min-h-[320px] overflow-hidden">
          <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
          <div className={`text-[11px] ${tag} text-stellar-cyan mb-5`}>01</div>
          <h3 className="font-display font-normal text-2xl sm:text-[28px] leading-tight text-ink-50 mb-3">
            {t('a2_services_1_title_1' as any)} <em className="italic text-cosmic-violet font-normal">{t('a2_services_1_title_2' as any)}</em>
          </h3>
          <p className="text-sm text-ink-200 leading-relaxed mb-5">
            {t('a2_services_1_desc' as any)}
          </p>
          <a href="/cybersecurity/sme" className={`inline-block text-stellar-cyan text-[12px] mt-2 hover:text-stellar-cyan-soft ${tagU}`}>
            {t('a2_services_1_cta' as any)}
          </a>
        </div>

        {/* Personal Cybersecurity — primary lane */}
        <div className="relative bg-space-soft border border-stellar-cyan/30 rounded p-6 sm:p-7 min-h-[320px] overflow-hidden">
          <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
          <div className={`text-[11px] ${tag} text-stellar-cyan mb-5`}>02</div>
          <h3 className="font-display font-normal text-2xl sm:text-[28px] leading-tight text-ink-50 mb-3">
            {t('a2_services_2_title_1' as any)} <em className="italic text-cosmic-violet font-normal">{t('a2_services_2_title_2' as any)}</em>
          </h3>
          <p className="text-sm text-ink-200 leading-relaxed mb-5">
            {t('a2_services_2_desc' as any)}
          </p>
          <a href="/cybersecurity/personal" className={`inline-block text-stellar-cyan text-[12px] mt-2 hover:text-stellar-cyan-soft ${tagU}`}>
            {t('a2_services_2_cta' as any)}
          </a>
        </div>

        {/* AI Empowerment — combines Hermes + OpenClaw + Bespoke */}
        <div className="relative bg-space-soft border border-stellar-cyan/20 rounded p-6 sm:p-7 min-h-[320px] overflow-hidden">
          <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
          <div className={`text-[11px] ${tag} text-stellar-cyan mb-5`}>03</div>
          <h3 className="font-display font-normal text-2xl sm:text-[28px] leading-tight text-ink-50 mb-3">
            {t('a2_services_3_title_1' as any)} <em className="italic text-cosmic-violet font-normal">{t('a2_services_3_title_2' as any)}</em>
          </h3>
          <p className="text-sm text-ink-200 leading-relaxed mb-5">
            {t('a2_services_3_desc' as any)}
          </p>
          <ul className="list-none p-0 m-0 space-y-3 border-t border-dashed border-stellar-cyan/20 pt-4">
            <li>
              <div className={`text-[10px] ${tag} uppercase text-nova-amber`}>{t('a2_services_3_hermes_label' as any)}</div>
              <div className="text-sm text-ink-50 mt-1">{t('a2_services_3_hermes_desc' as any)}</div>
            </li>
            <li>
              <div className={`text-[10px] ${tag} uppercase text-nova-amber`}>{t('a2_services_3_bespoke_label' as any)}</div>
              <div className="text-sm text-ink-50 mt-1">{t('a2_services_3_bespoke_desc' as any)}</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function A2WhyUs() {
  const { t } = useTranslation()
  const items = [
    {
      pre: t('a2_whyUs_1_pre' as any),
      accent: t('a2_whyUs_1_accent' as any),
      post: t('a2_whyUs_1_post' as any),
      b: t('a2_whyUs_1_b' as any),
    },
    {
      pre: t('a2_whyUs_2_pre' as any),
      accent: t('a2_whyUs_2_accent' as any),
      post: t('a2_whyUs_2_post' as any),
      b: t('a2_whyUs_2_b' as any),
    },
    {
      pre: t('a2_whyUs_3_pre' as any),
      accent: t('a2_whyUs_3_accent' as any),
      post: t('a2_whyUs_3_post' as any),
      b: t('a2_whyUs_3_b' as any),
    },
    {
      pre: t('a2_whyUs_4_pre' as any),
      accent: t('a2_whyUs_4_accent' as any),
      post: t('a2_whyUs_4_post' as any),
      b: t('a2_whyUs_4_b' as any),
    },
  ]
  return (
    <section id="why-us" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
      <div>
        <Eyebrow color="violet">{t('a2_whyUs_eyebrow' as any)}</Eyebrow>
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-[56px] leading-[0.98] tracking-[-0.02em] mt-4">
          {t('a2_whyUs_title' as any)}
        </h2>
      </div>
      <ul className="list-none p-0 m-0 grid gap-6 sm:gap-7">
        {items.map((it, idx) => (
          <li key={idx} className="pb-6 sm:pb-7 border-b border-dashed border-cosmic-violet/30 last:border-b-0">
            <div className="font-display font-normal text-xl sm:text-2xl text-ink-50 mb-2">
              {it.pre}
              <em className="italic text-nova-amber">{it.accent}</em>
              {it.post}
            </div>
            <div className="text-sm sm:text-base text-ink-200 leading-relaxed">{it.b}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function A2HowItWorks() {
  const { t, locale } = useTranslation()
  const numCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.18em]'
  const steps = [
    { n: t('a2_how_step_1_n' as any), title: t('a2_how_step_1_title' as any), desc: t('a2_how_step_1_desc' as any) },
    { n: t('a2_how_step_2_n' as any), title: t('a2_how_step_2_title' as any), desc: t('a2_how_step_2_desc' as any) },
    { n: t('a2_how_step_3_n' as any), title: t('a2_how_step_3_title' as any), desc: t('a2_how_step_3_desc' as any) },
  ]
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>{t('a2_how_eyebrow' as any)}</Eyebrow>
      <SectionTitle accent={t('a2_how_title_accent' as any)}>{t('a2_how_title' as any)}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
        {steps.map((s) => (
          <div key={s.title} className="bg-space-mid border-l-[3px] border-stellar-cyan p-6 sm:p-7">
            <div className={`text-stellar-cyan text-[12px] ${numCls} mb-3`}>{s.n}</div>
            <h3 className="font-display font-normal text-xl sm:text-2xl mb-3 text-ink-50">{s.title}</h3>
            <p className="text-sm text-ink-200 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function A2CaseStudies() {
  const { t, locale } = useTranslation()
  const tag = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.18em] uppercase'
  const cases = [
    { tag: t('a2_case_1_tag' as any), title: t('a2_case_1_title' as any), body: t('a2_case_1_body' as any), metric: t('a2_case_1_metric' as any), metricLabel: t('a2_case_1_metric_label' as any) },
    { tag: t('a2_case_2_tag' as any), title: t('a2_case_2_title' as any), body: t('a2_case_2_body' as any), metric: t('a2_case_2_metric' as any), metricLabel: t('a2_case_2_metric_label' as any) },
    { tag: t('a2_case_3_tag' as any), title: t('a2_case_3_title' as any), body: t('a2_case_3_body' as any), metric: t('a2_case_3_metric' as any), metricLabel: t('a2_case_3_metric_label' as any) },
    { tag: t('a2_case_4_tag' as any), title: t('a2_case_4_title' as any), body: t('a2_case_4_body' as any), metric: t('a2_case_4_metric' as any), metricLabel: t('a2_case_4_metric_label' as any) },
    { tag: t('a2_case_5_tag' as any), title: t('a2_case_5_title' as any), body: t('a2_case_5_body' as any), metric: t('a2_case_5_metric' as any), metricLabel: t('a2_case_5_metric_label' as any) },
    { tag: t('a2_case_6_tag' as any), title: t('a2_case_6_title' as any), body: t('a2_case_6_body' as any), metric: t('a2_case_6_metric' as any), metricLabel: t('a2_case_6_metric_label' as any) },
  ]
  return (
    <section id="case-studies" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>{t('a2_cases_eyebrow' as any)}</Eyebrow>
      <SectionTitle accent={t('a2_cases_title_accent' as any)}>{t('a2_cases_title' as any)}</SectionTitle>
      <div className="grid gap-4 sm:gap-5">
        {cases.map((c) => (
          <div key={c.title} className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-6 lg:gap-8 p-6 sm:p-8 bg-space-soft border border-nova-amber/15 rounded items-center">
            <div>
              <div className={`text-[11px] ${tag} text-nova-amber`}>{c.tag}</div>
              <div className="font-display font-normal text-lg sm:text-xl text-ink-50 mt-2">{c.title}</div>
            </div>
            <p className="text-sm sm:text-base text-ink-200 leading-relaxed">{c.body}</p>
            <div className="font-display font-light text-4xl sm:text-5xl text-stellar-cyan leading-none">
              {c.metric}
              <span className={`block text-xs text-ink-300 mt-2 ${tag}`}>{c.metricLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function A2Insights() {
  const { t, locale } = useTranslation()
  const mono16 = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.16em]'
  const items = [
    { date: t('a2_insight_1_date' as any), cat: t('a2_insight_1_cat' as any), title: t('a2_insight_1_title' as any), desc: t('a2_insight_1_desc' as any) },
    { date: t('a2_insight_2_date' as any), cat: t('a2_insight_2_cat' as any), title: t('a2_insight_2_title' as any), desc: t('a2_insight_2_desc' as any) },
    { date: t('a2_insight_3_date' as any), cat: t('a2_insight_3_cat' as any), title: t('a2_insight_3_title' as any), desc: t('a2_insight_3_desc' as any) },
  ]
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>{t('a2_insights_eyebrow' as any)}</Eyebrow>
      <SectionTitle accent={t('a2_insights_title_accent' as any)}>{t('a2_insights_title' as any)}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {items.map((i) => (
          <a key={i.title} href="/blog" className="block bg-space-mid border border-stellar-cyan/20 p-6 hover:border-stellar-cyan/50 transition-colors">
            <div className={`text-[11px] ${mono16} text-ink-300`}>{i.date} — {i.cat}</div>
            <h4 className="font-display font-normal text-xl sm:text-[22px] leading-snug mt-3 mb-3 text-ink-50">{i.title}</h4>
            <p className="text-sm text-ink-200 leading-relaxed">{i.desc}</p>
            <div className={`text-stellar-cyan text-[13px] mt-4 ${locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono'}`}>{t('a2_insights_cta' as any)}</div>
          </a>
        ))}
      </div>
    </section>
  )
}

// Founder section removed per user edit (OOP-4066, 2026-08-24).
// Was A2Founder(); dropped to keep the home page focused on the cybersecurity + AI story.

function A2Testimonials() {
  const { t, locale } = useTranslation()
  const tag = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.14em]'
  const items = [
    { q: t('a2_test_1_q' as any), who: t('a2_test_1_who' as any) },
    { q: t('a2_test_2_q' as any), who: t('a2_test_2_who' as any) },
    { q: t('a2_test_3_q' as any), who: t('a2_test_3_who' as any) },
  ]
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>{t('a2_test_eyebrow' as any)}</Eyebrow>
      <SectionTitle accent={t('a2_test_title_accent' as any)}>{t('a2_test_title' as any)}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {items.map((tt, idx) => (
          <div key={idx} className="bg-space-soft border border-cosmic-violet/20 p-6 sm:p-7">
            <blockquote className="font-display italic font-light text-base sm:text-lg leading-relaxed text-ink-50 m-0 mb-5">
              <span className="text-cosmic-violet text-3xl align-[-6px] mr-1">“</span>
              {tt.q}
            </blockquote>
            <div className={`text-[11px] sm:text-[12px] ${tag} text-stellar-cyan`}>{tt.who}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function A2Contact() {
  const { t, locale } = useTranslation()
  const labelCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.18em] uppercase'
  const btnCls = locale === 'zh-Hant' ? 'tracking-normal normal-case' : 'tracking-[0.12em] uppercase'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: msg,
          _source: 'home-a2',
          _honey: '',
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }))
        throw new Error(data?.error || `Server returned ${res.status}`)
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div>
        <Eyebrow>{t('a2_contact_eyebrow' as any)}</Eyebrow>
        <h2 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.025em] mb-6">
          {t('a2_contact_title_1' as any)} <em className="italic text-nova-amber font-normal">{t('a2_contact_title_2' as any)}</em>.
        </h2>
        <p className="text-base sm:text-lg text-ink-200 leading-relaxed mb-5">
          {t('a2_contact_p1' as any)}
        </p>
        <p className="text-base sm:text-lg text-ink-200 leading-relaxed">
          {t('a2_contact_p2_pre' as any)}
          <a href="mailto:hello@celestial-tech.com" className="text-stellar-cyan underline-offset-4 hover:underline">
            hello@celestial-tech.com
          </a>
          {t('a2_contact_p2_post' as any)}
          <a href="#" className="text-stellar-cyan underline-offset-4 hover:underline">
            +852 5123 4567
          </a>
          {t('a2_contact_p2_dot' as any)}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="bg-space-soft border border-stellar-cyan/20 rounded p-6 sm:p-8">
        {submitted ? (
          <div className="font-display italic text-2xl text-stellar-cyan py-10 text-center">
            {t('a2_contact_success' as any)}
          </div>
        ) : (
          <>
            <label className={`block text-[11px] ${labelCls} text-ink-300 mb-2 mt-0`}>{t('a2_contact_label_name' as any)}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Wing Chan"
              className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none"
            />
            <label className={`block text-[11px] ${labelCls} text-ink-300 mb-2 mt-5`}>{t('a2_contact_label_email' as any)}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="wing@mamakees.hk"
              className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none"
            />
            <label className={`block text-[11px] ${labelCls} text-ink-300 mb-2 mt-5`}>{t('a2_contact_label_msg' as any)}</label>
            <textarea
              required
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="I run a 24-seat noodle shop in Whampoa. I lose 2 hours a day to phone orders…"
              rows={5}
              className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none resize-y"
            />
            <button
              type="submit"
              disabled={submitting}
              className={`mt-6 px-7 py-3 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] ${btnCls} hover:bg-stellar-cyan-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {submitting ? t('a2_contact_cta_sending' as any) : t('a2_contact_cta_send' as any)}
            </button>
            {error && (
              <div className="mt-4 text-sm text-nova-amber font-mono">Error: {error}</div>
            )}
          </>
        )}
      </form>
    </section>
  )
}

function A2Footer() {
  const { t, locale } = useTranslation()
  const colCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.2em] uppercase'
  const barCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.14em]'
  return (
    <footer className="border-t border-stellar-cyan/20 px-5 sm:px-10 py-12 sm:py-16 bg-space-mid mt-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-black text-2xl sm:text-3xl text-ink-50 mb-2">{t('a2_footer_brand' as any)}</div>
          <div className="font-display italic text-ink-300 text-base">{t('a2_footer_tagline' as any)}</div>
        </div>
        <div>
          <h5 className={`text-[11px] ${colCls} text-stellar-cyan m-0 mb-4`}>{t('a2_footer_col_services' as any)}</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="/hermes-agent-hosting" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_hermes' as any)}</a></li>
            <li className="mb-2"><a href="/cybersecurity/sme" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_sme' as any)}</a></li>
            <li className="mb-2"><a href="/cybersecurity/personal" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_personal' as any)}</a></li>
          </ul>
        </div>
        <div>
          <h5 className={`text-[11px] ${colCls} text-stellar-cyan m-0 mb-4`}>{t('a2_footer_col_company' as any)}</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="#about" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_about' as any)}</a></li>
            <li className="mb-2"><a href="#case-studies" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_cases' as any)}</a></li>
            <li className="mb-2"><a href="#contact" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_contact' as any)}</a></li>
          </ul>
        </div>
        <div>
          <h5 className={`text-[11px] ${colCls} text-stellar-cyan m-0 mb-4`}>{t('a2_footer_col_journal' as any)}</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_all' as any)}</a></li>
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_field' as any)}</a></li>
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_eng' as any)}</a></li>
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_policy' as any)}</a></li>
          </ul>
        </div>
        <div>
          <h5 className={`text-[11px] ${colCls} text-stellar-cyan m-0 mb-4`}>{t('a2_footer_col_legal' as any)}</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="/privacy-policy" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_privacy' as any)}</a></li>
            <li className="mb-2"><a href="/terms-of-service" className="text-ink-200 text-sm hover:text-stellar-cyan">{t('a2_footer_link_terms' as any)}</a></li>
          </ul>
        </div>
      </div>
      <div className={`max-w-[1440px] mx-auto mt-10 pt-7 border-t border-stellar-cyan/10 flex flex-col sm:flex-row justify-between gap-3 text-[10px] sm:text-[11px] text-ink-300 ${barCls}`}>
        <div>{t('a2_footer_copyright' as any)}</div>
        <div>{t('a2_footer_version' as any)}</div>
      </div>
    </footer>
  )
}

export default function HomeA2() {
  return (
    <main className="bg-deep-space text-ink-50 font-sans overflow-x-hidden">
      <A2Nav />
      <A2Hero />
      <A2Marquee />
      <A2About />
      <A2Stats />
      <A2Services />
      <A2WhyUs />
      <A2HowItWorks />
      <A2CaseStudies />
      <A2Insights />
      <A2Testimonials />
      <A2Contact />
      <A2Footer />
    </main>
  )
}