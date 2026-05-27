"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

type GalleryImage = {
  src: string
  caption: string
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)

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
    }, 3000)

    return () => window.clearInterval(timer)
  }, [images.length])

  const visibleImages = useMemo(() => images, [images])

  function captionFromPath(src: string) {
    try {
      const parts = src.split('/')
      const file = decodeURIComponent(parts[parts.length - 1])
      return file.replace(/[-_\.\d]+/g, ' ').replace(/\.(jpe?g|png|webp|gif|avif|mp4)$/i, '').trim()
    } catch {
      return ''
    }
  }

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
                className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/75 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-black/90 md:flex"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollRail('right')}
                aria-label="Ver fotos siguientes"
                className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/75 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-black/90 md:flex"
              >
                ›
              </button>
            </>
          )}

          <div
            ref={railRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 pr-10 pl-10 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="max-w-[90%] max-h-[90%]">
              <button
                className="mb-3 inline-block rounded bg-white/5 px-3 py-1 text-sm"
                onClick={() => setActiveImage(null)}
              >
                Cerrar
              </button>
              <img
                src={activeImage}
                alt={captionFromPath(activeImage)}
                className="w-full max-h-[80vh] object-contain"
              />
              <p className="mt-2 text-center text-gray-300">{captionFromPath(activeImage)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
