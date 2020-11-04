import { fetchAPI } from '@/lib/datocms'
import { ALL_ARTICLES_QUERY } from '../graphql/queries/posts'

import Head from '@/components/header'
import Navbar from '@/components/navbar'
import Container from '@/components/container'
import { BlogPosts } from '@/interfaces/blog'
import ArticlesList from '@/components/articles-list'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'

export default function Blog({ data }: BlogPosts) {
  return (
    <motion.div initial="initial" exit={{ opacity: 0 }} animate="animate">
      <Head title="Blog | Adithya NR" />
      <Navbar />
      <Container>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-5xl text-gray-900 mb-6"
        >
          <b>Blogs</b>
        </motion.h1>
        <ArticlesList data={data} />
      </Container>
      <br />
      <Footer />
    </motion.div>
  )
}

// istanbul ignore next line
export async function getStaticProps() {
  const allArticles = await fetchAPI(ALL_ARTICLES_QUERY)
  return {
    props: { data: allArticles },
  }
}
