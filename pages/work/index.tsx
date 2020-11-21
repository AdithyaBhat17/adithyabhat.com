import { fetchAPI } from '@/lib/datocms'
import { RECENT_WORK } from '../../graphql/queries/work'

import Head from '@/components/header'
import Navbar from '@/components/navbar'
import Container from '@/components/container'
import { List } from '@/interfaces/content'
import CardsList from '@/components/cards'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'

export default function Work({ data, type, columns }: List) {
  return (
    <motion.div initial="initial" exit={{ opacity: 0 }} animate="animate">
      <Head title="Work | Adithya NR" />
      <Navbar />
      <Container>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-5xl text-gray-900 mb-6"
        >
          Recent work
        </motion.h1>
        <CardsList data={data} type={type} columns={columns} />
      </Container>
      <br />
      <Footer />
    </motion.div>
  )
}

// istanbul ignore next line
export async function getStaticProps() {
  const allProjects = await fetchAPI(RECENT_WORK)
  return {
    props: { data: allProjects, type: 'allProjects', columns: '3' },
  }
}
