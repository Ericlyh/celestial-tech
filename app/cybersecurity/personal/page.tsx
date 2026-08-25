'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Shield, Smartphone, KeyRound, ScanSearch, Users, Lock } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useTranslation } from '@/i18n'

const services = [
  {
    icon: Smartphone,
    code: '01',
    title: 'Device & Network Hardening',
    headline: 'A laptop, a phone, a router — actually configured by someone who knows.',
    body: 'On-site or remote session, two hours, your devices left in a state a professional attacker would find tedious. Disk encryption, screen-lock policy, browser hardening, DNS-level ad/tracker blocking, router firmware, Wi-Fi segmentation for guests. Includes a one-page brief you can re-apply when you buy a new device.',
    deliverables: ['Disk encryption on every device', 'Browser + DNS hardening', 'One-page re-apply checklist'],
  },
  {
    icon: KeyRound,
    code: '02',
    title: 'Identity & Account Protection',
    headline: 'Password manager, MFA everywhere, dark-web monitoring.',
    body: 'Migration to a managed password manager (1Password, Bitwarden — your choice), hardware MFA keys for the critical services (email, banking, social), and dark-web monitoring with monthly digest. We delete the accounts you forgot you had. We freeze what should be frozen.',
    deliverables: ['Managed password manager', 'Hardware MFA keys', 'Monthly dark-web digest'],
  },
  {
    icon: ScanSearch,
    code: '03',
    title: 'Scam Watch & Fraud Detection',
    headline: 'A WhatsApp message from "HSBC" lands. We tell you if it\'s real.',
    body: 'A standing arrangement with a human security operator on WhatsApp / Signal / email. Forward the suspicious message, get a verdict within 30 minutes during business hours, 4 hours overnight. Includes phone-number and email-address takedowns when you\'re being impersonated.',
    deliverables: ['30-min response during business hours', 'Impersonation takedown', 'Phishing verdict with evidence'],
  },
  {
    icon: Lock,
    code: '04',
    title: 'Account Recovery & Lockout Support',
    headline: 'Locked out of your email at midnight. We pick up.',
    body: 'A 24/7 line for the moment someone can\'t get back into their email, banking, or social. Senior operator on a call within 15 minutes; we work with the provider to restore access, secure the account, and audit what changed. Pre-emptively: we set up recovery keys while you can still log in.',
    deliverables: ['24/7 lockout response', 'Provider liaison', 'Pre-emptive recovery keys'],
  },
  {
    icon: Users,
    code: '05',
    title: 'Family & Household Coverage',
    headline: 'Up to 5 devices, 5 humans, one plan.',
    body: 'A household plan that covers the people and devices you actually live with — spouse, kids, parents, the family PC. Includes a quarterly check-in where we sit with the less-technical member of the household and walk through what changed. Designed for the "my mum clicked a link" case.',
    deliverables: ['Up to 5 devices + humans', 'Quarterly check-in', 'Family-friendly phishing training'],
  },
  {
    icon: Shield,
    code: '06',
    title: 'Privacy Audit & Footprint Reduction',
    headline: 'Find out what the internet already knows about you. Then make it stop.',
    body: 'A two-week audit: data-broker listings, social-media exposure, old accounts still leaking, leaked credentials from prior breaches. We submit opt-outs, scrub profiles, and set up ongoing monitoring. Output: a one-page "what the internet knows about you" report, redacted to your taste.',
    deliverables: ['Data-broker opt-out submission', 'Social profile scrub', 'Ongoing monitoring'],
  },
]

const whatMakes = [
  { h: 'No data leaves Hong Kong.', b: 'Your device backups, your password vault, your monitoring data — all stored on HK infrastructure. No exit to a foreign cloud you didn\'t choose.' },
  { h: 'A human picks up the phone.', b: 'No tier-1 chatbots, no tier-2 escalation, no "your call is important to us". A senior operator answers within 30 minutes.' },
  { h: 'Plain-English explanations.', b: 'We tell you what the threat is, what we did, what you should do — in language your family can act on. No jargon, no upsell.' },
  { h: 'Outcome-metered, never seat-metered.', b: 'You pay for the device we hardened, not the seats in a SaaS console. If the scam-watch catches nothing this month, the meter doesn\'t run for that.' },
]

