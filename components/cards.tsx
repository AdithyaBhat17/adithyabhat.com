import { Article, List, Project } from '@/interfaces/content'
import { fadeInUp, stagger } from '@/utils/motion'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import useCustomInView from 'hooks/customInView'
import Link from 'next/link'
import { memo } from 'react'
import { Image } from 'react-datocms'

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

function CardsList({ data, type }: List) {
  const pathname = type === 'allArticles' ? 'blog' : 'work'
  const { ref, controls } = useCustomInView()
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mt-8"
    >
      {data[type]?.map((item: Article | Project, i: number) => (
        <Link
          data-testid="article"
          key={item.title}
          href={item.externalLink ? item.externalLink : `/${pathname}/[slug]`}
          {...(item.externalLink
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : { as: `/${pathname}/${item.slug}` })}
        >
          <motion.div
            custom={i}
            initial={fadeInUp.initial}
            animate={controls}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full mt-8 cursor-pointer text-gray-900`}
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
