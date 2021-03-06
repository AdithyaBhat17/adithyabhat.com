import { render } from '../testUtils'
import Navbar, { routes } from '@/components/navbar'

test('renders all navigation links', () => {
  const { getAllByTestId } = render(<Navbar />)
  expect(getAllByTestId('nav-link').shift()).toHaveTextContent('About')
  expect(getAllByTestId('nav-link').length).toEqual(routes.length)
})
