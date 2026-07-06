import { groq } from 'next-sanity'

export const prochaineCourseQuery = groq`
  *[_type == "course" && statut == "a-venir" && date > now()] | order(date asc)[0] {
    _id,
    nom,
    date,
    lieu,
    discipline,
    distanceMetres,
    "partantsCount": count(listePartants[nonPartant != true]),
    categorie,
    allocation,
    description,
    image { asset->{ _id, url }, alt }
  }
`

export const calendrierQuery = groq`
  *[_type == "course" && date > now()] | order(date asc)[0...4] {
    _id,
    nom,
    date,
    discipline,
    distanceMetres,
    "partantsCount": count(listePartants[nonPartant != true]),
    categorie,
    statut
  }
`

export const articlesQuery = groq`
  *[_type == "article" && publie == true] | order(date desc)[0...3] {
    _id,
    titre,
    slug,
    date,
    categorie,
    extrait,
    imagePrincipale { asset->{ _id, url }, alt }
  }
`
