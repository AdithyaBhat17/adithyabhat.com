import { render } from '../testUtils'
import About from '@/pages/about'

test('About page matches snapshot', () => {
  const { container } = render(<About />)
  expect(container.innerHTML).toMatchSnapshot()
})
