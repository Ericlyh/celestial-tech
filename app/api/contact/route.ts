import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  renderContactEmail,
  subjectFor,
  type ContactFields,
  type ContactSource,
} from '@/lib/email-template'

export const runtime = 'nodejs'

// Boot-time warnings: surface missing env vars once per cold start so misconfig
// is visible in server logs, not as silent runtime failures.
if (!process.env.RESEND_API_KEY) {
  console.warn('[contact] RESEND_API_KEY is not set — email sending will fail.')
}
if (!process.env.TURNSTILE_SECRET_KEY) {
  console.warn('[contact] TURNSTILE_SECRET_KEY is not set — bot protection is DISABLED.')
}
if (!process.env.MAIL_TO) {
  console.warn('[contact] MAIL_TO is not set — falling back to the default recipient.')
}

// Input limits
const MAX_NAME = 200
const MAX_EMAIL = 320
const MAX_WHATSAPP = 30
const MAX_TEXT = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WHATSAPP_RE = /\d{7,}/

// Same-origin check: allow only when Origin/Referer match APP_ORIGIN or fall back to req.nextUrl.origin.
function isSameOrigin(req: NextRequest): boolean {
  const expected = (process.env.APP_ORIGIN || req.nextUrl.origin).replace(/\/$/, '')
  const origin = (req.headers.get('origin') || '').replace(/\/$/, '')
  const referer = (req.headers.get('referer') || '').replace(/\/$/, '')
  if (origin && origin === expected) return true
  if (referer && referer.startsWith(expected)) return true
  return false
}

interface InboundBody {
  turnstileToken?: string
  name?: string
  email?: string
  whatsapp?: string
  company?: string
  service?: string
  message?: string
  business_type?: string
  pain_point?: string
  plan?: string
  _source?: string
  _honey?: string
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: InboundBody
  try {
    body = (await req.json()) as InboundBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // 1. Honeypot
  if (body._honey && String(body._honey).trim() !== '') {
    return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
  }

  // 2. Turnstile (only if a secret is configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (turnstileSecret) {
    const token = body.turnstileToken
    if (!token) {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
    }
    try {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: turnstileSecret, response: token }),
      })
      const verifyJson = (await verifyRes.json()) as { success?: boolean }
      if (!verifyJson.success) {
        return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
      }
    } catch {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
    }
  }

  // 3. Validate
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const whatsapp = (body.whatsapp || '').trim()

  if (!name || (!email && !whatsapp)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (name.length > MAX_NAME) {
    return NextResponse.json({ error: 'Name too long' }, { status: 400 })
  }
  if (email) {
    if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
  }
  if (whatsapp) {
    const digits = whatsapp.replace(/\D/g, '')
    if (whatsapp.length > MAX_WHATSAPP || !WHATSAPP_RE.test(digits)) {
      return NextResponse.json({ error: 'Invalid WhatsApp number' }, { status: 400 })
    }
  }
  const cap = (v: string | undefined) => (v && v.length > MAX_TEXT ? v.slice(0, MAX_TEXT) : v)

  // 4. Subject
  const source = (body._source || 'home') as ContactSource
  const subject = subjectFor(source, name)

  // 5 + 6. Render + send
  const fields: ContactFields = {
    name,
    email: email || undefined,
    whatsapp: whatsapp || undefined,
    company: cap(body.company?.trim()) || undefined,
    service: cap(body.service?.trim()) || undefined,
    message: cap(body.message?.trim()) || undefined,
    business_type: cap(body.business_type?.trim()) || undefined,
    pain_point: cap(body.pain_point?.trim()) || undefined,
    plan: cap(body.plan?.trim()) || undefined,
  }
  const meta = {
    source,
    submittedAt: new Date(),
    ip: (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || undefined,
    userAgent: req.headers.get('user-agent') || undefined,
  }

  const { html, text } = renderContactEmail(fields, meta)

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  try {
    const sendPayload: Parameters<typeof resend.emails.send>[0] = {
      from: process.env.MAIL_FROM || 'onboarding@resend.dev',
      to: process.env.MAIL_TO || 'lyheric127@gmail.com',
      subject,
      html,
      text,
    }
    if (email) sendPayload.replyTo = email

    const { data, error } = await resend.emails.send(sendPayload)

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id ?? '' }, { status: 200 })
  } catch (err) {
    console.error('[contact] unexpected error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
