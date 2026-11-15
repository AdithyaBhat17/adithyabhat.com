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

export const HOME_PAGE_QUERY_LEGACY = `
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

/** Same as the legacy query, plus the garage-journal schema fields. */
export const HOME_PAGE_QUERY = HOME_PAGE_QUERY_LEGACY.replace('featured\n', 'featured\n            coverArt\n            summary\n')
