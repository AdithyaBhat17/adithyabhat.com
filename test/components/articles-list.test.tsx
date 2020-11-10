import { render } from '../testUtils'
import ArticlesList from '@/components/cards'
import { mockArticles } from '../__mocks__/article'

const data = mockArticles

test('Lists all articles', () => {
  const { getAllByRole } = render(
    <ArticlesList data={data} type="allArticles" columns="3" />
  )
  expect(getAllByRole('presentation').length).toEqual(3)
})
