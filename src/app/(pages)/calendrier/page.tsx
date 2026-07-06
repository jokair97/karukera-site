import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { toutesCoursesQuery } from '@/sanity/queries'
import type { Course } from '@/sanity/types'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Calendrier — Hippodrome de Guadeloupe' }
export const revalidate = 60

const typeColor: Record<string, string> = {
  'Plat':     'bg-lagoon/10 text-lagoon border-lagoon/30',
  'Obstacle': 'bg-gold/10 text-gold border-gold/30',
  'Haies':    'bg-gold/10 text-gold border-gold/30',
  'Steeple':  'bg-gold/10 text-gold border-gold/30',
  'Trot-A':   'bg-olive/10 text-olive-light border-olive/30',
  'Trot-M':   'bg-olive/10 text-olive-light border-olive/30',
  'Galop':    'bg-lagoon/10 text-lagoon border-lagoon/30',
}

export default async function CalendrierPage() {
  const courses: Course[] = await client.fetch(toutesCoursesQuery, {}, { next: { revalidate: 60 } })
  const futures = courses.filter(c => c.statut !== 'terminee' && c.statut !== 'annulee')

  // Grouper par mois
  const parMois: Record<string, Course[]> = {}
  futures.forEach(c => {
    const key = new Date(c.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    if (!parMois[key]) parMois[key] = []
    parMois[key].push(c)
  })

  return (
    <>
      <PageHeader
        eyebrow="Saison 2026"
        title="Calendrier des courses"
        subtitle="Programme complet des journées de courses à l'Hippodrome de Guadeloupe."
      />

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">
        {Object.keys(parMois).length === 0 && (
          <div className="text-center py-20 text-mist">
            <p className="text-5xl mb-4">📅</p>
            <p>Aucune course programmée pour le moment.</p>
          </div>
        )}

        {Object.entries(parMois).map(([mois, list]) => (
          <section key={mois}>
            <h2 className="font-heading text-2xl font-bold text-ivory capitalize mb-6 flex items-center gap-4">
              {mois}
              <div className="flex-1 h-px bg-border" />
              <span className="text-mist text-sm font-normal">{list.length} course{list.length > 1 ? 's' : ''}</span>
            </h2>

            <div className="space-y-3">
              {list.map(c => {
                const date    = new Date(c.date)
                const jour    = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                const heure   = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                const isLive  = c.statut === 'en-cours'

                return (
                  <Link key={c._id} href={`/courses/${c._id}`} className="group block">
                    <div className={`bg-card border rounded-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-all duration-200 hover:border-olive/50 group-hover:-translate-x-0.5 ${isLive ? 'border-red-400/30' : 'border-border'}`}>
                      {/* Date */}
                      <div className="sm:w-52 shrink-0">
                        <p className="text-ivory/80 text-sm capitalize font-medium">{jour}</p>
                        <p className="text-mist text-xs">{heure}</p>
                      </div>

                      {/* Séparateur */}
                      <div className="hidden sm:block w-px h-10 bg-border shrink-0" />

                      {/* Infos */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {isLive && <span className="text-xs bg-red-400/10 text-red-400 border border-red-400/30 rounded-full px-2 py-0.5">🔴 Live</span>}
                          {c.discipline && (
                            <span className={`text-xs border rounded-full px-2.5 py-0.5 ${typeColor[c.discipline] ?? 'text-mist border-border'}`}>
                              {c.discipline}
                            </span>
                          )}
                          {c.categorie && <span className="text-gold text-xs">{c.categorie}</span>}
                        </div>
                        <p className="font-heading font-semibold text-ivory group-hover:text-gold transition-colors">{c.nom}</p>
                      </div>

                      {/* Méta */}
                      <div className="text-right shrink-0">
                        {c.distanceMetres && <p className="text-mist text-xs">{c.distanceMetres.toLocaleString('fr-FR')} m</p>}
                        {c.partantsCount  && <p className="text-mist text-xs">{c.partantsCount} partants</p>}
                      </div>

                      <span className="text-lagoon hidden sm:block group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
