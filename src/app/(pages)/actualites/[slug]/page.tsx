import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { articleParSlugQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { ArticleDetail } from '@/sanity/types'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a: ArticleDetail | null = await client.fetch(articleParSlugQuery, { slug })
  return { title: a ? `${a.titre} — Hippodrome de Guadeloupe` : 'Article — Hippodrome de Guadeloupe' }
}

const portableTextComponents = {
  block: {
    normal:     ({ children }: { children?: React.ReactNode }) => <p className="text-ivory/80 leading-relaxed mb-5">{children}</p>,
    h2:         ({ children }: { children?: React.ReactNode }) => <h2 className="font-heading text-2xl font-bold text-ivory mt-10 mb-4">{children}</h2>,
    h3:         ({ children }: { children?: React.ReactNode }) => <h3 className="font-heading text-xl font-semibold text-ivory mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gold pl-5 italic text-ivory/70 my-6">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="text-ivory font-semibold">{children}</strong>,
    em:     ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    link:   ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a href={value?.href} className="text-lagoon underline hover:text-lagoon-light" target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a: ArticleDetail | null = await client.fetch(articleParSlugQuery, { slug })
  if (!a) notFound()

  const dateStr = a.date
    ? new Date(a.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  const catColor: Record<string, string> = {
    'Courses':    'text-lagoon bg-lagoon/10 border-lagoon/30',
    'Actualités': 'text-gold bg-gold/10 border-gold/30',
    'Calendrier': 'text-olive-light bg-olive/10 border-olive/30',
    'Résultats':  'text-ivory/70 bg-border/30 border-border',
  }

  return (
    <div>
      {/* Image principale */}
      {a.imagePrincipale?.asset && (
        <div className="relative h-64 md:h-96 w-full">
          <Image src={urlFor(a.imagePrincipale).width(1400).height(600).url()} alt={a.imagePrincipale.alt ?? a.titre} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {a.categorie && (
            <span className={`text-xs border rounded-full px-3 py-1 ${catColor[a.categorie] ?? ''}`}>{a.categorie}</span>
          )}
          {dateStr && <span className="text-mist text-sm capitalize">{dateStr}</span>}
        </div>

        {/* Titre */}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-ivory leading-tight mb-6">{a.titre}</h1>

        {/* Extrait */}
        {a.extrait && (
          <p className="text-ivory/60 text-lg leading-relaxed mb-8 pb-8 border-b border-border italic">
            {a.extrait}
          </p>
        )}

        {/* Contenu */}
        {a.contenu && a.contenu.length > 0 ? (
          <div className="prose-karukera">
            <PortableText value={a.contenu} components={portableTextComponents} />
          </div>
        ) : (
          <p className="text-mist text-sm italic">Contenu à venir.</p>
        )}

        {/* Retour */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/actualites" className="text-lagoon hover:text-lagoon-light text-sm transition-colors">← Retour aux actualités</Link>
        </div>
      </div>
    </div>
  )
}
