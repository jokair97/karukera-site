import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { tousArticlesQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { Article } from '@/sanity/types'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Actualités — Hippodrome de Guadeloupe' }
export const revalidate = 60

const catColor: Record<string, string> = {
  'Courses':    'text-lagoon bg-lagoon/10 border-lagoon/30',
  'Actualités': 'text-gold bg-gold/10 border-gold/30',
  'Calendrier': 'text-olive-light bg-olive/10 border-olive/30',
  'Résultats':  'text-ivory/70 bg-border/30 border-border',
}

export default async function ActualitesPage() {
  const articles: Article[] = await client.fetch(tousArticlesQuery, {}, { next: { revalidate: 60 } })

  return (
    <>
      <PageHeader
        eyebrow="Hippodrome de Guadeloupe"
        title="Actualités"
        subtitle="Toute l'actualité des courses hippiques en Guadeloupe."
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {articles.length === 0 && (
          <div className="text-center py-20 text-mist">
            <p className="text-5xl mb-4">📰</p>
            <p>Aucun article publié pour le moment.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map(a => {
            const dateStr = a.date
              ? new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              : ''
            const href = `/actualites/${a.slug?.current ?? a._id}`

            return (
              <Link key={a._id} href={href} className="group">
                <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-olive/50 transition-all duration-200 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-48 bg-gradient-to-br from-olive/15 via-surface to-lagoon/10">
                    {a.imagePrincipale?.asset ? (
                      <Image src={urlFor(a.imagePrincipale).width(700).height(400).url()} alt={a.imagePrincipale.alt ?? a.titre} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl opacity-25">📰</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      {a.categorie && (
                        <span className={`text-xs border rounded-full px-2.5 py-0.5 ${catColor[a.categorie] ?? ''}`}>{a.categorie}</span>
                      )}
                      {dateStr && <span className="text-mist text-xs">{dateStr}</span>}
                    </div>

                    <h2 className="font-heading text-lg font-semibold text-ivory leading-snug flex-1 group-hover:text-gold transition-colors">
                      {a.titre}
                    </h2>

                    {a.extrait && (
                      <p className="text-ivory/60 text-sm leading-relaxed line-clamp-3">{a.extrait}</p>
                    )}

                    <span className="text-lagoon text-xs tracking-wide mt-auto group-hover:translate-x-1 transition-transform inline-block">
                      Lire la suite →
                    </span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
