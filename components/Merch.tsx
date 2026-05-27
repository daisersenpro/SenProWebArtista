"use client"
import { useState, useEffect, useRef } from 'react'

const WHATSAPP_NUMBER = '56949728928'

const colors = [
  { id: 'white', label: 'Blanco' },
  { id: 'blue', label: 'Azul' },
  { id: 'green', label: 'Verde' },
  { id: 'cream', label: 'Crema' },
  { id: 'gray', label: 'Gris' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']

export default function Merch() {
  const [color, setColor] = useState<string | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setModalOpen(false)
    }
    if (modalOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  const [poleraColor, setPoleraColor] = useState<string | null>(null)
  const [poleraSize, setPoleraSize] = useState<string | null>(null)
  const [poleraModalOpen, setPoleraModalOpen] = useState<boolean>(false)
  const poleraImg = '/images/merch/polera.png'
  const poleraTitle = 'Polera Premium'
  const poleraPrice = '24.990 CLP'
  const poleraSizes = ['S', 'M', 'L', 'XL', 'XXL']

  const waMessagePolera = () => {
    const selected = `Talla: ${poleraSize ?? '-'}, Color: ${poleraColor ?? '-'}`
    const text = `Hola, quiero comprar la ${poleraTitle} - ${selected}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }

  const productTitle = 'Polerón SenPro'
  const price = '38.990 CLP'
  const img = '/images/merch/poleron.png'

  const waMessage = () => {
    const selected = `Talla: ${size ?? '-'}, Color: ${color ?? '-'}`
    const text = `Hola, quiero comprar el ${productTitle} - ${selected}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="merch" className="py-24 bg-black/30">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Merch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Polerón SenPro */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full rounded mb-4 overflow-hidden block"
              aria-label={`Ver imagen grande ${productTitle}`}
            >
              <img src={img} alt={productTitle} className="w-full h-80 object-cover rounded" />
            </button>
            <h3 className="text-xl font-semibold mb-1">{productTitle}</h3>
            <div className="text-gray-400 mb-3">{price}</div>
            <p className="text-gray-400 mb-4">Polerón oficial SenPro — algodón premium, corte unisex.</p>

            <div className="mb-4">
              <div className="text-sm text-zinc-300 mb-2">Colores</div>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setColor(c.label)}
                    className={`px-3 py-2 rounded border ${color === c.label ? 'ring-2 ring-emerald-400' : 'border-zinc-700'}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-zinc-300 mb-2">Talla</div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-2 rounded border ${size === s ? 'ring-2 ring-emerald-400' : 'border-zinc-700'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={waMessage()}
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2 rounded bg-green-600 text-black font-semibold ${(!size || !color) ? 'opacity-60 pointer-events-none' : ''}`}
              >
                Comprar por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => { setColor(null); setSize(null) }}
                className="px-4 py-2 border rounded"
              >
                Limpiar
              </button>
            </div>
          </div>

          {/* Polera Dogo Premium */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-900 p-6 rounded-lg h-full flex flex-col justify-between">
              <button
                type="button"
                onClick={() => setPoleraModalOpen(true)}
                className="w-full mb-4 overflow-hidden rounded block"
                aria-label={`Ver imagen ${poleraTitle}`}
              >
                <img src={poleraImg} alt={poleraTitle} className="w-full h-80 object-cover rounded" />
              </button>

              <div>
                <div className="font-semibold">{poleraTitle}</div>
                <div className="text-gray-400">{poleraPrice}</div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-zinc-300 mb-2">Colores</div>
                <div className="flex gap-2">
                  {colors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setPoleraColor(c.label)}
                      className={`px-2 py-1 rounded border text-sm ${poleraColor === c.label ? 'ring-2 ring-emerald-400' : 'border-zinc-700'}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-zinc-300 mb-2">Talla</div>
                <div className="flex gap-2 flex-wrap">
                  {poleraSizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setPoleraSize(s)}
                      className={`px-2 py-1 rounded border text-sm ${poleraSize === s ? 'ring-2 ring-emerald-400' : 'border-zinc-700'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <a
                  href={waMessagePolera()}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-3 py-2 rounded bg-green-600 text-black text-sm font-semibold ${(!poleraSize || !poleraColor) ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  Comprar por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => { setPoleraColor(null); setPoleraSize(null) }}
                  className="px-3 py-2 border rounded text-sm"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Polerón */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            ref={modalRef}
            className="max-w-3xl w-full bg-zinc-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-4 border-b border-zinc-800">
              <div>
                <div className="font-semibold">{productTitle}</div>
                <div className="text-sm text-zinc-400">{price}</div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Cerrar"
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded bg-white/5 hover:bg-white/10"
              >
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Cerrar</span>
              </button>
            </div>
            <div className="p-4">
              <img src={img} alt={productTitle} className="w-full max-h-[80vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Modal Polera */}
      {poleraModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setPoleraModalOpen(false)}
        >
          <div
            className="max-w-3xl w-full bg-zinc-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-4 border-b border-zinc-800">
              <div>
                <div className="font-semibold">{poleraTitle}</div>
                <div className="text-sm text-zinc-400">{poleraPrice}</div>
              </div>
              <button
                onClick={() => setPoleraModalOpen(false)}
                aria-label="Cerrar"
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded bg-white/5 hover:bg-white/10"
              >
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Cerrar</span>
              </button>
            </div>
            <div className="p-4">
              <img src={poleraImg} alt={poleraTitle} className="w-full max-h-[80vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


