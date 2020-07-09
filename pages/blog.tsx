import { fetchAPI } from '@/lib/datocms'
import { ALL_ARTICLES_QUERY } from '../graphql/queries/posts'

import Head from '@/components/header'
import Navbar from '@/components/navbar'
import Container from '@/components/container'
import { BlogPosts } from '@/interfaces/blog'
import ArticlesList from '@/components/articles-list'

export default function Blog({ data }: BlogPosts) {
  return (
    <div>
      <Head title="Blog | Adithya NR" />
      <Navbar />
      <Container>
        <h1 className="font-semibold text-5xl text-gray-900 mb-6">
          <b>Blogs</b>
        </h1>
        <ArticlesList data={data} />
      </Container>
    </div>
  )
}

// istanbul ignore next line
export async function getStaticProps() {
  const allArticles = await fetchAPI(ALL_ARTICLES_QUERY)
  return {
    props: { data: allArticles },
  }
}
