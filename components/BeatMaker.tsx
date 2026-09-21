"use client"

import { useEffect, useRef, useState } from 'react'

type TrackName = 'kick' | 'snare' | 'hat' | 'bass'

type Pattern = Record<TrackName, boolean[]>

const INITIAL_PATTERN: Pattern = {
  kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
  snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
  hat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
  bass: [true, false, false, true, false, false, true, false, true, false, false, true, false, false, true, false],
}

const TRACK_LABELS: Record<TrackName, string> = {
  kick: 'Bombo',
  snare: 'Caja',
  hat: 'Hi-hat',
  bass: 'Bass',
}

export default function BeatMaker() {
  const [pattern, setPattern] = useState<Pattern>(INITIAL_PATTERN)
  const [bpm, setBpm] = useState(92)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const audioContextRef = useRef<AudioContext | null>(null)
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

  const playKick = (context: AudioContext, time: number) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.setValueAtTime(150, time)
    oscillator.frequency.exponentialRampToValueAtTime(48, time + 0.16)
    gain.gain.setValueAtTime(0.9, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(time)
    oscillator.stop(time + 0.21)
  }

  const playNoise = (context: AudioContext, time: number, volume: number, duration: number, filterFrequency: number) => {
    const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate)
    const data = buffer.getChannelData(0)
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1

    const source = context.createBufferSource()
    const filter = context.createBiquadFilter()
    const gain = context.createGain()
    source.buffer = buffer
    filter.type = 'highpass'
    filter.frequency.value = filterFrequency
    gain.gain.setValueAtTime(volume, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration)
    source.connect(filter).connect(gain).connect(context.destination)
    source.start(time)
  }

  const playBass = (context: AudioContext, time: number) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(55, time)
    gain.gain.setValueAtTime(0.18, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(time)
    oscillator.stop(time + 0.21)
  }

  const playStep = () => {
    const context = getAudioContext()
    const step = stepRef.current
    const activePattern = patternRef.current
    const time = context.currentTime + 0.01

    if (activePattern.kick[step]) playKick(context, time)
    if (activePattern.snare[step]) playNoise(context, time, 0.3, 0.16, 1400)
    if (activePattern.hat[step]) playNoise(context, time, 0.11, 0.055, 6500)
    if (activePattern.bass[step]) playBass(context, time)

    setCurrentStep(step)
    stepRef.current = (step + 1) % 16
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
    setIsPlaying(true)
    playStep()
    timerRef.current = window.setInterval(playStep, (60_000 / bpmRef.current) / 4)
  }

  const toggleStep = (track: TrackName, step: number) => {
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
    <div className="mt-6 rounded-[1.5rem] border border-amber-500/20 bg-zinc-950/90 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.4)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-400">Mini beat lab</p>
          <h3 className="text-lg font-bold text-white">Arma tu beat</h3>
        </div>
        <button type="button" onClick={() => void togglePlayback()} className="rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-amber-300">
          {isPlaying ? 'Detener' : '▶ Reproducir'}
        </button>
      </div>

      <label className="mt-4 flex items-center gap-3 text-sm text-zinc-300">
        <span className="w-12 shrink-0 font-semibold text-amber-100">{bpm} BPM</span>
        <input type="range" min="70" max="150" value={bpm} onChange={(event) => setBpm(Number(event.target.value))} className="h-1 w-full accent-amber-400" />
      </label>

      <div className="mt-4 space-y-2">
        {(Object.keys(TRACK_LABELS) as TrackName[]).map((track) => (
          <div key={track} className="grid grid-cols-[3.5rem_repeat(16,minmax(0,1fr))] items-center gap-1">
            <span className="truncate text-[10px] font-semibold uppercase text-zinc-400">{TRACK_LABELS[track]}</span>
            {pattern[track].map((enabled, step) => (
              <button
                key={`${track}-${step}`}
                type="button"
                aria-label={`${TRACK_LABELS[track]} paso ${step + 1}`}
                aria-pressed={enabled}
                onClick={() => toggleStep(track, step)}
                className={`aspect-square rounded-sm border transition ${enabled ? 'border-amber-300 bg-amber-400' : 'border-zinc-700 bg-zinc-800/80 hover:border-zinc-400'} ${currentStep === step ? 'ring-2 ring-white' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500">Activa o desactiva los pasos y crea tu propia vuelta de 4 tiempos.</p>
    </div>
  )
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}
