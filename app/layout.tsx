import './globals.css'
import Navbar from '../components/Navbar'
import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SenPro',
  description: 'SenPro - Rap, barrio, identidad',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
