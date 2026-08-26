'use client'

// AI Empowerment — what we do to enable SMEs and people to use AI (OOP-4066 round 13).
// Sits in the Services > AI submenu, before Hermes Agent. Pattern mirrors
// /cybersecurity/sme (hero, marquee, services, why-us, engagement, contact) so
// the four service pages share one visual language.

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Compass, Bot, Users, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useTranslation } from '@/i18n'

export default function AIEmpowermentPage() {
  const { t, locale } = useTranslation()
  const tagCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.2em] uppercase'
  const numCls = locale === 'zh-Hant' ? 'font-sans tracking-normal normal-case' : 'font-mono tracking-[0.18em]'
  const btnCls = locale === 'zh-Hant' ? 'tracking-normal normal-case' : 'uppercase tracking-[0.1em]'

  const services = [
    {
      icon: Compass,
      code: '01',
      title: t('ai_empower_svc_1_title' as any),
      headline: t('ai_empower_svc_1_headline' as any),
      body: t('ai_empower_svc_1_body' as any),
      deliverables: [t('ai_empower_svc_1_d1' as any), t('ai_empower_svc_1_d2' as any), t('ai_empower_svc_1_d3' as any)],
    },
    {
      icon: Bot,
      code: '02',
      title: t('ai_empower_svc_2_title' as any),
      headline: t('ai_empower_svc_2_headline' as any),
      body: t('ai_empower_svc_2_body' as any),
      deliverables: [t('ai_empower_svc_2_d1' as any), t('ai_empower_svc_2_d2' as any), t('ai_empower_svc_2_d3' as any)],
    },
    {
      icon: Users,
      code: '03',
      title: t('ai_empower_svc_3_title' as any),
      headline: t('ai_empower_svc_3_headline' as any),
      body: t('ai_empower_svc_3_body' as any),
      deliverables: [t('ai_empower_svc_3_d1' as any), t('ai_empower_svc_3_d2' as any), t('ai_empower_svc_3_d3' as any)],
    },
    {
      icon: RefreshCw,
      code: '04',
      title: t('ai_empower_svc_4_title' as any),
      headline: t('ai_empower_svc_4_headline' as any),
      body: t('ai_empower_svc_4_body' as any),
      deliverables: [t('ai_empower_svc_4_d1' as any), t('ai_empower_svc_4_d2' as any), t('ai_empower_svc_4_d3' as any)],
    },
    {
      icon: ShieldCheck,
      code: '05',
      title: t('ai_empower_svc_5_title' as any),
      headline: t('ai_empower_svc_5_headline' as any),
      body: t('ai_empower_svc_5_body' as any),
      deliverables: [t('ai_empower_svc_5_d1' as any), t('ai_empower_svc_5_d2' as any), t('ai_empower_svc_5_d3' as any)],
    },
    {
      icon: Sparkles,
      code: '06',
      title: t('ai_empower_svc_6_title' as any),
      headline: t('ai_empower_svc_6_headline' as any),
      body: t('ai_empower_svc_6_body' as any),
      deliverables: [t('ai_empower_svc_6_d1' as any), t('ai_empower_svc_6_d2' as any), t('ai_empower_svc_6_d3' as any)],
    },
  ]

  const whyUs = [
    { h: t('ai_empower_why_1_h' as any), b: t('ai_empower_why_1_b' as any) },
    { h: t('ai_empower_why_2_h' as any), b: t('ai_empower_why_2_b' as any) },
    { h: t('ai_empower_why_3_h' as any), b: t('ai_empower_why_3_b' as any) },
    { h: t('ai_empower_why_4_h' as any), b: t('ai_empower_why_4_b' as any) },
  ]

  const marqueeWords = t('ai_empower_marquee_words' as any).split('·').map((w: string) => w.trim()).filter(Boolean)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
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
          message: `${company ? `Company: ${company}\n\n` : ''}${msg}`,
          _source: 'ai-empowerment',
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
    <main className="bg-deep-space text-ink-50 font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-10 pt-16 sm:pt-24 pb-12 grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <div className={`text-[11px] sm:text-[12px] ${tagCls} text-cosmic-violet mb-6`}>
            {t('ai_empower_eyebrow' as any)}
          </div>
          <h1 className="font-display font-light italic text-[56px] sm:text-[80px] lg:text-[110px] xl:text-[140px] leading-[0.92] tracking-[-0.035em] mb-8 bg-gradient-to-br from-white via-white to-ink-200 bg-clip-text text-transparent">
            {t('ai_empower_title_1' as any)}<br />
            <span className="not-italic text-cosmic-violet">{t('ai_empower_title_2' as any)}</span>
          </h1>
          <p className="font-display font-light italic text-lg sm:text-xl lg:text-2xl text-ink-200 leading-relaxed max-w-[540px] mb-9">
            {t('ai_empower_sub' as any)}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className={`px-7 py-4 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] ${btnCls} hover:bg-stellar-cyan-soft transition-colors`}
            >
              {t('ai_empower_cta_primary' as any)}
            </a>
            <a
              href="#services"
              className={`px-7 py-4 border border-ink-200 text-ink-50 rounded-full text-[13px] ${btnCls} hover:border-stellar-cyan hover:text-stellar-cyan transition-colors`}
            >
              {t('ai_empower_cta_secondary' as any)}
            </a>
          </div>
        </div>
        <div
          className="relative aspect-square max-w-[420px] mx-auto w-full"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(167,139,250,0.32), transparent 60%), radial-gradient(circle at 65% 60%, rgba(94,234,212,0.30), transparent 65%), radial-gradient(circle at 50% 80%, rgba(244,184,96,0.18), transparent 70%)',
            borderRadius: '48% 52% 47% 53% / 50% 45% 55% 50%',
          }}
        >
          <div
            className="absolute inset-[10%]"
            style={{
              backgroundImage:
                'radial-gradient(2px 2px at 20% 30%, #F4F6FB 50%, transparent 51%), radial-gradient(1.5px 1.5px at 60% 70%, #A78BFA 50%, transparent 51%), radial-gradient(1.5px 1.5px at 80% 25%, #5EEAD4 50%, transparent 51%), radial-gradient(1px 1px at 40% 80%, #F4B860 50%, transparent 51%)',
              opacity: 0.85,
            }}
          />
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-cosmic-violet/20 bg-gradient-to-r from-space-mid via-space-soft to-space-mid overflow-hidden py-5 my-12 sm:my-16">
        <div className={`inline-flex gap-14 items-center text-cosmic-violet whitespace-nowrap px-5 ${locale === 'zh-Hant' ? 'font-display font-medium text-2xl sm:text-3xl not-italic' : 'font-display italic font-medium text-3xl sm:text-4xl'}`}>
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex items-center gap-14">
              {marqueeWords.map((word: string, i: number) => (
                <span key={`${dup}-${i}`} className="inline-flex items-center gap-14">
                  <span>{word}</span>
                  <em className="not-italic font-bold text-2xl text-stellar-cyan">·</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Services — six lanes */}
      <section id="services" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
        <div className={`text-[11px] sm:text-[12px] ${tagCls} text-nova-amber mb-4`}>
          {t('ai_empower_services_eyebrow' as any)}
        </div>
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.98] tracking-[-0.025em] mb-8">
          {t('ai_empower_services_title_pre' as any)}<em className="italic text-cosmic-violet font-normal">{t('ai_empower_services_title_accent' as any)}</em>
        </h2>
        <p className="font-display italic font-light text-lg sm:text-xl text-ink-200 max-w-[720px] leading-relaxed mb-10 sm:mb-12">
          {t('ai_empower_services_sub' as any)}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative bg-space-soft border border-cosmic-violet/20 rounded p-6 sm:p-7 hover:border-cosmic-violet/50 transition-colors"
            >
              <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 rounded-xl bg-cosmic-violet/10 text-cosmic-violet">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className={`text-[11px] ${numCls} text-cosmic-violet pt-3`}>{s.code}</div>
              </div>
              <h3 className="font-display font-normal text-xl sm:text-2xl leading-tight text-ink-50 mb-3">
                {s.title}
              </h3>
              <p className="font-display italic font-light text-base text-cosmic-violet/80 mb-4">
                {s.headline}
              </p>
              <p className="text-sm text-ink-200 leading-relaxed mb-5">
                {s.body}
              </p>
              <ul className="list-none p-0 m-0 space-y-1.5 border-t border-dashed border-cosmic-violet/20 pt-4">
                {s.deliverables.map((d) => (
                  <li key={d} className="text-xs text-ink-300 font-mono flex items-start gap-2">
                    <span className="text-cosmic-violet">▸</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
        <div>
          <div className={`text-[11px] sm:text-[12px] ${tagCls} text-stellar-cyan mb-4`}>
            {t('ai_empower_why_eyebrow' as any)}
          </div>
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-[56px] leading-[0.98] tracking-[-0.02em] mt-4">
            {t('ai_empower_why_title' as any)}
          </h2>
        </div>
        <ul className="list-none p-0 m-0 grid gap-6 sm:gap-7">
          {whyUs.map((it) => (
            <li key={it.h} className="pb-6 sm:pb-7 border-b border-dashed border-stellar-cyan/30 last:border-b-0">
              <div className="font-display font-normal text-xl sm:text-2xl text-ink-50 mb-2">
                {it.h}
              </div>
              <div className="text-sm sm:text-base text-ink-200 leading-relaxed">{it.b}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Engagement model */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-12 sm:py-16">
        <div className="bg-space-mid border border-cosmic-violet/20 rounded p-6 sm:p-10">
          <div className={`text-[11px] ${numCls} text-cosmic-violet mb-3`}>
            {t('ai_empower_engagement_eyebrow' as any)}
          </div>
          <h3 className="font-display font-normal text-2xl sm:text-3xl text-ink-50 mb-4">
            {t('ai_empower_engagement_title' as any)}
          </h3>
          <p className="text-sm sm:text-base text-ink-200 leading-relaxed max-w-[760px] mb-5">
            {t('ai_empower_engagement_body' as any)}
          </p>
          <a
            href="#contact"
            className={`inline-block px-6 py-3 border border-stellar-cyan rounded-full text-stellar-cyan text-[12px] ${btnCls} hover:bg-stellar-cyan/10 transition-colors`}
          >
            {t('ai_empower_engagement_cta' as any)}
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <div className={`text-[11px] sm:text-[12px] ${tagCls} text-cosmic-violet mb-4`}>
            {t('ai_empower_contact_eyebrow' as any)}
          </div>
          <h2 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.025em] mb-6">
            {t('ai_empower_contact_title_pre' as any)}<em className="italic text-nova-amber font-normal">{t('ai_empower_contact_title_accent' as any)}</em>.
          </h2>
          <p className="text-base sm:text-lg text-ink-200 leading-relaxed mb-5">
            {t('ai_empower_contact_p1' as any)}
          </p>
          <p className="text-base sm:text-lg text-ink-200 leading-relaxed">
            {t('ai_empower_contact_p2_pre' as any)}
            <a href="mailto:hello@celestial-tech.com" className="text-stellar-cyan underline-offset-4 hover:underline">
              hello@celestial-tech.com
            </a>
            .
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-space-soft border border-cosmic-violet/20 rounded p-6 sm:p-8">
          {submitted ? (
            <div className="font-display italic text-2xl text-cosmic-violet py-10 text-center">
              {t('ai_empower_form_success' as any)}
            </div>
          ) : (
            <>
              <label className={`block text-[11px] ${tagCls} text-ink-300 mb-2`}>{t('ai_empower_form_label_name' as any)}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('ai_empower_form_placeholder_name' as any)}
                className="w-full bg-deep-space text-ink-50 border border-cosmic-violet/20 p-3 font-sans text-base rounded focus:border-cosmic-violet outline-none"
              />
              <label className={`block text-[11px] ${tagCls} text-ink-300 mb-2 mt-5`}>{t('ai_empower_form_label_company' as any)}</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t('ai_empower_form_placeholder_company' as any)}
                className="w-full bg-deep-space text-ink-50 border border-cosmic-violet/20 p-3 font-sans text-base rounded focus:border-cosmic-violet outline-none"
              />
              <label className={`block text-[11px] ${tagCls} text-ink-300 mb-2 mt-5`}>{t('ai_empower_form_label_email' as any)}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('ai_empower_form_placeholder_email' as any)}
                className="w-full bg-deep-space text-ink-50 border border-cosmic-violet/20 p-3 font-sans text-base rounded focus:border-cosmic-violet outline-none"
              />
              <label className={`block text-[11px] ${tagCls} text-ink-300 mb-2 mt-5`}>{t('ai_empower_form_label_msg' as any)}</label>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={t('ai_empower_form_placeholder_msg' as any)}
                rows={5}
                className="w-full bg-deep-space text-ink-50 border border-cosmic-violet/20 p-3 font-sans text-base rounded focus:border-cosmic-violet outline-none resize-y"
              />
              <button
                type="submit"
                disabled={submitting}
                className={`mt-6 px-7 py-3 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] ${btnCls} hover:bg-stellar-cyan-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {submitting ? t('ai_empower_form_sending' as any) : t('ai_empower_form_cta' as any)}
              </button>
              {error && (
                <div className="mt-4 text-sm text-nova-amber font-mono">{t('ai_empower_form_error_prefix' as any)}{error}</div>
              )}
            </>
          )}
        </form>
      </section>

      <Footer />
    </main>
  )
}
