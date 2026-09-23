"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-transparent">
      <div className="container flex items-center justify-between py-4">
        <div />

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="#videos" className="hover:underline">Videos</Link>
          <Link href="#music" className="hover:underline">Música</Link>
          <Link href="#bio" className="hover:underline">Historia</Link>
          <Link href="#merch" className="hover:underline">Merch</Link>
          <Link href="#gallery" className="hover:underline">Galería</Link>
          <Link href="#contact" className="hover:underline">Contacto</Link>
        </div>

        <div className="relative md:hidden">
          <button
            type="button"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded border border-white/30 px-3 py-2 text-xl leading-none"
          >
            {isMenuOpen ? '×' : '≡'}
          </button>

          {isMenuOpen && (
            <div id="mobile-navigation" className="absolute right-0 top-14 w-48 rounded-lg border border-white/15 bg-black/95 p-2 shadow-xl">
              {[
                ['#videos', 'Videos'],
                ['#music', 'Música'],
                ['#bio', 'Historia'],
                ['#merch', 'Merch'],
                ['#gallery', 'Galería'],
                ['#contact', 'Contacto'],
              ].map(([href, label]) => (
                <Link key={href} href={href} onClick={closeMenu} className="block rounded px-3 py-3 text-sm text-white hover:bg-white/10">
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
