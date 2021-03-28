import PreviewBanner from '@/components/PreviewBanner'
import { render, screen } from '@testing-library/react'
import React from 'react'

test('Renders a preview banner with a link to  exit preview mode.', async () => {
  render(<PreviewBanner />)
  expect(
    screen.getByRole('link', { name: /click here/i }).getAttribute('href')
  ).toEqual('/api/exit-preview')
})
