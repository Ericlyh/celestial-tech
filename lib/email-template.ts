// Email template renderer for the contact form.
// Pure function: takes parsed fields + source + meta, returns { html, text }.
// Inline styles only — most email clients ignore <style> blocks.

export type ContactSource = 'home' | 'hermes-agent-hosting' | 'openclaw-hosting' | (string & {})

export interface ContactFields {
  name: string
  email?: string
  whatsapp?: string
  company?: string
  service?: string
  message?: string
  business_type?: string
  pain_point?: string
  plan?: string
}

export interface ContactMeta {
  source: ContactSource
  submittedAt: Date
  ip?: string
  userAgent?: string
}

const SOURCE_LABEL: Record<string, string> = {
  home: 'Website contact',
  'hermes-agent-hosting': 'Hermes Agent inquiry',
  'openclaw-hosting': 'OpenClaw inquiry',
}

export function sourceLabel(source: string): string {
  return SOURCE_LABEL[source] ?? 'Website contact'
}

export function subjectFor(source: string, name: string): string {
  return `${sourceLabel(source)} — ${name}`
}

// Escape user-supplied text for safe insertion into HTML body.
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Strip everything except digits, for wa.me links.
function digitsOnly(input: string): string {
  return input.replace(/\D+/g, '')
}

// Map a plan value to a human-friendly badge label.
const PLAN_LABEL: Record<string, string> = {
  starter: 'Starter ($199/月)',
  pro: 'Pro ($399/月)',
  business: 'Business ($799/月)',
  unsure: 'Undecided',
}

function planLabel(plan: string): string {
  return PLAN_LABEL[plan] ?? plan
}

interface RenderResult {
  html: string
  text: string
}

