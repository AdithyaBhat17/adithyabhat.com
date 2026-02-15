import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dayjs
vi.mock('dayjs', () => ({
  default: () => ({ format: () => '12 Feb at 3:00 pm' }),
}));

// Mock spam filter
vi.mock('@/lib/spam-filter', () => ({
  checkForSpam: vi.fn(),
}));

import { checkForSpam } from '@/lib/spam-filter';
const mockCheckForSpam = vi.mocked(checkForSpam);

// Dynamically import after mocks are set up
const { POST, ALL } = await import('../contact');

// Helper to create a mock Astro API context
function createContext(body: Record<string, unknown>, options: { origin?: string; ip?: string } = {}) {
  const request = new Request('https://adithyabhat.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.origin ? { origin: options.origin } : {}),
    },
    body: JSON.stringify(body),
  });

  return {
    request,
    clientAddress: options.ip ?? '127.0.0.1',
  } as any;
}

describe('/api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: not spam
    mockCheckForSpam.mockReturnValue({ isSpam: false, reasons: [], score: 0 });
    // Mock global fetch for Slack
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  describe('Origin check', () => {
    it('rejects requests from unknown origins', async () => {
      const ctx = createContext(
        { name: 'John', email: 'john@test.com', message: 'Hello there, nice work!' },
        { origin: 'https://evil.com' }
      );
      const res = await POST(ctx);
      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.success).toBe(false);
    });

    it('allows requests from adithyabhat.com', async () => {
      const ctx = createContext(
        { name: 'John', email: 'john@test.com', message: 'Hello there, nice work!' },
        { origin: 'https://adithyabhat.com' }
      );
      const res = await POST(ctx);
      expect(res.status).toBe(200);
    });

    it('allows requests from www.adithyabhat.com', async () => {
      const ctx = createContext(
        { name: 'John', email: 'john@test.com', message: 'Hello there, nice work!' },
        { origin: 'https://www.adithyabhat.com' }
      );
      const res = await POST(ctx);
      expect(res.status).toBe(200);
    });

    it('allows requests with no origin header (same-origin, curl)', async () => {
      const ctx = createContext(
        { name: 'John', email: 'john@test.com', message: 'Hello there, nice work!' },
        {} // no origin
      );
      const res = await POST(ctx);
      expect(res.status).toBe(200);
    });
  });

  describe('Rate limiting', () => {
    it('blocks after 5 requests from the same IP within a minute', async () => {
      const body = { name: 'John', email: 'john@test.com', message: 'Hello there, nice work!' };

      // Use a unique IP to avoid interference from other tests
      const ip = '10.0.0.99';

      for (let i = 0; i < 5; i++) {
        const ctx = createContext(body, { ip });
        const res = await POST(ctx);
        expect(res.status).toBe(200);
      }

      // 6th request should be rate limited
      const ctx = createContext(body, { ip });
      const res = await POST(ctx);
      expect(res.status).toBe(429);
      const json = await res.json();
      expect(json.message).toContain('Too many requests');
    });

    it('allows requests from different IPs independently', async () => {
      const body = { name: 'John', email: 'john@test.com', message: 'Hello there, nice work!' };

      const ctx1 = createContext(body, { ip: '10.1.1.1' });
      const ctx2 = createContext(body, { ip: '10.1.1.2' });

      const res1 = await POST(ctx1);
      const res2 = await POST(ctx2);

      expect(res1.status).toBe(200);
      expect(res2.status).toBe(200);
    });
  });

  describe('Validation', () => {
    it('rejects missing name', async () => {
      const ctx = createContext({ name: '', email: 'john@test.com', message: 'Hello there!' });
      const res = await POST(ctx);
      expect(res.status).toBe(400);
    });

    it('rejects missing email', async () => {
      const ctx = createContext({ name: 'John', email: '', message: 'Hello there!' });
      const res = await POST(ctx);
      expect(res.status).toBe(400);
    });

    it('rejects missing message', async () => {
      const ctx = createContext(
        { name: 'John', email: 'john@test.com', message: '   ' },
        { ip: '10.3.0.1' }
      );
      const res = await POST(ctx);
      expect(res.status).toBe(400);
    });
  });

  describe('Spam blocking', () => {
    it('silently drops high-confidence spam (score >= 80) without calling Slack', async () => {
      mockCheckForSpam.mockReturnValue({
        isSpam: true,
        reasons: ['Honeypot field was filled'],
        score: 100,
      });

      const ctx = createContext(
        { name: 'Bot', email: 'bot@spam.com', message: 'Buy our SEO services now!' },
        { ip: '10.2.0.1' }
      );
      const res = await POST(ctx);

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);

      // Slack fetch should NOT have been called (only the module-level import calls fetch)
      const fetchMock = vi.mocked(globalThis.fetch);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('forwards low-confidence spam to Slack with [SPAM] prefix', async () => {
      mockCheckForSpam.mockReturnValue({
        isSpam: true,
        reasons: ['Contains spam keywords'],
        score: 45,
      });

      const ctx = createContext(
        { name: 'Spammer', email: 'spam@test.com', message: 'We offer SEO services for your site' },
        { ip: '10.2.0.2' }
      );
      const res = await POST(ctx);

      expect(res.status).toBe(200);
      const fetchMock = vi.mocked(globalThis.fetch);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('ALL method handler', () => {
    it('returns 405 for non-POST methods', async () => {
      const res = await ALL({} as any);
      expect(res.status).toBe(405);
    });
  });
});
