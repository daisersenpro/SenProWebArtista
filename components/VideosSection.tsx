"use client"

import { useEffect, useRef, useState } from 'react'

type VideoItem = {
  title: string
  description: string
  hashtags: string
  platform: 'youtube' | 'instagram'
  embedUrl: string
  watchUrl: string
}

const videos: VideoItem[] = [
  {
    title: '¡Ahora Caigo! | Participación de SenPro',
    description:
      'Extracto de la participación de Anyelo SenPro en el programa de concurso chileno Ahora Caigo de TVN.',
    hashtags: '#AhoraCaigo #TVN #SenPro #Chile #Concurso #Televisión',
    platform: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/DrBnSsPCZ6I',
    watchUrl: 'https://www.youtube.com/watch?v=DrBnSsPCZ6I',
  },
  {
    title: 'Fue suavecito | Duelo de combos se toma The Floor Chile',
    description:
      'Un momento entretenido en The Floor Chile donde mostraron una faceta más marcial y técnica de SenPro, con combos suaves y buena vibra en pantalla.',
    hashtags: '#TheFloorChile #TVN #SenPro #Chile #ArtesMarciales #Televisión',
    platform: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/oZSNMt8MeRM',
    watchUrl: 'https://youtube.com/shorts/oZSNMt8MeRM',
  },
  {
    title: 'Conmemorativo Cristian G & Flaco R | Presentación SenPro',
    description:
      'Aquí un breve video de mi presentación en el conmemorativo de #CristianG y #FlacoR (Q.E.P.D.), donde participé con mucho cariño y respeto. Gracias a Freeky Gee por la grabación.',
    hashtags: '#SenPro #QuePasa!',
    platform: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/C75NMVAgty0/embed',
    watchUrl: 'https://www.instagram.com/reel/C75NMVAgty0/?igsh=NDVhd3M4NWFmNnYy',
  },
]