export default function CybersecurityPersonalPage() {
  const { locale } = useTranslation()
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
          _source: 'cybersecurity-personal',
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
            // Personal Cybersecurity — Threat Atlas, Vol. 04 — 2026
          </div>
          <h1 className="font-display font-light italic text-[56px] sm:text-[80px] lg:text-[110px] xl:text-[140px] leading-[0.92] tracking-[-0.035em] mb-8 bg-gradient-to-br from-white via-white to-ink-200 bg-clip-text text-transparent">
            Cybersecurity<br />
            <span className="not-italic text-stellar-cyan">for you.</span>
          </h1>
          <p className="font-display font-light italic text-lg sm:text-xl lg:text-2xl text-ink-200 leading-relaxed max-w-[540px] mb-9">
            Six services, one human on the other end of WhatsApp. Hardening, identity protection, scam watch, lockout support — for the people and devices you actually live with.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="px-7 py-4 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-stellar-cyan-soft transition-colors"
            >
              Book a hardening session →
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
              'radial-gradient(circle at 35% 45%, rgba(94,234,212,0.30), transparent 60%), radial-gradient(circle at 60% 60%, rgba(244,184,96,0.22), transparent 65%)',
            borderRadius: '48% 52% 47% 53% / 50% 45% 55% 50%',
          }}
        >
          <div
            className="absolute inset-[10%]"
            style={{
              backgroundImage:
                'radial-gradient(2px 2px at 20% 30%, #F4F6FB 50%, transparent 51%), radial-gradient(1.5px 1.5px at 60% 70%, #5EEAD4 50%, transparent 51%), radial-gradient(1.5px 1.5px at 80% 25%, #F4B860 50%, transparent 51%), radial-gradient(1px 1px at 40% 80%, #A78BFA 50%, transparent 51%)',
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
              {['private', 'protected', 'audited', 'humans on call'].map((word, i) => (
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
          Six services, <em className="italic text-cosmic-violet font-normal">one number.</em>
        </h2>
        <p className="font-display italic font-light text-lg sm:text-xl text-ink-200 max-w-[720px] leading-relaxed mb-10 sm:mb-12">
          Hardening, identity, scam-watch, lockout, family, privacy. Buy one, buy the bundle — every service can be activated standalone. All delivered in plain English, in your timezone.
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
            What makes this different.
          </h2>
        </div>
        <ul className="list-none p-0 m-0 grid gap-6 sm:gap-7">
          {whatMakes.map((it) => (
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
            From a one-off hardening session to a household retainer.
          </h3>
          <p className="text-sm sm:text-base text-ink-200 leading-relaxed max-w-[760px] mb-5">
            One-off device hardening starts at HKD 2,400 for a single user, single device. Household plan — up to 5 devices and 5 humans, with the scam-watch line — HKD 1,800 / month, billed quarterly. Outcome-metered: you don&apos;t pay for &quot;alerts generated&quot; you didn&apos;t read.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 border border-stellar-cyan rounded-full text-stellar-cyan text-[12px] uppercase tracking-[0.1em] hover:bg-stellar-cyan/10 transition-colors"
          >
            Request a tailored plan →
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
            Tell us about your setup and we&apos;ll send back a one-page brief within 48 hours. No forms on our side, no demo calls before we know what you need.
          </p>
          <p className="text-base sm:text-lg text-ink-200 leading-relaxed">
            Or message us directly on WhatsApp{' '}
            <a href="#" className="text-stellar-cyan underline-offset-4 hover:underline">
              +852 5123 4567
            </a>{' '}
            or email{' '}
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
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2 mt-5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="wing@example.com"
                className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none"
              />
              <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2 mt-5">What does your setup look like?</label>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="MacBook + iPhone, plus my parents' Windows laptops. Mum got a phishing text last week…"
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