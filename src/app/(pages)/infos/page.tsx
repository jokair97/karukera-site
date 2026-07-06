import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Infos pratiques — Hippodrome de Guadeloupe' }

const sections = [
  {
    icon: '📍',
    titre: 'Adresse',
    contenu: [
      'Hippodrome de Jarry',
      'Route de la Pointe Jarry',
      '97122 Baie-Mahault, Guadeloupe',
    ],
  },
  {
    icon: '🕐',
    titre: 'Horaires des courses',
    contenu: [
      'Les journées de courses ont lieu le week-end (samedi ou dimanche).',
      'Première course : 14h00 en général.',
      'Programme détaillé disponible sur le calendrier.',
    ],
  },
  {
    icon: '🚗',
    titre: 'Accès en voiture',
    contenu: [
      'Depuis Pointe-à-Pitre : prendre la N1 direction Baie-Mahault, sortie Zone de Jarry.',
      'Parking gratuit sur place — grande capacité.',
      'GPS : Hippodrome de Jarry, Baie-Mahault.',
    ],
  },
  {
    icon: '🚌',
    titre: 'Accès en transport en commun',
    contenu: [
      'Bus Karulis — lignes desservant la zone de Jarry.',
      'Arrêt à proximité de l\'hippodrome.',
      'Consultez le réseau Karulis pour les horaires.',
    ],
  },
  {
    icon: '🎟️',
    titre: 'Tarifs d\'entrée',
    contenu: [
      'Tribune couverte : tarif adulte.',
      'Pelouse : accès libre certains jours.',
      'Tarifs réduits : enfants, retraités, groupes.',
      'Contactez-nous pour les tarifs exacts.',
    ],
  },
  {
    icon: '🍽️',
    titre: 'Restauration sur place',
    contenu: [
      'Buvette et snacks disponibles les jours de courses.',
      'Espace restauration dans les tribunes.',
    ],
  },
  {
    icon: '♿',
    titre: 'Accessibilité',
    contenu: [
      'L\'hippodrome est accessible aux personnes à mobilité réduite.',
      'Emplacements réservés aux tribunes.',
    ],
  },
  {
    icon: '📞',
    titre: 'Contact',
    contenu: [
      'Email : contact@demo-tk.fr',
      'Suivez-nous sur Facebook et Instagram pour toute l\'actualité.',
    ],
  },
]

export default function InfosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hippodrome de Guadeloupe"
        title="Infos pratiques"
        subtitle="Tout ce qu'il faut savoir pour venir vivre la passion du cheval en Guadeloupe."
      />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {sections.map(s => (
            <div key={s.titre} className="bg-card border border-border rounded-xl p-6 hover:border-olive/40 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <h2 className="font-heading text-lg font-semibold text-ivory">{s.titre}</h2>
              </div>
              <ul className="space-y-2">
                {s.contenu.map((line, i) => (
                  <li key={i} className="text-ivory/70 text-sm leading-relaxed flex gap-2">
                    <span className="text-olive mt-1 shrink-0">·</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mt-10 bg-card border border-border rounded-xl overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-olive/10 to-lagoon/10 flex flex-col items-center justify-center gap-3">
            <span className="text-5xl">🗺️</span>
            <p className="text-mist text-sm">Carte interactive — Hippodrome de Jarry, Baie-Mahault</p>
            <a
              href="https://maps.google.com/?q=Hippodrome+de+Jarry+Baie-Mahault+Guadeloupe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lagoon hover:text-lagoon-light text-sm border border-lagoon/30 hover:border-lagoon px-4 py-2 rounded-full transition-colors"
            >
              Ouvrir dans Google Maps →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
