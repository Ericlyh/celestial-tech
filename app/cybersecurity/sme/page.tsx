'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Shield, Eye, Target, GraduationCap, FileCheck, AlertOctagon } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useTranslation } from '@/i18n'

const services = [
  {
    icon: Shield,
    code: '01',
    title: 'Cybersecurity Audit & Posture Review',
    headline: 'Threat-model before you spend another dollar on tools.',
    body: 'A two-week engagement that maps your assets, your adversaries, and your actual exposure — not a 200-page compliance PDF. You walk away with a one-page brief your board can read, a ranked list of the five fixes that move the needle, and a remediation plan your IT vendor can quote against.',
    deliverables: ['Adversary profile + asset map', 'Ranked remediation backlog', 'Executive brief for the board'],
  },
  {
    icon: Eye,
    code: '02',
    title: '24/7 SOC Monitoring (HK-based)',
    headline: 'Someone watching your logs who can read Cantonese in a phishing email.',
    body: 'A managed Security Operations Centre sitting on your endpoints, email, identity, and cloud — staffed by operators in Hong Kong who know the local threat landscape. Mean-time-to-alert under 2 minutes, mean-time-to-isolate under 30. Quarterly review of guardrails, monthly tuning of detections.',
    deliverables: ['24/7 alert triage', 'Monthly tuning session', 'Quarterly executive review'],
  },
  {
    icon: Target,
    code: '03',
    title: 'Penetration Testing (4×/year)',
    headline: 'Find the holes before an attacker does — quarterly, not annually.',
    body: 'External, internal, and web-app penetration tests run by CREST-certified operators, four times a year. Every test ships with an exploit chain (not just a CVE list), a fix that your dev team can merge, and a re-test to confirm closure. Coverage: network, web, API, mobile, cloud.',
    deliverables: ['Crest-aligned test report', 'Exploit chain + remediation PR', 'Free re-test after fix'],
  },
  {
    icon: AlertOctagon,
    code: '04',
    title: 'Incident Response & Forensics',
    headline: 'When the breach happens at 2am, you call us — not your insurance broker.',
    body: 'A retainer that puts a senior incident commander on a phone call within 15 minutes, on call 24/7. We contain, preserve evidence, restore from clean backups, and write the post-mortem your auditor, your regulator, and your customers can read. Includes HK PDPO breach-notification drafting.',
    deliverables: ['15-minute response SLA', 'Forensic evidence preservation', 'PDPO breach notice drafting'],
  },
  {
    icon: FileCheck,
    code: '05',
    title: 'HK PDPO & HKMA Compliance',
    headline: 'Get compliant without hiring a Big-4 firm.',
    body: 'Privacy Ordinance (PDPO) gap analysis, HKMA sandbox cybersecurity reviews, and SFC Type 4/9 controls. We have sat in the room for each of these and know what regulators actually ask. You get a runbook, a control matrix, and an evidence pack — not a 90-page report nobody opens.',
    deliverables: ['Control matrix mapping', 'Evidence pack for auditors', 'Runbook for ongoing ops'],
  },
  {
    icon: GraduationCap,
    code: '06',
    title: 'Staff Training & Phishing Drills',
    headline: 'Your people, hardened — the attacker\'s favourite target neutralised.',
    body: 'Quarterly phishing simulations tuned to your industry (BEC for finance, invoice fraud for retail, callback scams for healthcare). Targeted training for the clickers, board-level briefing for the C-suite. Pre- and post-drill click-rate reports your insurer will accept for premium reduction.',
    deliverables: ['Quarterly phishing drill', 'Targeted 1:1 training', 'Insurance-grade click-rate report'],
  },
]

const whyUs = [
  { h: 'Threat-modelled first, shipped second.', b: 'Every engagement starts with an adversary profile, not a sales deck. We name the attacker, the asset, the path. Then we ship.' },
  { h: 'Auditable to your auditor, not to us.', b: 'Logs you can hand to your compliance team without a redaction pass. Reports you can show your regulator without a translator.' },
  { h: 'Hong Kong, behind your firewall.', b: 'Data residency is the architecture, not a setting. No exit to a foreign cloud, no third-party processor you didn\'t choose.' },
  { h: 'Outcome-metered, never seat-metered.', b: 'You pay for hours saved and breaches prevented, not seats filled. If the agent doesn\'t deliver, the meter doesn\'t run.' },
]

