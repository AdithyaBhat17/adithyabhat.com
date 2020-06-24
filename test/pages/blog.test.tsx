import { render } from '../testUtils'
import { cleanup } from '@testing-library/react'
import Blog from '@/pages/blog'
import Article from '@/pages/blog/[slug]'

afterAll(cleanup)

const allArticles = [
  {
    id: '1',
    title: 'abc',
    date: '2018-01-01',
    slug: 'abc',
    content: 'this is a demo article 1',
  },
  {
    id: '2',
    title: 'xyz',
    date: '2018-09-12',
    content: 'this is a demo article 2',
  },
]

test('Renders a list of blogs', () => {
  const { container } = render(<Blog data={{ allArticles }} />)
  expect(container).toMatchSnapshot()
})

test('Renders an article', () => {
  const { getByTestId } = render(
    <Article data={{ article: allArticles[0], moreArticles: [] }} />
  )
  expect(getByTestId('title').textContent).toEqual('abc')
  expect(getByTestId('date').textContent).toEqual('01 Jan, 2018')
  expect(getByTestId('content').textContent).toEqual('this is a demo article 1')
})

test('Displays error page for invalid slug', () => {
  const { getByText } = render(
    <Article data={{ article: allArticles[1], moreArticles: [] }} />
  )
  expect(getByText('404')).toBeInTheDocument()
})
