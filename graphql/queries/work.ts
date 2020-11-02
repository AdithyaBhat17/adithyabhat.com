export const RECENT_WORK = `
    query RecentWork {
        allProjects {
            date
            tags
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
