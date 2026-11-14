// Server-side rendering of DatoCMS Structured Text (DAST) into the Garage
// Journal components, plus fallbacks for the legacy fields (case study HTML,
// article markdown). Produces an HTML string and a table of contents; no
// client JS. Text is always escaped; legacy HTML is sanitized by the caller.

import type { ResponsiveImage } from '@/types/content';

/* ------------------------------------------------------------- types */

interface DastNode {
  type: string;
  children?: DastNode[];
  value?: string;
  level?: number;
  style?: 'bulleted' | 'numbered';
  marks?: string[];
  url?: string;
  item?: string;
  code?: string;
  language?: string;
}

export interface StructuredText {
  value: { document: DastNode } | null;
  blocks?: Block[];
  inlineBlocks?: Block[];
}

export type Block =
  | { __typename: 'FigureRecord'; id: string; caption?: string; size?: 'column' | 'wide'; media?: { url?: string; alt?: string | null; responsiveImage?: ResponsiveImage } }
  | { __typename: 'MarginNoteRecord'; id: string; text?: string }
  | { __typename: 'TapedNoteRecord'; id: string; quote?: string; attribution?: string }
  | { __typename: 'CodeBlockRecord'; id: string; filename?: string; language?: string; code?: string }
  | { __typename: 'OutcomeRecord'; id: string; stats?: { value?: string; label?: string }[] }
  | { __typename: 'SideNoteRecord'; id: string; text?: string };

export interface TocEntry {
  id: string;
  n: string;
  title: string;
}

export interface Rendered {
  html: string;
  toc: TocEntry[];
  /** id of the "Outcome" stage, if there is one (for "Skip to the outcome"). */
  outcomeId?: string;
}

/* ------------------------------------------------------------ helpers */

