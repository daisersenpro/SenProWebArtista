"use client"

import { useState } from 'react'

type VideoItem = {
  title: string
  description: string
  hashtags: string
  embedUrl: string
  watchUrl: string
}

const videos: VideoItem[] = [
  {
    title: '¡Ahora Caigo! | Participación de SenPro',
    description:
      'Extracto de la participación de Anyelo SenPro en el programa de concurso chileno Ahora Caigo de TVN.',
    hashtags: '#AhoraCaigo #TVN #SenPro #Chile #Concurso #Televisión',
    embedUrl: 'https://www.youtube.com/embed/DrBnSsPCZ6I',
    watchUrl: 'https://www.youtube.com/watch?v=DrBnSsPCZ6I',
  },
  {
    title: 'Fue suavecito | Duelo de combos se toma The Floor Chile',
    description:
      'Un momento entretenido en The Floor Chile donde mostraron una faceta más marcial y técnica de SenPro, con combos suaves y buena vibra en pantalla.',
    hashtags: '#TheFloorChile #TVN #SenPro #Chile #ArtesMarciales #Televisión',
    embedUrl: 'https://www.youtube.com/embed/oZSNMt8MeRM',
    watchUrl: 'https://youtube.com/shorts/oZSNMt8MeRM',
  },
]

export default function VideosSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeVideo = videos[activeIndex]

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
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Video anterior"
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/80 p-3 text-white shadow-lg transition hover:bg-black md:flex"
          >
            <span className="text-xl leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Video siguiente"
            className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/80 p-3 text-white shadow-lg transition hover:bg-black md:flex"
          >
            <span className="text-xl leading-none">›</span>
          </button>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="relative aspect-video bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
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
                Ver en YouTube
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
        </div>
      </div>
    </section>
  )
}