export default function CybersecuritySMEPage() {
  const { locale } = useTranslation()
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
          _source: 'cybersecurity-sme',
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
          <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-stellar-cyan mb-6">
            // Cybersecurity for SMEs — Threat Atlas, Vol. 04 — 2026
          </div>
          <h1 className="font-display font-light italic text-[56px] sm:text-[80px] lg:text-[110px] xl:text-[140px] leading-[0.92] tracking-[-0.035em] mb-8 bg-gradient-to-br from-white via-white to-ink-200 bg-clip-text text-transparent">
            Cybersecurity<br />
            for <span className="not-italic text-stellar-cyan">SMEs.</span>
          </h1>
          <p className="font-display font-light italic text-lg sm:text-xl lg:text-2xl text-ink-200 leading-relaxed max-w-[540px] mb-9">
            Six services, one stack, behind your firewall. From the first audit to the 2 a.m. incident call — Hong Kong operators, HK data residency, runbooks your auditor can read.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-7 py-4 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-stellar-cyan-soft transition-colors"
            >
              Book a discovery call →
            </a>
            <a
              href="#services"
              className="px-7 py-4 border border-ink-200 text-ink-50 rounded-full text-[13px] uppercase tracking-[0.1em] hover:border-stellar-cyan hover:text-stellar-cyan transition-colors"
            >
              See the service menu
            </a>
          </div>
        </div>
        <div
          className="relative aspect-square max-w-[420px] mx-auto w-full"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(94,234,212,0.30), transparent 60%), radial-gradient(circle at 65% 60%, rgba(167,139,250,0.28), transparent 65%)',
            borderRadius: '48% 52% 47% 53% / 50% 45% 55% 50%',
          }}
        >
          <div
            className="absolute inset-[10%]"
            style={{
              backgroundImage:
                'radial-gradient(2px 2px at 20% 30%, #F4F6FB 50%, transparent 51%), radial-gradient(1.5px 1.5px at 60% 70%, #5EEAD4 50%, transparent 51%), radial-gradient(1.5px 1.5px at 80% 25%, #A78BFA 50%, transparent 51%), radial-gradient(1px 1px at 40% 80%, #F4B860 50%, transparent 51%)',
              opacity: 0.85,
            }}
          />
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-stellar-cyan/20 bg-gradient-to-r from-space-mid via-space-soft to-space-mid overflow-hidden py-5 my-12 sm:my-16">
        <div className="inline-flex gap-14 items-center font-display italic font-medium text-3xl sm:text-4xl text-stellar-cyan whitespace-nowrap px-5">
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex items-center gap-14">
              {['private', 'protected', 'audited', 'incident-ready'].map((word, i) => (
                <span key={`${dup}-${i}`} className="inline-flex items-center gap-14">
                  <span>{word}</span>
                  <em className="not-italic font-bold text-2xl text-cosmic-violet">·</em>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Services — six lanes */}
      <section id="services" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
        <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-nova-amber mb-4">
          // 01 — Services
        </div>
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.98] tracking-[-0.025em] mb-8">
          Six services, <em className="italic text-cosmic-violet font-normal">one stack.</em>
        </h2>
        <p className="font-display italic font-light text-lg sm:text-xl text-ink-200 max-w-[720px] leading-relaxed mb-10 sm:mb-12">
          Audit, monitor, test, respond, comply, train. Each lane can be deployed standalone or as part of a managed cybersecurity programme. All behind your firewall, audited by default.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative bg-space-soft border border-stellar-cyan/20 rounded p-6 sm:p-7 hover:border-stellar-cyan/50 transition-colors"
            >
              <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 rounded-xl bg-stellar-cyan/10 text-stellar-cyan">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="font-mono text-[11px] tracking-[0.18em] text-stellar-cyan pt-3">{s.code}</div>
              </div>
              <h3 className="font-display font-normal text-xl sm:text-2xl leading-tight text-ink-50 mb-3">
                {s.title}
              </h3>
              <p className="font-display italic font-light text-base text-stellar-cyan/80 mb-4">
                {s.headline}
              </p>
              <p className="text-sm text-ink-200 leading-relaxed mb-5">
                {s.body}
              </p>
              <ul className="list-none p-0 m-0 space-y-1.5 border-t border-dashed border-stellar-cyan/20 pt-4">
                {s.deliverables.map((d) => (
                  <li key={d} className="text-xs text-ink-300 font-mono flex items-start gap-2">
                    <span className="text-stellar-cyan">▸</span>
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
          <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-cosmic-violet mb-4">
            // 02 — Why us
          </div>
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-[56px] leading-[0.98] tracking-[-0.02em] mt-4">
            Why us, not a global cloud?
          </h2>
        </div>
        <ul className="list-none p-0 m-0 grid gap-6 sm:gap-7">
          {whyUs.map((it) => (
            <li key={it.h} className="pb-6 sm:pb-7 border-b border-dashed border-cosmic-violet/30 last:border-b-0">
              <div className="font-display font-normal text-xl sm:text-2xl text-ink-50 mb-2">
                {it.h}
              </div>
              <div className="text-sm sm:text-base text-ink-200 leading-relaxed">{it.b}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing model */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-12 sm:py-16">
        <div className="bg-space-mid border border-stellar-cyan/20 rounded p-6 sm:p-10">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-stellar-cyan mb-3">
            // 03 — Pricing
          </div>
          <h3 className="font-display font-normal text-2xl sm:text-3xl text-ink-50 mb-4">
            Outcome-metered, never seat-metered.
          </h3>
          <p className="text-sm sm:text-base text-ink-200 leading-relaxed max-w-[760px] mb-5">
            Standalone engagements priced per project. Managed programmes priced as a monthly retainer with quarterly true-up — you pay for what we delivered, not for seats we provisioned. SOC monitoring starts at HKD 18,000 / month for a 50-person firm; incident response retainer at HKD 9,600 / quarter.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 border border-stellar-cyan rounded-full text-stellar-cyan text-[12px] uppercase tracking-[0.1em] hover:bg-stellar-cyan/10 transition-colors"
          >
            Request a tailored quote →
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-stellar-cyan mb-4">
            // 04 — Talk to us
          </div>
          <h2 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.025em] mb-6">
            Let&apos;s <em className="italic text-nova-amber font-normal">talk</em>.
          </h2>
          <p className="text-base sm:text-lg text-ink-200 leading-relaxed mb-5">
            Tell us about your business and we&apos;ll send back a one-page cybersecurity brief within 48 hours. No forms on our side, no demo calls before we know what you need.
          </p>
          <p className="text-base sm:text-lg text-ink-200 leading-relaxed">
            Or write to us directly at{' '}
            <a href="mailto:hello@celestial-tech.com" className="text-stellar-cyan underline-offset-4 hover:underline">
              hello@celestial-tech.com
            </a>
            .
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-space-soft border border-stellar-cyan/20 rounded p-6 sm:p-8">
          {submitted ? (
            <div className="font-display italic text-2xl text-stellar-cyan py-10 text-center">
              Brief received. We&apos;ll be in touch within 48 hours.
            </div>
          ) : (
            <>
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2">Your name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Wing Chan"
                className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none"
              />
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2 mt-5">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Mama Kee's Kitchen"
                className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none"
              />
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2 mt-5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="wing@mamakees.hk"
                className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none"
              />
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2 mt-5">What does your day look like?</label>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="24-person logistics company in Kwun Tong. Looking to harden email + get a SOC…"
                rows={5}
                className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none resize-y"
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 px-7 py-3 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] uppercase tracking-[0.12em] hover:bg-stellar-cyan-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : 'Send brief →'}
              </button>
              {error && (
                <div className="mt-4 text-sm text-nova-amber font-mono">Error: {error}</div>
              )}
            </>
          )}
        </form>
      </section>

      <Footer />
    </main>
  )
}