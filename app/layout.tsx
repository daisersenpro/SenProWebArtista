import './globals.css'
import Navbar from '../components/Navbar'
import { PropsWithChildren } from 'react'

export const metadata = {
  title: 'SENPRO',
  description: 'SENPRO - Rap, barrio, identidad'
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
