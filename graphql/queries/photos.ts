export const GALLERY_PHOTOS = `
    query GalleryPhotos {
        allPlaces (orderBy:date_DESC) {
            city
            location
            date
            state
            district
            distance
            camera
            photos {
                alt
                blurhash
                title
                responsiveImage(imgixParams: {fit: clip, ar: "9:16", auto: format}) {
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
`;
