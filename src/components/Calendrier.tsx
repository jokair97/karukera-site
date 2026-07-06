import Link from 'next/link'

const courses = [
  {
    id: 1,
    nom:       'Grand Prix de la Guadeloupe',
    date:      '19 Juil 2026',
    heure:     '14h30',
    type:      'Plat',
    distance:  '2 000 m',
    partants:  12,
    categorie: 'Groupe I',
  },
  {
    id: 2,
    nom:       'Prix des Antilles',
    date:      '2 Août 2026',
    heure:     '15h00',
    type:      'Obstacle',
    distance:  '3 200 m',
    partants:  8,
    categorie: 'Groupe II',
  },
  {
    id: 3,
    nom:       'Grand Prix Karukera',
    date:      '16 Août 2026',
    heure:     '16h00',
    type:      'Plat',
    distance:  '2 400 m',
    partants:  14,
    categorie: 'Groupe I',
  },
  {
    id: 4,
    nom:       'Prix des Hibiscus',
    date:      '30 Août 2026',
    heure:     '14h30',
    type:      'Trot',
    distance:  '1 800 m',
    partants:  9,
    categorie: 'Groupe III',
  },
]

const typeColor: Record<string, string> = {
  'Plat':     'text-lagoon border-lagoon/40',
  'Obstacle': 'text-gold border-gold/40',
  'Trot':     'text-olive-light border-olive/40',
}

export default function Calendrier() {
  return (
    <section className="bg-base py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-2 font-medium">
              Saison 2026
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ivory">
              Calendrier des courses
            </h2>
          </div>
          <Link
            href="/calendrier"
            className="text-gold hover:text-gold-light text-sm tracking-wide border-b border-gold/30 hover:border-gold transition-colors self-start md:self-auto"
          >
            Calendrier complet →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {courses.map((c, i) => (
            <Link key={c.id} href={`/courses/${c.id}`} className="group">
              <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col gap-4 hover:border-olive/50 hover:bg-card/80 transition-all duration-200 group-hover:-translate-y-1">
                {/* Top */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-xs border rounded-full px-2.5 py-0.5 tracking-wide ${typeColor[c.type] ?? 'text-mist border-border'}`}
                  >
                    {c.type}
                  </span>
                  <span className="text-mist text-xs">{c.distance}</span>
                </div>

                {/* Race number */}
                <div className="flex items-center gap-3">
                  <span className="text-border font-heading text-5xl font-bold leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-ivory/50 text-[10px] tracking-widest uppercase">{c.categorie}</p>
                    <p className="text-gold text-xs font-medium">{c.partants} partants</p>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-heading text-lg font-semibold text-ivory leading-snug flex-1">
                  {c.nom}
                </h3>

                {/* Date */}
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-ivory/80 text-sm font-medium">{c.date}</p>
                    <p className="text-mist text-xs">{c.heure}</p>
                  </div>
                  <span className="text-lagoon text-xs group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
