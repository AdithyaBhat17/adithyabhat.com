import ArticlesList from './articles-list'

export default function RecentArticles({ articles }) {
  if (!articles.length) return null
  return (
    <div>
      <h3 className="text-md uppercase px-0 font-semibold mt-24 mb-6">
        Recent posts
      </h3>
      <ArticlesList data={{ allArticles: articles }} />
    </div>
  )
}
