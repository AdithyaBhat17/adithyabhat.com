import { describe, it, expect, vi } from 'vitest';
import { renderStructuredText, enhanceLegacyHtml, partsFromLegacy, readingMinutes, type StructuredText } from '../dast';

const doc = (children: unknown[]): StructuredText => ({ value: { document: { type: 'root', children } } } as unknown as StructuredText);
const h = (level: number, text: string) => ({ type: 'heading', level, children: [{ type: 'span', value: text }] });
const p = (text: string, marks?: string[]) => ({ type: 'paragraph', children: [{ type: 'span', value: text, marks }] });

describe('renderStructuredText', () => {
  it('returns null for empty content', () => {
    expect(renderStructuredText(null)).toBeNull();
    expect(renderStructuredText(doc([]))).toBeNull();
  });

  it('numbers h2s as stages and builds a toc', () => {
    const r = renderStructuredText(doc([h(2, 'Why I built this'), p('a'), h(2, 'Outcome'), p('b')]))!;
    expect(r.toc.map((t) => t.n)).toEqual(['01', '02']);
    expect(r.html).toContain('id="why-i-built-this"');
    expect(r.html).toContain('<span class="stage-n" aria-hidden="true">02</span>');
    expect(r.outcomeId).toBe('outcome');
  });

  it('stages the top level used when there are no h2s', () => {
    const r = renderStructuredText(doc([h(4, 'Step 1'), p('x'), h(4, 'Step 2')]))!;
    expect(r.toc).toHaveLength(2);
  });

  it('escapes text and renders marks', () => {
    const r = renderStructuredText(doc([p('<script>x</script>', ['code'])]))!;
    expect(r.html).toContain('<code>&lt;script&gt;x&lt;/script&gt;</code>');
  });

  it('renders blocks and side notes', () => {
    const st = {
      value: { document: { type: 'root', children: [
        { type: 'block', item: 'm1' },
        { type: 'paragraph', children: [{ type: 'span', value: 'text' }, { type: 'inlineBlock', item: 's1' }] },
        { type: 'block', item: 'c1' },
        { type: 'block', item: 'o1' },
      ] } },
      blocks: [
        { __typename: 'MarginNoteRecord', id: 'm1', text: 'a note' },
        { __typename: 'CodeBlockRecord', id: 'c1', filename: 'a.ts', code: 'let x = 1 < 2' },
        { __typename: 'OutcomeRecord', id: 'o1', stats: [{ value: '12', label: 'tools' }] },
      ],
      inlineBlocks: [{ __typename: 'SideNoteRecord', id: 's1', text: 'aside' }],
    } as unknown as StructuredText;
    const r = renderStructuredText(st)!;
    expect(r.html).toContain('class="margin-note hand"');
    expect(r.html).toContain('class="side-note"');
    expect(r.html).toContain('a.ts');
    expect(r.html).toContain('let x = 1 &lt; 2');
    expect(r.html).toContain('class="stat-v"');
  });

  it('renders video figures and warns when alt text is missing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const st = {
      value: { document: { type: 'root', children: [{ type: 'block', item: 'f1' }] } },
      blocks: [{ __typename: 'FigureRecord', id: 'f1', caption: 'Booking flow', media: { url: 'https://x/clip.webm', mimeType: 'video/webm' } }],
    } as unknown as StructuredText;
    expect(renderStructuredText(st)!.html).toContain('<video');
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe('legacy helpers', () => {
  it('turns h2s into stages and wraps code', () => {
    const r = enhanceLegacyHtml('<h2>Intro</h2><p>x</p><pre><code class="language-js">a</code></pre>');
    expect(r.toc[0].id).toBe('intro');
    expect(r.html).toContain('class="code-block"');
  });

  it('parses the Tech Stack line', () => {
    expect(partsFromLegacy('<p><strong>Tech Stack:</strong> Next.js, Swift, Postgres</p>')).toEqual(['Next.js', 'Swift', 'Postgres']);
  });

  it('estimates reading time', () => {
    expect(readingMinutes('word '.repeat(440))).toBe(2);
  });
});
