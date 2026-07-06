import { defineField, defineType } from 'sanity'

// Sous-schéma : un cheval partant
const partantFields = [
  defineField({ name: 'numero',    title: 'N° de corde', type: 'number', validation: (R) => R.required().min(1) }),
  defineField({ name: 'nom',       title: 'Nom du cheval', type: 'string', validation: (R) => R.required() }),
  defineField({ name: 'jockey',    title: 'Jockey', type: 'string' }),
  defineField({ name: 'entraineur', title: 'Entraîneur', type: 'string' }),
  defineField({ name: 'proprietaire', title: 'Propriétaire', type: 'string' }),
  defineField({ name: 'age',       title: 'Âge', type: 'number' }),
  defineField({ name: 'sexe',      title: 'Sexe', type: 'string', options: { list: [
    { title: 'Mâle (M)',         value: 'M'  },
    { title: 'Femelle (F)',      value: 'F'  },
    { title: 'Hongre (H)',       value: 'H'  },
  ]}}),
  defineField({ name: 'poids',     title: 'Poids porté (kg)', type: 'number' }),
  defineField({ name: 'cote',      title: 'Cote (ex: 3/1)', type: 'string' }),
  defineField({ name: 'nonPartant', title: 'Non-partant (scratché)', type: 'boolean', initialValue: false }),
  defineField({ name: 'raisonNonPartant', title: 'Raison du non-partant', type: 'string',
    description: 'Blessure, défaut de ferrure, décision de l\'entraîneur…',
    hidden: ({ parent }: { parent: { nonPartant?: boolean } }) => !parent?.nonPartant,
  }),
]

