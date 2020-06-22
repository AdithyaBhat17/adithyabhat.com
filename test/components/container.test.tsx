import { render } from '../testUtils'
import Container from '../../components/container'

test('containers renders children with given props', () => {
  const { getByTestId } = render(
    <Container props={{ id: 'span' }}>
      <span>hello</span>
    </Container>
  )
  expect(getByTestId('container').id).toEqual('span')
  expect(getByTestId('container').innerHTML).toEqual('<span>hello</span>')
})
