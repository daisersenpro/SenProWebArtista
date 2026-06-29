"use client"
import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const whatsappNumber = '56949728928'
  const [sent, setSent] = useState(false)
  const [isScratchActive, setIsScratchActive] = useState(false)
  const [vinylRotation, setVinylRotation] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const scratchAudioRef = useRef<HTMLAudioElement | null>(null)
  const scratchTimerRef = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const lastPointerXRef = useRef<number | null>(null)
  const lastScratchAtRef = useRef(0)

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const ensureScratchAudio = () => {
    if (typeof window === 'undefined') return null

    if (!scratchAudioRef.current) {
      const audio = new Audio('/sounds/scratch.mp3')
      audio.preload = 'auto'
      audio.volume = 0.9
      scratchAudioRef.current = audio
    }

    return scratchAudioRef.current
  }

  const playScratch = async () => {
    const audio = ensureScratchAudio()
    if (!audio) return

    try {
      const startAt = 7
      const endAt = 8

      audio.pause()
      audio.currentTime = startAt
      await audio.play()

      window.setTimeout(() => {
        if (!audio.paused && audio.currentTime >= startAt) {
          audio.pause()
          audio.currentTime = startAt
        }
      }, (endAt - startAt) * 1000)
    } catch {
      // ignore autoplay / playback edge cases
    }
  }

  const stopScratchLoop = () => {
    setIsScratchActive(false)
    draggingRef.current = false
    lastPointerXRef.current = null

    if (scratchTimerRef.current) {
      window.clearInterval(scratchTimerRef.current)
      scratchTimerRef.current = null
    }
  }

  const triggerScratchFromMove = (deltaX: number) => {
    const now = Date.now()
    if (now - lastScratchAtRef.current < 120) return

    lastScratchAtRef.current = now

    const rotationDelta = deltaX * 0.7
    setVinylRotation((value) => value + rotationDelta)
    void playScratch()
  }

  const handleVinylPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    lastPointerXRef.current = event.clientX
    setIsScratchActive(true)

    if (scratchTimerRef.current) {
      window.clearInterval(scratchTimerRef.current)
      scratchTimerRef.current = null
    }

    void playScratch()
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleVinylPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // set subtle tilt based on pointer position over the vinyl
    try {
      const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const relX = (event.clientX - cx) / (rect.width / 2)
      const relY = (event.clientY - cy) / (rect.height / 2)
      const maxTilt = 8 // degrees
      setTilt({ x: -relY * maxTilt, y: relX * maxTilt })
    } catch {
      // ignore
    }

    if (!draggingRef.current) return

    const previousX = lastPointerXRef.current
    if (previousX === null) {
      lastPointerXRef.current = event.clientX
      return
    }

    const deltaX = event.clientX - previousX
    if (Math.abs(deltaX) < 2) return

    lastPointerXRef.current = event.clientX
    triggerScratchFromMove(deltaX)
  }

  const handleVinylPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    stopScratchLoop()
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // ignore pointer capture release errors
    }
  }

  const handleVinylPointerLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const handlePhoneChange = (value: string) => {
    // Keep only phone-friendly characters so letters never make it into state.
    setPhone(value.replace(/[^0-9+\s-]/g, ''))
  }

  useEffect(() => {
    return () => {
      if (scratchTimerRef.current) {
        window.clearInterval(scratchTimerRef.current)
      }

      scratchAudioRef.current?.pause()
    }
  }, [])

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contacto</h2>
            <p className="text-gray-400 mb-6">Escríbenos para booking, prensa o compras de merch.</p>

            {!sent ? (
              <form onSubmit={async (e) => {
                e.preventDefault()
                setErrors(null)

                // basic client-side validation
                if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
                  setErrors('Completa todos los campos requeridos.')
                  return
                }

                const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
                if (!emailRe.test(email)) {
                  setErrors('Ingresa un email válido.')
                  return
                }

                // Normalizar y validar teléfono Chile
                const rawPhone = phone.trim()
                const cleaned = rawPhone.replace(/[\s-]/g, '')
                let norm = cleaned
                if (norm.startsWith('09')) norm = '+56' + norm.slice(1)
                else if (norm.startsWith('9')) norm = '+56' + norm
                else if (norm.startsWith('56')) norm = '+' + norm

                const phoneRe = /^\+569\d{8}$/
                if (!phoneRe.test(norm)) {
                  setErrors('Número inválido. Ejemplo válido: +56 9 1234 5678')
                  return
                }

                if (message.trim().length < 10) {
                  setErrors('El mensaje debe tener al menos 10 caracteres.')
                  return
                }

                if (!category) {
                  setErrors('Selecciona un motivo de contacto.')
                  return
                }

                setLoading(true)

                try {
                  const body = [
                    'Hola, quiero hacer una consulta:',
                    `Nombre: ${name.trim()}`,
                    `Email: ${email.trim()}`,
                    `Teléfono: ${norm}`,
                    `Motivo: ${category}`,
                    `Mensaje: ${message.trim()}`,
                  ].join('\n')

                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`
                  window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

                  setSent(true)
                  setName('')
                  setEmail('')
                  setPhone('')
                  setMessage('')
                } catch (err) {
                  setErrors('No se pudo abrir WhatsApp. Revisa que el navegador no bloquee ventanas emergentes.')
                } finally {
                  setLoading(false)
                }
              }} className="max-w-xl">
                {errors && <div className="mb-3 text-red-400">{errors}</div>}

                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Nombre</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 mb-3 bg-gray-900 rounded" placeholder="Ej: Juan Pérez" required />

                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full p-3 mb-3 bg-gray-900 rounded" placeholder="ejemplo@correo.com" required />

                <label htmlFor="phone" className="block text-sm text-gray-300 mb-1">Teléfono</label>
                <input id="phone" type="tel" inputMode="numeric" autoComplete="tel" value={phone} onChange={(e) => handlePhoneChange(e.target.value)} className="w-full p-3 mb-3 bg-gray-900 rounded" placeholder="+56 9 1234 5678" required />

                <label htmlFor="category" className="block text-sm text-gray-300 mb-1">Motivo</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 mb-3 bg-gray-900 rounded">
                  <option value="">--Ninguno--</option>
                  <option value="Contratación">Contratación</option>
                  <option value="Colaboraciones">Colaboraciones</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Prensa">Prensa</option>
                  <option value="Merch">Merch</option>
                </select>

                <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Mensaje</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 mb-3 bg-gray-900 rounded" placeholder="Ej: Hola, quiero consultar sobre booking para el 12/06..." rows={5} required />

                <button disabled={loading} className="px-4 py-2 bg-white text-black rounded">{loading ? 'Abriendo WhatsApp…' : 'Enviar por WhatsApp'}</button>
              </form>
            ) : (
              <div className="text-green-400">Se abrió WhatsApp con tu mensaje listo para enviar.</div>
            )}
          </div>

          <div
            className="group relative mx-auto w-full max-w-[420px] cursor-pointer select-none"
            onPointerLeave={stopScratchLoop}
            onFocus={() => setIsScratchActive(true)}
            onBlur={stopScratchLoop}
            tabIndex={0}
            role="img"
            aria-label="Tornamesa con vinilo animado"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/20 bg-[radial-gradient(ellipse_at_top_left,#050505_0%,#070707_30%,#030303_100%)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 pointer-events-none grain" />

              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="mt-1 text-xl font-extrabold text-amber-50 tracking-tight">Scratch Session</h3>
                  <img src="/images/logo.png" alt="SenPro" className="mt-3 h-12 sm:h-14 w-auto" />
                </div>
                <div className="rounded-full border border-amber-400/30 bg-amber-600/10 px-3 py-1 text-xs text-amber-200">
                  {isScratchActive ? 'SONANDO' : 'LISTO'}
                </div>
              </div>

              {/* logo moved below title */}

              <div className="mt-8 flex items-center justify-center">
                <div
                  className="relative h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,#0b0b0b_0%,#060606_55%,#000_100%)] shadow-[inset_0_0_0_12px_rgba(255,255,255,0.02),0_0_60px_rgba(0,0,0,0.7)] will-change-transform"
                  style={{
                    transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  }}
                  onPointerDown={handleVinylPointerDown}
                  onPointerMove={handleVinylPointerMove}
                  onPointerUp={handleVinylPointerUp}
                  onPointerCancel={handleVinylPointerUp}
                  onLostPointerCapture={handleVinylPointerUp}
                  onPointerLeave={handleVinylPointerLeave}
                >
                  <div
                    className="vinyl-spin pointer-events-none absolute inset-4 rounded-full bg-[conic-gradient(from_0deg,#1f1f1f_0deg,#111_40deg,#272727_80deg,#090909_140deg,#1b1b1b_200deg,#111_260deg,#2a2a2a_320deg,#111_360deg)] shadow-inner ring-1 ring-amber-800/20"
                    style={{ transform: `rotate(${vinylRotation}deg)` }}
                  />
                  <div className="pointer-events-none absolute inset-[22px] rounded-full border border-white/5" />
                  <div className="pointer-events-none absolute inset-[70px] rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 shadow-[0_0_0_10px_rgba(255,255,255,0.03)]" />
                  <div
                    className="pointer-events-none absolute left-1/2 top-[10px] h-[170px] w-[18px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-700 shadow-lg"
                    style={{ transform: `rotate(${isScratchActive ? 18 : 32}deg)` }}
                  />
                  <div className="pointer-events-none absolute left-[58%] top-[62px] h-7 w-7 rounded-full border border-white/20 bg-black shadow-[0_0_18px_rgba(255,255,255,0.12)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vinyl-spin {
          animation: vinyl-rotate 6s linear infinite;
          touch-action: none;
          cursor: grab;
          will-change: transform;
        }

        .vinyl-spin:active {
          cursor: grabbing;
          animation-duration: 1.1s;
        }

        @keyframes vinyl-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .grain {
          background-image: radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 3px 3px, 6px 6px;
          mix-blend-mode: overlay;
          opacity: 0.6;
        }

        .sticker {
          display: inline-block;
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45));
          opacity: 0.95;
          border-radius: 6px;
          background: transparent;
        }
      `}</style>
    </section>
  )
}
