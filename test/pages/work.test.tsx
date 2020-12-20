import { render } from '../testUtils'
import { cleanup } from '@testing-library/react'
import CaseStudy from '@/pages/work/[slug]'
import { mockProjects, mockProject } from '../__mocks__/content'
import Work from '@/pages/work'

afterAll(cleanup)

test('Renders a list of blogs', () => {
  const { container } = render(
    <Work
      data={{ allProjects: mockProjects.allProjects }}
      type="allArticles"
      columns="3"
    />
  )
  expect(container).toMatchSnapshot()
})

test('Renders a case study', () => {
  const { getByTestId } = render(
    <CaseStudy data={{ project: mockProject, allProjects: [] }} />
  )
  expect(getByTestId('title').textContent).toEqual('Homero')
  expect(getByTestId('content').textContent).toEqual('Homero case study')
})

test('Displays error page for invalid slug', () => {
  const { getByText } = render(
    <CaseStudy
      data={{ project: { ...mockProject, slug: '' }, allProjects: [] }}
    />
  )
  expect(getByText('404')).toBeInTheDocument()
})
