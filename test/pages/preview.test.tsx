import preview from '@/pages/api/preview'

import { createMocks, Mocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'

test('Should return 403 if required query string or slug is missing', async () => {
  const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'GET',
  })
  await preview(req, res)
  expect(res._getStatusCode()).toBe(403)
  expect(res._getData()).toEqual(
    expect.objectContaining({
      message: 'Invalid token',
    })
  )

  const {
    req: slugReq,
    res: slugRes,
  }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'GET',
    query: { secret: process.env.DATOCMD_PREVIEW_SECRET },
  })
  await preview(slugReq, slugRes)
  expect(res._getStatusCode()).toBe(403)
  expect(res._getData()).toEqual(
    expect.objectContaining({
      message: 'Invalid token',
    })
  )
})

test('Should redirect to /blogs/[slug] if required query strings are passed', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { article: { slug: 'javascript-variables' } },
        }),
    })
  )
  const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'GET',
    query: {
      secret: process.env.DATOCMS_PREVIEW_SECRET,
      slug: 'javascript-variables',
    },
  })
  res.setPreviewData = jest.fn()
  await preview(req, res)
  expect(res._getStatusCode()).toBe(307)
  expect(res.setPreviewData).toBeCalledWith({})
})

test('Should return 400 if the slug is invalid', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  )
  const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks({
    method: 'GET',
    query: { secret: process.env.DATOCMS_PREVIEW_SECRET, slug: 'abc' },
  })
  await preview(req, res)
  expect(res._getStatusCode()).toBe(400)
  expect(res._getData()).toEqual(
    expect.objectContaining({ message: 'Invalid slug' })
  )
  jest.clearAllMocks()
})
