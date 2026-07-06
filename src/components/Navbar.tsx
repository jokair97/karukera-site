'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Courses',       href: '/courses' },
  { label: 'Calendrier',    href: '/calendrier' },
  { label: 'Résultats',     href: '/resultats' },
  { label: 'Actualités',    href: '/actualites' },
  { label: 'Infos pratiques', href: '/infos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-base/95 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/karukera-logo.jpg"
            alt="Karukera"
            width={44}
            height={44}
            className="rounded-full object-cover border border-olive/40 group-hover:border-gold transition-colors"
          />
          <div className="leading-tight">
            <p className="text-gold font-heading font-bold text-sm tracking-wider uppercase">
              Hippodrome
            </p>
            <p className="text-ivory/70 text-[11px] tracking-widest uppercase">
              de Guadeloupe
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ivory/80 hover:text-gold transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/paris"
            className="ml-2 bg-gold hover:bg-gold-light text-base font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 tracking-wide"
          >
            Parier
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-ivory"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 flex flex-col gap-1 border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-ivory/80 hover:text-gold transition-colors border-b border-border/50 text-sm tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/paris"
            onClick={() => setMenuOpen(false)}
            className="mt-3 bg-gold text-base font-bold text-center py-3 rounded-full tracking-wide"
          >
            Parier
          </Link>
        </div>
      </div>
    </nav>
  )
}
