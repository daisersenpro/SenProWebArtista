"use client"

import { useState } from 'react'

type VideoItem = {
  id: string
  title: string
  thumbnail: string
  src: string
  page?: string
  provider?: 'youtube' | 'instagram' | 'file'
  orientation?: 'portrait' | 'landscape'
  embeddable?: boolean
}

export default function Videos() {
  const featured: VideoItem[] = [
    {
      id: 'short-1',
      title: 'The Floor Chile',
      thumbnail: 'https://scontent.cdninstagram.com/v/t51.82787-15/562394337_17939564994070315_5304927930571751209_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=Sy59ObvNHdYQ7kNvwHx8gQn&_nc_oc=AdogQmqdJzQzloEurrV6k1MxVBpZav8tdDhH1stPKlnEBth95hb3tNwl0BQCHH_VPxk&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=mAuG4GQFeE38Zg14bXUl0w&_nc_ss=7c60f&oh=00_Af5ysgwH-K-3IJwZag2WeH-QaHqLAVrruZ8hs1raovPNWA&oe=6A1431E2',
      src: 'https://www.instagram.com/reel/DPozJoVDkL9/embed/captioned/',
      provider: 'instagram',
      orientation: 'portrait',
      embeddable: true
    },
    {
      id: 'now-i-fall-1',
      title: 'Ahora Caigo TVN',
      thumbnail: '/images/ahora-caigo-poster.jpg',
      src: '/videos/ahora-caigo-senpro.mp4',
      provider: 'file',
      orientation: 'landscape'
    },
    {
      id: 'tocata-1',
      title: 'Tocata en vivo',
      thumbnail: '/images/gallery/live-1.jpg',
      src: '/videos/tocata-1.mp4',
      provider: 'file',
      orientation: 'landscape'
    },
    {
      id: 'tocata-conmemorativo',
      title: 'Conmemorativo: Cristian G y Flaco R',
      thumbnail: 'https://scontent.cdninstagram.com/v/t51.71878-15/497128515_1208230477373104_5868942483490244625_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=101&_nc_ohc=OOhx2M-dUTsQ7kNvwEmZ4oL&_nc_oc=AdpLCF_lAGcf-Ty2KIMszDqI4iB1EaIInPpdQBGrpPrK4LhQE2gezlVNeTXjXMkT-jo&_nc_ht=scontent.cdninstagram.com&oh=00_Af51rpDg6-5Cj5T49EfwIxu-xHDs83l4N0dzNzzb1YwsbA&oe=6A143130',
      src: 'https://www.instagram.com/reel/C75NMVAgty0/embed/captioned/',
      page: 'https://www.instagram.com/reel/C75NMVAgty0/',
      provider: 'instagram',
      orientation: 'landscape',
      embeddable: true
    },
    {
      id: 'the-flor-1',
      title: 'The Flor',
      thumbnail: 'https://via.placeholder.com/800x450?text=The+Flor',
      src: 'https://www.youtube-nocookie.com/embed/oZSNMt8MeRM',
      provider: 'youtube',
      orientation: 'landscape',
      embeddable: false
    }
  ]
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  function openVideo(v: VideoItem) {
    setActiveVideo(v)
    setModalOpen(true)
  }

  function closeVideo() {
    setModalOpen(false)
    window.setTimeout(() => setActiveVideo(null), 180)
  }

  function renderCardMedia(video: VideoItem) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>SenPro</span>
            <span className="rounded-full bg-white/15 px-2 py-1 backdrop-blur-sm">Video</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="videos" className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Videos</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Video destacado</h3>
          <p className="text-sm text-gray-400">Preview YouTube — en construcción</p>
        </div>

        {/* 3 tarjetas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((f) => (
            <button
              key={f.id}
              onClick={() => openVideo(f)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900 text-left shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="px-4 pt-4">
                <h3 className="text-base font-semibold leading-tight text-white">{f.title}</h3>
              </div>

              <div className="aspect-square w-full">
                {renderCardMedia(f)}
              </div>

              <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
            </button>
          ))}
        </div>

        {activeVideo && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-200 ${
              modalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={closeVideo}
          >
            <div
              className={`w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl transition-transform duration-200 ${
                modalOpen ? 'scale-100' : 'scale-95'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 text-white">
                <div>
                  <h4 className="text-sm font-semibold">{activeVideo.title}</h4>
                  <p className="text-xs text-white/60">Reproducción en primer plano</p>
                </div>
                <button onClick={closeVideo} className="rounded bg-white/10 px-3 py-1 text-sm">
                  Cerrar
                </button>
              </div>
              <div className={activeVideo.orientation === 'portrait' ? 'mx-auto aspect-[9/16] w-full max-w-[360px]' : 'aspect-video w-full'}>
                {activeVideo.provider === 'instagram' ? (
                  activeVideo.embeddable ? (
                    <iframe
                      src={activeVideo.src}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <a
                        href={activeVideo.page || activeVideo.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-full w-full block"
                      >
                        <img src={activeVideo.thumbnail} alt={activeVideo.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full bg-black/50 p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" className="text-white fill-current">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                ) : activeVideo.provider === 'youtube' ? (
                  activeVideo.embeddable ? (
                    <iframe
                      src={`${activeVideo.src}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-4 text-center text-sm text-gray-200">
                      Este video no permite embed.
                    </div>
                  )
                ) : (
                  <video
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    poster={activeVideo.thumbnail}
                    className="h-full w-full"
                  >
                    <source src={activeVideo.src} />
                    Tu navegador no soporta reproducción de video.
                  </video>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
