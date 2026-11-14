export const ALL_ARTICLES_QUERY_LEGACY = `
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

export const ALL_ARTICLES_QUERY = ALL_ARTICLES_QUERY_LEGACY.replace('externalLink\n', 'externalLink\n            coverArt\n            summary\n')

import { ST_BLOCKS } from './work'

const ARTICLE_FIELDS = `id title content date slug tags externalLink
  thumbnail { alt responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 1520, auto: format }) { srcSet webpSrcSet sizes src width height aspectRatio alt title base64 } }
  seo: _seoMetaTags { attributes tag content }`

/** Article page on the garage-journal schema (falls back to the legacy query). */
export const ARTICLE_PAGE = `
  query ArticlePage($slug: String!) {
    article(filter: { slug: { eq: $slug } }) {
      ${ARTICLE_FIELDS}
      summary coverArt
      body { value ${ST_BLOCKS.replace(/\.\.\. on OutcomeRecord[^\n]*\n/, '')} }
    }
    allArticles(orderBy: date_DESC) { slug title date tags externalLink coverArt summary }
  }
`

export const ARTICLE_PAGE_LEGACY = `
  query ArticlePageLegacy($slug: String!) {
    article(filter: { slug: { eq: $slug } }) { ${ARTICLE_FIELDS} }
    allArticles(orderBy: date_DESC) { slug title date tags externalLink }
  }
`
