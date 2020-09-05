import { render } from '../testUtils'
import About from '@/pages/about'
import { companies } from '@/utils/about'

test('About page matches snapshot', () => {
  const { container } = render(<About companies={companies} />)
  expect(container.innerHTML).toMatchSnapshot()
})
