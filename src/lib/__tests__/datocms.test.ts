import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchAPI, fetchGalleryAPI } from '../datocms';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchAPI', () => {
  it('returns data on successful response', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { allPosts: [{ title: 'Hello' }] } }),
    });

    const data = await fetchAPI('{ allPosts { title } }');
    expect(data).toEqual({ allPosts: [{ title: 'Hello' }] });
  });

  it('sends POST with correct headers and body', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: {} }),
    });

    await fetchAPI('{ query }', { variables: { id: '1' } });

    expect(mockFetch).toHaveBeenCalledWith('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: expect.stringContaining('Bearer'),
      },
      body: JSON.stringify({ query: '{ query }', variables: { id: '1' } }),
    });
  });

  it('uses /preview endpoint when preview is true', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: {} }),
    });

    await fetchAPI('{ query }', { preview: true });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://graphql.datocms.com/preview',
      expect.any(Object),
    );
  });

  it('throws on GraphQL errors', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ errors: [{ message: 'Bad query' }] }),
    });

    await expect(fetchAPI('{ bad }')).rejects.toThrow('Failed to fetch API');
  });
});

describe('fetchGalleryAPI', () => {
  it('returns data on successful response', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { gallery: [] } }),
    });

    const data = await fetchGalleryAPI('{ gallery { url } }');
    expect(data).toEqual({ gallery: [] });
  });

  it('uses /preview endpoint when preview is true', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: {} }),
    });

    await fetchGalleryAPI('{ query }', { preview: true });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://graphql.datocms.com/preview',
      expect.any(Object),
    );
  });

  it('throws on GraphQL errors', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ errors: [{ message: 'Fail' }] }),
    });

    await expect(fetchGalleryAPI('{ bad }')).rejects.toThrow('Failed to fetch Gallery API');
  });
});
