import './globals.css'
import Navbar from '../components/Navbar'
import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SenPro | Rap Chileno - Hip Hop Independiente',
  description:
    'SenPro - Rap chileno, barrio e identidad. Escucha música, lanzamientos y videos de Hip Hop underground directo desde Santiago, Chile.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export const metadataBase = new URL('https://senpro.netlify.app')

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