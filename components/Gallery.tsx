export default function Gallery() {
  const images = [
    '/images/logo.png',
    '/images/hero-graffiti.png'
  ]
  return (
    <section id="gallery" className="py-24 bg-black/40">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Galería</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div key={i} className="bg-gray-900 rounded overflow-hidden">
              <img src={src} alt={`gallery-${i}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
