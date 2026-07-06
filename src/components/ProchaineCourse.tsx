import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { prochaineCourseQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { Course } from '@/sanity/types'

const FALLBACK: Course = {
  _id:            'fallback',
  nom:            'Grand Prix de la Guadeloupe',
  date:           '2026-07-19T14:30:00',
  lieu:           'Hippodrome de Jarry, Baie-Mahault',
  discipline:     'Plat',
  distanceMetres: 2000,
  partantsCount:  12,
  categorie:      'Groupe I',
  allocation:     '150 000 €',
  description:    "Le Grand Prix de la Guadeloupe est l'épreuve reine de la saison. Réservée aux meilleurs chevaux de l'île, cette course de prestige réunit chaque année les plus grands noms du galop antillais dans une ambiance exceptionnelle.",
}

export default async function ProchaineCourse() {
  const data: Course | null = await client.fetch(
    prochaineCourseQuery,
    {},
    { next: { revalidate: 60 } }
  )
  const c = data ?? FALLBACK

  const dateStr = new Date(c.date).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const heureStr = new Date(c.date).toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit',
  })

  const stats = [
    { label: 'Distance',   value: c.distanceMetres ? `${c.distanceMetres.toLocaleString('fr-FR')} m` : '—' },
    { label: 'Discipline', value: c.discipline   ?? '—' },
    { label: 'Partants',   value: c.partantsCount ? `${c.partantsCount} chevaux` : '—' },
    { label: 'Catégorie',  value: c.categorie    ?? '—' },
    { label: 'Allocation', value: c.allocation   ?? '—' },
    { label: 'Départ',     value: heureStr },
  ]

  return (
    <section className="bg-surface py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-2 font-medium">À ne pas manquer</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ivory">Prochaine course</h2>
          </div>
          <Link href="/courses" className="text-gold hover:text-gold-light text-sm tracking-wide border-b border-gold/30 hover:border-gold transition-colors self-start md:self-auto">
            Voir tous les partants →
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 md:h-auto min-h-[280px]">
              {c.image?.asset ? (
                <Image
                  src={urlFor(c.image).width(800).height(600).url()}
                  alt={c.image.alt ?? c.nom}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-olive/20 via-surface to-lagoon/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">🏇</div>
                    <p className="text-mist text-xs tracking-widest uppercase">Photo à venir</p>
                  </div>
                </div>
              )}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-lagoon" />
            </div>

            {/* Détails */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                {c.categorie && (
                  <span className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs px-3 py-1 rounded-full mb-4 tracking-wide">
                    {c.categorie}
                  </span>
                )}
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-ivory mb-2">{c.nom}</h3>
                <p className="text-lagoon text-sm mb-1 capitalize">{dateStr} • {heureStr}</p>
                <p className="text-mist text-xs mb-6">{c.lieu}</p>
                {c.description && (
                  <p className="text-ivory/70 text-sm leading-relaxed mb-8">{c.description}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-surface rounded-lg p-3 text-center">
                    <p className="text-gold font-heading font-bold text-base">{s.value}</p>
                    <p className="text-mist text-[10px] tracking-wide uppercase mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
