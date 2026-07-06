import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { courseParIdQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { CourseDetail, Partant, Classement } from '@/sanity/types'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const c: CourseDetail | null = await client.fetch(courseParIdQuery, { id })
  return { title: c ? `${c.nom} — Hippodrome de Guadeloupe` : 'Course — Hippodrome de Guadeloupe' }
}

const statutStyle: Record<string, string> = {
  'a-venir':  'bg-lagoon/10 text-lagoon border-lagoon/30',
  'en-cours': 'bg-red-400/10 text-red-400 border-red-400/30',
  'terminee': 'bg-border/30 text-mist border-border',
  'annulee':  'bg-red-400/5 text-red-400/60 border-red-400/20',
}
const statutLabel: Record<string, string> = {
  'a-venir': 'À venir', 'en-cours': '🔴 Live', 'terminee': 'Terminée', 'annulee': 'Annulée',
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const c: CourseDetail | null = await client.fetch(courseParIdQuery, { id })
  if (!c) notFound()

  const date     = new Date(c.date)
  const dateStr  = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const heureStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  const statut   = c.statut ?? 'a-venir'

  const partants    = (c.listePartants ?? []).filter(p => !p.nonPartant)
  const nonPartants = (c.listePartants ?? []).filter(p => p.nonPartant)

  const stats = [
    { label: 'Discipline',  value: c.discipline       ?? '—' },
    { label: 'Distance',    value: c.distanceMetres ? `${c.distanceMetres.toLocaleString('fr-FR')} m` : '—' },
    { label: 'Catégorie',  value: c.categorie         ?? '—' },
    { label: 'Terrain',     value: c.terrain           ?? '—' },
    { label: 'État terrain',value: c.conditionTerrain  ?? '—' },
    { label: 'Partants',    value: `${partants.length} chevaux` },
    { label: 'Allocation',  value: c.allocation        ?? '—' },
    { label: 'Départ',      value: heureStr },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="relative">
        {c.image?.asset ? (
          <div className="relative h-72 md:h-96">
            <Image src={urlFor(c.image).width(1400).height(600).url()} alt={c.image.alt ?? c.nom} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-transparent" />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-olive/20 via-surface to-lagoon/10" />
        )}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className={`text-xs border rounded-full px-3 py-1 ${statutStyle[statut]}`}>
              {statutLabel[statut]}
            </span>
            {c.categorie && (
              <span className="text-xs border border-gold/30 text-gold bg-gold/10 rounded-full px-3 py-1">{c.categorie}</span>
            )}
            {c.numeroEpreuve && (
              <span className="text-mist text-xs">{c.numeroEpreuve}ème épreuve de la journée</span>
            )}
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-ivory">{c.nom}</h1>
          <p className="text-lagoon text-sm mt-2 capitalize">{dateStr} • {heureStr}</p>
          {c.lieu && <p className="text-mist text-xs mt-1">{c.lieu}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
              <p className="text-gold font-heading font-bold text-lg">{s.value}</p>
              <p className="text-mist text-xs tracking-wide uppercase mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        {c.description && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-heading text-xl font-semibold text-ivory mb-3">Présentation</h2>
            <p className="text-ivory/70 leading-relaxed">{c.description}</p>
            {c.conditionEngagement && (
              <p className="text-mist text-sm mt-3 pt-3 border-t border-border">
                <span className="text-ivory/50 uppercase tracking-wide text-xs">Conditions : </span>{c.conditionEngagement}
              </p>
            )}
          </div>
        )}

        {/* Partants */}
        {partants.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-ivory mb-6">
              Partants <span className="text-mist text-base font-normal">({partants.length})</span>
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-surface border-b border-border">
                    <tr>
                      {['N°', 'Cheval', 'Jockey', 'Entraîneur', 'Âge/Sexe', 'Poids', 'Cote'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-mist text-xs tracking-widest uppercase font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {partants
                      .sort((a, b) => (a.numero ?? 99) - (b.numero ?? 99))
                      .map((p: Partant, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3 font-heading font-bold text-gold text-lg w-12">{p.numero ?? '—'}</td>
                          <td className="px-4 py-3 font-semibold text-ivory whitespace-nowrap">{p.nom}</td>
                          <td className="px-4 py-3 text-ivory/70 whitespace-nowrap">{p.jockey ?? '—'}</td>
                          <td className="px-4 py-3 text-ivory/70 whitespace-nowrap">{p.entraineur ?? '—'}</td>
                          <td className="px-4 py-3 text-ivory/60 whitespace-nowrap">{[p.age ? `${p.age} ans` : null, p.sexe].filter(Boolean).join(' · ')|| '—'}</td>
                          <td className="px-4 py-3 text-ivory/60 whitespace-nowrap">{p.poids ? `${p.poids} kg` : '—'}</td>
                          <td className="px-4 py-3 text-lagoon font-medium whitespace-nowrap">{p.cote ?? '—'}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Non-partants */}
        {nonPartants.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-bold text-ivory mb-4">
              Non-partants <span className="text-mist text-sm font-normal">({nonPartants.length})</span>
            </h2>
            <div className="bg-card border border-border rounded-xl p-4 flex flex-wrap gap-3">
              {nonPartants.map((p: Partant, i) => (
                <div key={i} className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
                  <span className="text-red-400 text-xs font-bold">NP</span>
                  {p.numero && <span className="text-mist text-xs">N°{p.numero}</span>}
                  <span className="text-ivory/80 text-sm font-medium">{p.nom}</span>
                  {p.raisonNonPartant && (
                    <span className="text-mist text-xs">· {p.raisonNonPartant}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Résultats */}
        {c.statut === 'terminee' && c.classement && c.classement.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-ivory mb-6">Résultats</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="font-heading text-lg font-semibold text-ivory">Classement final</h3>
                  {c.tempsVainqueur && <p className="text-mist text-xs mt-1">Temps du vainqueur : {c.tempsVainqueur}</p>}
                </div>
                <div className="divide-y divide-border/50">
                  {c.classement.map((cl: Classement, i) => {
                    const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }
                    return (
                      <div key={i} className="px-6 py-3 flex items-center gap-4">
                        <span className="text-2xl w-8 text-center">{medals[cl.place] ?? `${cl.place}e`}</span>
                        <div className="flex-1">
                          <p className="text-ivory font-medium">{cl.nom}</p>
                          <p className="text-mist text-xs">{cl.jockey}</p>
                        </div>
                        {cl.temps && <span className="text-gold text-sm font-mono">{cl.temps}</span>}
                        {cl.ecart && cl.place > 1 && <span className="text-mist text-xs">{cl.ecart}</span>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {c.rapports && Object.values(c.rapports).some(Boolean) && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-heading text-lg font-semibold text-ivory mb-4">Rapports PMU</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Gagnant',  value: c.rapports.gagnant  },
                      { label: 'Placé',    value: c.rapports.place    },
                      { label: 'Couplé',   value: c.rapports.couple   },
                      { label: 'Tiercé',   value: c.rapports.tierce   },
                      { label: 'Quarté',   value: c.rapports.quarte   },
                      { label: 'Quinté',   value: c.rapports.quinte   },
                    ].filter(r => r.value).map(r => (
                      <div key={r.label} className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-mist text-sm">{r.label}</span>
                        <span className="text-gold font-mono font-bold">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {c.notesResultat && (
              <p className="text-ivory/60 text-sm mt-4 italic">{c.notesResultat}</p>
            )}
          </div>
        )}

        <div className="pt-4">
          <Link href="/courses" className="text-lagoon hover:text-lagoon-light text-sm transition-colors">← Retour aux courses</Link>
        </div>
      </div>
    </div>
  )
}
