"use client"

import { useEffect, useRef, useState } from 'react'

const STEPS = 16

type TrackId =
  | 'kick'
  | 'snare'
  | 'hat'
  | 'openHat'
  | 'bass'
  | 'break'
  | 'chop'
  | 'fx'

type Pattern = Record<TrackId, boolean[]>

type SampleTrack = {
  id: TrackId
  label: string
  file: string
  color: string
  volume: number
  pattern: boolean[]
}

const TRACK_COLOR_CLASSES: Record<SampleTrack['color'], { dot: string; active: string }> = {
  amber: { dot: 'bg-amber-400', active: 'border-amber-300 bg-amber-400' },
  rose: { dot: 'bg-rose-400', active: 'border-rose-300 bg-rose-400' },
  cyan: { dot: 'bg-cyan-400', active: 'border-cyan-300 bg-cyan-400' },
  sky: { dot: 'bg-sky-400', active: 'border-sky-300 bg-sky-400' },
  violet: { dot: 'bg-violet-400', active: 'border-violet-300 bg-violet-400' },
  lime: { dot: 'bg-lime-400', active: 'border-lime-300 bg-lime-400' },
  fuchsia: { dot: 'bg-fuchsia-400', active: 'border-fuchsia-300 bg-fuchsia-400' },
  orange: { dot: 'bg-orange-400', active: 'border-orange-300 bg-orange-400' },
}

const makePattern = (...activeSteps: number[]) =>
  Array.from({ length: STEPS }, (_, step) => activeSteps.includes(step))

const TRACKS: SampleTrack[] = [
  { id: 'kick', label: 'Bombo', file: 'BOMBO.wav', color: 'amber', volume: 1, pattern: makePattern(0, 3, 6, 8, 11, 14) },
  { id: 'snare', label: 'Caja', file: 'CAJA.wav', color: 'rose', volume: 0.82, pattern: makePattern(4, 12) },
  { id: 'hat', label: 'Hi-hat', file: 'HI-HAT.wav', color: 'cyan', volume: 0.62, pattern: makePattern(0, 2, 4, 6, 8, 10, 12, 14) },
  { id: 'openHat', label: 'Open hat', file: 'OPEN HAT.wav', color: 'sky', volume: 0.7, pattern: makePattern(7, 15) },
  { id: 'bass', label: 'Bajo', file: 'BAJO 1.wav', color: 'violet', volume: 0.82, pattern: makePattern(0, 6, 8, 11, 14) },
  { id: 'break', label: 'Break', file: 'BREAK 1.wav', color: 'lime', volume: 0.52, pattern: makePattern(0, 8) },
  { id: 'chop', label: 'Chop', file: 'CHOP 01.wav', color: 'fuchsia', volume: 0.58, pattern: makePattern(3, 11) },
  { id: 'fx', label: 'FX', file: 'CRASH.wav', color: 'orange', volume: 0.55, pattern: makePattern(0) },
]

const INITIAL_PATTERN: Pattern = Object.fromEntries(
  TRACKS.map((track) => [track.id, track.pattern]),
) as Pattern

const sampleUrl = (file: string) => `/sounds/beat/${encodeURIComponent(file)}`