export const course = defineType({
  name: 'course',
  title: 'Course hippique',
  type: 'document',
  groups: [
    { name: 'infos',     title: '📋 Informations générales' },
    { name: 'config',    title: '⚙️ Configuration technique' },
    { name: 'partants',  title: '🐴 Partants & Non-partants' },
    { name: 'resultats', title: '🏆 Résultats' },
    { name: 'media',     title: '🖼️ Médias' },
  ],

  fields: [
    /* ── INFOS GÉNÉRALES ── */
    defineField({
      name: 'nom', title: 'Nom de la course', type: 'string',
      group: 'infos', validation: (R) => R.required(),
    }),
    defineField({
      name: 'statut', title: 'Statut', type: 'string',
      group: 'infos',
      options: { list: [
        { title: '⏳ À venir',  value: 'a-venir'  },
        { title: '🔴 En cours', value: 'en-cours'  },
        { title: '✅ Terminée', value: 'terminee'  },
        { title: '❌ Annulée',  value: 'annulee'   },
      ], layout: 'radio' },
      initialValue: 'a-venir',
    }),
    defineField({
      name: 'enVedette', title: "Mettre en vedette sur l'accueil",
      type: 'boolean', group: 'infos', initialValue: false,
    }),
    defineField({
      name: 'date', title: 'Date et heure de départ', type: 'datetime',
      group: 'infos', validation: (R) => R.required(),
    }),
    defineField({
      name: 'lieu', title: 'Lieu', type: 'string',
      group: 'infos', initialValue: 'Hippodrome de Jarry, Baie-Mahault',
    }),
    defineField({
      name: 'categorie', title: 'Catégorie', type: 'string',
      group: 'infos',
      options: { list: [
        { title: 'Groupe I',   value: 'Groupe I'   },
        { title: 'Groupe II',  value: 'Groupe II'  },
        { title: 'Groupe III', value: 'Groupe III' },
        { title: 'Listed',     value: 'Listed'     },
        { title: 'Handicap',   value: 'Handicap'   },
        { title: 'Claim',      value: 'Claim'      },
        { title: 'Apprentis',  value: 'Apprentis'  },
      ]},
    }),
    defineField({
      name: 'allocation', title: 'Dotation (ex: 150 000 €)', type: 'string',
      group: 'infos',
    }),
    defineField({
      name: 'description', title: 'Description / Présentation', type: 'text', rows: 5,
      group: 'infos',
    }),

    /* ── CONFIGURATION TECHNIQUE ── */
    defineField({
      name: 'discipline', title: 'Discipline', type: 'string',
      group: 'config',
      options: { list: [
        { title: 'Plat',          value: 'Plat'      },
        { title: 'Obstacle',      value: 'Obstacle'  },
        { title: 'Haies',         value: 'Haies'     },
        { title: 'Steeple-chase', value: 'Steeple'   },
        { title: 'Trot attelé',   value: 'Trot-A'    },
        { title: 'Trot monté',    value: 'Trot-M'    },
        { title: 'Galop',         value: 'Galop'     },
      ]},
    }),
    defineField({
      name: 'distanceMetres', title: 'Distance (en mètres)', type: 'number',
      group: 'config', validation: (R) => R.min(400).max(8000),
      description: 'Ex : 1600, 2000, 2400…',
    }),
    defineField({
      name: 'terrain', title: 'Type de terrain', type: 'string',
      group: 'config',
      options: { list: [
        { title: 'Gazon',         value: 'Gazon'   },
        { title: 'Sable / Piste', value: 'Sable'   },
        { title: 'Tout-terrain',  value: 'Cross'   },
      ]},
    }),
    defineField({
      name: 'conditionTerrain', title: 'Condition du terrain le jour J', type: 'string',
      group: 'config',
      options: { list: [
        { title: 'Très souple',  value: 'tres-souple'  },
        { title: 'Souple',       value: 'souple'       },
        { title: 'Bon souple',   value: 'bon-souple'   },
        { title: 'Bon',          value: 'bon'          },
        { title: 'Bon dur',      value: 'bon-dur'      },
        { title: 'Dur',          value: 'dur'          },
      ]},
    }),
    defineField({
      name: 'conditionEngagement', title: 'Conditions d\'engagement', type: 'string',
      group: 'config',
      description: 'Ex : Réservé aux 3 ans et plus, étalons et hongres',
    }),
    defineField({
      name: 'poidsBase', title: 'Poids de base (kg)', type: 'number',
      group: 'config',
    }),
    defineField({
      name: 'numeroEpreuve', title: 'N° de l\'épreuve dans la journée', type: 'number',
      group: 'config', description: 'Ex: 3 = 3ème course de la journée',
    }),
    defineField({
      name: 'nombrePartantsMax', title: 'Nombre max. de partants autorisé', type: 'number',
      group: 'config',
    }),

    /* ── PARTANTS & NON-PARTANTS ── */
    defineField({
      name: 'listePartants',
      title: 'Liste des partants',
      type: 'array',
      group: 'partants',
      of: [{
        type: 'object',
        title: 'Cheval',
        fields: partantFields,
        preview: {
          select: { numero: 'numero', nom: 'nom', jockey: 'jockey', nonPartant: 'nonPartant' },
          prepare({ numero, nom, jockey, nonPartant }) {
            return {
              title: `${nonPartant ? '❌ NP — ' : `N°${numero} — `}${nom}`,
              subtitle: jockey ? `Jockey : ${jockey}` : '',
            }
          },
        },
      }],
      description: 'Ajoutez chaque cheval. Cochez "Non-partant" pour les scratrchés.',
    }),

    /* ── RÉSULTATS ── */
    defineField({
      name: 'classement', title: 'Classement final', type: 'array',
      group: 'resultats',
      of: [{
        type: 'object',
        title: 'Arrivée',
        fields: [
          defineField({ name: 'place',   title: 'Place',            type: 'number' }),
          defineField({ name: 'numero',  title: 'N° de corde',      type: 'number' }),
          defineField({ name: 'nom',     title: 'Nom du cheval',    type: 'string' }),
          defineField({ name: 'jockey',  title: 'Jockey',           type: 'string' }),
          defineField({ name: 'temps',   title: 'Temps (ex: 2\'05"40)', type: 'string' }),
          defineField({ name: 'ecart',   title: 'Écart avec le vainqueur', type: 'string' }),
        ],
        preview: {
          select: { place: 'place', nom: 'nom' },
          prepare({ place, nom }) {
            const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }
            return { title: `${medals[place] ?? `${place}e`} ${nom}` }
          },
        },
      }],
    }),
    defineField({
      name: 'rapports', title: 'Rapports PMU', type: 'object',
      group: 'resultats',
      fields: [
        defineField({ name: 'gagnant',  title: 'Gagnant (cote)',     type: 'string' }),
        defineField({ name: 'place',    title: 'Placés (cotes)',      type: 'string' }),
        defineField({ name: 'couple',   title: 'Couplé (rapport)',    type: 'string' }),
        defineField({ name: 'tierce',   title: 'Tiercé (rapport)',    type: 'string' }),
        defineField({ name: 'quarte',   title: 'Quarté (rapport)',    type: 'string' }),
        defineField({ name: 'quinte',   title: 'Quinté (rapport)',    type: 'string' }),
      ],
    }),
    defineField({
      name: 'tempsVainqueur', title: 'Temps du vainqueur', type: 'string',
      group: 'resultats',
    }),
    defineField({
      name: 'notesResultat', title: 'Notes / Commentaires de la course', type: 'text', rows: 3,
      group: 'resultats',
    }),

    /* ── MÉDIAS ── */
    defineField({
      name: 'image', title: 'Image principale', type: 'image',
      group: 'media', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
    }),
    defineField({
      name: 'galerie', title: 'Galerie photos', type: 'array',
      group: 'media',
      of: [{
        type: 'image', options: { hotspot: true },
        fields: [defineField({ name: 'alt', title: 'Légende', type: 'string' })],
      }],
    }),
  ],

  preview: {
    select: { title: 'nom', date: 'date', statut: 'statut', discipline: 'discipline', distance: 'distanceMetres' },
    prepare({ title, date, statut, discipline, distance }) {
      const d = date
        ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
        : '—'
      const emoji = statut === 'terminee' ? '✅' : statut === 'en-cours' ? '🔴' : statut === 'annulee' ? '❌' : '🏇'
      const dist  = distance ? ` — ${distance}m` : ''
      return { title, subtitle: `${emoji} ${d}${dist}  ${discipline ?? ''}` }
    },
  },

  orderings: [
    { title: 'Date (prochaine)', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] },
    { title: 'Date (plus récente)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
})
