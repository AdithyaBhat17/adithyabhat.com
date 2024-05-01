import Container from '@/components/container'
import Head from '@/components/header'
import { motion } from 'framer-motion'
import animationData from 'lotties/Dog_news_paper.json'
import Link from 'next/link'
import Lottie from 'react-lottie'

const defaultOptions = {
  loop: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

function PageNotFound() {
  return (
    <Container>
      <Head title="404 - Page not found" />
      <Lottie options={defaultOptions} width={300} height={300} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        layout
        className="mx-auto text-left lg:text-center leading-relaxed space-y-2"
      >
        <h1 className="text-4xl leading-normal poppins mb-4 font-semibold">
          Oops, Page not found!
        </h1>
        <p className="text-lg poppins">Marv just tore this page apart 🥺</p>
        <br />
        <Link legacyBehavior href="/">
          <a className="button_primary poppins mt-5 text-lg">Go Home</a>
        </Link>
      </motion.div>
    </Container>
  )
}

export default PageNotFound
