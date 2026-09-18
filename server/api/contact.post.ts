import nodemailer from 'nodemailer'

interface ContactBody {
  name?: unknown
  email?: unknown
  message?: unknown
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

  const { smtp } = useRuntimeConfig(event)

  if (!smtp.host || !smtp.user || !smtp.pass) {
    throw createError({ statusCode: 503, statusMessage: 'Email delivery is not configured yet.' })
  }

  const port = Number(smtp.port) || 587
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port,
    secure: port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  })

  try {
    await transporter.sendMail({
      from: smtp.from || smtp.user,
      to: smtp.to || smtp.user,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p><p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    })
  }
  catch (error) {
    console.error('[contact] failed to send message', error)
    throw createError({ statusCode: 502, statusMessage: 'The message could not be sent right now.' })
  }

  return { ok: true }
})
