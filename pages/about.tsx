import Container from '@/components/container'
import Head from '@/components/header'
import { companies } from '@/utils/about'
import { calculateAge } from '@/utils/age'
import { fadeInUp } from '@/utils/motion'
import { motion } from 'framer-motion'
import useResetScroll from 'hooks/useResetScroll'
import Image from 'next/image'
import Link from 'next/link'

export default function About({ companies }) {
  useResetScroll()
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Head title="About - Adithya NR" />
      <Container className="2xl:px-96">
        <motion.div variants={fadeInUp} className="px-0 md:px-16 xl:px-32">
          <div className="flex justify-center">
            <Image
              width={250}
              height={250}
              loading="eager"
              className="block mx-auto"
              src="/static/about_hero.svg"
              alt="About Adithya"
            />
          </div>
          <h1 className="text-3xl md:text-4xl my-10 text-left sm:text-center font-semibold">
            About me
          </h1>
          <p className=" my-5 leading-8">
            As you might have guessed already, I&apos;m Adithya, a UX Engineer from Bengaluru, India.
          </p>
          <p className="my-5 leading-8">
            For more than 3 years now, design has been the central piece of my
            world. On this quick and mind-blowing journey, I have moved over the
            years from being a graphic designer to a full-time UX Designer and
            UI Engineer.
          </p>
          <p className="my-5 leading-8">
            With a never-ending goal of maintaining a high standard for
            usability & user experience, I have consistently worked with various
            startups and clients worldwide and helped them create unique and
            engaging digital products.
          </p>
          <p className="my-5 leading-8">
            I&apos;m currently working on the Conversational CX platform at{' '}
            <a
              href="http://yellow.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="left"
            >
              yellow.ai
            </a>{' '}
            as a Software Engineer (SDE-2).
          </p>
          <h3 className="text-xl md:text-3xl my-20 text-left sm:text-center font-semibold">
            Companies I&apos;ve worked with
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-14 justify-center items-center mb-5">
            {companies?.map((company) => (
              <div key={company.name} className="my-5">
                <img
                  loading="lazy"
                  className=""
                  src={company.path}
                  alt={company.name}
                  title={company.name}
                />
              </div>
            ))}
          </div>
          <h3 className="text-xl md:text-3xl mt-20 mb-16 text-left sm:text-center font-semibold">
            Things I&apos;m good at
          </h3>
          <img
            loading="lazy"
            className="mx-auto w-3/4 md:w-1/3 block h-56 sm:h-auto"
            src="/static/skills.svg"
            alt="Things I'm good at"
          />
          <div className="flex flex-wrap mx-auto text-left md:text-center mt-16 md:mt-24">
            <div className="w-full mx-auto sm:flex-1">
              <h2 className="inline-flex items-center text-xl font-semibold">
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
              <h2 className="inline-flex items-center text-xl font-semibold">
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
          <h1 className="text-2xl md:text-5xl font-semibold my-20 md:my-40 leading-relaxed md:leading-relaxed">
            Got a project in mind, a question or something else? Get in touch
            with me{' '}
            <Link legacyBehavior href="/contact">
              <a className="left"> here</a>
            </Link>
          </h1>
        </motion.div>
      </Container>
    </motion.div>
  )
}

export function getStaticProps() {
  const age = calculateAge()
  return {
    props: {
      companies,
      age,
    },
  }
}
