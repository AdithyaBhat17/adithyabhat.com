import preview from '@/pages/api/preview'

import http from 'http'
import fetch from 'isomorphic-fetch'
import listen from 'test-listen'
import {
  apiResolver,
  __ApiPreviewProps,
} from 'next/dist/next-server/server/api-utils'

let server: http.Server, url: string

beforeAll(async (done) => {
  const dummyApiContext: __ApiPreviewProps = {
    previewModeEncryptionKey: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    previewModeId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    previewModeSigningKey: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  }
  server = http.createServer((req, res) =>
    apiResolver(req, res, undefined, preview, dummyApiContext)
  )
  url = await listen(server)
  done()
})

afterAll((done) => server.close(done))

test('Should return 403 if required query string is missing', async () => {
  const response = await fetch(url + '/api/preview')
  const data = await response.json()
  expect(response.status).toBe(403)
  expect(data.message).toEqual('Invalid token')
})

test('Should redirect to /blogs/[slug] if required query strings are passed', async () => {
  const response = await fetch(
    `${url}?secret=${process.env.DATOCMS_PREVIEW_SECRET}&slug=javascript-variables`
  )
  expect(response.url).toBe(`${url}/blog/javascript-variables`)
})

test('Should return 400 if the slug is invalid', async () => {
  const response = await fetch(
    `${url}?secret=${process.env.DATOCMS_PREVIEW_SECRET}&slug=abc`
  )
  expect(response.status).toBe(400)
  expect((await response.json()).message).toBe('Invalid slug')
})
