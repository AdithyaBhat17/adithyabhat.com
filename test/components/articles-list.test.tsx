import { render } from '../testUtils'
import ArticlesList from '@/components/articles-list'
import { mockArticles } from '../__mocks__/article'

const data = mockArticles

test('Lists all articles', () => {
  const { getAllByRole } = render(<ArticlesList data={data} />)
  expect(getAllByRole('presentation').length).toEqual(3)
})
