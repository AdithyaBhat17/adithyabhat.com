import type { APIRoute } from 'astro';

export const prerender = false;

const GOODREADS_USER_ID = import.meta.env.GOODREADS_USER_ID ?? '116519327';
const FEED_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=currently-reading`;

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

function pick(xml: string, tag: string): string | null {
  const cdata = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`));
  if (cdata) return cdata[1].trim();
  const plain = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return plain ? plain[1].trim() : null;
}

function fail() {
  return new Response(JSON.stringify({ ok: false }), { status: 200, headers: HEADERS });
}

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'adithyabhat.com hero-aside reader/1.0' },
    });
    if (!res.ok) {
      return fail();
    }

    const xml = await res.text();
    const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
    if (!itemMatch) {
      return fail();
    }

    const item = itemMatch[1];
    const title = pick(item, 'title');
    const author = pick(item, 'author_name');
    const url = pick(item, 'link');

    if (!title) {
      return fail();
    }

    return new Response(
      JSON.stringify({ ok: true, title, author: author ?? null, url: url ?? null }),
      { status: 200, headers: HEADERS }
    );
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 200, headers: HEADERS });
  }
};
