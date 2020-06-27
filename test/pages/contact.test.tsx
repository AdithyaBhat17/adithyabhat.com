import { render } from '../testUtils'
import Contact from '@/pages/contact'
import { fireEvent, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.post('/api/contact', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        message: 'Done! your message was sent perfectly!',
      })
    )
  })
)

beforeAll(() => server.listen())

afterAll(() => {
  server.close()
})

test('renders all necessary inputs', () => {
  const { getByPlaceholderText, getByLabelText } = render(<Contact />)
  expect(getByPlaceholderText(/Mike/)).toBeInTheDocument()
  expect(getByPlaceholderText(/mike@monstersinc.com/)).toBeInTheDocument()
  expect(getByLabelText(/Your message/)).toBeInTheDocument()
})

test('throws an error if name is empty', async () => {
  const { getByText, getByRole } = render(<Contact />)
  fireEvent.click(getByText(/send message/i))
  expect(getByRole('error').textContent).toBe('Please provide your name 😢')
})

test('throws an error if email is empty', async () => {
  const { getByText, getByRole } = render(<Contact />)
  fireEvent.change(screen.getByPlaceholderText(/Mike/), {
    target: { value: 'Mike' },
  })
  fireEvent.click(getByText(/send message/i))
  expect(getByRole('error').textContent).toBe('Please provide your email 😢')
})

test('throws an error if message is empty', async () => {
  const { getByText, getByRole } = render(<Contact />)
  fireEvent.change(screen.getByPlaceholderText(/Mike/), {
    target: { value: 'Mike' },
  })
  fireEvent.change(screen.getByPlaceholderText(/mike@monstersinc.com/), {
    target: { value: 'Mike@monstersinc.com' },
  })
  fireEvent.click(getByText(/send message/i))
  expect(getByRole('error').textContent).toBe(
    'Looks like you forgot to leave a message 🥺'
  )
})

test('Fails to send message if all fields are filled but absolute urls are not provided', async () => {
  const { getByText } = render(<Contact />)
  fireEvent.change(screen.getByPlaceholderText(/Mike/), {
    target: { value: 'Mike' },
  })
  fireEvent.change(screen.getByPlaceholderText(/mike@monstersinc.com/), {
    target: { value: 'mike@monstersinc.com' },
  })
  fireEvent.change(screen.getByLabelText(/Your message/), {
    target: { value: 'hello' },
  })
  fireEvent.click(getByText(/send message/i))
  expect(screen.getByRole('error').textContent).toBe(
    'Failed to send message 😢'
  )
})
