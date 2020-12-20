import { render } from '../testUtils'
import FormErrorMessage from '@/components/error-message'

test('does not render an error message if not valid props are not sent', () => {
  const { container } = render(<FormErrorMessage message={undefined} />)
  expect(container.innerHTML).toBe('')
})

test('renders an error message', () => {
  const { container, rerender } = render(
    <FormErrorMessage message="something went wrong" />
  )
  expect(container.textContent).toBe('something went wrong')

  rerender(<FormErrorMessage />)
  expect(container.textContent).toBe('')
})
