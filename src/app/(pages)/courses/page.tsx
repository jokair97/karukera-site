import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { toutesCoursesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { type Course } from '@/sanity/types'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Courses — Hippodrome de Guadeloupe' }

const statutLabel: Record<string, { label: string; color: string }> = {
  'a-venir':  { label: 'À venir',  color: 'text-lagoon border-lagoon/40 bg-lagoon/10'  },
  'en-cours': { label: '🔴 Live',   color: 'text-red-400 border-red-400/40 bg-red-400/10' },
  'terminee': { label: 'Terminée', color: 'text-mist border-border bg-border/20'       },
  'annulee':  { label: 'Annulée',  color: 'text-red-400/60 border-red-400/20 bg-red-400/5' },
}

const typeColor: Record<string, string> = {
  'Plat':     'text-lagoon border-lagoon/30',
  'Obstacle': 'text-gold border-gold/30',
  'Haies':    'text-gold border-gold/30',
  'Steeple':  'text-gold border-gold/30',
  'Trot-A':   'text-olive-light border-olive/30',
  'Trot-M':   'text-olive-light border-olive/30',
  'Galop':    'text-lagoon border-lagoon/30',
}

export default async function CoursesPage() {
  const courses: Course[] = await client.fetch(toutesCoursesQuery, {}, { next: { revalidate: 60 } })

  const aVenir   = courses.filter(c => c.statut !== 'terminee' && c.statut !== 'annulee')
  const terminees = courses.filter(c => c.statut === 'terminee' || c.statut === 'annulee')

  return (
    <>
      <PageHeader
        eyebrow="Hippodrome de Guadeloupe"
        title="Courses hippiques"
        subtitle="Retrouvez toutes les courses de la saison — programme, partants et résultats."
      />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* À venir */}
        {aVenir.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold text-ivory mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-lagoon inline-block" />
              Prochaines courses
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {aVenir.map((c) => <CourseCard key={c._id} course={c} />)}
            </div>
          </section>
        )}

        {/* Terminées */}
        {terminees.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold text-ivory mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-mist inline-block" />
              Courses passées
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {terminees.map((c) => <CourseCard key={c._id} course={c} />)}
            </div>
          </section>
        )}

        {courses.length === 0 && (
          <div className="text-center py-20 text-mist">
            <p className="text-5xl mb-4">🏇</p>
            <p>Aucune course programmée pour le moment.</p>
          </div>
        )}
      </div>
    </>
  )
}

function CourseCard({ course: c }: { course: Course }) {
  const statut = statutLabel[c.statut ?? 'a-venir'] ?? statutLabel['a-venir']
  const date   = new Date(c.date)
  const dateStr = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })
  const heure  = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  return (
    <Link href={`/courses/${c._id}`} className="group">
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-olive/50 transition-all duration-200 group-hover:-translate-y-1 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-40 bg-gradient-to-br from-olive/15 to-lagoon/10">
          {c.image?.asset ? (
            <Image src={urlFor(c.image).width(600).height(300).url()} alt={c.image.alt ?? c.nom} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl opacity-30">🏇</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`text-xs border rounded-full px-2.5 py-0.5 ${statut.color}`}>{statut.label}</span>
            {c.discipline && (
              <span className={`text-xs border rounded-full px-2.5 py-0.5 bg-base/80 ${typeColor[c.discipline] ?? 'text-mist border-border'}`}>{c.discipline}</span>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1 gap-3">
          {c.categorie && (
            <p className="text-gold text-xs tracking-wide">{c.categorie}</p>
          )}
          <h3 className="font-heading text-lg font-semibold text-ivory leading-snug flex-1 group-hover:text-gold transition-colors">
            {c.nom}
          </h3>
          <div className="flex items-center justify-between text-sm text-mist border-t border-border pt-3">
            <div>
              <p className="capitalize text-ivory/70">{dateStr}</p>
              <p className="text-xs">{heure} {c.distanceMetres ? `· ${c.distanceMetres.toLocaleString('fr-FR')} m` : ''} {c.partantsCount ? `· ${c.partantsCount} partants` : ''}</p>
            </div>
            <span className="text-lagoon group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
