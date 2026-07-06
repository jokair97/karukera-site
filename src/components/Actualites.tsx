import Link from 'next/link'

const articles = [
  {
    id: 1,
    titre:     'Grand Prix de la Guadeloupe : 12 partants confirmés',
    date:      '3 Juillet 2026',
    categorie: 'Courses',
    extrait:
      "Le rendez-vous incontournable de la saison approche. Découvrez les partants confirmés et les favoris pour le Grand Prix de la Guadeloupe.",
  },
  {
    id: 2,
    titre:     "Nouveaux aménagements à l'Hippodrome de Jarry",
    date:      '28 Juin 2026',
    categorie: 'Actualités',
    extrait:
      "L'hippodrome continue de se moderniser avec de nouvelles installations pour le confort et la sécurité des spectateurs et des chevaux.",
  },
  {
    id: 3,
    titre:     'Programme complet de la saison estivale 2026',
    date:      '15 Juin 2026',
    categorie: 'Calendrier',
    extrait:
      "Retrouvez toutes les dates et les programmes de la saison estivale de courses hippiques en Guadeloupe.",
  },
]

const catColor: Record<string, string> = {
  'Courses':    'text-lagoon bg-lagoon/10 border-lagoon/30',
  'Actualités': 'text-gold bg-gold/10 border-gold/30',
  'Calendrier': 'text-olive-light bg-olive/10 border-olive/30',
}

export default function Actualites() {
  return (
    <section className="bg-surface py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-2 font-medium">
              Dernières nouvelles
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ivory">
              Actualités
            </h2>
          </div>
          <Link
            href="/actualites"
            className="text-gold hover:text-gold-light text-sm tracking-wide border-b border-gold/30 hover:border-gold transition-colors self-start md:self-auto"
          >
            Toutes les actualités →
          </Link>
        </div>

        {/* Articles */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link key={a.id} href={`/actualites/${a.id}`} className="group">
              <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-olive/50 transition-all duration-200 group-hover:-translate-y-1 h-full flex flex-col">
                {/* Image placeholder */}
                <div className="h-44 bg-gradient-to-br from-olive/15 via-surface to-lagoon/10 flex items-center justify-center">
                  <span className="text-5xl opacity-40">📰</span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs border rounded-full px-2.5 py-0.5 tracking-wide ${catColor[a.categorie] ?? ''}`}>
                      {a.categorie}
                    </span>
                    <span className="text-mist text-xs">{a.date}</span>
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-ivory leading-snug group-hover:text-gold transition-colors flex-1">
                    {a.titre}
                  </h3>

                  <p className="text-ivory/60 text-sm leading-relaxed line-clamp-3">
                    {a.extrait}
                  </p>

                  <span className="text-lagoon text-xs tracking-wide mt-2 group-hover:translate-x-1 transition-transform inline-block">
                    Lire la suite →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
