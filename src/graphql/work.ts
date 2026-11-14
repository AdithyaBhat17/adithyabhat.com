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

const RESPONSIVE = `responsiveImage(imgixParams: { auto: format, w: 1520 }) { srcSet webpSrcSet sizes src width height aspectRatio alt title base64 }`

export const ST_BLOCKS = `
  blocks {
    __typename
    ... on FigureRecord { id caption size media { url alt mimeType width height ${RESPONSIVE} } }
    ... on MarginNoteRecord { id text }
    ... on TapedNoteRecord { id quote attribution }
    ... on CodeBlockRecord { id filename language code }
    ... on OutcomeRecord { id stats { value label } }
  }
  inlineBlocks { __typename ... on SideNoteRecord { id text } }
`

/** Project page on the garage-journal schema (falls back to CASE_STUDY). */
export const BUILD_LOG = `
  query BuildLog($slug: String!) {
    project(filter: { slug: { eq: $slug } }) {
      id title caseStudy slug date link tags oneLiner role builtWith stamp builtFor parts
      metadata { description }
      thumbnail { alt responsiveImage(imgixParams: { fit: crop, w: 648, h: 432, auto: format }) { srcSet webpSrcSet sizes src width height aspectRatio alt title base64 } }
      buildLog { value ${ST_BLOCKS} }
      seo: _seoMetaTags { attributes tag content }
    }
    allProjects(orderBy: date_DESC) {
      slug title tags date oneLiner builtFor
      thumbnail { alt responsiveImage(imgixParams: { fit: crop, w: 900, h: 640, auto: format }) { srcSet webpSrcSet sizes src width height aspectRatio alt title base64 } }
    }
  }
`

export const BUILD_LOG_LEGACY = `
  query BuildLogLegacy($slug: String!) {
    project(filter: { slug: { eq: $slug } }) {
      id title caseStudy slug date link tags
      metadata { description }
      thumbnail { alt responsiveImage(imgixParams: { fit: crop, w: 648, h: 432, auto: format }) { srcSet webpSrcSet sizes src width height aspectRatio alt title base64 } }
      seo: _seoMetaTags { attributes tag content }
    }
    allProjects(orderBy: date_DESC) {
      slug title tags date
      thumbnail { alt responsiveImage(imgixParams: { fit: crop, w: 900, h: 640, auto: format }) { srcSet webpSrcSet sizes src width height aspectRatio alt title base64 } }
    }
  }
`
