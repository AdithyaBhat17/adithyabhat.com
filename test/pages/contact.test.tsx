import { render } from '../testUtils'
import Contact from '@/pages/contact'
import { fireEvent, screen, act, waitFor } from '@testing-library/react'

test('renders all necessary inputs', () => {
  const { getByPlaceholderText, getByLabelText } = render(<Contact />)
  expect(getByPlaceholderText(/Mike/u)).toBeInTheDocument()
  expect(getByPlaceholderText(/mike@monstersinc.com/u)).toBeInTheDocument()
  expect(getByLabelText(/Your message/u)).toBeInTheDocument()
})

test('throws an error if name is empty', async () => {
  await act(async () => {
    render(<Contact />)
    fireEvent.click(screen.getByText(/send message/iu))
    waitFor(() =>
      expect(screen.getByTestId('name').textContent).toBe(
        'Name cannot be empty 🙁'
      )
    )
  })
})

test('throws an error if email is empty', async () => {
  await act(async () => {
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText(/Mike/u), {
      target: { value: 'Mike' },
    })
    fireEvent.click(screen.getByText(/send message/iu))
  })
  waitFor(() =>
    expect(screen.getByTestId('email').textContent).toBe(
      'Please provide your email address 😓'
    )
  )
})

test('throws an error if message is empty', async () => {
  await act(async () => {
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText(/Mike/u), {
      target: { value: 'Mike' },
    })
    fireEvent.change(screen.getByPlaceholderText(/mike@monstersinc.com/u), {
      target: { value: 'Mike@monstersinc.com' },
    })
    fireEvent.click(screen.getByText(/send message/iu))
  })
  waitFor(() =>
    expect(screen.getByTestId('message').textContent).toBe(
      'Please leave a message 😢'
    )
  )
})

test('No errors are thrown if all fields are filled', async () => {
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
    fireEvent.change(screen.getByPlaceholderText(/Mike/u), {
      target: { value: 'Mike' },
    })
    fireEvent.change(screen.getByPlaceholderText(/mike@monstersinc.com/u), {
      target: { value: 'Mike@monstersinc.com' },
    })
    fireEvent.change(screen.getByLabelText(/your message/iu), {
      target: { value: 'Hello there' },
    })

    fireEvent.click(screen.getByText(/send message/iu))
  })
  expect(screen.queryAllByRole('error').length).toEqual(0)
  jest.clearAllMocks()
})
