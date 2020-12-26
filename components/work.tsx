import React, { memo } from 'react'
import Container from '@/components/container'
import { WorkProps } from '@/interfaces/content'
import NextLink from './NextLink'
import { motion } from 'framer-motion'
import useCustomInView from 'hooks/customInView'
import CardsList from '@/components/cards'
import useResizeObserver from 'hooks/useResizeObserver'

function Work({ data }: WorkProps) {
  const { ref, inView } = useCustomInView()
  const { width } = useResizeObserver()

  const isTablet = width >= 768 && width <= 1024

  const limit = isTablet ? 4 : 3

  data.allProjects = data.allProjects.slice(0, limit)

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
        <CardsList data={data} type="allProjects" columns="3" />
        {data?.allProjects?.length > 3 ? (
          <NextLink href="/" text="View more projects" />
        ) : null}
      </Container>
    </motion.div>
  )
}

export default memo(Work)
