'use client'

// HomeA2 — Direction A2 ("Threat Atlas" — was "Stellar Cartography" pre-OOP-4066 round 6) for the home page only.
// Self-contained: does NOT touch Navbar/Footer/Contact used by other pages.
// Other 6 pages keep their existing treatment; user can roll A2 across after
// accepting the home.

import { FormEvent, useState } from 'react'
import { useTranslation } from '@/i18n'

function Eyebrow({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'amber' | 'violet' }) {
  const cls =
    color === 'cyan'
      ? 'text-stellar-cyan'
      : color === 'amber'
      ? 'text-nova-amber'
      : 'text-cosmic-violet'
  return (
    <div className={`font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase ${cls} mb-4 sm:mb-5`}>
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
  const { locale, toggleLocale } = useTranslation()
  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Hosting', href: '/hermes-agent-hosting' },
    { label: 'Why us', href: '#why-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '#contact' },
  ]
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-10 py-5 bg-deep-space/80 backdrop-blur-xl border-b border-stellar-cyan/10">
      <a href="#home" className="font-display font-black text-lg sm:text-xl tracking-tight flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-stellar-cyan shadow-[0_0_18px_rgba(94,234,212,0.7)]" />
        Celestial Tech
      </a>
      <ul className="hidden md:flex gap-7 list-none">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-ink-50 font-medium text-[13px] uppercase tracking-[0.08em] hover:text-stellar-cyan transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLocale}
          aria-label="Toggle language"
          className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.1em] rounded border border-white/[0.1] text-ink-300 hover:text-stellar-cyan hover:border-stellar-cyan/40 transition-colors"
        >
          {locale === 'en' ? '繁中' : 'EN'}
        </button>
        <a
          href="#contact"
          className="hidden md:inline-block px-4 py-2 border border-stellar-cyan rounded-full text-stellar-cyan text-[12px] uppercase tracking-[0.1em] hover:bg-stellar-cyan/10 transition-colors"
        >
          Get started →
        </a>
      </div>
    </nav>
  )
}

function A2Hero() {
  return (
    <header id="home" className="px-5 sm:px-10 lg:px-10 pt-16 sm:pt-24 pb-12 max-w-[1440px] mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
      <div>
        <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.18em] uppercase text-stellar-cyan mb-6">
          // Threat Atlas, Vol. 04 — 2026
        </div>
        <h1 className="font-display font-light italic text-[64px] sm:text-[88px] lg:text-[120px] xl:text-[160px] leading-[0.92] tracking-[-0.035em] mb-8 bg-gradient-to-br from-white via-white to-ink-200 bg-clip-text text-transparent">
          Threat<br />
          Atlas<sup className="font-display not-italic font-light text-[0.35em] text-cosmic-violet align-super">*</sup><br />
          <span className="not-italic text-stellar-cyan">for the AI era.</span>
        </h1>
        <p className="font-display font-light italic text-lg sm:text-xl lg:text-2xl text-ink-200 leading-relaxed max-w-[540px] mb-9">
          We build the cybersecurity layer for SMEs and individuals adopting AI — so your data stays inside your firewall, your agents stay accountable, and your regulator can audit the logs.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="px-7 py-4 bg-stellar-cyan text-deep-space rounded-full font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-stellar-cyan-soft transition-colors"
          >
            Deploy a private agent →
          </a>
          <a
            href="/hermes-agent-hosting"
            className="px-7 py-4 border border-ink-200 text-ink-50 rounded-full text-[13px] uppercase tracking-[0.1em] hover:border-stellar-cyan hover:text-stellar-cyan transition-colors"
          >
            Watch the demo
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
  const items = ['private', 'protected', 'audited']
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
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16">
      <div>
        <Eyebrow>// 01 — About</Eyebrow>
        <SectionTitle accent="unsecured AI frontier">A field guide to the</SectionTitle>
      </div>
      <div className="space-y-5 text-base sm:text-lg text-ink-200 leading-relaxed">
        <p>
          Celestial Tech is a Hong Kong cybersecurity company that builds AI infrastructure for SMEs and individuals. Restaurants, law firms, clinics, and family offices — the people who can't afford to send their data through someone else's API, but also can't afford a full security team. We host Hermes agents and OpenClaw deployments behind your firewall: private, auditable, accountable.
        </p>
        <p>
          Our work is the inverse of the usual AI pitch — we sell less capability, more cybersecurity. Every model we deploy has a name, a passport, and a paper trail.
        </p>
      </div>
    </section>
  )
}

