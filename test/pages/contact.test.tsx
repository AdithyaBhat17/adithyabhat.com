import { render } from '../testUtils'
import Contact from '@/pages/contact'
import { fireEvent, screen, act } from '@testing-library/react'
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
  await act(async () => {
    render(<Contact />)
    fireEvent.click(screen.getByText(/send message/i))
  })
  expect(screen.getAllByRole('error').shift().textContent).toBe(
    'Name cannot be empty 🙁'
  )
})

test('throws an error if email is empty', async () => {
  await act(async () => {
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText(/Mike/), {
      target: { value: 'Mike' },
    })
    fireEvent.click(screen.getByText(/send message/i))
  })
  expect(screen.getAllByRole('error').shift().textContent).toBe(
    'Please provide your email address 😓'
  )
})

test('throws an error if message is empty', async () => {
  await act(async () => {
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText(/Mike/), {
      target: { value: 'Mike' },
    })
    fireEvent.change(screen.getByPlaceholderText(/mike@monstersinc.com/), {
      target: { value: 'Mike@monstersinc.com' },
    })
    fireEvent.click(screen.getByText(/send message/i))
  })
  expect(screen.getByRole('error').textContent).toBe(
    'Please leave a message 😢'
  )
})

test('No errors are thrown if all fields are filled', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          success: true,
        }),
    })
  )
  await act(async () => {
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText(/Mike/), {
      target: { value: 'Mike' },
    })
    fireEvent.change(screen.getByPlaceholderText(/mike@monstersinc.com/), {
      target: { value: 'Mike@monstersinc.com' },
    })
    fireEvent.change(screen.getByLabelText(/your message/i), {
      target: { value: 'Hello there' },
    })

    fireEvent.click(screen.getByText(/send message/i))
  })
  expect(screen.queryAllByRole('error').length).toEqual(0)
  jest.clearAllMocks()
})
