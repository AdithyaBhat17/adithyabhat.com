import ArticlesList from '@/components/cards'
import Head from '@/components/header'
import Hero from '@/components/hero'
import Work from '@/components/work'
import { AllArticles, AllProjects, List } from '@/interfaces/content'
import { fetchAPI } from '@/lib/datocms'
import Container from '@/components/container'
import NextLink from '@/components/NextLink'
import { motion } from 'framer-motion'
import useResetScroll from 'hooks/useResetScroll'
import Thanks from '@/components/thanks'
import { HOME_PAGE_QUERY } from 'graphql/queries'
import useResizeObserver from 'hooks/useResizeObserver'
import { useEffect } from 'react'

// eslint-disable-next-line no-undef
export const Home = ({ data }: List): JSX.Element => {
  useResetScroll()
  const { width } = useResizeObserver()

  useEffect(() => {
    if (window !== undefined && width) {
      const isTablet = width >= 768 && width <= 1024

      const limit = isTablet ? 4 : 3

      ;(data as AllArticles).allArticles = (data as AllArticles).allArticles?.slice(
        0,
        limit
      )
    }
  }, [width])

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head title="Adithya NR | A Full stack Designer based in Bengaluru, India." />
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
