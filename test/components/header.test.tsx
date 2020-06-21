import Head from '../../components/header'
import { render } from '@testing-library/react'

test('Renders metadata', async () => {
  render(<Head title="Custom title" />)
})