function A2Stats() {
  const stats = [
    { n: '100', sup: '%', l: 'Threat-modelled before deploy' },
    { n: '4', sup: '×', l: 'Quarterly pen-tests / year' },
    { n: '0', sup: '·', l: 'Data leaves HK' },
    { n: '<2', sup: 'min', l: 'Mean time to alert' },
  ]
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 max-w-[1440px] mx-auto px-5 sm:px-10 py-10 sm:py-14 border-y border-cosmic-violet/25">
      {stats.map((s) => (
        <div key={s.l}>
          <div className="font-display font-light text-5xl sm:text-6xl lg:text-7xl text-ink-50 leading-none">
            {s.n}
            <sup className="text-2xl sm:text-3xl text-stellar-cyan align-super ml-1">{s.sup}</sup>
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-300 mt-3">
            {s.l}
          </div>
        </div>
      ))}
    </section>
  )
}

function A2Services() {
  return (
    <section id="services" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow color="amber">// 02 — Services</Eyebrow>
      <SectionTitle accent="three lanes">Three lanes on the</SectionTitle>
      <p className="font-display italic font-light text-lg sm:text-xl text-ink-200 max-w-[720px] leading-relaxed mb-10 sm:mb-12">
        One stack for empowerment, one for businesses, one for you at home. Each lane ships behind your firewall, audited by default.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* AI Empowerment — combines Hermes + OpenClaw + Bespoke */}
        <div className="relative bg-space-soft border border-stellar-cyan/20 rounded p-6 sm:p-7 min-h-[320px] overflow-hidden">
          <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
          <div className="font-mono text-[11px] tracking-[0.18em] text-stellar-cyan mb-5">01</div>
          <h3 className="font-display font-normal text-2xl sm:text-[28px] leading-tight text-ink-50 mb-3">
            AI <em className="italic text-cosmic-violet font-normal">Empowerment</em>
          </h3>
          <p className="text-sm text-ink-200 leading-relaxed mb-5">
            AI agents and automations deployed behind your firewall — trained on your data, hardened against prompt injection, accountable to your auditor.
          </p>
          <ul className="list-none p-0 m-0 space-y-3 border-t border-dashed border-stellar-cyan/20 pt-4">
            <li>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-nova-amber">Hermes</div>
              <div className="text-sm text-ink-50 mt-1">Cantonese-speaking agents on WhatsApp & Telegram. Restaurant, reception, retail templates.</div>
            </li>
            <li>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-nova-amber">OpenClaw</div>
              <div className="text-sm text-ink-50 mt-1">Self-hosted browser automation on your own infrastructure, with our security operators on call.</div>
            </li>
            <li>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-nova-amber">Bespoke Builds</div>
              <div className="text-sm text-ink-50 mt-1">Custom agents for law, medicine, finance — threat-modelled before the first line of code.</div>
            </li>
          </ul>
        </div>

        {/* Cybersecurity for Business */}
        <div className="relative bg-space-soft border border-stellar-cyan/20 rounded p-6 sm:p-7 min-h-[320px] overflow-hidden">
          <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
          <div className="font-mono text-[11px] tracking-[0.18em] text-stellar-cyan mb-5">02</div>
          <h3 className="font-display font-normal text-2xl sm:text-[28px] leading-tight text-ink-50 mb-3">
            Cybersecurity for <em className="italic text-cosmic-violet font-normal">Business</em>
          </h3>
          <p className="text-sm text-ink-200 leading-relaxed">
            Cybersecurity audit, HK PDPO-aligned privacy compliance, and incident response for SMEs that can&apos;t staff a full security team. Data residency in Hong Kong. Encryption-at-rest, quarterly penetration tests, opt-in/opt-out workflows, and a runbook your auditor can read.
          </p>
        </div>

        {/* Personal Cybersecurity */}
        <div className="relative bg-space-soft border border-stellar-cyan/20 rounded p-6 sm:p-7 min-h-[320px] overflow-hidden">
          <span className="absolute top-4 right-5 w-3 h-3 border-t border-r border-nova-amber" />
          <div className="font-mono text-[11px] tracking-[0.18em] text-stellar-cyan mb-5">03</div>
          <h3 className="font-display font-normal text-2xl sm:text-[28px] leading-tight text-ink-50 mb-3">
            Personal <em className="italic text-cosmic-violet font-normal">Cybersecurity</em>
          </h3>
          <p className="text-sm text-ink-200 leading-relaxed">
            Cybersecurity for individuals and households. Device hardening, identity-protection, scam-watch, and a private channel to a human security operator when something looks wrong — without sending your data to a global cloud to do it.
          </p>
        </div>
      </div>
    </section>
  )
}

