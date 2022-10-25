import { cleanup, waitFor } from '@testing-library/react'
import { getStaticProps, Home } from '../../pages/index'
import { render } from '../testUtils'
import { mockArticles, mockProjects } from '../__mocks__/content'

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
})

test('Get static props works as expected', async () => {
  const mockFetchAPI = jest
    .spyOn(api, 'fetchAPI')
    .mockImplementation(async () => ({ data: { allArticles: [] } }))
  await getStaticProps()
  expect(mockFetchAPI).toBeCalledWith(HOME_PAGE_QUERY)
})
