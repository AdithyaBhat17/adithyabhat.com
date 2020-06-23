export interface BlogPosts {
  data: {
    allArticles: {
      id: string
      slug: string
      date: Date | string
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
      date: Date | string
      slug: string | undefined
    }
    moreArticles: {
      id: string
      slug: string
      title: string
    }[]
  }
}
