import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

async function fetchDato(query) {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

const articleDates = new Map();
const projectDates = new Map();

const articlesData = await fetchDato(`query { allArticles { slug date } }`);
for (const a of articlesData?.allArticles ?? []) {
  if (a.slug && a.date) articleDates.set(`/blog/${a.slug}`, a.date);
}

const projectsData = await fetchDato(`query { allProjects { slug date } }`);
for (const p of projectsData?.allProjects ?? []) {
  if (p.slug && p.date) projectDates.set(`/work/${p.slug}`, p.date);
}

export default defineConfig({
  site: 'https://adithyabhat.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/legal'),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '');
        const lastmod = articleDates.get(path) ?? projectDates.get(path);
        if (lastmod) item.lastmod = new Date(lastmod).toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
});
