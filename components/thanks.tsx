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
        className="mt-24 xl:mt-32 mb-6 text-3xl font-semibold"
      >
        Thanks for stopping by!
      </motion.h1>
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        className="poppins text-lg"
      >
        Got a project in mind, a question, or something else?{' '}
        <br className="hidden lg:block" /> Get in touch with me{' '}
        <Link href="/contact">
          <a className="font-semibold hover:border-b-2 hover:border-blue-800">
            here
          </a>
        </Link>
      </motion.p>
    </>
  )
}

export default memo(Thanks)
