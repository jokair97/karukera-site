export interface SanityImageAsset {
  _id: string
  url: string
}

export interface SanityImage {
  asset: SanityImageAsset
  alt?: string
}

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

export interface Article {
  _id: string
  titre: string
  slug: { current: string }
  date: string
  categorie?: string
  extrait?: string
  imagePrincipale?: SanityImage
}
