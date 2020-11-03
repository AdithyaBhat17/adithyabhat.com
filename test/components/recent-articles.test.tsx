import { render } from '../testUtils'
import RecentArticles from '@/components/recent-articles'
import { mockArticles } from '../__mocks__/article'

const { allArticles } = mockArticles

test('Lists all articles', () => {
  const { getAllByRole } = render(<RecentArticles articles={allArticles} />)
  expect(getAllByRole('presentation').length).toEqual(3)
})
