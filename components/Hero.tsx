"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function Hero() {
  const logoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 -z-20">
          <Image src="/images/hero-graffiti.png" alt="Hero graffiti — SENPRO" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 text-center">
        <motion.div ref={logoRef} initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1 }}>
          <div className="relative mx-auto w-[280px] md:w-[420px]">
            <Image src="/images/logo.png" alt="SENPRO" width={420} height={140} priority />
            <div className="smoke-overlay" aria-hidden>
              <div className="smoke-layer" />
              <div className="smoke-layer alt" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <p className="text-lg md:text-xl text-gray-300 mt-6">SenPro — Real estilo propio y buena música. ¡Qué pasa!</p>
        </motion.div>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="#music" className="px-6 py-3 bg-white text-black rounded-md font-semibold">Escuchar música</Link>
          <Link href="#videos" className="px-6 py-3 border border-white rounded-md">Ver videos</Link>
        </div>
      </div>
    </section>
  )
}
