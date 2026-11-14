export const RECENT_WORK_LEGACY = `
    query RecentWork {
        allProjects(orderBy: date_DESC) {
            date
            tags
            slug
            link
            title
            thumbnail {
              alt
              title
              responsiveImage(imgixParams: { fit: crop, w: 648, h: 432, auto: format }) {
                srcSet
                webpSrcSet
                sizes
                src
                width
                height
                aspectRatio
                alt
                title
                base64
              }
            }
          }
    }
`

export const RECENT_WORK = RECENT_WORK_LEGACY.replace('link\n', 'link\n            oneLiner\n            role\n            builtWith\n            stamp\n            builtFor\n')

export const CASE_STUDY = `
  query Project ($slug: String!) {
    project (filter:{slug:{eq:$slug}}, orderBy: date_DESC) {
      id
      title
      caseStudy
      slug
      date
      link
      seo: _seoMetaTags {
        attributes
        tag
        content
      }
    }

    allProjects (orderBy: date_DESC, filter:{slug:{neq:$slug}}) {
      slug
      title
      thumbnail {
        alt
        blurhash
        title
        responsiveImage(imgixParams: { fit: crop, ar: "4:3", auto: format }) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
      }
      tags
      date
    }
  }
`
