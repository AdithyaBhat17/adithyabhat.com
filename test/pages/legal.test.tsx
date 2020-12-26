import * as React from 'react'
import Legal, { getStaticProps } from '@/pages/legal'
import { render } from '@testing-library/react'
import * as api from '@/lib/datocms'

test('Renders a legal document', () => {
  const { getByText } = render(<Legal document="Hello world!" />)

  expect(getByText('Hello world!')).toBeInTheDocument()
})

test('Get static props returns the document props', async () => {
  jest
    .spyOn(api, 'fetchAPI')
    .mockImplementation(async () => ({ legal: { document: 'Hello world' } }))
  const { props } = await getStaticProps()
  expect(props.document).toMatch('<p>Hello world</p>')
})
