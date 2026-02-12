export const ALL_ARTICLES_QUERY = `
    query AllArticles {
        allArticles (orderBy:date_DESC) {
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

export const ARTICLE_QUERY = `
    query Article ($slug: String!) {
        article (filter:{slug:{eq:$slug}}, orderBy: date_DESC) {
            id
            title
            content
            date
            slug
            tags
            thumbnail {
                alt
                blurhash
                title
                responsiveImage(imgixParams: {fit: crop, ar: "16:9", auto: format}) {
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
            seo: _seoMetaTags {
                attributes
                tag
                content
            }
        }

        moreArticles:allArticles(orderBy:date_DESC, first: 5, filter:{slug:{neq:$slug}}) {
            id
            title
            slug
            tags
            date
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
        }
    }
`

export const FEATURED_ARTICLES = `
    query FeaturedArticles {
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
