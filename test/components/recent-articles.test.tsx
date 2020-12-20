import { render } from '../testUtils'
import RecentArticles from '@/components/cards'
import { mockArticles } from '../__mocks__/content'
import Recent from '@/components/recent-articles'

test('Lists all articles', () => {
  const { getAllByRole, unmount } = render(
    <RecentArticles data={mockArticles} type="allArticles" columns="3" />
  )
  expect(getAllByRole('presentation').length).toEqual(3)

  unmount()

  const { getAllByRole: _getAllByRole } = render(
    <Recent data={mockArticles} type="allArticles" columns="3" />
  )
  expect(_getAllByRole('presentation').length).toEqual(3)
})
