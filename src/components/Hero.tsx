'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Course } from '@/sanity/types'

interface HeroProps {
  course?: Course | null
}

interface Countdown {
  jours: number
  heures: number
  minutes: number
  secondes: number
}

function getCountdown(target: Date): Countdown {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 }
  return {
    jours:    Math.floor(diff / 86400000),
    heures:   Math.floor((diff / 3600000) % 24),
    minutes:  Math.floor((diff / 60000) % 60),
    secondes: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-card border border-border rounded-xl w-16 h-16 md:w-24 md:h-24 flex items-center justify-center shadow-lg shadow-black/40">
        <span className="font-heading text-2xl md:text-4xl font-bold text-gold tabular-nums leading-none">
          {pad(value)}
        </span>
      </div>
      <span className="mt-2 text-mist text-[10px] md:text-xs tracking-[0.2em] uppercase">{label}</span>
    </div>
  )
}

export default function Hero({ course }: HeroProps) {
  const raceDate = course?.date
    ? new Date(course.date)
    : new Date('2026-07-19T14:30:00')

  const [countdown, setCountdown] = useState<Countdown>(getCountdown(raceDate))

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown(raceDate)), 1000)
    return () => clearInterval(timer)
  }, [raceDate])

  const raceName  = course?.nom       ?? 'Grand Prix de la Guadeloupe'
  const raceLieu  = course?.lieu      ?? 'Hippodrome de Jarry — Baie-Mahault'
  const raceType  = course?.discipline ?? 'Plat'
  const raceDist  = course?.distanceMetres ? `${course.distanceMetres.toLocaleString('fr-FR')} m` : '2 000 m'
  const raceCount = course?.partantsCount ?? 12

  const dateStr = raceDate.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const heureStr = raceDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_#4a682818_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_20%,_#5aabb012_0%,_transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#5aabb0 1px, transparent 1px), linear-gradient(90deg, #5aabb0 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent" />

      <div className="relative z-10 px-6 max-w-4xl mx-auto pt-20">
        <p className="text-lagoon text-xs tracking-[0.45em] uppercase mb-8 font-medium">
          Association de courses de Guadeloupe
        </p>

        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold text-ivory leading-tight mb-1">
          Hippodrome de
        </h1>
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold text-gold leading-tight mb-10">
          Guadeloupe
        </h1>

        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-gold/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent via-gold to-gold/50" />
        </div>

        <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-3 font-medium">
          Prochaine course
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-ivory font-semibold mb-2">
          {raceName}
        </h2>
        <p className="text-mist text-sm mb-1 capitalize">{dateStr} à {heureStr}</p>
        <p className="text-mist text-xs mb-8">{raceLieu}</p>

        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {[raceType, raceDist, `${raceCount} partants`].map((b) => (
            <span key={b} className="border border-olive/50 text-ivory/70 text-xs px-3 py-1 rounded-full tracking-wide">
              {b}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-center gap-3 md:gap-5 mb-12">
          <CountdownBox value={countdown.jours}    label="Jours"   />
          <span className="text-gold text-3xl md:text-4xl font-light pb-7">:</span>
          <CountdownBox value={countdown.heures}   label="Heures"  />
          <span className="text-gold text-3xl md:text-4xl font-light pb-7">:</span>
          <CountdownBox value={countdown.minutes}  label="Min"     />
          <span className="text-gold text-3xl md:text-4xl font-light pb-7">:</span>
          <CountdownBox value={countdown.secondes} label="Sec"     />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/courses" className="bg-gold hover:bg-gold-light text-base font-bold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 text-sm tracking-wider">
            Voir le programme
          </Link>
          <Link href="/calendrier" className="border border-lagoon/40 hover:border-lagoon text-lagoon hover:bg-lagoon/10 px-8 py-4 rounded-full transition-all duration-200 text-sm tracking-wider">
            Calendrier complet
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-mist text-[10px] tracking-[0.3em] uppercase">Défiler</span>
        <div className="w-px h-8 bg-gradient-to-b from-mist/50 to-transparent animate-bounce" />
      </div>
    </section>
  )
}
