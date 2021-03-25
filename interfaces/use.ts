import { ResponsiveImageType } from 'react-datocms'

export interface Use {
  id: string
  category: string
  tools: {
    name: string
    link: string
  }[]
}

export interface Stack {
  id: string
  product: string
  link: string
  description: string
  logo: {
    url: string
    responsiveImage: ResponsiveImageType
  }
  category: string
}
