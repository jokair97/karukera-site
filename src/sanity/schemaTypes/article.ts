import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article / Actualité',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publie',
      title: 'Publié',
      type: 'boolean',
      initialValue: false,
      description: 'Activer pour rendre visible sur le site',
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Courses',    value: 'Courses'    },
          { title: 'Actualités', value: 'Actualités' },
          { title: 'Calendrier', value: 'Calendrier' },
          { title: 'Résultats',  value: 'Résultats'  },
        ],
      },
    }),
    defineField({
      name: 'imagePrincipale',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
      ],
    }),
    defineField({
      name: 'extrait',
      title: 'Extrait (résumé affiché sur la liste)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu complet',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
            defineField({ name: 'legende', title: 'Légende', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'titre', publie: 'publie', date: 'date', media: 'imagePrincipale' },
    prepare({ title, publie, date, media }) {
      const d = date ? new Date(date).toLocaleDateString('fr-FR') : ''
      return { title, subtitle: `${publie ? '✅ Publié' : '⏸ Brouillon'} — ${d}`, media }
    },
  },
  orderings: [
    { title: 'Date (plus récent)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
})
