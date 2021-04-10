import Lottie from 'react-lottie'
import animationData from 'lotties/Dog_news_paper.json'
import Link from 'next/link'
import Container from '@/components/container'

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
      <Lottie options={defaultOptions} width={300} height={300} />
      <div className="mx-auto text-left lg:text-center leading-relaxed space-y-2">
        <h1 className="text-4xl poppins mb-4 font-seminbold">
          Oops, Page not found!
        </h1>
        <p className="text-lg poppins">Marv just tore this page apart 🥺</p>
        <br />
        <Link href="/">
          <a className="button_primary poppins mt-5 text-lg">Go Home</a>
        </Link>
      </div>
    </Container>
  )
}

export default PageNotFound
