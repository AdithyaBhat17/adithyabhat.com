import contact from '@/pages/api/contact'
import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks, Mocks } from 'node-mocks-http'

test('should throw an error if message is invalid', async () => {
  const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'POST',
    // @ts-ignore
    body: JSON.stringify({
      name: 'test',
      email: '',
      message: 'test message',
    }),
  })
  await contact(req, res)
  expect(res._getStatusCode()).toEqual(400)
  expect(res._getData()).toEqual(
    JSON.stringify({
      success: false,
      message: 'Missing fields',
    })
  )
})

test('should throw an error if http method is not POST', async () => {
  const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'GET',
  })
  await contact(req, res)
  expect(res._getStatusCode()).toEqual(405)
  expect(res._getData()).toEqual(
    JSON.stringify({
      success: false,
      message: 'This endpoint does not support this http method',
    })
  )
})

test('API sends a failure response if slack fails to send the message', async () => {
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ statusText: 'bad request' }),
    })
  )
  const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'POST',
    // @ts-ignore
    body: JSON.stringify({
      name: 'test',
      email: 'test@gmail.com',
      message: 'test message',
    }),
  })
  await contact(req, res)
  expect(res._getStatusCode()).toEqual(400)
  expect(res._getData()).toEqual(
    JSON.stringify({
      success: false,
      message: 'Invalid message',
    })
  )
})

test('should work if all fields are sent', async () => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({ statusText: 'OK' }))
  const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'POST',
    // @ts-ignore
    body: JSON.stringify({
      name: 'test',
      email: 'test@gmail.com',
      message: 'test message',
    }),
  })
  await contact(req, res)
  expect(res._getStatusCode()).toEqual(200)
  expect(res._getData()).toEqual(
    JSON.stringify({
      success: true,
      message: 'Done! your message was sent perfectly!',
    })
  )
})
