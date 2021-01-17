import { render } from '../testUtils'
import About, { getStaticProps } from '@/pages/about'
import { companies } from '@/utils/about'
import { calculateAge } from '@/utils/age'

test('About page matches snapshot and displays my age correctly', () => {
  const age = calculateAge()
  const { container, getByTestId } = render(
    <About companies={companies} age={age} />
  )
  expect(container.innerHTML).toMatchSnapshot()
  expect(getByTestId('age').textContent).toBe(age.toString())
})

test('Get static props returns a list of companies', () => {
  const { props } = getStaticProps()
  expect(props.companies).toEqual(companies)
})
