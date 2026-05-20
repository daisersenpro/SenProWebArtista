"use client"
import { useState } from 'react'

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
    spotifyUrl: 'https://open.spotify.com/intl-es/track/6Jqu1docD0gSErK8vgnNei?si=6b957861adb04a09',
    appleUrl: 'https://music.apple.com/cl/song/selecto-feat-sailrapper-shinnius/1854058945',
    youtubeId: 'Rku8UbjhfbE',
  },
  {
    id: 'mamacita',
    title: 'Mamacita',
    artist: 'SenPro',
    cover: '/images/hero-graffiti.png',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/1UhqFJN8cDWZ7NK6vLstIl?si=b8af955d617c4c08',
    appleUrl: 'https://music.apple.com/cl/album/mamacita-feat-kogollete-single/1826673645',
    youtubeId: 'DpHmVAPZ--k',
  },
  {
    id: 'en-la-cuidad',
    title: 'En La Cuidad',
    artist: 'SenPro',
    cover: '/images/hero-graffiti.png',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/7eGlePIv2I2c5wgwTuKVWi?si=e45d681559f74306',
    appleUrl: 'https://music.apple.com/cl/song/en-la-ciudad/1793143469',
    youtubeId: 'yNsMXmiIHlI',
  },
]

export default function MusicSection({ tracks = SAMPLE_TRACKS }: { tracks?: Track[] }) {
  const [activeSpotify, setActiveSpotify] = useState<string | null>(null)
  const [activeYoutube, setActiveYoutube] = useState<string | null>(null)
  const [activeApple, setActiveApple] = useState<string | null>(null)
  return (
    <section id="music" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Música</h2>
        <p className="text-gray-400 mb-6">Escucha integrado en la página o abre en tu app favorita.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <article key={t.id} className="bg-zinc-900/60 p-4 rounded-lg flex flex-col">
              <div className="flex items-center gap-4">
                <div
                  className="relative h-24 w-24 overflow-hidden rounded bg-zinc-800 bg-cover bg-center"
                  style={{ backgroundImage: `url(${getCoverSrc(t)})` }}
                  aria-label={t.title}
                >
                  <div className="absolute inset-0 bg-black/35" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold">{t.title}</h3>
                  {t.artist && <p className="text-sm text-zinc-400">{t.artist}</p>}
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {t.spotifyUrl && (
                  <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-3">
                    <div className="flex items-center gap-3">
                      <MusicBadge variant="spotify" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-emerald-100">Spotify</p>
                        <p className="text-xs text-zinc-400">Escúchalo dentro de la web</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
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
                        className="px-3 py-2 border border-emerald-400/30 rounded text-sm"
                      >
                        {activeSpotify === t.id ? 'Cerrar player' : 'Reproducir aquí'}
                      </button>
                    </div>

                    {activeSpotify === t.id && (
                      <div className="mt-3 h-[152px] overflow-hidden rounded">
                        <iframe
                          src={spotifyEmbedSrc(t.spotifyUrl)}
                          width="100%"
                          height={152}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          title={`Spotify player ${t.title}`}
                          className="h-full w-full rounded"
                        />
                      </div>
                    )}
                  </div>
                )}

                {t.youtubeId && (
                  <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-3">
                    <div className="flex items-center gap-3">
                      <MusicBadge variant="youtube" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-red-100">YouTube</p>
                        <p className="text-xs text-zinc-400">Video oficial o visualizer</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveYoutube(activeYoutube === t.youtubeId ? null : (t.youtubeId ?? null))}
                        className="px-3 py-2 bg-red-600 rounded text-sm"
                      >
                        {activeYoutube === t.youtubeId ? 'Cerrar vídeo' : 'Ver en YouTube'}
                      </button>
                    </div>

                    {activeYoutube === t.youtubeId && (
                      <div className="mt-3 aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${t.youtubeId}?rel=0`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          title={`YouTube ${t.title}`}
                          className="h-full w-full rounded"
                        />
                      </div>
                    )}
                  </div>
                )}

                {t.appleUrl && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center gap-3">
                      <MusicBadge variant="apple" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">Apple Music</p>
                        <p className="text-xs text-zinc-400">Abre la canción en Apple Music</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={t.appleUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-white text-black rounded text-sm font-medium"
                      >
                        Abrir en Apple Music
                      </a>

                      <button
                        onClick={() => setActiveApple(activeApple === t.id ? null : t.id)}
                        className="px-3 py-2 border rounded text-sm"
                      >
                        {activeApple === t.id ? 'Cerrar player' : 'Reproducir aquí'}
                      </button>
                    </div>

                    {activeApple === t.id && (
                      <div className="mt-3 overflow-hidden rounded">
                        <iframe
                          src={appleEmbedSrc(t.appleUrl)}
                          width="100%"
                          height={170}
                          allow="autoplay; fullscreen"
                          loading="lazy"
                          title={`Apple Music ${t.title}`}
                          className="w-full rounded"
                        />
                      </div>
                    )}
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
    const typeIndex = parts.findIndex((part) => part === 'track' || part === 'album' || part === 'playlist')
    if (typeIndex >= 0 && parts[typeIndex + 1]) {
      return `https://open.spotify.com/embed/${parts[typeIndex]}/${parts[typeIndex + 1]}`
    }
  } catch (e) {
    // fallback
  }
  return url
}

function appleEmbedSrc(url?: string) {
  if (!url) return ''
  try {
    const u = new URL(url)
    // Embed endpoint mirrors pathname + search
    return `https://embed.music.apple.com${u.pathname}${u.search}`
  } catch (e) {
    return url || ''
  }
}

function getCoverSrc(t: Track) {
  if (t.cover) return t.cover
  return '/images/hero-graffiti.png'
}

type MusicBadgeProps = { variant: 'youtube' | 'spotify' | 'apple' }
function MusicBadge({ variant }: MusicBadgeProps) {
  const isYoutube = variant === 'youtube'
  const isApple = variant === 'apple'
  const labelFinal = isYoutube ? 'YouTube' : isApple ? 'Apple Music' : 'Spotify'
  const accent = isYoutube ? 'bg-black/35' : isApple ? 'bg-white/5' : 'bg-emerald-500/20'
  const ring = isYoutube ? 'ring-white/15' : isApple ? 'ring-white/10' : 'ring-emerald-300/20'
  const iconClass = isYoutube ? 'fill-white/90' : isApple ? 'fill-white/90' : 'fill-emerald-200/90'

  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${accent} backdrop-blur-[1px] ring-1 ${ring}`}>
      {isYoutube ? (
        <svg viewBox="0 0 24 24" className={`h-6 w-6 ${iconClass}`} aria-hidden>
          <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28.4 28.4 0 0 0 2 12a28.4 28.4 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 22 12a28.4 28.4 0 0 0-.4-4.8ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" />
        </svg>
      ) : isApple ? (
        <svg viewBox="0 0 24 24" className={`h-5 w-5 ${iconClass}`} aria-hidden>
          <path d="M16.365 1.43c-.74.87-1.66 1.47-2.72 1.47-.12 0-.24-.01-.36-.02-.08 0-.21.01-.29.01-.98.06-2.03.6-2.68 1.36-.58.66-.98 1.5-.98 2.44 0 .1 0 .2.01.3.01.23.05.45.12.67.01.04.02.08.03.12.07.24.16.47.28.69.12.22.26.42.41.62.27.35.58.66.94.93.45.33.96.61 1.51.8.58.21 1.19.33 1.81.35.34.01.69.01 1.03.01.66 0 1.31-.02 1.96-.06.45-.03.9-.08 1.33-.15.39-.07.77-.16 1.13-.28.16-.05.3-.11.45-.17.12-.05.23-.11.35-.17.1-.05.2-.11.3-.17.19-.12.38-.25.57-.39.14-.1.28-.21.4-.32.14-.12.28-.24.4-.37.02-.02.04-.03.06-.05-.11.63-.26 1.25-.45 1.85-.4 1.29-1.07 2.45-1.96 3.41-.1.11-.2.21-.31.3-.22.18-.45.34-.69.48-.26.14-.52.26-.79.36-.42.17-.85.3-1.29.39-.56.12-1.12.2-1.69.24-.68.05-1.37.06-2.05.03-.79-.04-1.58-.12-2.34-.26-.86-.15-1.7-.37-2.49-.67-.17-.06-.33-.12-.5-.19-.3-.12-.59-.26-.87-.41-.18-.1-.35-.2-.52-.31-.09-.06-.18-.11-.27-.17-.12-.08-.24-.16-.36-.25-.16-.11-.31-.22-.46-.33-.1-.07-.21-.15-.31-.23 1.07-1.63 1.8-3.52 2.09-5.56.03-.24.05-.49.06-.73.01-.22.01-.44.01-.66 0-.92-.17-1.84-.5-2.65-.12-.3-.26-.59-.43-.86.9-.02 1.78.33 2.5.99.84.77 1.32 1.83 1.32 2.94 0 .42-.06.83-.17 1.22.74-.24 1.46-.6 2.11-1.06.66-.48 1.22-1.06 1.64-1.73.11-.17.21-.35.3-.53z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className={`h-5 w-5 ${iconClass}`} aria-hidden>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.6 14.2a.7.7 0 0 1-1 .2 6.8 6.8 0 0 0-3.7-1.1 6.9 6.9 0 0 0-2.9.6.7.7 0 0 1-.9-.3.7.7 0 0 1 .3-.9 8.4 8.4 0 0 1 3.5-.7 8.3 8.3 0 0 1 4.3 1.2.7.7 0 0 1 .4.7Zm1.1-2.6a.8.8 0 0 1-1.1.2 8.9 8.9 0 0 0-5-1.5 9.1 9.1 0 0 0-4 .9.8.8 0 0 1-1-.3.8.8 0 0 1 .3-1 10.8 10.8 0 0 1 4.7-1.1 10.7 10.7 0 0 1 5.7 1.7.8.8 0 0 1 .4 1.1Zm.1-2.8a.8.8 0 0 1-1.1.2 11.9 11.9 0 0 0-5.8-1.5 12.1 12.1 0 0 0-4.6.9.8.8 0 0 1-1-.4.8.8 0 0 1 .4-1 13.6 13.6 0 0 1 5.2-1 13.4 13.4 0 0 1 6.4 1.6.8.8 0 0 1 .5 1.2Z" />
        </svg>
      )}
      <span className="sr-only">{labelFinal}</span>
    </div>
  )
}
