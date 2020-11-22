export const RECENT_WORK = `
    query RecentWork {
        allProjects {
            date
            tags
            slug
            thumbnail {
              alt
              blurhash
              title
              responsiveImage(imgixParams: { fit: crop,  ar: "4:3", auto: format }) {
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
            title
            caseStudy
          }
    }
`

export const CASE_STUDY = `
  query Project ($slug: String!) {
    project (filter:{slug:{eq:$slug}}, orderBy: date_DESC) {
      id
      title
      caseStudy
      slug
      date
      slug
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
        responsiveImage(imgixParams: { fit: crop,  ar: "4:3", auto: format }) {
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
