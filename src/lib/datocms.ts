import type { FetchParams } from '@/types/fetch'

const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = import.meta.env.DATOCMS_API_TOKEN

export async function fetchAPI(
  query: string,
  { variables, preview }: FetchParams = {}
) {
  const endpoint = preview ? API_URL + '/preview' : API_URL

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

const GALLERY_API_TOKEN = import.meta.env.DATOCMS_GALLERY_API_TOKEN

export async function fetchGalleryAPI(
  query: string,
  { variables, preview }: FetchParams = {}
) {
  const endpoint = preview ? API_URL + '/preview' : API_URL

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GALLERY_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch Gallery API')
  }
  return json.data
}
