import { fetchAPI } from '@/lib/datocms'
import { ALL_ARTICLES_QUERY } from '../graphql/queries/posts'

import Head from '@/components/header'
import Navbar from '@/components/navbar'
import Container from '@/components/container'
import Link from 'next/link'
import { BlogPosts } from '@/interfaces/blog'

export default function Blog({ data }: BlogPosts) {
  return (
    <div>
      <Head title="Blog | Adithya NR" />
      <Navbar />
      <Container>
        <h1 className="text-black font-semibold text-5xl text-gray-900 mb-6">
          <b>Blogs</b>
        </h1>
        {data?.allArticles?.map((article) => (
          <Link
            shallow
            key={article.id}
            href={`/blog/[slug]`}
            as={`/blog/${article.slug}`}
          >
            <a className="flex justify-between items-baseline px-6 hover:text-blue-900 py-4 border-black w-full mx-auto mb-5">
              <h3 className="text-2xl text-black font-semibold ">
                {article.title}
              </h3>
              <small className="text-gray-900">{article.date}</small>
            </a>
          </Link>
        ))}
      </Container>
    </div>
  )
}

// istanbul ignore next line
export async function getServerSideProps() {
  const allArticles = await fetchAPI(ALL_ARTICLES_QUERY)
  return {
    props: { data: allArticles },
  }
}
