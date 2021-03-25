import { render } from '../testUtils'
import Footer, { footerRoutes } from '@/components/footer'
import { socials } from '@/components/socials'
import { waitFor } from '@testing-library/react'

test('renders all footer links', async () => {
  const { getAllByTestId } = render(<Footer />)
  await waitFor(() =>
    expect(getAllByTestId('footer-link').length).toEqual(footerRoutes.length)
  )
})

test('renders all social links', async () => {
  const { getAllByTestId } = render(<Footer />)
  await waitFor(() =>
    expect(getAllByTestId('socials-link').length).toEqual(socials.length)
  )
})
