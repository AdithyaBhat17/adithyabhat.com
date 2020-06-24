import { render } from '../testUtils'
import RecentArticles from '@/components/recent-articles'

const allArticles = [
  {
    id: '1',
    slug: 'javascript-variables',
    date: '2020-02-03',
    title: 'JavaScript Variables',
  },
]

test('Lists all articles', () => {
  const { getAllByTestId } = render(<RecentArticles articles={allArticles} />)
  expect(getAllByTestId('article').length).toEqual(1)
})
