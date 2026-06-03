'use client'

import { useState } from 'react'
import { useTranslation } from '@/i18n'

interface NewsletterSignupProps {
  variant?: 'inline' | 'block'
  className?: string
}

/**
 * Newsletter signup — for now, captures the email client-side and shows
 * a success state. Wire to a real provider (ConvertKit, Resend audiences,
 * Loops, etc.) when ready.
 */
export default function NewsletterSignup({ variant = 'block', className = '' }: NewsletterSignupProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    // Local persistence — the actual integration is wired separately.
    try {
      const list = JSON.parse(localStorage.getItem('ct-newsletter') || '[]')
      if (!list.includes(email)) list.push(email)
      localStorage.setItem('ct-newsletter', JSON.stringify(list))
    } catch {}
    await new Promise((r) => setTimeout(r, 600))
    setStatus('success')
    setEmail('')
  }

  if (variant === 'inline') {
    return (
      <form
        onSubmit={onSubmit}
        className={`flex items-stretch gap-2 max-w-md ${className}`}
      >
        <input
          type="email"
          required
          placeholder={t('blog_newsletter_placeholder')}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-ink-400 focus:outline-none focus:border-stellar-cyan/40 focus:bg-white/[0.06] transition-all"
          disabled={status === 'submitting' || status === 'success'}
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-stellar-cyan text-deep-space font-semibold text-sm hover:bg-stellar-cyan-soft transition-colors disabled:opacity-50"
          disabled={status === 'submitting' || status === 'success'}
        >
          {status === 'success' ? t('blog_copied') : t('blog_newsletter_cta')}
        </button>
      </form>
    )
  }

  // Block variant
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-stellar-cyan/15 bg-gradient-to-br from-stellar-cyan/[0.04] via-space-mid to-cosmic-violet/[0.04] p-8 sm:p-10 ${className}`}>
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.25em] text-stellar-cyan/80 font-mono mb-3">
          {t('blog_newsletter_eyebrow')}
        </div>
        <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-3">
          {t('blog_newsletter_title')}
        </h3>
        <p className="text-ink-300 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
          {t('blog_newsletter_desc')}
        </p>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
          <input
            type="email"
            required
            placeholder={t('blog_newsletter_placeholder')}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
            className="flex-1 px-4 py-3 rounded-lg bg-deep-space/60 border border-white/[0.1] text-white placeholder:text-ink-400 focus:outline-none focus:border-stellar-cyan/50 transition-all font-sans"
            disabled={status === 'submitting' || status === 'success'}
            aria-label={t('blog_newsletter_placeholder')}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-stellar-cyan text-deep-space font-semibold hover:bg-stellar-cyan-soft transition-colors disabled:opacity-50 whitespace-nowrap"
            disabled={status === 'submitting' || status === 'success'}
          >
            {status === 'submitting' && '…'}
            {status === 'success' && t('blog_copied')}
            {(status === 'idle' || status === 'error') && t('blog_newsletter_cta')}
          </button>
        </form>
        <p className="text-xs text-ink-400 mt-3 font-mono">
          {t('blog_newsletter_note')}
        </p>
      </div>
    </div>
  )
}
