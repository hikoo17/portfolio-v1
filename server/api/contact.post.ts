interface ContactBody {
  name?: unknown
  email?: unknown
  message?: unknown
}

interface ResendError {
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  const name = asString(body?.name)
  const email = asString(body?.email)
  const message = asString(body?.message)

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email and message are required.' })
  }
  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid email address.' })
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    throw createError({ statusCode: 400, statusMessage: 'Your message is too long.' })
  }

  const config = useRuntimeConfig(event)
  const apiKey = config.resendApiKey
  // `keyzar.my.id` is verified in Resend, so mail is sent from an address on it.
  const from = config.contactFrom || 'Portfolio <contact@keyzar.my.id>'
  const to = config.contactTo || 'keyzazakiarkana08@gmail.com'

  if (!apiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Email delivery is not configured yet.' })
  }

  // Cloudflare Workers cannot open the raw TCP/TLS sockets SMTP needs, so mail
  // is delivered through Resend's HTTP API instead of nodemailer.
  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: {
        from,
        to: [to],
        reply_to: `${name} <${email}>`,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
        html: `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p><p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
      },
    })
  }
  catch (error) {
    const detail = (error as { data?: ResendError })?.data?.message
    console.error('[contact] failed to send message', detail || error)
    throw createError({ statusCode: 502, statusMessage: 'The message could not be sent right now.' })
  }

  return { ok: true }
})
