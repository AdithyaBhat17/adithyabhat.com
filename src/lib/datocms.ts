import type { FetchParams } from '@/types/fetch'

const API_URL = 'https://graphql.datocms.com'
// DATOCMS_API_TOKEN is set on Vercel; local .env.local only carries the read-only token.
const API_TOKEN = import.meta.env.DATOCMS_API_TOKEN ?? import.meta.env.DATOCMS_READONLY_TOKEN

// DatoCMS environment for the main project. This branch builds against the
// `garage-journal` sandbox (new build-log/zine fields); set
// DATOCMS_ENVIRONMENT=master (or another env) to point elsewhere.
export const DATOCMS_ENVIRONMENT: string = import.meta.env.DATOCMS_ENVIRONMENT || 'garage-journal'

// Several pages run the same query during one build; share the request.
const cache = new Map<string, Promise<any>>()

export function fetchAPI(query: string, params: FetchParams = {}) {
  const key = JSON.stringify([query, params.variables ?? null, !!params.preview])
  let hit = cache.get(key)
  if (!hit) {
    hit = request(query, params)
    hit.catch(() => cache.delete(key))
    cache.set(key, hit)
  }
  return hit
}

async function request(query: string, { variables, preview }: FetchParams) {
  const endpoint = preview ? API_URL + '/preview' : API_URL

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
      'X-Environment': DATOCMS_ENVIRONMENT,
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

/**
 * Runs `query`, and if the environment doesn't have the new schema yet (the
 * query errors), runs `legacy` instead, so the site keeps building against an
 * older environment.
 */
export async function fetchWithFallback(query: string, legacy: string, params: FetchParams = {}) {
  try {
    return await fetchAPI(query, params)
  } catch {
    return fetchAPI(legacy, params)
  }
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
