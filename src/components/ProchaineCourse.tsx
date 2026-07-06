import Link from 'next/link'

const course = {
  nom:        'Grand Prix de la Guadeloupe',
  date:       'Samedi 19 Juillet 2026',
  heure:      '14h30',
  lieu:       'Hippodrome de Jarry, Baie-Mahault',
  type:       'Plat',
  distance:   '2 000 m',
  partants:   12,
  categorie:  'Groupe I',
  allocation: '150 000 €',
  description:
    "Le Grand Prix de la Guadeloupe est l'épreuve reine de la saison. Réservée aux meilleurs chevaux de l'île, cette course de prestige réunit chaque année les plus grands noms du galop antillais dans une ambiance exceptionnelle.",
}

const stats = [
  { label: 'Distance',   value: course.distance },
  { label: 'Discipline', value: course.type },
  { label: 'Partants',   value: `${course.partants} chevaux` },
  { label: 'Catégorie',  value: course.categorie },
  { label: 'Allocation', value: course.allocation },
  { label: 'Départ',     value: course.heure },
]

export default function ProchaineCourse() {
  return (
    <section className="bg-surface py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-lagoon text-xs tracking-[0.35em] uppercase mb-2 font-medium">
              À ne pas manquer
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ivory">
              Prochaine course
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-gold hover:text-gold-light text-sm tracking-wide border-b border-gold/30 hover:border-gold transition-colors self-start md:self-auto"
          >
            Voir tous les partants →
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: image placeholder */}
            <div className="relative h-64 md:h-auto bg-gradient-to-br from-olive/20 via-surface to-lagoon/10 flex items-center justify-center min-h-[280px]">
              <div className="text-center">
                <div className="text-7xl mb-4">🏇</div>
                <p className="text-mist text-xs tracking-widest uppercase">Photo à venir</p>
              </div>
              {/* Diagonal accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-lagoon" />
            </div>

            {/* Right: details */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs px-3 py-1 rounded-full mb-4 tracking-wide">
                  {course.categorie}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-ivory mb-2">
                  {course.nom}
                </h3>
                <p className="text-lagoon text-sm mb-1">{course.date} • {course.heure}</p>
                <p className="text-mist text-xs mb-6">{course.lieu}</p>
                <p className="text-ivory/70 text-sm leading-relaxed mb-8">
                  {course.description}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-surface rounded-lg p-3 text-center">
                    <p className="text-gold font-heading font-bold text-base">{s.value}</p>
                    <p className="text-mist text-[10px] tracking-wide uppercase mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
