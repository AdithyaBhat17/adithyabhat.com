import { BlogPosts } from '@/interfaces/blog'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Image } from 'react-datocms'

export default function ArticlesList({ data }: BlogPosts) {
  const { allArticles: articles } = data
  return (
    <div className="flex items-start flex-wrap -mx-5">
      {articles?.map((article) => (
        <Link
          data-testid="article"
          key={article.title}
          href={`/blog/[slug]`}
          as={`/blog/${article.slug}`}
        >
          <a className="w-full md:w-1/3 mt-8 text-gray-900 hover-card px-5">
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
          </a>
        </Link>
      ))}
    </div>
  )
}
