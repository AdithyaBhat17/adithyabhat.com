import { render } from '../testUtils'
import RecentArticles from '@/components/cards'
import { mockArticles } from '../__mocks__/article'

test('Lists all articles', () => {
  const { getAllByRole } = render(
    <RecentArticles data={mockArticles} type="allArticles" columns="3" />
  )
  expect(getAllByRole('presentation').length).toEqual(3)
})