export default function VideosSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % videos.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [isPaused])

  // Close modal on Escape and focus close button when modal opens
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && modalIndex !== null) {
        setModalIndex(null)
        setIsPaused(false)
      }
    }

    if (modalIndex !== null) {
      document.addEventListener('keydown', onKey)
      // focus close button
      setTimeout(() => closeBtnRef.current?.focus(), 10)
    }

    return () => document.removeEventListener('keydown', onKey)
  }, [modalIndex])

  const activeVideo = videos[activeIndex]
  const canEmbedInstagram =
    activeVideo.platform === 'instagram' &&
    (activeVideo.embedUrl.includes('/embed') ||
      activeVideo.embedUrl.includes('/reel') ||
      activeVideo.embedUrl.includes('/p/'))

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + videos.length) % videos.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % videos.length)
  }

  return (
    <section id="videos" className="py-24 bg-gradient-to-b from-black/10 via-black/30 to-black/10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-red-200/90">Videos</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">Participaciones, tocatas e invitaciones</h2>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
            Un espacio para ir subiendo clips destacados de SenPro: apariciones en TV, concursos, tocatas y cualquier momento importante.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Clips destacados de TV, concursos, tocatas e invitaciones.
          </p>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
            aria-hidden
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-[1px] scale-110"
              style={{ backgroundImage: 'url(/images/hero-graffiti.png)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-red-500/20 to-transparent blur-2xl" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-red-500/20 to-transparent blur-2xl" />
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Video anterior"
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/35 bg-black/80 p-3 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_10px_30px_rgba(0,0,0,0.35)] transition hover:border-amber-300/60 hover:bg-black md:flex"
          >
            <span className="text-xl leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Video siguiente"
            className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/35 bg-black/80 p-3 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.12),0_10px_30px_rgba(0,0,0,0.35)] transition hover:border-amber-300/60 hover:bg-black md:flex"
          >
            <span className="text-xl leading-none">›</span>
          </button>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div
                className="relative aspect-video bg-black overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
              >
                <div className="flex h-full w-full items-center justify-center">
                  {activeVideo.platform === 'instagram' ? (
                    canEmbedInstagram ? (
                      <div className="relative h-full w-full max-w-[360px]">
                        <iframe
                          className="h-full w-full"
                          src={activeVideo.embedUrl}
                          title={activeVideo.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setModalIndex(activeIndex)
                            setIsPaused(true)
                          }}
                          aria-label="Abrir video de Instagram en pantalla completa"
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 p-4 text-white shadow-lg"
                        >
                          ▶
                        </button>
                      </div>
                    ) : (
                      <div className="flex h-full w-full max-w-[540px] flex-col items-center justify-center gap-4 rounded-md border border-white/10 bg-black/60 p-6 text-center">
                        <div className="flex items-center gap-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 2C4.238 2 2 4.238 2 7v10c0 2.762 2.238 5 5 5h10c2.762 0 5-2.238 5-5V7c0-2.762-2.238-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10z"/>
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <div className="text-left">
                            <p className="text-white font-semibold">Ver historia en Instagram</p>
                            <p className="text-sm text-gray-300">Invitación — Agrupación Alcanza tu Estrella (SenPro)</p>
                          </div>
                        </div>
                        <a
                          href={activeVideo.watchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-pink-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow"
                        >
                          Abrir en Instagram
                        </a>
                      </div>
                    )
                  ) : (
                    <div className="relative h-full w-full">
                      <iframe
                        className="h-full w-full"
                        src={activeVideo.embedUrl}
                        title={activeVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setModalIndex(activeIndex)
                          setIsPaused(true)
                        }}
                        aria-label="Abrir video en pantalla completa"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 p-4 text-white shadow-lg"
                      >
                        ▶
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white">{activeVideo.title}</h3>
                <p className="mt-3 text-gray-300 leading-relaxed">
                  {activeVideo.description}
                </p>
                <p className="mt-3 text-sm text-gray-400">
                  {activeVideo.hashtags}
                </p>
              </div>

              <a
                href={activeVideo.watchUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
              >
                {activeVideo.platform === 'instagram' ? 'Ver en Instagram' : 'Ver en YouTube'}
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {videos.map((video, index) => (
              <button
                key={video.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all ${activeIndex === index ? 'w-10 bg-white' : 'w-3 bg-white/35 hover:bg-white/60'}`}
                aria-label={`Ir al video ${index + 1}`}
              />
            ))}
          </div>
          {modalIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => {
                setModalIndex(null)
                setIsPaused(false)
              }}
              onPointerDown={() => {
                setModalIndex(null)
                setIsPaused(false)
              }}
            >
              {/* Fixed, highly-visible close button in overlay so it never scrolls out of view */}
              <button
                ref={closeBtnRef}
                aria-label="Cerrar video"
                onClick={() => {
                  setModalIndex(null)
                  setIsPaused(false)
                }}
                className="absolute right-4 top-4 z-60 inline-flex items-center justify-center rounded-full bg-black/80 text-white px-3 py-2 text-sm font-semibold shadow-lg backdrop-blur-sm"
              >
                Cerrar
              </button>
              <div
                className="relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={videos[modalIndex].title}
              >

                {/* Instagram: show a comfortable vertical rectangle; YouTube: larger 16:9 */}
                {videos[modalIndex].platform === 'instagram' ? (
                  <div className="mx-auto rounded-md bg-zinc-900 p-3" style={{ width: 'min(92vw,420px)' }}>
                    <div style={{ aspectRatio: '9/16', width: '100%' }}>
                      <iframe
                        className="h-full w-full rounded"
                        src={videos[modalIndex].embedUrl}
                        title={videos[modalIndex].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto rounded-md bg-zinc-900 p-3" style={{ width: 'min(92vw,1000px)' }}>
                    <div style={{ aspectRatio: '16/9', width: '100%' }}>
                      <iframe
                        className="h-full w-full rounded"
                        src={`${videos[modalIndex].embedUrl}?rel=0&autoplay=1`}
                        title={videos[modalIndex].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}