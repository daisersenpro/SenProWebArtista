import './globals.css'
import Navbar from '../components/Navbar'
import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://senpro.netlify.app'),
  title: 'SenPro | Rapero y productor de rap chileno',
  description:
    'Sitio oficial de SenPro, rapero y productor de La Reina, Santiago de Chile. Escucha rap chileno, descubre videos, lanzamientos y novedades.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/',
    siteName: 'SenPro',
    title: 'SenPro | Rapero y productor de rap chileno',
    description:
      'Sitio oficial de SenPro, rapero y productor de La Reina, Santiago de Chile.',
    images: [
      {
        url: '/images/hero-graffiti.png',
        width: 1200,
        height: 630,
        alt: 'SenPro, rapero y productor de Santiago de Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SenPro | Rapero y productor de rap chileno',
    description:
      'Sitio oficial de SenPro, rapero y productor de La Reina, Santiago de Chile.',
    images: ['/images/hero-graffiti.png'],
  },
  authors: [{ name: 'SenPro' }],
  creator: 'SenPro',
  keywords: ['SenPro', 'rap chileno', 'hip hop chileno', 'rap de Santiago', 'rap de La Reina'],
  verification: {
    google: 'XObI1dQUtHmVv1PmtLbbqh5QGkXOi23xUFYrPUKNhTw',
  },
  icons: {
    icon: [{ url: '/favicon-senpro.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/favicon-senpro.png',
    apple: '/favicon-senpro.png',
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