export function renderContactEmail(fields: ContactFields, meta: ContactMeta): RenderResult {
  const {
    name,
    email,
    whatsapp,
    company,
    service,
    message,
    business_type,
    pain_point,
    plan,
  } = fields

  const label = sourceLabel(meta.source)
  const ts = meta.submittedAt.toISOString()
  const ip = meta.ip ?? '-'
  const ua = meta.userAgent ?? '-'

  // Decide which "contact method" to feature in the meta grid.
  // We always pick the best available, with email taking precedence.
  const contactMethod = email
    ? `<a href="mailto:${escapeHtml(email)}" style="color:#ffffff;text-decoration:none;">${escapeHtml(email)}</a>`
    : whatsapp
    ? `<a href="https://wa.me/${digitsOnly(whatsapp)}" style="color:#ffffff;text-decoration:none;">${escapeHtml(whatsapp)} <span style="color:#5eead4;">(wa.me/${digitsOnly(whatsapp)})</span></a>`
    : '-'

  const typeField = business_type ?? company
  const planField = plan ?? service

  // Build the meta grid (skip rows for absent fields).
  const metaRows: string[] = []
  metaRows.push(`
    <tr>
      <td style="padding:6px 12px 6px 0;color:#a1a1aa;font-size:13px;width:90px;vertical-align:top;">Contact:</td>
      <td style="padding:6px 0;color:#ffffff;font-size:14px;">${contactMethod}</td>
    </tr>
  `)
  if (typeField) {
    metaRows.push(`
      <tr>
        <td style="padding:6px 12px 6px 0;color:#a1a1aa;font-size:13px;width:90px;vertical-align:top;">${business_type ? 'Type:' : 'Company:'}</td>
        <td style="padding:6px 0;color:#ffffff;font-size:14px;">${escapeHtml(typeField)}</td>
      </tr>
    `)
  }
  if (planField) {
    if (plan) {
      metaRows.push(`
        <tr>
          <td style="padding:6px 12px 6px 0;color:#a1a1aa;font-size:13px;width:90px;vertical-align:top;">Plan:</td>
          <td style="padding:6px 0;">
            <span style="display:inline-block;padding:3px 10px;border:1px solid #5eead4;border-radius:9999px;color:#5eead4;font-size:12px;font-weight:600;letter-spacing:0.02em;">${escapeHtml(planLabel(planField))}</span>
          </td>
        </tr>
      `)
    } else {
      metaRows.push(`
        <tr>
          <td style="padding:6px 12px 6px 0;color:#a1a1aa;font-size:13px;width:90px;vertical-align:top;">Service:</td>
          <td style="padding:6px 0;color:#ffffff;font-size:14px;">${escapeHtml(planField)}</td>
        </tr>
      `)
    }
  }

  // Build the callout block for pain_point / message.
  const callouts: string[] = []
  if (pain_point) {
    callouts.push(`
      <tr>
        <td style="padding:0 0 12px 0;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5eead4;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">Pain point</p>
          <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #5eead4;background:#0d0d14;border-radius:6px;color:#ffffff;font-size:14px;line-height:1.5;">${escapeHtml(pain_point).replace(/\n/g, '<br>')}</blockquote>
        </td>
      </tr>
    `)
  }
  if (message) {
    callouts.push(`
      <tr>
        <td style="padding:0 0 12px 0;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#5eead4;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">Message</p>
          <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #5eead4;background:#0d0d14;border-radius:6px;color:#ffffff;font-size:14px;line-height:1.5;">${escapeHtml(message).replace(/\n/g, '<br>')}</blockquote>
        </td>
      </tr>
    `)
  }

  const calloutsHtml = callouts.length
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px 0;">
        ${callouts.join('\n')}
      </table>
    `
    : ''

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0a0a0a;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background-color:#111118;border:1px solid #1f1f2e;border-radius:12px;overflow:hidden;">
            <!-- Brand strip -->
            <tr>
              <td style="padding:20px 24px 14px 24px;border-bottom:1px solid #1f1f2e;">
                <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#a1a1aa;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">Celestial Tech</p>
                <hr style="margin:10px 0 0 0;border:0;border-top:1px solid #1f1f2e;" />
              </td>
            </tr>
            <!-- Source + heading -->
            <tr>
              <td style="padding:20px 24px 4px 24px;">
                <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#5eead4;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">[${escapeHtml(label)}]</p>
                <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">New inquiry from ${escapeHtml(name)}</h1>
              </td>
            </tr>
            <!-- Meta grid -->
            <tr>
              <td style="padding:20px 24px 8px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0d0d14;border:1px solid #1f1f2e;border-radius:8px;">
                  <tr>
                    <td style="padding:14px 16px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        ${metaRows.join('\n')}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Callouts -->
            ${calloutsHtml ? `<tr><td style="padding:0 24px 8px 24px;">${calloutsHtml}</td></tr>` : ''}
            <!-- Divider -->
            <tr>
              <td style="padding:8px 24px 0 24px;">
                <hr style="margin:0;border:0;border-top:1px solid #1f1f2e;" />
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:14px 24px 22px 24px;">
                <p style="margin:0 0 4px 0;font-size:12px;color:#a1a1aa;">Submitted ${escapeHtml(ts)}</p>
                <p style="margin:0 0 4px 0;font-size:12px;color:#a1a1aa;">Source: /${escapeHtml(meta.source)}</p>
                <p style="margin:0 0 4px 0;font-size:12px;color:#a1a1aa;">IP: ${escapeHtml(ip)} &middot; ${escapeHtml(ua)}</p>
                <p style="margin:8px 0 0 0;font-size:12px;color:#5eead4;">Reply to this email to respond${email ? ' to ' + escapeHtml(email) : ''}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  // Plain-text fallback.
  const textLines: string[] = []
  textLines.push(`CELESTIAL TECH`)
  textLines.push(`[${label}]`)
  textLines.push(`New inquiry from ${name}`)
  textLines.push('')
  textLines.push('--- Contact ---')
  if (email) textLines.push(`Email:    ${email}`)
  if (whatsapp) textLines.push(`WhatsApp: ${whatsapp} (https://wa.me/${digitsOnly(whatsapp)})`)
  if (business_type) textLines.push(`Type:     ${business_type}`)
  if (company) textLines.push(`Company:  ${company}`)
  if (plan) textLines.push(`Plan:     ${planLabel(plan)}`)
  if (service) textLines.push(`Service:  ${service}`)
  if (pain_point) {
    textLines.push('')
    textLines.push('PAIN POINT')
    textLines.push(`"${pain_point}"`)
  }
  if (message) {
    textLines.push('')
    textLines.push('MESSAGE')
    textLines.push(message)
  }
  textLines.push('')
  textLines.push('---')
  textLines.push(`Submitted ${ts}`)
  textLines.push(`Source: /${meta.source}`)
  textLines.push(`IP: ${ip} · ${ua}`)
  if (email) textLines.push(`Reply to this email to respond to ${email}.`)

  return { html, text: textLines.join('\n') }
}
