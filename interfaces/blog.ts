import { ResponsiveImageType, SeoMetaTagType } from 'react-datocms'

export interface ArticleProps {
  data: {
    article: {
      id: string
      title: string
      content: string
      date: Date | string
      slug?: string
      seo: SeoMetaTagType[]
    }
    moreArticles: {
      id: string
      slug: string
      title: string
    }[]
  }
}

export interface BlogPosts {
  data: {
    allArticles: {
      date: Date | string
      tags: string
      slug: string
      thumbnail: {
        alt: string
        blurhash: string
        title: string
        responsiveImage: ResponsiveImageType
      }
      title: string
    }[]
  }
}
