import type { FetchParams } from '@/types/fetch'

const API_URL = 'https://graphql.datocms.com'
// DATOCMS_API_TOKEN is set on Vercel; local .env.local only carries the read-only token.
const API_TOKEN = import.meta.env.DATOCMS_API_TOKEN ?? import.meta.env.DATOCMS_READONLY_TOKEN

// DatoCMS environment. Unset means the project's primary environment;
// previews can point at a sandbox with DATOCMS_ENVIRONMENT=<name>.
export const DATOCMS_ENVIRONMENT: string | undefined = import.meta.env.DATOCMS_ENVIRONMENT || undefined

/** The query was rejected by the schema (as opposed to a network or auth failure). */
export class GraphQLSchemaError extends Error {}

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
      ...(DATOCMS_ENVIRONMENT ? { 'X-Environment': DATOCMS_ENVIRONMENT } : {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const { status } = response
  const json = await response.json().catch(() => null)
  // Auth, rate-limit and server failures are not schema problems.
  if (!json || status === 401 || status === 403 || status === 429 || status >= 500) {
    throw new Error(`DatoCMS request failed: ${status}`)
  }
  if (json.errors) {
    console.error(json.errors)
    throw new GraphQLSchemaError('Failed to fetch API')
  }
  return json.data
}

/**
 * Runs `query`, and if the environment doesn't have the new schema yet (the
 * schema rejects the query), runs `legacy` instead, so the site keeps building
 * against an older environment. Network and auth failures still throw.
 */
export async function fetchWithFallback(query: string, legacy: string, params: FetchParams = {}) {
  try {
    return await fetchAPI(query, params)
  } catch (err) {
    if (!(err instanceof GraphQLSchemaError)) throw err
    console.warn('DatoCMS: new-schema query rejected, using the legacy query')
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
