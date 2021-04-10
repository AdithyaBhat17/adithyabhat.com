import React from 'react'
import PageNotFound from '@/pages/404'
import { render, screen } from '@testing-library/react'

beforeEach(() => {
  render(<PageNotFound />)
})

test('404 page renders a link to go home', () => {
  expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument()
})
