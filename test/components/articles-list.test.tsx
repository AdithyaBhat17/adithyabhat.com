import { render } from '../testUtils'
import ArticlesList from '@/components/articles-list'

const data = {
  allArticles: [
    {
      id: '1',
      slug: 'javascript-variables',
      date: '2020-02-03',
      title: 'JavaScript Variables',
    },
  ],
}

test('Lists all articles', () => {
  const { getAllByTestId } = render(<ArticlesList data={data} />)
  expect(getAllByTestId('article').length).toEqual(1)
})
