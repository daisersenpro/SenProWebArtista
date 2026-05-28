import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type Body = {
  name: string
  email: string
  phone: string
  category: string
  message: string
}

const ALLOWED_CATEGORIES = new Set([
  'Contratación',
  'Colaboraciones',
  'Eventos',
  'Prensa',
  'Merch',
])

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const sanitizePlainText = (value: string) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const sanitizeMessage = (value: string) =>
  value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .trim()

const sanitizeEmail = (value: string) => sanitizePlainText(value).toLowerCase()

const sanitizeSubjectPart = (value: string) => sanitizePlainText(value).replace(/[\r\n]/g, ' ')

export async function POST(req: Request) {
  try {
    const body: Body = await req.json()

    const { name, email, phone, category, message } = body

    const cleanName = sanitizePlainText(name)
    const cleanEmail = sanitizeEmail(email)
    const cleanCategory = sanitizePlainText(category)
    const cleanMessage = sanitizeMessage(message)

    if (!cleanName || !cleanEmail || !phone || !cleanMessage || cleanMessage.length < 10) {
      return NextResponse.json({ error: 'Campos inválidos' }, { status: 400 })
    }

    // Normalizar teléfono entrante y validar formato chileno
    const cleanedPhone = phone.replace(/[^0-9+]/g, '')
    let normalizedPhone = cleanedPhone
    if (normalizedPhone.startsWith('09')) normalizedPhone = '+56' + normalizedPhone.slice(1)
    else if (normalizedPhone.startsWith('9')) normalizedPhone = '+56' + normalizedPhone
    else if (normalizedPhone.startsWith('56')) normalizedPhone = '+' + normalizedPhone

    if (!/^\+569\d{8}$/.test(normalizedPhone)) {
      return NextResponse.json({ error: 'Formato de teléfono inválido' }, { status: 400 })
    }

    if (!ALLOWED_CATEGORIES.has(cleanCategory)) {
      return NextResponse.json({ error: 'Motivo inválido' }, { status: 400 })
    }

    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
    const secure = process.env.SMTP_SECURE === 'true'

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    } as any)

    const from = process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@example.com'

    const mail = {
      from,
      to: 'sen.producciones@gmail.com',
      subject: `Nuevo contacto - ${sanitizeSubjectPart(cleanCategory)} - ${sanitizeSubjectPart(cleanName)}`,
      text: `Nombre: ${cleanName}\nEmail: ${cleanEmail}\nTeléfono: ${normalizedPhone}\nMotivo: ${cleanCategory}\n\nMensaje:\n${cleanMessage}`,
      html: `<p><strong>Nombre:</strong> ${escapeHtml(cleanName)}</p><p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p><p><strong>Teléfono:</strong> ${escapeHtml(normalizedPhone)}</p><p><strong>Motivo:</strong> ${escapeHtml(cleanCategory)}</p><hr/><p>${escapeHtml(cleanMessage).replace(/\n/g, '<br/>')}</p>`,
    }

    await transporter.sendMail(mail)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: err?.message || 'Error interno' }, { status: 500 })
  }
}
