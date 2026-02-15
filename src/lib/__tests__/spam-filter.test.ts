import { describe, it, expect } from 'vitest';
import { checkForSpam } from '../spam-filter';

describe('checkForSpam', () => {
  const validMessage = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hey, I really enjoyed your portfolio and wanted to chat about a project.',
  };

  it('allows a legitimate message', () => {
    const result = checkForSpam(validMessage);
    expect(result.isSpam).toBe(false);
    expect(result.score).toBeLessThan(40);
  });

  it('catches honeypot field filled by bots', () => {
    const result = checkForSpam({ ...validMessage, website: 'http://spam.com' });
    expect(result.isSpam).toBe(true);
    expect(result.score).toBe(100);
    expect(result.reasons).toContain('Honeypot field was filled (bot detected)');
  });

  it('allows empty honeypot field', () => {
    const result = checkForSpam({ ...validMessage, website: '' });
    expect(result.isSpam).toBe(false);
  });

  it('flags messages with SEO spam keywords', () => {
    const result = checkForSpam({
      ...validMessage,
      message: 'We can help you with SEO services and rank your website on the first page of google with guaranteed results.',
    });
    expect(result.isSpam).toBe(true);
    expect(result.reasons.some((r) => r.includes('spam keywords'))).toBe(true);
  });

  it('flags gibberish names', () => {
    const result = checkForSpam({
      ...validMessage,
      name: 'xzqwkjhgfds',
    });
    expect(result.score).toBeGreaterThan(0);
    expect(result.reasons.some((r) => r.includes('gibberish'))).toBe(true);
  });

  it('flags short messages with URLs', () => {
    const result = checkForSpam({
      ...validMessage,
      message: 'Check this out https://spam.example.com',
    });
    expect(result.reasons.some((r) => r.includes('Short message with URL'))).toBe(true);
  });

  it('flags disposable email domains', () => {
    const result = checkForSpam({
      ...validMessage,
      email: 'test@mailinator.com',
    });
    expect(result.reasons.some((r) => r.includes('disposable email'))).toBe(true);
  });

  it('flags multiple suspicious URL patterns', () => {
    const result = checkForSpam({
      ...validMessage,
      message: 'Visit https://one.com and https://two.com and https://three.com for more info.',
    });
    expect(result.reasons.some((r) => r.includes('suspicious pattern'))).toBe(true);
  });

  it('flags URL shorteners', () => {
    const result = checkForSpam({
      ...validMessage,
      message: 'I wanted to share this article with you, check it out at bit.ly/something-cool',
    });
    expect(result.reasons.some((r) => r.includes('suspicious pattern'))).toBe(true);
  });

  it('flags keyboard mash patterns', () => {
    const result = checkForSpam({
      ...validMessage,
      name: 'qwertyuiop',
      message: 'asdfghjkl zxcvbnm qwerty',
    });
    expect(result.score).toBeGreaterThan(0);
  });

  it('returns a score capped at 100', () => {
    const result = checkForSpam({
      name: 'xzqwkjhgfds',
      email: 'test@mailinator.com',
      message: 'seo services rank your website first page of google guaranteed results bit.ly/spam https://one.com https://two.com https://three.com',
      website: 'http://bot.com',
    });
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('accumulates score from multiple signals', () => {
    const result = checkForSpam({
      name: 'spammer',
      email: 'test@guerrillamail.com',
      message: 'We can help you with SEO services and link building for your website.',
    });
    expect(result.score).toBeGreaterThan(20);
    expect(result.reasons.length).toBeGreaterThan(1);
  });
});
