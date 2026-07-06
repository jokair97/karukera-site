import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './src/sanity/env'

export default defineConfig({
  name:    'karukera-hippodrome',
  title:   'Hippodrome de Guadeloupe — Admin',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Gestion du site')
          .items([
            S.listItem()
              .title('🏇 Courses hippiques')
              .child(S.documentTypeList('course').title('Courses')),
            S.listItem()
              .title('📅 Événements')
              .child(S.documentTypeList('evenement').title('Événements')),
            S.listItem()
              .title('📰 Articles & Actualités')
              .child(S.documentTypeList('article').title('Articles')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
})
