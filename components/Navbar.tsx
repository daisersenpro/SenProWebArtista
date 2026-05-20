"use client"

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className={`w-full bg-transparent fixed top-0 left-0 z-50`}> 
      <div className="container flex items-center justify-between py-4">
        <div />

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#music" className="hover:underline">Música</Link>
          <Link href="#videos" className="hover:underline">Videos</Link>
          <Link href="#bio" className="hover:underline">Historia</Link>
          <Link href="#gallery" className="hover:underline">Galería</Link>
          <Link href="#contact" className="hover:underline">Contacto</Link>
        </div>

        <div className="md:hidden">
          <button aria-label="Abrir menú" className="p-2 border rounded">≡</button>
        </div>
      </div>
    </nav>
  )
}
