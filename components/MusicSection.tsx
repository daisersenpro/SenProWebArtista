"use client"
import Link from 'next/link'

export default function MusicSection() {
  return (
    <section id="music" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Música</h2>
        <p className="text-gray-400 mb-6">Escucha en todas las plataformas:</p>

        <div className="flex flex-wrap gap-4 items-center">
          <a href="#" className="px-4 py-2 bg-white text-black rounded">Spotify</a>
          <a href="#" className="px-4 py-2 border border-white rounded">Apple Music</a>
          <a href="#" className="px-4 py-2 border border-white rounded">YouTube Music</a>
        </div>

        <div className="mt-8 text-gray-400">Si quieres que enlace a una canción o playlist específica, pásame la URL.</div>
      </div>
    </section>
  )
}
