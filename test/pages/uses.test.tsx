import { render } from '../testUtils'
import Uses from '../../pages/uses'

test('renders categories', () => {
  const allUses = [
    {
      id: 1,
      category: 'Device',
      tools: [{ name: 'iPad', link: 'https://apple.com' }],
    },
  ]
  const { getByTestId } = render(<Uses data={{ allUses }} />)

  expect(getByTestId('category').textContent).toEqual('Device')
  expect(getByTestId('link')).toHaveTextContent('iPad')
  expect(getByTestId('link')).toHaveAttribute('href', 'https://apple.com')
})
