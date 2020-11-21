import React, { memo } from 'react'
import Container from '@/components/container'
import { Image } from 'react-datocms'
import { WorkProps } from '@/interfaces/content'
import NextLink from './NextLink'
import { motion } from 'framer-motion'
import { stagger, fadeInUp } from '@/utils/motion'
import useCustomInView from 'hooks/customInView'
import Link from 'next/link'

function Work({ data }: WorkProps) {
  const { ref, inView, controls } = useCustomInView()
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, transition: { delay: 200 } },
        animate: { opacity: 1 },
      }}
    >
      <Container>
        <motion.h1
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
          className="mt-6 lg:mt-16 xl:mt-24 mb-6 text-2xl font-semibold"
        >
          Recent work
        </motion.h1>
        <motion.div
          ref={ref}
          variants={stagger}
          className="flex items-start flex-wrap -mx-5"
        >
          {data?.allProjects
            ?.slice(0, 3)
            ?.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
            .map((project, i) => {
              return (
                <Link
                  data-testid="project"
                  key={project.title}
                  href={`/work/[slug]`}
                  as={`/work/${project.slug}`}
                >
                  <motion.div
                    custom={i}
                    animate={controls}
                    initial={fadeInUp.initial}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full md:w-1/3 cursor-pointer text-gray-900 mt-5 px-5"
                    key={project.title}
                  >
                    <Image
                      className="rounded-lg shadow-sm"
                      data={project.thumbnail.responsiveImage}
                    />
                    <h2 className="mt-3 font-semibold text-xl">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 poppins">{project.tags}</p>
                  </motion.div>
                </Link>
              )
            })}
        </motion.div>
        {data?.allProjects?.length > 3 ? (
          <NextLink href="/" text="View more projects" />
        ) : null}
      </Container>
    </motion.div>
  )
}

export default memo(Work)
