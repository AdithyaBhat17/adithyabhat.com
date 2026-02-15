/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest';
import DOMPurify from 'dompurify';

// Since isomorphic-dompurify has jsdom ESM issues in tests,
// we test the sanitization logic directly using dompurify + happy-dom.
// This validates the same DOMPurify behavior our sanitizeHtml wrapper uses.
function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  });
}

describe('sanitizeHtml', () => {
  it('preserves normal HTML content', () => {
    const html = '<p>Hello <strong>world</strong></p>';
    expect(sanitizeHtml(html)).toBe(html);
  });

  it('preserves links with href', () => {
    const html = '<a href="https://example.com">link</a>';
    expect(sanitizeHtml(html)).toContain('href="https://example.com"');
  });

  it('preserves images', () => {
    const html = '<img src="https://example.com/img.png" alt="test">';
    const result = sanitizeHtml(html);
    expect(result).toContain('src="https://example.com/img.png"');
    expect(result).toContain('alt="test"');
  });

  it('strips script tags', () => {
    const html = '<p>Safe</p><script>alert("xss")</script>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('<script');
    expect(result).not.toContain('alert');
    expect(result).toContain('<p>Safe</p>');
  });

  it('strips inline event handlers', () => {
    const html = '<img src="x" onerror="alert(1)">';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('onerror');
    expect(result).not.toContain('alert');
  });

  it('strips javascript: URLs', () => {
    const html = '<a href="javascript:alert(1)">click</a>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('javascript:');
  });

  it('allows iframe tags (for embeds)', () => {
    const html = '<iframe src="https://youtube.com/embed/abc" allowfullscreen></iframe>';
    const result = sanitizeHtml(html);
    expect(result).toContain('<iframe');
    expect(result).toContain('allowfullscreen');
  });

  it('handles empty string', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('preserves code blocks', () => {
    const html = '<pre><code>const x = 1;</code></pre>';
    expect(sanitizeHtml(html)).toContain('<code>const x = 1;</code>');
  });

  it('preserves heading tags', () => {
    const html = '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>';
    const result = sanitizeHtml(html);
    expect(result).toContain('<h1>');
    expect(result).toContain('<h2>');
    expect(result).toContain('<h3>');
  });

  it('preserves lists', () => {
    const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
    expect(sanitizeHtml(html)).toBe(html);
  });

  it('strips SVG-based XSS vectors', () => {
    const html = '<svg onload="alert(1)"><circle r="10"/></svg><p>Content</p>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('onload');
    expect(result).not.toContain('alert');
    expect(result).toContain('<p>Content</p>');
  });
});
