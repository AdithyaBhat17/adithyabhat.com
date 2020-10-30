import Head from '@/components/header'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'

export const Home = (): JSX.Element => (
  <div className="">
    <Head title="Adithya NR | A Full stack Designer based in Bengaluru, India." />
    <Navbar />
    <Hero />
  </div>
)

export default Home