export const esc = (s: string = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'section';

const pad = (n: number) => String(n).padStart(2, '0');

const plain = (node: DastNode): string =>
  node.type === 'span' ? node.value ?? '' : (node.children ?? []).map(plain).join('');

/** A numbered stage heading ("01 Why I built this"). */
export function stageHeading(n: number, title: string, id: string, level = 2) {
  return `<h${level} class="stage" id="${id}"><span class="stage-n" aria-hidden="true">${pad(n)}</span><span class="stage-t">${title}</span></h${level}>`;
}

/** Code block with a filename bar and Copy button (the only monospace). */
export function codeBlock(code: string, opts: { filename?: string; language?: string } = {}) {
  const label = opts.filename || (opts.language ? opts.language : '');
  return `<figure class="code-block">${
    `<figcaption><span class="code-file">${esc(label)}</span><button type="button" class="code-copy" data-copy>Copy</button></figcaption>`
  }<pre${opts.language ? ` data-lang="${esc(opts.language)}"` : ''}><code>${esc(code.replace(/\n$/, ''))}</code></pre></figure>`;
}

function figure(b: Extract<Block, { __typename: 'FigureRecord' }>) {
  const img = b.media?.responsiveImage;
  const src = img?.src ?? b.media?.url;
  if (!src) return '';
  const alt = esc(img?.alt ?? b.media?.alt ?? b.caption ?? '');
  const set = img?.webpSrcSet || img?.srcSet;
  return `<figure class="torn-print${b.size === 'wide' ? ' torn-print--wide' : ''}"><span class="torn-print-frame"><img src="${esc(src)}"${
    set ? ` srcset="${esc(set)}" sizes="(max-width: 767px) 92vw, 760px"` : ''
  }${img ? ` width="${img.width}" height="${img.height}"` : ''} alt="${alt}" loading="lazy" decoding="async" /></span>${
    b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''
  }</figure>`;
}

function renderBlock(b: Block | undefined): string {
  if (!b) return '';
  switch (b.__typename) {
    case 'FigureRecord':
      return figure(b);
    case 'MarginNoteRecord':
      return `<aside class="margin-note hand" data-ink-in data-observe>${esc(b.text)}</aside>`;
    case 'TapedNoteRecord':
      return `<aside class="taped-note"><span class="tape" aria-hidden="true"></span><p>${esc(b.quote)}</p>${
        b.attribution ? `<cite>${esc(b.attribution)}</cite>` : ''
      }</aside>`;
    case 'CodeBlockRecord':
      return codeBlock(b.code ?? '', { filename: b.filename, language: b.language });
    case 'OutcomeRecord':
      return `<div class="outcome">${(b.stats ?? [])
        .map((s) => `<div class="stat"><span class="stat-v" data-reveal>${esc(s.value)}</span><span class="stat-l">${esc(s.label)}</span></div>`)
        .join('')}</div>`;
    default:
      return '';
  }
}

/* ------------------------------------------------------------- DAST */

export function renderStructuredText(st: StructuredText | null | undefined, { stages = true } = {}): Rendered | null {
  const doc = st?.value?.document;
  if (!doc?.children?.length) return null;
  const blocks = new Map((st!.blocks ?? []).map((b) => [b.id, b]));
  const inline = new Map((st!.inlineBlocks ?? []).map((b) => [b.id, b]));
  const toc: TocEntry[] = [];
  let outcomeId: string | undefined;
  let notes = 0;
  // Stage the top heading level actually used (h2 normally; older posts use h3/h4).
  const levels: number[] = [];
  const scan = (n: DastNode) => {
    if (n.type === 'heading' && n.level && n.level >= 2) levels.push(n.level);
    n.children?.forEach(scan);
  };
  scan(doc);
  const stageLevel = levels.length ? Math.min(...levels) : 2;

  const span = (n: DastNode) => {
    let out = esc(n.value).replace(/\n/g, '<br />');
    for (const m of n.marks ?? []) {
      if (m === 'strong') out = `<strong>${out}</strong>`;
      else if (m === 'emphasis') out = `<em>${out}</em>`;
      else if (m === 'code') out = `<code>${out}</code>`;
      else if (m === 'underline') out = `<u>${out}</u>`;
      else if (m === 'strikethrough') out = `<s>${out}</s>`;
      else if (m === 'highlight') out = `<mark>${out}</mark>`;
    }
    return out;
  };

  const walk = (n: DastNode): string => {
    const kids = () => (n.children ?? []).map(walk).join('');
    switch (n.type) {
      case 'root':
        return kids();
      case 'paragraph':
        return `<p>${kids()}</p>`;
      case 'heading': {
        const title = kids();
        if (stages && n.level === stageLevel) {
          const text = plain(n);
          const id = slugify(text);
          toc.push({ id, n: pad(toc.length + 1), title: esc(text) });
          if (/outcome|result/i.test(text)) outcomeId = id;
          return stageHeading(toc.length, title, id, n.level);
        }
        return `<h${n.level}>${title}</h${n.level}>`;
      }
      case 'list':
        return n.style === 'numbered' ? `<ol>${kids()}</ol>` : `<ul>${kids()}</ul>`;
      case 'listItem':
        return `<li>${kids()}</li>`;
      case 'blockquote':
        return `<blockquote>${kids()}</blockquote>`;
      case 'code':
        return codeBlock(n.code ?? '', { language: n.language });
      case 'thematicBreak':
        return '<hr />';
      case 'span':
        return span(n);
      case 'link':
        return `<a href="${esc(n.url)}"${/^https?:/.test(n.url ?? '') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${kids()}</a>`;
      case 'block':
        return renderBlock(blocks.get(n.item!));
      case 'inlineBlock': {
        const b = inline.get(n.item!);
        if (!b || b.__typename !== 'SideNoteRecord') return '';
        notes += 1;
        return `<sup class="sn-ref" id="snr-${notes}">${notes}</sup><span class="side-note" role="note"><span class="sn-k">${notes}</span> ${esc(b.text)}</span>`;
      }
      default:
        return kids();
    }
  };

  return { html: walk(doc), toc, outcomeId };
}

/* ------------------------------------------------------- legacy paths */

/**
 * Legacy HTML (already sanitized): number every h2 as a stage, wrap <pre>
 * in the code block chrome, and frame lone images as torn prints.
 */
export function enhanceLegacyHtml(html: string, { stages = true } = {}): Rendered {
  const toc: TocEntry[] = [];
  let outcomeId: string | undefined;
  let out = html;
  if (stages) {
    // Older articles use h3/h4 for their steps; index the top level present.
    const lvl = [2, 3, 4].find((l) => new RegExp(`<h${l}[\\s>]`, 'i').test(out)) ?? 2;
    const re = new RegExp(`<h${lvl}[^>]*>([\\s\\S]*?)<\\/h${lvl}>`, 'gi');
    out = out.replace(re, (_m, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const id = slugify(text);
      toc.push({ id, n: pad(toc.length + 1), title: esc(text) });
      if (/outcome|result/i.test(text)) outcomeId = id;
      return stageHeading(toc.length, inner, id, lvl);
    });
  }
  out = out.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, inner: string) => {
    const lang = /class="[^"]*language-([\w-]+)/.exec(inner)?.[1] ?? '';
    return `<figure class="code-block"><figcaption><span class="code-file">${esc(lang)}</span><button type="button" class="code-copy" data-copy>Copy</button></figcaption><pre>${inner}</pre></figure>`;
  });
  out = out.replace(/<p>\s*(<img[^>]+>)\s*<\/p>/gi, (_m, img: string) => {
    const lazy = /loading=/.test(img) ? img : img.replace('<img', '<img loading="lazy" decoding="async"');
    return `<figure class="torn-print"><span class="torn-print-frame">${lazy}</span></figure>`;
  });
  return { html: out, toc, outcomeId };
}

/** "Tech Stack: Next.js, Swift, …" line in a legacy case study → parts. */
export function partsFromLegacy(html: string | undefined): string[] {
  if (!html) return [];
  const text = html.replace(/<[^>]+>/g, '\n');
  const m = /Tech\s*Stack\s*:?\s*([^\n]+)/i.exec(text);
  if (!m) return [];
  return m[1]
    .split(/[,·|]/)
    .map((s) => s.replace(/&amp;/g, '&').trim())
    .filter((s) => s && s.length < 40);
}

/** Strip the "Tech Stack:" paragraph so it isn't shown twice. */
export function withoutTechStack(html: string): string {
  return html.replace(/<p>[^<]*(?:<strong>)?\s*Tech\s*Stack\s*:?[\s\S]*?<\/p>/i, '');
}

export function readingMinutes(text: string): number {
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function dastText(st: StructuredText | null | undefined): string {
  const doc = st?.value?.document;
  return doc ? plain(doc) : '';
}
