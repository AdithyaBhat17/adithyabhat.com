import { BlogPosts } from '@/interfaces/blog'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Image } from 'react-datocms'
import { fadeInUp, stagger } from '../pages'

export default function ArticlesList({ data }: BlogPosts) {
  const { allArticles: articles } = data
  return (
    <motion.div variants={stagger} className="flex items-start flex-wrap -mx-5">
      {articles?.map((article) => (
        <Link
          data-testid="article"
          key={article.title}
          href={`/blog/[slug]`}
          as={`/blog/${article.slug}`}
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full md:w-1/3 mt-8 cursor-pointer text-gray-900 px-5"
          >
            <Image
              className="rounded-lg shadow-sm"
              data={article.thumbnail.responsiveImage}
            />
            <h3 className="mt-3 font-semibold text-xl sm:text-sm lg:text-xl">
              {article.title}
            </h3>
            <p className="text-gray-600 poppins sm:text-xs md:text-md mt-2">
              {`${dayjs(article.date).format('MMM YYYY')} | ${article.tags}`}{' '}
            </p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}
