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

describe('Spam filter integration', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.resolve({ statusText: 'OK' }))
  })

  test('should send normal message without spam prefix', async () => {
    const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to discuss a project with you.',
        website: '',
      }),
    })
    await contact(req, res)
    expect(res._getStatusCode()).toEqual(200)

    // Check that fetch was called with message not containing [SPAM]
    const fetchCall = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)
    expect(body.text).not.toContain('[SPAM]')
  })

  test('should flag message with honeypot filled as spam', async () => {
    const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({
        name: 'Bot User',
        email: 'bot@example.com',
        message: 'This is a bot message.',
        website: 'http://spam-site.com',
      }),
    })
    await contact(req, res)
    expect(res._getStatusCode()).toEqual(200)

    // Check that fetch was called with [SPAM] prefix
    const fetchCall = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)
    expect(body.text).toContain('[SPAM]')
    expect(body.text).toContain('Honeypot field was filled')
  })

  test('should flag SEO spam message', async () => {
    const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({
        name: 'SEO Expert',
        email: 'seo@agency.com',
        message:
          'We offer SEO services and backlinks to rank your website on google.',
        website: '',
      }),
    })
    await contact(req, res)
    expect(res._getStatusCode()).toEqual(200)

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)
    expect(body.text).toContain('[SPAM]')
    expect(body.text).toContain('spam keywords')
  })

  test('should flag gibberish message', async () => {
    const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({
        name: 'asdfghjkl',
        email: 'test@example.com',
        message: 'qwertyuiop asdfghjkl zxcvbnm keyboard mashing',
        website: '',
      }),
    })
    await contact(req, res)
    expect(res._getStatusCode()).toEqual(200)

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0]
    const body = JSON.parse(fetchCall[1].body)
    expect(body.text).toContain('[SPAM]')
  })

  test('should still send spam messages (flag but send)', async () => {
    const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({
        name: 'Spammer',
        email: 'spam@tempmail.com',
        message: 'Buy our SEO services now! Visit bit.ly/spam',
        website: 'filled',
      }),
    })
    await contact(req, res)

    // Message should still be sent successfully
    expect(res._getStatusCode()).toEqual(200)
    expect(global.fetch).toHaveBeenCalled()
  })
})
