import { groq } from 'next-sanity'

// ── Page d'accueil ──────────────────────────────────────────────
export const prochaineCourseQuery = groq`
  *[_type == "course" && statut == "a-venir" && date > now()] | order(date asc)[0] {
    _id, nom, date, lieu, discipline, distanceMetres,
    "partantsCount": count(listePartants[nonPartant != true]),
    categorie, allocation, description,
    image { asset->{ _id, url }, alt }
  }
`

export const calendrierQuery = groq`
  *[_type == "course" && date > now()] | order(date asc)[0...4] {
    _id, nom, date, discipline, distanceMetres,
    "partantsCount": count(listePartants[nonPartant != true]),
    categorie, statut
  }
`

export const articlesQuery = groq`
  *[_type == "article" && publie == true] | order(date desc)[0...3] {
    _id, titre, slug, date, categorie, extrait,
    imagePrincipale { asset->{ _id, url }, alt }
  }
`

// ── Page Courses ────────────────────────────────────────────────
export const toutesCoursesQuery = groq`
  *[_type == "course"] | order(date asc) {
    _id, nom, date, discipline, distanceMetres, statut, categorie,
    "partantsCount": count(listePartants[nonPartant != true]),
    image { asset->{ _id, url }, alt }
  }
`

export const courseParIdQuery = groq`
  *[_type == "course" && _id == $id][0] {
    _id, nom, date, lieu, discipline, distanceMetres, categorie,
    allocation, description, statut, terrain, conditionTerrain,
    conditionEngagement, poidsBase, numeroEpreuve,
    "partantsCount": count(listePartants[nonPartant != true]),
    listePartants[] {
      numero, nom, jockey, entraineur, proprietaire,
      age, sexe, poids, cote, nonPartant, raisonNonPartant
    },
    classement[] { place, numero, nom, jockey, temps, ecart },
    rapports { gagnant, place, couple, tierce, quarte, quinte },
    tempsVainqueur, notesResultat,
    image { asset->{ _id, url }, alt },
    galerie[] { asset->{ _id, url }, alt }
  }
`

// ── Page Résultats ──────────────────────────────────────────────
export const tousResultatsQuery = groq`
  *[_type == "course" && statut == "terminee"] | order(date desc) {
    _id, nom, date, discipline, distanceMetres, categorie, tempsVainqueur,
    classement[0...3] { place, numero, nom, jockey, temps }
  }
`

// ── Page Actualités ─────────────────────────────────────────────
export const tousArticlesQuery = groq`
  *[_type == "article" && publie == true] | order(date desc) {
    _id, titre, slug, date, categorie, extrait,
    imagePrincipale { asset->{ _id, url }, alt }
  }
`

export const articleParSlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id, titre, slug, date, categorie, extrait,
    imagePrincipale { asset->{ _id, url }, alt },
    contenu
  }
`
