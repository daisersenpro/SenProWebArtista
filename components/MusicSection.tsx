"use client"
import { useState } from 'react'
import Image from 'next/image'

type Track = {
  id: string
  title: string
  artist?: string
  cover?: string
  spotifyUrl?: string
  appleUrl?: string
  youtubeId?: string
}

const SAMPLE_TRACKS: Track[] = [
  {
    id: 'selecto',
    title: 'Selecto',
    artist: 'SenPro',
    cover: '/images/hero-graffiti.png',
    youtubeId: 'Rku8UbjhfbE',
  },
  {
    id: 'mamacita',
    title: 'Mamacita',
    artist: 'SenPro',
    cover: '/images/hero-graffiti.png',
    youtubeId: 'DpHmVAPZ--k',
  },
  {
    id: 'en-la-cuidad',
    title: 'En La Cuidad',
    artist: 'SenPro',
    cover: '/images/hero-graffiti.png',
    youtubeId: 'yNsMXmiIHlI',
  },
]

export default function MusicSection({ tracks = SAMPLE_TRACKS }: { tracks?: Track[] }) {
  const [activeSpotify, setActiveSpotify] = useState<string | null>(null)
  const [activeYoutube, setActiveYoutube] = useState<string | null>(null)

  return (
    <section id="music" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Música</h2>
        <p className="text-gray-400 mb-6">Escucha integrado en la página o abre en tu app favorita.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <article key={t.id} className="bg-zinc-900/60 p-4 rounded-lg flex flex-col">
              <div className="flex items-center gap-4">
                <Image
                  src={getCoverSrc(t)}
                  alt={t.title}
                  width={96}
                  height={96}
                  className="rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  {t.artist && <p className="text-sm text-zinc-400">{t.artist}</p>}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {t.spotifyUrl && (
                  <>
                    <a
                      href={t.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-green-600 text-black rounded text-sm font-medium"
                    >
                      Abrir en Spotify
                    </a>

                    <button
                      onClick={() => setActiveSpotify(activeSpotify === t.id ? null : t.id)}
                      className="px-3 py-2 border rounded text-sm"
                    >
                      {activeSpotify === t.id ? 'Cerrar player' : 'Reproducir aquí (Spotify)'}
                    </button>
                  </>
                )}

                {t.appleUrl && (
                  <a
                    href={t.appleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-white/10 rounded text-sm"
                  >
                    Abrir en Apple Music
                  </a>
                )}

                {t.youtubeId && (
                  <button
                    onClick={() => setActiveYoutube(activeYoutube === t.youtubeId ? null : (t.youtubeId ?? null))}
                    className="px-3 py-2 bg-red-600 rounded text-sm"
                  >
                    {activeYoutube === t.youtubeId ? 'Cerrar vídeo' : 'Ver en YouTube'}
                  </button>
                )}
              </div>

              <div className="mt-4">
                {activeSpotify === t.id && t.spotifyUrl && (
                  <div className="aspect-[16/6]">
                    <iframe
                      src={spotifyEmbedSrc(t.spotifyUrl)}
                      width="100%"
                      height={80}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Spotify player ${t.title}`}
                      className="rounded"
                    />
                  </div>
                )}

                {activeYoutube === t.youtubeId && t.youtubeId && (
                  <div className="mt-3 aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${t.youtubeId}?rel=0`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      title={`YouTube ${t.title}`}
                      className="w-full h-full rounded"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-gray-400">Pásame las URLs públicas de Spotify/Apple/YouTube y las añado aquí.</div>
      </div>
    </section>
  )
}

function spotifyEmbedSrc(url?: string) {
  if (!url) return ''
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/').filter(Boolean)
    if (parts.length >= 2) {
      return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}`
    }
  } catch (e) {
    // fallback
  }
  return url
}

function getCoverSrc(t: Track) {
  // Prefer YouTube thumbnail when we have a youtubeId (use hqdefault for compatibility)
  if (t.youtubeId) return `https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`
  if (t.cover) return t.cover
  return '/images/hero-graffiti.png'
}
