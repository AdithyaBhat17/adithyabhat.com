import { ResponsiveImageType, SeoMetaTagType } from 'react-datocms'

export type WorkProps = {
  data: {
    allProjects: {
      date: Date | string
      tags: string
      slug: string
      thumbnail: {
        alt: string
        blurhash: string
        title: string
        responsiveImage: ResponsiveImageType
        url: string
      }
      title: string
      caseStudy?: string
    }[]
  }
}

export type Project = {
  data: {
    project: {
      id: string
      title: string
      caseStudy: string
      date: Date | string
      seo: SeoMetaTagType[]
      slug: string
      link: string
    }
    moreProjects: {
      slug: string
      title: string
    }[]
  }
}
