import { BlogPosts } from '@/interfaces/blog'
import Link from 'next/link'

export default function ArticlesList({
  data: { allArticles: articles },
}: BlogPosts) {
  return (
    <>
      {articles?.map((article) => (
        <Link
          key={article.id}
          href={`/blog/[slug]`}
          as={`/blog/${article.slug}`}
        >
          <a
            data-testid="article"
            className="flex flex-wrap justify-between items-baseline px-0 md:px-6 hover:text-blue-900 py-4 border-black w-full mx-auto mb-5"
          >
            <h3 className="text-2xl text-black font-semibold ">
              {article.title}
            </h3>
            <small className="mt-5 sm:my-0 text-gray-900 text-xs">
              {article.date}
            </small>
          </a>
        </Link>
      ))}
    </>
  )
}
