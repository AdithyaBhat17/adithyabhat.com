export const HOME_PAGE_QUERY = `
    query HomePageQuery {
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
        }
        allArticles (filter: {featured: {eq: true}}, orderBy: date_DESC) {
            date
            tags
            slug
            externalLink
            thumbnail {
              alt
              blurhash
              title
              responsiveImage(imgixParams: {fit: crop, ar: "4:3", auto: format}) {
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
        }
    }
`
