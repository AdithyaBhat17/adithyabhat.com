import { motion } from 'framer-motion'
import Link from 'next/link'
import { memo } from 'react'
import { useInView } from 'react-intersection-observer'

function Thanks() {
  const [ref, inView] = useInView()
  return (
    <>
      <motion.h1
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        className="mt-24 xl:mt-32 text-2xl sm:text-4xl font-semibold"
      >
        Thanks for stopping by!
      </motion.h1>
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        className="poppins text-xl"
      >
        <span className="block mt-6 sm:mt-10 mb-2">
          Got a project in mind, a question, or something else?{' '}
        </span>
        <Link href="/contact">
          <a className="font-semibold left">Let&apos;s chat.</a>
        </Link>
      </motion.p>
    </>
  )
}

export default memo(Thanks)
