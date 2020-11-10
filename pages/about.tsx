import Head from '@/components/header'
import Navbar from '@/components/navbar'
import Container from '@/components/container'
import Link from 'next/link'
import Footer from '@/components/footer'
import { companies } from '@/utils/about'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/utils/motion'
import useResetScroll from 'hooks/useResetScroll'

export default function About({ companies }) {
  useResetScroll()
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head title="About - Adithya NR" />
      <Navbar />
      <Container>
        <motion.div variants={fadeInUp} className="px-0 md:px-16 xl:px-32">
          <img
            loading="eager"
            className="mx-auto w-3/4 md:w-1/3"
            src="/static/about_hero.svg"
            alt="About Adithya"
          />
          <h1 className="text-3xl md:text-5xl my-5 text-left sm:text-center">
            Hello, I&apos;m Adithya
          </h1>
          <p className=" my-5 leading-8">
            As you might have guessed already, I&apos;m Adithya, a 22-year-old
            Full-Stack Designer from Bengaluru, India.
          </p>
          <p className="my-5 leading-8">
            I&apos;m a React nanodegree graduate, and an IDF certified UX
            Designer. Free time is hard to come by, but when it does, I
            freelance and craft web apps for a living.
          </p>
          <h2 className="text-md leading-8 uppercase opacity-50 mt-5 mb-3">
            Background
          </h2>
          <p className="my-5 leading-8">
            I studied computer science and engineering at RNS Institute of
            Technology, Bangalore. During my time at RNSIT, I volunteered as a
            graphic designer with a small team that helped me jumpstart and hone
            my skills as a digital designer.
          </p>
          <p className="my-5 leading-8">
            Aside from design, I also build web apps using the latest
            technologies like React, Node and many more tools. I&apos;m
            currently working at Betsol as a Web Architect on a product called
            Leto. I&apos;m involved in the design (both UI/UX and architecture)
            and development of the product using React, Redux, Node and
            Postgres. .
          </p>
          <h3 className="text-xl md:text-3xl my-20 text-left sm:text-center">
            <b>Companies I&apos;ve worked with</b>
          </h3>
          <div className="flex flex-wrap mx-auto justify-between sm:justify-around items-center mb-5">
            {companies?.map((company) => (
              <div key={company.name} className="w-1/2 md:w-1/4 mx-auto my-5">
                <img
                  loading="lazy"
                  className="mx-auto w-1/2 sm:w-2/3 company"
                  src={company.path}
                  alt={company.name}
                  title={company.name}
                />
              </div>
            ))}
          </div>
          <h3 className="text-xl md:text-3xl mt-20 mb-16 text-left sm:text-center">
            <b>Things I&apos;m good at</b>
          </h3>
          <img
            loading="lazy"
            className="mx-auto w-3/4 md:w-1/3 block h-56 sm:h-auto"
            src="/static/skills.svg"
            alt="Things I'm good at"
          />
          <div className="flex flex-wrap mx-auto text-left md:text-center mt-16 md:mt-24">
            <div className="w-full mx-auto sm:flex-1">
              <h2 className="inline-flex items-center text-xl">
                <img
                  src="/static/pen-tool.svg"
                  className="mr-5"
                  alt="Pen tool icon"
                />{' '}
                Design
              </h2>{' '}
              <br />
              <small className="block text-md sm:w-4/5 sm:mx-auto leading-7 my-5">
                User Experience, User Interface, Wireframing, Prototyping, Web
                design
              </small>
            </div>
            <div className="w-full mx-auto flex-1">
              <h2 className="inline-flex items-center text-xl">
                <img
                  src="/static/terminal.svg"
                  className="mr-5"
                  alt="Terminal icon"
                />{' '}
                Development
              </h2>{' '}
              <br />
              <small className="block text-md sm:w-4/5 sm:mx-auto leading-7 my-5">
                JavaScript, Reactjs, Redux, Express, Nodejs, TypeScript, Nextjs,
                GraphQL, PostgreSQL
              </small>
            </div>
          </div>
          <h1 className="text-2xl md:text-5xl font-semibold my-20 md:my-40">
            Got a project in mind, a question or something else? Get in touch
            with me{' '}
            <Link href="/contact">
              <a> here</a>
            </Link>
          </h1>
        </motion.div>
      </Container>
      <Footer />
    </motion.div>
  )
}

export function getStaticProps() {
  return {
    props: {
      companies,
    },
  }
}
