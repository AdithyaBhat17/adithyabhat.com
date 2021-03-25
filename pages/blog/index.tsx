import { fetchAPI } from '@/lib/datocms'
import { ALL_ARTICLES_QUERY } from '../../graphql/queries/posts'

import Head from '@/components/header'
import Container from '@/components/container'
import { List } from '@/interfaces/content'
import CardsList from '@/components/cards'
import { motion } from 'framer-motion'

export default function Blog({ data, type, columns }: List) {
  return (
    <motion.div initial="initial" exit={{ opacity: 0 }} animate="animate">
      <Head title="Blog | Adithya NR" />
      <Container>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-5xl text-gray-900 mb-6"
        >
          Articles
        </motion.h1>
        <CardsList data={data} type={type} columns={columns} />
      </Container>
    </motion.div>
  )
}

// istanbul ignore next line
export async function getStaticProps() {
  const allArticles = await fetchAPI(ALL_ARTICLES_QUERY)
  return {
    props: { data: allArticles, type: 'allArticles', columns: '3' },
  }
}
