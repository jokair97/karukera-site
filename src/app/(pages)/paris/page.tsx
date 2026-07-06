import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Paris — Hippodrome de Guadeloupe' }

export default function ParisPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hippodrome de Guadeloupe"
        title="Paris hippiques"
        subtitle="Pariez sur vos chevaux favoris en toute légalité avec le PMU."
      />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Partenaire PMU */}
        <div className="bg-card border border-gold/20 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-heading text-2xl font-bold text-ivory mb-3">Paris avec le PMU</h2>
          <p className="text-ivory/70 leading-relaxed mb-6 max-w-xl mx-auto">
            Les paris hippiques sur les courses de l'Hippodrome de Guadeloupe sont gérés par le <strong className="text-ivory">PMU</strong> (Pari Mutuel Urbain), opérateur officiel des paris hippiques en France et dans les DOM.
          </p>
          <a
            href="https://www.pmu.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold hover:bg-gold-light text-base font-bold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 text-sm tracking-wider"
          >
            Parier sur pmu.fr →
          </a>
        </div>

        {/* Types de paris */}
        <div>
          <h2 className="font-heading text-xl font-bold text-ivory mb-5">Types de paris disponibles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { nom: 'Gagnant',  desc: 'Miser sur le cheval qui arrive premier.' },
              { nom: 'Placé',    desc: 'Votre cheval arrive dans les 3 premiers.' },
              { nom: 'Couplé',   desc: 'Désigner les 2 premiers dans n\'importe quel ordre.' },
              { nom: 'Tiercé',   desc: 'Les 3 premiers, dans l\'ordre ou le désordre.' },
              { nom: 'Quarté+',  desc: 'Les 4 premiers, bonus si dans l\'ordre exact.' },
              { nom: 'Quinté+',  desc: 'Les 5 premiers — le pari le plus rémunérateur.' },
            ].map(p => (
              <div key={p.nom} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
                <span className="text-gold font-heading font-bold text-lg w-20 shrink-0">{p.nom}</span>
                <p className="text-ivory/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mention légale */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-mist text-xs leading-relaxed">
            <strong className="text-ivory/50">⚠️ Avertissement :</strong> Les jeux d'argent comportent des risques. Jouez de manière responsable. La participation aux jeux d'argent est réservée aux personnes majeures (18 ans et plus). En Guadeloupe (DOM français), les paris hippiques sont régulés par l'<strong className="text-ivory/50">ANJ</strong> (Autorité Nationale des Jeux).
          </p>
        </div>

        {/* Voir le programme */}
        <div className="text-center">
          <p className="text-mist text-sm mb-4">Consultez les prochaines courses avant de parier</p>
          <Link href="/calendrier" className="border border-lagoon/40 hover:border-lagoon text-lagoon hover:bg-lagoon/10 px-8 py-3 rounded-full transition-all text-sm tracking-wide">
            Voir le calendrier des courses
          </Link>
        </div>
      </div>
    </>
  )
}
