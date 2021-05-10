import React from 'react'
import { render } from '../testUtils'
import { getStaticProps, Home } from '../../pages/index'
import { cleanup, waitFor } from '@testing-library/react'
import MyApp from '../../pages/_app'
import { mockArticles, mockProjects } from '../__mocks__/content'
import About from '@/pages/about'

import * as api from '@/lib/datocms'
import { HOME_PAGE_QUERY } from 'graphql/queries'

afterEach(cleanup)

describe('Home page', () => {
  it('matches snapshot', () => {
    const data = { ...mockArticles, ...mockProjects }
    const { asFragment } = render(
      <Home data={data} type="allArticles" columns="3" />
    )
    waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
  it('Imports css modules using _app.tsx', () => {
    render(<MyApp Component={About} pageProps={{}} />)
  })
})

test('Get static props works as expected', async () => {
  const mockFetchAPI = jest
    .spyOn(api, 'fetchAPI')
    .mockImplementation(async () => ({ data: { allArticles: [] } }))
  await getStaticProps()
  expect(mockFetchAPI).toBeCalledWith(HOME_PAGE_QUERY)
})
