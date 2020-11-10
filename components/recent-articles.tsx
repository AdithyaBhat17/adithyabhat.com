import { List } from '@/interfaces/blog'
import CardsList from './cards'

export default function Recent({ data, type, columns }: List) {
  if (!data[type].length) return null
  return (
    <div>
      <h3 className="text-md uppercase px-0 font-semibold mt-24 mb-6">
        Recent {type === 'allArticles' ? 'Posts' : 'Projects'}
      </h3>
      <CardsList data={data} type={type} columns={columns} />
    </div>
  )
}
