import { render } from '../testUtils'
import Footer, { footerRoutes, socials } from '@/components/footer'

test('renders all footer links', () => {
  const { getAllByTestId } = render(<Footer />)
  expect(getAllByTestId('footer-link').length).toEqual(footerRoutes.length)
})

test('renders all social links', () => {
  const { getAllByTestId } = render(<Footer />)
  expect(getAllByTestId('socials-link').length).toEqual(socials.length)
})
