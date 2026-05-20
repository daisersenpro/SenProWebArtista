import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/80 border-t border-white/10 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">SenPro</h3>
            <p className="text-sm text-gray-400">Rapero y productor de la comuna de La Reina, Santiago de Chile.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#music" className="text-gray-400 hover:text-white">Música</Link></li>
              <li><Link href="#videos" className="text-gray-400 hover:text-white">Videos</Link></li>
              <li><Link href="#bio" className="text-gray-400 hover:text-white">Historia</Link></li>
              <li><Link href="#gallery" className="text-gray-400 hover:text-white">Galería</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white">Contacto</Link></li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h4 className="font-semibold mb-4">Sígueme</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://spotify.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500">Spotify</a></li>
              <li><a href="https://www.youtube.com/@DaiserSen-Pro_1" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500">YouTube</a></li>
              <li><a href="https://www.instagram.com/senprodaiser?utm_source=qr&igsh=MTIxc2tjODJ3bXNlNg==" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500">Instagram</a></li>
              <li><a href="https://x.com/sendaiser" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400">Twitter / X</a></li>
              <li><a href="https://www.facebook.com/share/18S76y3RGY/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} SenPro. Todos los derechos reservados.</p>
            <p className="mt-4 md:mt-0">Hecho con pasión desde La Reina, Santiago.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
