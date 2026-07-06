import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { articlesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { Article } from '@/sanity/types'

const catColor: Record<string, string> = {
  'Courses':    'text-lagoon bg-lagoon/10 border-lagoon/30',
  'Actualités': 'text-gold bg-gold/10 border-gold/30',
  'Calendrier': 'text-olive-light bg-olive/10 border-olive/30',
  'Résultats':  'text-ivory/70 bg-border/30 border-border',
}

export default async function Actualites() {
  const articles: Article[] = await client.fetch(
    articlesQuery,
    {},
    { next: { revalidate: 60 } }
  )

  if (!articles?.length) return null

  return (
    <section className="bg-surface py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-2 font-medium">Dernières nouvelles</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ivory">Actualités</h2>
          </div>
          <Link href="/actualites" className="text-gold hover:text-gold-light text-sm tracking-wide border-b border-gold/30 hover:border-gold transition-colors self-start md:self-auto">
            Toutes les actualités →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a) => {
            const dateStr = a.date
              ? new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              : ''
            const href = `/actualites/${a.slug?.current ?? a._id}`

            return (
              <Link key={a._id} href={href} className="group">
                <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-olive/50 transition-all duration-200 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-44 bg-gradient-to-br from-olive/15 via-surface to-lagoon/10">
                    {a.imagePrincipale?.asset ? (
                      <Image
                        src={urlFor(a.imagePrincipale).width(600).height(300).url()}
                        alt={a.imagePrincipale.alt ?? a.titre}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl opacity-30">📰</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      {a.categorie && (
                        <span className={`text-xs border rounded-full px-2.5 py-0.5 tracking-wide ${catColor[a.categorie] ?? ''}`}>
                          {a.categorie}
                        </span>
                      )}
                      {dateStr && <span className="text-mist text-xs">{dateStr}</span>}
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-ivory leading-snug group-hover:text-gold transition-colors flex-1">
                      {a.titre}
                    </h3>

                    {a.extrait && (
                      <p className="text-ivory/60 text-sm leading-relaxed line-clamp-3">{a.extrait}</p>
                    )}

                    <span className="text-lagoon text-xs tracking-wide mt-2 group-hover:translate-x-1 transition-transform inline-block">
                      Lire la suite →
                    </span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