export default function BeatMaker() {
  const [pattern, setPattern] = useState<Pattern>(INITIAL_PATTERN)
  const [bpm, setBpm] = useState(92)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [error, setError] = useState('')
  const audioContextRef = useRef<AudioContext | null>(null)
  const buffersRef = useRef<Record<string, AudioBuffer>>({})
  const timerRef = useRef<number | null>(null)
  const stepRef = useRef(0)
  const patternRef = useRef(pattern)
  const bpmRef = useRef(bpm)

  useEffect(() => {
    patternRef.current = pattern
  }, [pattern])

  useEffect(() => {
    bpmRef.current = bpm
  }, [bpm])

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContextClass()
    }
    return audioContextRef.current
  }

  const loadSamples = async (context: AudioContext) => {
    const missingTracks = TRACKS.filter((track) => !buffersRef.current[track.file])
    if (!missingTracks.length) return

    setIsLoading(true)
    setError('')
    try {
      const loaded = await Promise.all(
        missingTracks.map(async (track) => {
          const response = await fetch(sampleUrl(track.file))
          if (!response.ok) throw new Error(`No se pudo cargar ${track.file}`)
          const buffer = await context.decodeAudioData(await response.arrayBuffer())
          return [track.file, buffer] as const
        }),
      )
      loaded.forEach(([file, buffer]) => {
        buffersRef.current[file] = buffer
      })
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'No se pudieron cargar los samples.'
      setError(`${message} Revisa que los archivos estén en public/sounds/beat.`)
      throw loadError
    } finally {
      setIsLoading(false)
    }
  }

  const playSample = (track: SampleTrack, time = 0) => {
    const context = getAudioContext()
    const buffer = buffersRef.current[track.file]
    if (!buffer) return
    const source = context.createBufferSource()
    const gain = context.createGain()
    source.buffer = buffer
    gain.gain.value = track.volume
    source.connect(gain).connect(context.destination)
    source.start(time || context.currentTime)
  }

  const playStep = () => {
    const context = getAudioContext()
    const step = stepRef.current
    const time = context.currentTime + 0.01
    TRACKS.forEach((track) => {
      if (patternRef.current[track.id][step]) playSample(track, time)
    })
    setCurrentStep(step)
    stepRef.current = (step + 1) % STEPS
  }

  const stop = () => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
    setIsPlaying(false)
    setCurrentStep(-1)
    stepRef.current = 0
  }

  const togglePlayback = async () => {
    if (isPlaying) {
      stop()
      return
    }
    const context = getAudioContext()
    if (context.state === 'suspended') await context.resume()
    try {
      await loadSamples(context)
      setIsPlaying(true)
      playStep()
      timerRef.current = window.setInterval(playStep, (60_000 / bpmRef.current) / 4)
    } catch {
      setIsPlaying(false)
    }
  }

  const previewTrack = async (track: SampleTrack) => {
    const context = getAudioContext()
    if (context.state === 'suspended') await context.resume()
    try {
      await loadSamples(context)
      playSample(track)
    } catch {
      // The visible error state explains why the preview could not play.
    }
  }

  const toggleStep = (track: TrackId, step: number) => {
    setPattern((current) => ({
      ...current,
      [track]: current[track].map((enabled, index) => (index === step ? !enabled : enabled)),
    }))
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      void audioContextRef.current?.close()
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(playStep, (60_000 / bpm) / 4)
  }, [bpm, isPlaying])

  return (
    <div className="mt-6 rounded-[1.5rem] border border-amber-500/20 bg-zinc-950/95 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.4)] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-400">Channel rack · sample lab</p>
          <h3 className="text-lg font-bold text-white">Arma tu beat</h3>
          <p className="mt-1 text-xs text-zinc-500">Toca un nombre para preescuchar y activa los pasos a tu gusto.</p>
        </div>
        <button type="button" onClick={() => void togglePlayback()} disabled={isLoading} className="rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-70">
          {isLoading ? 'Cargando...' : isPlaying ? 'Detener' : '▶ Reproducir'}
        </button>
      </div>

      <label className="mt-4 flex items-center gap-3 text-sm text-zinc-300">
        <span className="w-16 shrink-0 font-semibold text-amber-100">{bpm} BPM</span>
        <input aria-label="Tempo en BPM" type="range" min="70" max="150" value={bpm} onChange={(event) => setBpm(Number(event.target.value))} className="h-1 w-full accent-amber-400" />
      </label>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="min-w-[34rem] space-y-1.5 md:min-w-0">
          <div className="grid grid-cols-[6rem_repeat(16,minmax(0,1fr))] gap-1 pl-0">
            <span className="text-[9px] uppercase tracking-wider text-zinc-600">Canal</span>
            {Array.from({ length: STEPS }, (_, step) => (
              <span key={step} className={`text-center text-[9px] ${step % 4 === 0 ? 'text-amber-500' : 'text-zinc-700'}`}>{step + 1}</span>
            ))}
          </div>
          {TRACKS.map((track) => (
            <div key={track.id} className="grid grid-cols-[6rem_repeat(16,minmax(0,1fr))] items-center gap-1">
              <button type="button" onClick={() => void previewTrack(track)} className="flex min-w-0 items-center gap-1.5 rounded px-1 py-1 text-left transition hover:bg-white/10" title={`Preescuchar ${track.file}`}>
                <span className={`h-2 w-2 shrink-0 rounded-full ${TRACK_COLOR_CLASSES[track.color].dot}`} />
                <span className="truncate text-[10px] font-semibold uppercase text-zinc-300">{track.label}</span>
              </button>
              {pattern[track.id].map((enabled, step) => (
                <button
                  key={`${track.id}-${step}`}
                  type="button"
                  aria-label={`${track.label} paso ${step + 1}`}
                  aria-pressed={enabled}
                  onClick={() => toggleStep(track.id, step)}
                  className={`aspect-square rounded-sm border transition ${enabled ? TRACK_COLOR_CLASSES[track.color].active : 'border-zinc-700 bg-zinc-800/80 hover:border-zinc-400'} ${currentStep === step ? 'ring-2 ring-white ring-offset-1 ring-offset-zinc-950' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {error && <p role="alert" className="mt-3 text-xs text-rose-400">{error}</p>}
      <p className="mt-3 text-xs text-zinc-500">Cada cuadro es un golpe de la vuelta. Los puntos de color son los samples reales de tu carpeta beat.</p>
    </div>
  )
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}
