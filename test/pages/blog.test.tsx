import { render } from '../testUtils'
import { cleanup } from '@testing-library/react'
import Blog from '@/pages/blog'
import Article from '@/pages/blog/[slug]'
import { mockArticles, mockArticle } from '../__mocks__/article'

afterAll(cleanup)

test('Renders a list of blogs', () => {
  const { container } = render(
    <Blog
      data={{ allArticles: mockArticles.allArticles }}
      type="allArticles"
      columns="3"
    />
  )
  expect(container).toMatchSnapshot()
})

test('Renders an article', () => {
  const { getByTestId } = render(
    <Article data={{ article: mockArticle, moreArticles: [] }} />
  )
  expect(getByTestId('title').textContent).toEqual('Intro to JavaScript')
  expect(getByTestId('date').textContent).toEqual('20 Aug, 2020')
  expect(getByTestId('content').textContent).toEqual('Blog contents')
})

test('Displays error page for invalid slug', () => {
  const { getByText } = render(
    <Article
      data={{ article: { ...mockArticle, slug: '' }, moreArticles: [] }}
    />
  )
  expect(getByText('404')).toBeInTheDocument()
})
