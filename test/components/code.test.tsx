import Code from '@/components/Code'
import { render } from '@testing-library/react'
import * as React from 'react'

test('Syntax highlighting works as expected', () => {
  const { container } = render(
    <Code language="javascript" value="const text = 'hello world'" />
  )
  expect(container.getElementsByClassName('language-javascript').length).toBe(1)
})
