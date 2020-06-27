import contact from '@/pages/api/contact'
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
    apiResolver(req, res, undefined, contact, dummyApiContext)
  )
  url = await listen(server)
  done()
})

afterAll((done) => server.close(done))

test('should throw an error if message is invalid', async () => {
  const response = await fetch(url + '/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name: '', email: '', message: '' }),
  })
  expect(response.status).toBe(400)
})

test('should throw an error if http method is not POST', async () => {
  const response = await fetch(url + '/api/contact')
  expect(response.status).toBe(405)
})

test('should work if all fields are sent', async () => {
  const response = await fetch(url + '/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Mike',
      email: 'Mike@monstersinc.com',
      message: 'hello',
    }),
  })
  expect(response.status).toBe(200)
})
