import Head from '@/components/header'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Work from '@/components/work'
import { fetchAPI } from '@/lib/datocms'
import { RECENT_WORK } from 'graphql/queries/work'

export const Home = ({ data }): JSX.Element => (
  <div className="">
    <Head title="Adithya NR | A Full stack Designer based in Bengaluru, India." />
    <Navbar />
    <Hero />
    <Work data={data} />
  </div>
)

export async function getStaticProps() {
  const recentWork = await fetchAPI(RECENT_WORK)
  return {
    props: {
      data: recentWork,
    },
  }
}

export default Home
