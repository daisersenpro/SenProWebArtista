import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type Body = {
  name: string
  email: string
  phone: string
  category: string
  message: string
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json()

    const { name, email, phone, category, message } = body

    if (!name || !email || !phone || !message || message.length < 10) {
      return NextResponse.json({ error: 'Campos inválidos' }, { status: 400 })
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
      subject: `Nuevo contacto — ${category} — ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMotivo: ${category}\n\nMensaje:\n${message}`,
      html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Teléfono:</strong> ${phone}</p><p><strong>Motivo:</strong> ${category}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
    }

    await transporter.sendMail(mail)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: err?.message || 'Error interno' }, { status: 500 })
  }
}
