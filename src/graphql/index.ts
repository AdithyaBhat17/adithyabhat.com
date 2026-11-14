const PRINT_IMAGE = `
  responsiveImage(imgixParams: { fit: crop, w: 392, h: 280, auto: format }) {
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
`

export const HOME_PAGE_QUERY = `
    query HomePageQuery {
        allProjects(orderBy: date_DESC, first: 5) {
            date
            tags
            slug
            title
            thumbnail {
              alt
              title
              ${PRINT_IMAGE}
            }
        }
        allArticles(orderBy: date_DESC) {
            date
            tags
            slug
            externalLink
            featured
            title
        }
    }
`
