import { ResponsiveImageType } from 'react-datocms'

export type WorkProps = {
  data: {
    allProjects: {
      date: Date | string
      tags: string
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
