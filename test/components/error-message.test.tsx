import { render } from '../testUtils'
import FormErrorMessage from '@/components/FormErrorMessage'

test('does not render an error message if not valid props are not sent', () => {
  const { container } = render(<FormErrorMessage message={undefined} />)
  expect(container.innerHTML).toBe('')
})

test('rends an error message', () => {
  const { container } = render(
    <FormErrorMessage message="something went wrong" />
  )
  expect(container.textContent).toBe('something went wrong')
})
