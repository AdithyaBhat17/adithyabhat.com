import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'
import { cleanup } from '@testing-library/react'
import MyApp from '../../pages/_app'

afterEach(cleanup)

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home data={{ allProjects: [] }} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
  it('Imports css modules using _app.tsx', () => {
    render(<MyApp Component={Home} pageProps={{}}></MyApp>)
  })
})