function A2WhyUs() {
  const items = [
    { h: 'Threat-modelled first, shipped second.', hAccent: 'Threat-modelled', b: 'Every deployment starts with an adversary profile — not a sales deck. We name the attacker, the asset, the path. Then we ship.' },
    { h: 'Auditable to your auditor, not to us.', hAccent: 'Auditable', b: 'Logs you can hand to your compliance team without a redaction pass. Models that answer what they said, when, and why.' },
    { h: 'Hong Kong, behind your firewall.', hAccent: 'behind your firewall', b: 'Data residency isn\'t a setting — it\'s the architecture. No exit to a foreign cloud, no third-party processor you didn\'t choose.' },
    { h: 'Outcome-metered, never seat-metered.', hAccent: 'Outcome-metered', b: 'You pay for hours saved, not seats filled. If the agent doesn\'t deliver, the meter doesn\'t run.' },
  ]
  return (
    <section id="why-us" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
      <div>
        <Eyebrow color="violet">// 03 — Why us</Eyebrow>
        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-[56px] leading-[0.98] tracking-[-0.02em] mt-4">
          Why us, not a global cloud?
        </h2>
      </div>
      <ul className="list-none p-0 m-0 grid gap-6 sm:gap-7">
        {items.map((it) => (
          <li key={it.h} className="pb-6 sm:pb-7 border-b border-dashed border-cosmic-violet/30 last:border-b-0">
            <div className="font-display font-normal text-xl sm:text-2xl text-ink-50 mb-2">
              {it.h.split(it.hAccent)[0]}
              <em className="italic text-nova-amber">{it.hAccent}</em>
              {it.h.split(it.hAccent)[1]}
            </div>
            <div className="text-sm sm:text-base text-ink-200 leading-relaxed">{it.b}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function A2HowItWorks() {
  const steps = [
    { n: '→ STEP 01', title: 'Discovery', desc: 'A 90-minute call. We learn your workflow, your data, your risk tolerance. Output: a one-page brief you can share with your board.' },
    { n: '→ STEP 02', title: 'Pilot', desc: 'Two weeks, two users, one channel. Live conversation logs, weekly review. No charge until you\'re satisfied with the persona.' },
    { n: '→ STEP 03', title: 'Launch', desc: 'Full deployment on HK infrastructure, with monitoring, alerting, and a quarterly review of guardrails.' },
  ]
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>// 04 — How it works</Eyebrow>
      <SectionTitle accent="checkpoints">Three weeks, three</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
        {steps.map((s) => (
          <div key={s.title} className="bg-space-mid border-l-[3px] border-stellar-cyan p-6 sm:p-7">
            <div className="font-mono text-stellar-cyan text-[12px] tracking-[0.18em] mb-3">{s.n}</div>
            <h3 className="font-display font-normal text-xl sm:text-2xl mb-3 text-ink-50">{s.title}</h3>
            <p className="text-sm text-ink-200 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function A2CaseStudies() {
  const cases = [
    { tag: 'CYBER · KWUN TONG', title: 'BEC Attempt, Contained in 48 Hours', body: 'A 40-person logistics firm forwarded what looked like a CEO wire instruction. Our incident line caught the domain-spoof within 14 minutes, isolated the mailbox, walked HR through a staff-wide reset, and sat with their auditor through the post-mortem.', metric: '0', metricLabel: 'dollars lost' },
    { tag: 'CYBER · SHEUNG WAN', title: 'Phishing Drill for a Family Office', body: 'A single-family office with nine staff ran a quarterly phishing drill. First round: two clicked. After our targeted training and DMARC hardening: a second round the next quarter, zero clicks, zero reports to the insurer.', metric: '100%', metricLabel: 'click-rate, round 2' },
    { tag: 'CYBER · QUARRY BAY', title: 'Fintech Sandbox, Audit-Passed', body: 'A Series-A fintech needed to clear an HKMA sandbox cybersecurity review in six weeks. We threat-modelled the four new endpoints, shipped the runbook, sat in on the review. They passed on the second pass, no rework.', metric: '6 wks', metricLabel: 'from kickoff to signed' },
    { tag: 'RESTAURANT · WHAMPOA', title: 'Take-Away Orders, Fully Automated', body: 'A 24-seat Cantonese restaurant in Whampoa replaced its phone-ordering workflow with a Hermes agent on WhatsApp. The agent takes orders in Cantonese, sends an FPS payment link, and pings the kitchen.', metric: '+38%', metricLabel: 'orders / week' },
    { tag: 'LAW · CENTRAL', title: 'First-Pass Contract Review', body: 'A 6-partner commercial law firm uses OpenClaw to surface relevant clauses from their precedent library. Review time per contract dropped from 4 hours to 90 minutes; partners still sign off.', metric: '−62%', metricLabel: 'review time' },
    { tag: 'CLINIC · TST', title: 'Multilingual Front Desk', body: 'A dermatology clinic with patients from six language backgrounds replaced a human receptionist with a Hermes agent that hands off to a nurse when clinical questions come up.', metric: '9/10', metricLabel: 'patient CSAT' },
  ]
  return (
    <section id="case-studies" className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>// 05 — Case studies</Eyebrow>
      <SectionTitle accent="field">Receipts from the</SectionTitle>
      <div className="grid gap-4 sm:gap-5">
        {cases.map((c) => (
          <div key={c.title} className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-6 lg:gap-8 p-6 sm:p-8 bg-space-soft border border-nova-amber/15 rounded items-center">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-nova-amber">{c.tag}</div>
              <div className="font-display font-normal text-lg sm:text-xl text-ink-50 mt-2">{c.title}</div>
            </div>
            <p className="text-sm sm:text-base text-ink-200 leading-relaxed">{c.body}</p>
            <div className="font-display font-light text-4xl sm:text-5xl text-stellar-cyan leading-none">
              {c.metric}
              <span className="block text-xs font-mono text-ink-300 mt-2 tracking-[0.18em] uppercase">{c.metricLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function A2Insights() {
  const items = [
    { date: '2026·08·14', cat: 'FIELD NOTES', title: 'What we learned deploying Hermes in a 12-seat noodle shop', desc: 'The hardest prompt to write isn\'t for the model. It\'s for the human who has to trust it.' },
    { date: '2026·07·30', cat: 'ENGINEERING', title: 'On hosting OpenClaw without owning a rack', desc: 'How we got to 99.9% uptime on commodity HK VPS providers, without compromising on data residency.' },
    { date: '2026·07·12', cat: 'POLICY', title: 'HK PDPO, in plain English', desc: 'A non-lawyer\'s guide to the Personal Data (Privacy) Ordinance, with a checklist you can actually use.' },
  ]
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>// 06 — Insights</Eyebrow>
      <SectionTitle accent="journal">From the</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {items.map((i) => (
          <a key={i.title} href="/blog" className="block bg-space-mid border border-stellar-cyan/20 p-6 hover:border-stellar-cyan/50 transition-colors">
            <div className="font-mono text-[11px] text-ink-300 tracking-[0.16em]">{i.date} — {i.cat}</div>
            <h4 className="font-display font-normal text-xl sm:text-[22px] leading-snug mt-3 mb-3 text-ink-50">{i.title}</h4>
            <p className="text-sm text-ink-200 leading-relaxed">{i.desc}</p>
            <div className="text-stellar-cyan font-mono text-[13px] mt-4">Read →</div>
          </a>
        ))}
      </div>
    </section>
  )
}

// Founder section removed per user edit (OOP-4066, 2026-08-24).
// Was A2Founder(); dropped to keep the home page focused on the cybersecurity + AI story.

function A2Testimonials() {
  const items = [
    { q: 'We were sceptical. Two months in, the agent handles 60% of our WhatsApp enquiries. The other 40% it forwards to a human. We sleep on Sundays now.', who: '— WING, MAMA KEE\'S KITCHEN' },
    { q: 'The audit log is the feature. Our compliance team wanted to know what the model said, when, and why. With Hermes, we can show them — every time.', who: '— JAMES, HALCYON PARTNERS' },
    { q: 'It\'s the first AI product I\'ve used that doesn\'t make me feel like I\'m training it.', who: '— DR. CHEN, TST DERMATOLOGY' },
  ]
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16 sm:py-24">
      <Eyebrow>// 08 — Testimonials</Eyebrow>
      <SectionTitle accent="actually">What clients</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {items.map((t, idx) => (
          <div key={idx} className="bg-space-soft border border-cosmic-violet/20 p-6 sm:p-7">
            <blockquote className="font-display italic font-light text-base sm:text-lg leading-relaxed text-ink-50 m-0 mb-5">
              <span className="text-cosmic-violet text-3xl align-[-6px] mr-1">“</span>
              {t.q}
            </blockquote>
            <div className="font-mono text-[11px] sm:text-[12px] text-stellar-cyan tracking-[0.14em]">{t.who}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function A2Contact() {
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
        <Eyebrow>// 09 — Contact</Eyebrow>
        <h2 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.025em] mb-6">
          Let&apos;s <em className="italic text-nova-amber font-normal">talk</em>.
        </h2>
        <p className="text-base sm:text-lg text-ink-200 leading-relaxed mb-5">
          Tell us about your workflow and we&apos;ll send back a one-page brief within 48 hours. No forms on our side, no demo calls before we know what you need.
        </p>
        <p className="text-base sm:text-lg text-ink-200 leading-relaxed">
          Or write to us directly at{' '}
          <a href="mailto:hello@celestial-tech.com" className="text-stellar-cyan underline-offset-4 hover:underline">
            hello@celestial-tech.com
          </a>{' '}
          · WhatsApp{' '}
          <a href="#" className="text-stellar-cyan underline-offset-4 hover:underline">
            +852 5123 4567
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
            <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2 mt-0">Your name</label>
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
              placeholder="wing@mamakees.hk"
              className="w-full bg-deep-space text-ink-50 border border-stellar-cyan/20 p-3 font-sans text-base rounded focus:border-stellar-cyan outline-none"
            />
            <label className="block font-mono text-[11px] tracking-[0.18em] uppercase text-ink-300 mb-2 mt-5">What does your day look like?</label>
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
  )
}

function A2Footer() {
  return (
    <footer className="border-t border-stellar-cyan/20 px-5 sm:px-10 py-12 sm:py-16 bg-space-mid mt-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-black text-2xl sm:text-3xl text-ink-50 mb-2">Celestial Tech</div>
          <div className="font-display italic text-ink-300 text-base">Threat Atlas for the AI era.</div>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-stellar-cyan m-0 mb-4">Services</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="/hermes-agent-hosting" className="text-ink-200 text-sm hover:text-stellar-cyan">Hermes Agent Hosting</a></li>
            <li className="mb-2"><a href="/openclaw-hosting" className="text-ink-200 text-sm hover:text-stellar-cyan">OpenClaw Hosting</a></li>
            <li className="mb-2"><a href="#services" className="text-ink-200 text-sm hover:text-stellar-cyan">Cybersecurity for Business</a></li>
            <li className="mb-2"><a href="#services" className="text-ink-200 text-sm hover:text-stellar-cyan">Personal Cybersecurity</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-stellar-cyan m-0 mb-4">Company</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="#about" className="text-ink-200 text-sm hover:text-stellar-cyan">About</a></li>
            <li className="mb-2"><a href="#case-studies" className="text-ink-200 text-sm hover:text-stellar-cyan">Case Studies</a></li>
            <li className="mb-2"><a href="#contact" className="text-ink-200 text-sm hover:text-stellar-cyan">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-stellar-cyan m-0 mb-4">Journal</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">All posts</a></li>
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">Field Notes</a></li>
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">Engineering</a></li>
            <li className="mb-2"><a href="/blog" className="text-ink-200 text-sm hover:text-stellar-cyan">Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-stellar-cyan m-0 mb-4">Legal</h5>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="/privacy-policy" className="text-ink-200 text-sm hover:text-stellar-cyan">Privacy Policy</a></li>
            <li className="mb-2"><a href="/terms-of-service" className="text-ink-200 text-sm hover:text-stellar-cyan">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-10 pt-7 border-t border-stellar-cyan/10 flex flex-col sm:flex-row justify-between gap-3 font-mono text-[10px] sm:text-[11px] text-ink-300 tracking-[0.14em]">
        <div>© 2026 CELESTIAL TECH LTD · HK</div>
        <div>v 6.0 · BUILD 2026.08.24 · MADE IN HONG KONG</div>
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
