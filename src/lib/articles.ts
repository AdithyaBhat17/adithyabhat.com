import dayjs from 'dayjs';
import { zineFor, type ZineStyle } from '@/data/zines';

export interface ArticleLike {
  slug?: string;
  title: string;
  date: string | Date;
  tags?: string;
  externalLink?: string;
  featured?: boolean;
  /** New schema (garage-journal env): zine cover + standfirst. */
  coverArt?: string;
  summary?: string;
}

export interface Issue<T extends ArticleLike = ArticleLike> {
  article: T;
  /** Issue number, counted chronologically across everything written ("01"). */
  no: string;
  href: string;
  external: boolean;
  zine: ZineStyle;
  /** "Aug 2018 · Craft" */
  meta: string;
  year: string;
}

/**
 * Turns CMS articles into newsstand issues. Numbering is chronological across
 * the full list, so an article keeps its issue number on every page.
 */
export function toIssues<T extends ArticleLike>(articles: T[]): Issue<T>[] {
  const chrono = [...articles].sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const numbers = new Map(chrono.map((a, i) => [a, String(i + 1).padStart(2, '0')]));
  return articles.map((article, i) => {
    const base = zineFor(article.slug, article.tags, i);
    const art = article.coverArt && article.coverArt !== 'generic' ? (article.coverArt as typeof base.art) : base.art;
    const zine = { ...base, art, dek: article.summary || base.dek };
    const external = Boolean(article.externalLink);
    return {
      article,
      no: numbers.get(article)!,
      href: external ? article.externalLink! : `/blog/${article.slug}`,
      external,
      zine,
      meta: `${dayjs(article.date).format('MMM YYYY')} · ${zine.topic}`,
      year: dayjs(article.date).format('YYYY'),
    };
  });
}
