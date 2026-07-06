export interface SanityImageAsset { _id: string; url: string }
export interface SanityImage { asset: SanityImageAsset; alt?: string }

export interface Course {
  _id: string
  nom: string
  date: string
  lieu?: string
  discipline?: string
  distanceMetres?: number
  partantsCount?: number
  categorie?: string
  allocation?: string
  description?: string
  image?: SanityImage
  statut?: string
}

export interface Partant {
  numero?: number
  nom: string
  jockey?: string
  entraineur?: string
  proprietaire?: string
  age?: number
  sexe?: string
  poids?: number
  cote?: string
  nonPartant?: boolean
  raisonNonPartant?: string
}

export interface Classement {
  place: number
  numero?: number
  nom: string
  jockey?: string
  temps?: string
  ecart?: string
}

export interface Rapports {
  gagnant?: string
  place?: string
  couple?: string
  tierce?: string
  quarte?: string
  quinte?: string
}

export interface CourseDetail extends Course {
  terrain?: string
  conditionTerrain?: string
  conditionEngagement?: string
  poidsBase?: number
  numeroEpreuve?: number
  listePartants?: Partant[]
  classement?: Classement[]
  rapports?: Rapports
  tempsVainqueur?: string
  notesResultat?: string
  galerie?: SanityImage[]
}

export interface Article {
  _id: string
  titre: string
  slug: { current: string }
  date: string
  categorie?: string
  extrait?: string
  imagePrincipale?: SanityImage
}

export interface ArticleDetail extends Article {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contenu?: any[]
}
