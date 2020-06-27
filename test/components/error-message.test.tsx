import { render } from '../testUtils'
import FormErrorMessage from '@/components/error-message'

test('does not render an error message if not valid props are not sent', () => {
  const { container } = render(<FormErrorMessage message="" />)
  expect(container.innerHTML).toBe('')
})

test('rends an error message', () => {
  const { container } = render(
    <FormErrorMessage message="something went wrong" />
  )
  expect(container.textContent).toBe('something went wrong')
})
