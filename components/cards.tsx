import { Article, List, Project } from '@/interfaces/blog'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import useCustomInView from 'hooks/customInView'
import Link from 'next/link'
import { memo } from 'react'
import { Image } from 'react-datocms'
import { fadeInUp, stagger } from '@/utils/motion'

const renderMeta = (
  type: 'allArticles' | 'allProjects',
  date: Date | string,
  tags: string
): string => {
  let desc = ''
  if (type === 'allArticles') {
    desc = `${dayjs(date).format('MMM YYYY')} | `
  }
  desc += tags
  return desc
}

function CardsList({ data, type, columns }: List) {
  const { ref, controls } = useCustomInView()
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      className="flex items-start flex-wrap -mx-5"
    >
      {data[type]?.map((item: Article | Project, i: number) => (
        <Link
          data-testid="article"
          key={item.title}
          href={`/blog/[slug]`}
          as={`/blog/${item.slug}`}
        >
          <motion.div
            custom={i}
            initial={fadeInUp.initial}
            animate={controls}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full md:w-1/${columns} mt-8 cursor-pointer text-gray-900 px-5`}
          >
            <Image
              className="rounded-lg shadow-sm"
              data={item.thumbnail.responsiveImage}
            />
            <h2 className="mt-3 font-semibold text-xl sm:text-sm lg:text-xl">
              {item.title}
            </h2>
            <p className="text-gray-600 poppins sm:text-xs md:text-md mt-2">
              {renderMeta(type, item.date, item.tags)}
            </p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}

export default memo(CardsList)
