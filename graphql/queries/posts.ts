export const ALL_ARTICLES_QUERY = `
    query AllArticles {
        allArticles (orderBy:date_DESC) {
            id
            title
            date
            slug
        }
    }
`

export const ARTICLE_QUERY = `
    query Article ($slug: String!) {
        article (filter:{slug:{eq:$slug}}) {
            id
            title
            content
            date
            slug
        }

        moreArticles:allArticles(orderBy:date_DESC, first: 2, filter:{slug:{neq:$slug}}) {
            id
            title
            slug
        }
    }
`
