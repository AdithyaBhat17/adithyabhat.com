export interface BlogPosts {
  data: {
    allArticles: {
      id: string
      slug: string
      date: Date
      title: string
    }[]
  }
}

export interface ArticleProps {
  data: {
    article: {
      id: string
      title: string
      content: string
      date: Date
      slug
    }
    moreArticles: {
      id: string
      slug: string
      title: string
    }[]
  }
}
