import { render } from '../testUtils'
import About, { getStaticProps } from '@/pages/about'
import { companies } from '@/utils/about'

test('About page matches snapshot', () => {
  const { container } = render(<About companies={companies} />)
  expect(container.innerHTML).toMatchSnapshot()
})

test('Get static props returns a list of companies', () => {
  const { props } = getStaticProps()
  expect(props.companies).toEqual(companies)
})
