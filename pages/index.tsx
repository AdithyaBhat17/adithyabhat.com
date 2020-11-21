import ArticlesList from '@/components/cards'
import Head from '@/components/header'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Work from '@/components/work'
import { AllArticles, AllProjects, List } from '@/interfaces/content'
import { fetchAPI } from '@/lib/datocms'
import Container from '@/components/container'
import Footer from '@/components/footer'
import NextLink from '@/components/NextLink'
import { motion } from 'framer-motion'
import useResetScroll from 'hooks/useResetScroll'
import Thanks from '@/components/thanks'
import { HOME_PAGE_QUERY } from 'graphql/queries'

export const Home = ({ data }: List): JSX.Element => {
  useResetScroll()
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head title="Adithya NR | A Full stack Designer based in Bengaluru, India." />
      <Navbar />
      <Hero />
      <Work data={data as AllProjects} />
      <Container>
        <h1 className="mt-24 xl:mt-64 mb-6 text-2xl font-semibold">
          Featured articles
        </h1>
        <ArticlesList
          data={data as AllArticles}
          type="allArticles"
          columns="3"
        />
        <NextLink href="/blog" text="Read more articles" />
        <Thanks />
      </Container>
      <div className="mt-24 lg:mt-32">
        <Footer />
      </div>
    </motion.div>
  )
}

export async function getStaticProps() {
  const data: List = await fetchAPI(HOME_PAGE_QUERY)
  return {
    props: {
      data,
    },
  }
}

export default Home
