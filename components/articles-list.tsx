import { BlogPosts } from '@/interfaces/blog'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import useCustomInView from 'hooks/customInView'
import Link from 'next/link'
import { memo } from 'react'
import { Image } from 'react-datocms'
import { fadeInUp, stagger } from '../pages'

function ArticlesList({ data }: BlogPosts) {
  const { allArticles: articles } = data
  const { ref, controls } = useCustomInView()
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      className="flex items-start flex-wrap -mx-5"
    >
      {articles?.map((article, i) => (
        <Link
          data-testid="article"
          key={article.title}
          href={`/blog/[slug]`}
          as={`/blog/${article.slug}`}
        >
          <motion.div
            custom={i}
            initial={fadeInUp.initial}
            animate={controls}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full md:w-1/3 mt-8 cursor-pointer text-gray-900 px-5"
          >
            <Image
              className="rounded-lg shadow-sm"
              data={article.thumbnail.responsiveImage}
            />
            <h2 className="mt-3 font-semibold text-xl sm:text-sm lg:text-xl">
              {article.title}
            </h2>
            <p className="text-gray-600 poppins sm:text-xs md:text-md mt-2">
              {`${dayjs(article.date).format('MMM YYYY')} | ${article.tags}`}{' '}
            </p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}

export default memo(ArticlesList)
