import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'
import { cleanup } from '@testing-library/react'
import MyApp from '../../pages/_app'
import { mockArticles, mockProjects } from '../__mocks__/content'
import About from '@/pages/about'

afterEach(cleanup)

describe('Home page', () => {
  it('matches snapshot', () => {
    const data = { ...mockArticles, ...mockProjects }
    const { asFragment } = render(
      <Home data={data} type="allArticles" columns="3" />
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('Imports css modules using _app.tsx', () => {
    render(<MyApp Component={About} pageProps={{}}></MyApp>)
  })
})
