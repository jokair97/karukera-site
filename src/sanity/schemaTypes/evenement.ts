import { defineField, defineType } from 'sanity'

export const evenement = defineType({
  name: 'evenement',
  title: 'Événement',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre de l\'événement',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Journée de courses', value: 'courses'   },
          { title: 'Gala / Soirée',      value: 'gala'      },
          { title: 'Formation',          value: 'formation' },
          { title: 'Autre',              value: 'autre'     },
        ],
      },
    }),
    defineField({
      name: 'dateDebut',
      title: 'Date de début',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateFin',
      title: 'Date de fin (optionnel)',
      type: 'datetime',
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
      initialValue: 'Hippodrome de Jarry, Baie-Mahault',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Affiche / Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'lienBillets',
      title: 'Lien billetterie (optionnel)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'titre', date: 'dateDebut', type: 'type' },
    prepare({ title, date, type }) {
      const d = date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
      const emoji = type === 'courses' ? '🏇' : type === 'gala' ? '🎉' : type === 'formation' ? '📚' : '📅'
      return { title, subtitle: `${emoji} ${d}` }
    },
  },
  orderings: [
    { title: 'Date (prochaine)', name: 'dateAsc', by: [{ field: 'dateDebut', direction: 'asc' }] },
  ],
})
