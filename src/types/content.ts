export interface ResponsiveImage {
  srcSet: string
  webpSrcSet: string
  sizes: string
  src: string
  width: number
  height: number
  aspectRatio: number
  alt: string | null
  title: string | null
  base64: string | null
}

export interface SeoMetaTag {
  attributes: Record<string, string> | null
  tag: string
  content: string | null
}

export type Article = {
  date: Date | string
  tags?: string
  slug?: string
  content?: string
  id?: string
  externalLink?: string
  thumbnail?: {
    alt: string
    blurhash: string
    title: string
    responsiveImage: ResponsiveImage
  }
  seo?: SeoMetaTag[]
  title: string
}

export type Project = {
  id: string
  title: string
  tags?: string
  externalLink?: string
  thumbnail?: {
    alt: string
    blurhash: string
    title: string
    responsiveImage: ResponsiveImage
  }
  caseStudy: string
  date: Date | string
  slug: string
  link: string
  seo?: SeoMetaTag[]
}

export type AllArticles = { allArticles: Article[] }
export type AllProjects = { allProjects: Project[] }
