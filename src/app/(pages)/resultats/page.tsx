import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { tousResultatsQuery } from '@/sanity/queries'
import type { Course, Classement } from '@/sanity/types'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Résultats — Hippodrome de Guadeloupe' }
export const revalidate = 60

const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

interface ResultatCourse extends Course {
  tempsVainqueur?: string
  classement?: Classement[]
}

export default async function ResultatsPage() {
  const courses: ResultatCourse[] = await client.fetch(tousResultatsQuery, {}, { next: { revalidate: 60 } })

  return (
    <>
      <PageHeader
        eyebrow="Hippodrome de Guadeloupe"
        title="Résultats"
        subtitle="Classements et rapports des dernières courses disputées."
      />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-6">
        {courses.length === 0 && (
          <div className="text-center py-20 text-mist">
            <p className="text-5xl mb-4">🏆</p>
            <p>Aucun résultat disponible pour le moment.</p>
          </div>
        )}

        {courses.map(c => {
          const date    = new Date(c.date)
          const dateStr = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

          return (
            <div key={c._id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {c.discipline && <span className="text-xs text-lagoon border border-lagoon/30 rounded-full px-2 py-0.5">{c.discipline}</span>}
                    {c.categorie  && <span className="text-xs text-gold">{c.categorie}</span>}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ivory">{c.nom}</h3>
                  <p className="text-mist text-xs capitalize mt-0.5">{dateStr} {c.distanceMetres ? `· ${c.distanceMetres.toLocaleString('fr-FR')} m` : ''}</p>
                </div>
                <Link href={`/courses/${c._id}`} className="text-lagoon hover:text-lagoon-light text-sm transition-colors whitespace-nowrap">
                  Détail complet →
                </Link>
              </div>

              {/* Classement */}
              {c.classement && c.classement.length > 0 ? (
                <div className="divide-y divide-border/40">
                  {c.classement.map((cl, i) => (
                    <div key={i} className="px-6 py-3 flex items-center gap-4">
                      <span className="text-xl w-8 text-center shrink-0">{medals[cl.place] ?? `${cl.place}e`}</span>
                      <div className="flex-1">
                        <p className="text-ivory font-medium">{cl.nom}</p>
                        {cl.jockey && <p className="text-mist text-xs">{cl.jockey}</p>}
                      </div>
                      {cl.temps && <span className="text-gold font-mono text-sm">{cl.temps}</span>}
                      {cl.ecart && cl.place > 1 && <span className="text-mist text-xs hidden sm:block">{cl.ecart}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-4 text-mist text-sm">Classement non disponible</div>
              )}

              {c.tempsVainqueur && (
                <div className="px-6 py-3 bg-surface border-t border-border">
                  <p className="text-mist text-xs">Temps du vainqueur : <span className="text-gold font-mono">{c.tempsVainqueur}</span></p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
