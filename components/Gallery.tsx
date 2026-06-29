"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

type GalleryImage = {
  src: string
  caption: string
}

const GALLERY_CAPTIONS: Record<string, string> = {
  'SenPro 21-hrs.png': 'SenPro & 21 Hrs Crew',
  'SenPro ATE.png': 'SenPro & Alcanza Tu Estrella',
  'SenPro Bside.png': 'SenPro | Corleone | Kogollete',
  'SenPro con qn.png': 'SenPro & QN Estilo',
  'SenPro Rah Digga.png': 'SenPro & Rah Digga',
  'SenPro Rampage.png': 'SenPro & Rampage',
  'SenPro Stk.png': 'SenPro & Prodigal',
  'SenPro & OSC.png': 'SenPro & OSC',
  'SenPro-Evento Parque Intercomunal.png': 'SenPro — Parque Intercomunal',
  'SenPro-Corleone-Mr Cleri.png': 'SenPro | Corleone | Mr Cleri',
  'SenPro-Que Pasa!.png': 'SenPro — Que Pasa!',
  'SenPro En The Floor Chile.png': 'SenPro — The Floor Chile',
  'SenPro-The Floor Chile.png': 'SenPro — The Floor Chile',
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        const allImages = ((data.categories || []) as { name: string; images: string[] }[])
          .flatMap((category) => category.images)
          .map((src) => ({ src, caption: captionFromPath(src) }))

        setImages(allImages)
      })
      .catch(() => setImages([]))
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      const rail = railRef.current
      if (!rail || images.length <= 3) return

      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8
      if (atEnd) {
        rail.scrollTo({ left: 0, behavior: 'smooth' })
        return
      }

      rail.scrollBy({ left: rail.clientWidth, behavior: 'smooth' })
    }, 6800)

    return () => window.clearInterval(timer)
  }, [images.length])

  const visibleImages = useMemo(() => images, [images])

  function captionFromPath(src: string) {
    try {
      const parts = src.split('/')
      const file = decodeURIComponent(parts[parts.length - 1])

      const customCaption = GALLERY_CAPTIONS[file]
      if (customCaption) {
        return customCaption
      }

      return file.replace(/\.(jpe?g|png|webp|gif|avif|mp4)$/i, '').replace(/[-_\.\d]+/g, ' ').trim()
    } catch {
      return ''
    }
  }

  function getCurrentIndex() {
    if (!activeImage) return -1
    return images.findIndex((i) => i.src === activeImage)
  }

  function showPrev() {
    const idx = getCurrentIndex()
    if (idx === -1) return
    const prev = (idx - 1 + images.length) % images.length
    setActiveImage(images[prev].src)
  }

  function showNext() {
    const idx = getCurrentIndex()
    if (idx === -1) return
    const next = (idx + 1) % images.length
    setActiveImage(images[next].src)
  }

  useEffect(() => {
    if (!activeImage) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null)
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKey)
    // focus close button for accessibility
    closeButtonRef.current?.focus()

    return () => window.removeEventListener('keydown', onKey)
  }, [activeImage, images])

  const scrollRail = (direction: 'left' | 'right') => {
    const rail = railRef.current
    if (!rail) return

    const amount = direction === 'left' ? -rail.clientWidth : rail.clientWidth
    rail.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section id="gallery" className="py-24 bg-black/40">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4">Galería</h2>

        <div className="relative">
          {visibleImages.length > 3 && (
            <>
              <button
                type="button"
                onClick={() => scrollRail('left')}
                aria-label="Ver fotos anteriores"
                className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/35 bg-black/75 p-3 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-amber-300/60 hover:bg-black/90 hover:text-white md:flex"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollRail('right')}
                aria-label="Ver fotos siguientes"
                className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/35 bg-black/75 p-3 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-amber-300/60 hover:bg-black/90 hover:text-white md:flex"
              >
                ›
              </button>
            </>
          )}

          <div
            ref={railRef}
            className="flex gap-2 overflow-x-auto scroll-smooth pb-2 pr-10 pl-10 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {visibleImages.map((image) => (
              <article
                key={image.src}
                className="w-full flex-none snap-start basis-full sm:basis-1/2 lg:basis-[30%] xl:basis-[28%]"
              >
                <button
                  type="button"
                  onClick={() => setActiveImage(image.src)}
                  className="mx-auto block w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                    <img
                      loading="lazy"
                      src={image.src}
                      alt={image.caption}
                      className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="border-t border-white/10 bg-black/70 px-4 py-3 text-left">
                    <p className="truncate text-sm font-medium text-white">{image.caption || 'Foto'}</p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>

        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActiveImage(null)}
          >
            <div className="relative max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
              <button
                ref={closeButtonRef}
                className="mb-3 inline-block rounded bg-white/5 px-3 py-1 text-sm"
                onClick={() => setActiveImage(null)}
              >
                Cerrar
              </button>

              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-amber-400/35 bg-black/75 p-3 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-amber-300/60 hover:bg-black/90 hover:text-white md:flex"
              >
                ‹
              </button>

              <img
                src={activeImage}
                alt={captionFromPath(activeImage)}
                className="w-full max-h-[80vh] object-contain"
              />

              <button
                type="button"
                onClick={showNext}
                aria-label="Foto siguiente"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden translate-x-1/2 rounded-full border border-amber-400/35 bg-black/75 p-3 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-amber-300/60 hover:bg-black/90 hover:text-white md:flex"
              >
                ›
              </button>

              <p className="mt-2 text-center text-gray-300">{captionFromPath(activeImage)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
