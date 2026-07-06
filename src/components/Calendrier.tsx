import Link from 'next/link'
import { client } from '@/sanity/client'
import { calendrierQuery } from '@/sanity/queries'
import type { Course } from '@/sanity/types'

const typeColor: Record<string, string> = {
  'Plat':     'text-lagoon border-lagoon/40',
  'Obstacle': 'text-gold border-gold/40',
  'Haies':    'text-gold border-gold/40',
  'Steeple':  'text-gold border-gold/40',
  'Trot-A':   'text-olive-light border-olive/40',
  'Trot-M':   'text-olive-light border-olive/40',
  'Galop':    'text-lagoon border-lagoon/40',
}

export default async function Calendrier() {
  const courses: Course[] = await client.fetch(
    calendrierQuery,
    {},
    { next: { revalidate: 60 } }
  )

  if (!courses?.length) return null

  return (
    <section className="bg-base py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-2 font-medium">Saison 2026</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ivory">Calendrier des courses</h2>
          </div>
          <Link href="/calendrier" className="text-gold hover:text-gold-light text-sm tracking-wide border-b border-gold/30 hover:border-gold transition-colors self-start md:self-auto">
            Calendrier complet →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {courses.map((c, i) => {
            const date = new Date(c.date)
            const dateStr = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
            const heure  = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            const dist   = c.distanceMetres ? `${c.distanceMetres.toLocaleString('fr-FR')} m` : ''

            return (
              <Link key={c._id} href={`/courses/${c._id}`} className="group">
                <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col gap-4 hover:border-olive/50 transition-all duration-200 group-hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-xs border rounded-full px-2.5 py-0.5 tracking-wide ${typeColor[c.discipline ?? ''] ?? 'text-mist border-border'}`}>
                      {c.discipline ?? 'Course'}
                    </span>
                    {dist && <span className="text-mist text-xs">{dist}</span>}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-border font-heading text-5xl font-bold leading-none select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="text-ivory/50 text-[10px] tracking-widest uppercase">{c.categorie ?? ''}</p>
                      {c.partantsCount ? (
                        <p className="text-gold text-xs font-medium">{c.partantsCount} partants</p>
                      ) : null}
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-ivory leading-snug flex-1">{c.nom}</h3>

                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-ivory/80 text-sm font-medium capitalize">{dateStr}</p>
                      <p className="text-mist text-xs">{heure}</p>
                    </div>
                    <span className="text-lagoon text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
