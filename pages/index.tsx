import ArticlesList from '@/components/cards'
import Head from '@/components/header'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Work from '@/components/work'
import { AllArticles, WorkProps } from '@/interfaces/content'
import { fetchAPI } from '@/lib/datocms'
import { FEATURED_ARTICLES } from 'graphql/queries/posts'
import { RECENT_WORK } from 'graphql/queries/work'
import Container from '@/components/container'
import Footer from '@/components/footer'
import NextLink from '@/components/NextLink'
import { motion } from 'framer-motion'
import useResetScroll from 'hooks/useResetScroll'
import Thanks from '@/components/thanks'

type HomeProps = {
  recentWork: WorkProps
  featuredArticles: AllArticles
}

export const Home = ({
  recentWork,
  featuredArticles,
}: HomeProps): JSX.Element => {
  useResetScroll()
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head title="Adithya NR | A Full stack Designer based in Bengaluru, India." />
      <Navbar />
      <Hero />
      <Work data={recentWork} />
      <Container>
        <h1 className="mt-24 xl:mt-64 mb-6 text-2xl font-semibold">
          Featured articles
        </h1>
        <ArticlesList data={featuredArticles} type="allArticles" columns="3" />
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
  const recentWork: WorkProps = await fetchAPI(RECENT_WORK)
  const articles: AllArticles = await fetchAPI(FEATURED_ARTICLES)
  return {
    props: {
      recentWork,
      featuredArticles: articles ?? [],
    },
  }
}

export default Home
