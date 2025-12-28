import { checkForSpam } from '@/lib/spam-filter'

describe('Spam Filter', () => {
  describe('Honeypot detection', () => {
    test('should flag as spam when honeypot field is filled', () => {
      const result = checkForSpam({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to get in touch.',
        website: 'http://spam-site.com',
      })

      expect(result.isSpam).toBe(true)
      expect(result.score).toBe(100)
      expect(result.reasons).toContain(
        'Honeypot field was filled (bot detected)'
      )
    })

    test('should not flag when honeypot is empty', () => {
      const result = checkForSpam({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to discuss a project with you.',
        website: '',
      })

      expect(result.isSpam).toBe(false)
    })

    test('should not flag when honeypot is undefined', () => {
      const result = checkForSpam({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to discuss a project with you.',
      })

      expect(result.isSpam).toBe(false)
    })
  })

  describe('Gibberish detection', () => {
    test('should detect gibberish name and add to score', () => {
      const result = checkForSpam({
        name: 'asdfghjkl',
        email: 'test@example.com',
        message: 'Hello, I would like to get in touch with you.',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(
        result.reasons.some((r) => r.includes('Name appears to be gibberish'))
      ).toBe(true)
    })

    test('should flag combined gibberish name and message', () => {
      const result = checkForSpam({
        name: 'qwertyzxcv',
        email: 'test@example.com',
        message: 'asdfghjkl qwertyuiop zxcvbnm',
      })

      expect(result.isSpam).toBe(true)
      expect(result.reasons.some((r) => r.includes('gibberish'))).toBe(true)
    })

    test('should detect message with excessive consonants', () => {
      const result = checkForSpam({
        name: 'Test',
        email: 'test@example.com',
        message: 'bcdfghjklmnpqrstvwxyz test bcdfghjklmnpqrstvwxyz',
      })

      expect(result.score).toBeGreaterThan(0)
    })

    test('should not flag normal English text', () => {
      const result = checkForSpam({
        name: 'Jane Smith',
        email: 'jane@company.com',
        message:
          'Hi there! I came across your portfolio and I am interested in working together on a new project. Please let me know your availability.',
      })

      expect(result.isSpam).toBe(false)
    })
  })

  describe('Keyword blocklist', () => {
    test('should flag SEO spam keywords', () => {
      const result = checkForSpam({
        name: 'SEO Expert',
        email: 'seo@agency.com',
        message:
          'We can help you with SEO services and backlinks to rank your website on first page of google.',
      })

      expect(result.isSpam).toBe(true)
      expect(result.reasons.some((r) => r.includes('spam keywords'))).toBe(true)
    })

    test('should detect and flag guest post spam with backlinks', () => {
      const result = checkForSpam({
        name: 'Content Writer',
        email: 'writer@example.com',
        message:
          'I would like to publish a guest post on your website. We offer link building and backlinks to improve your search engine optimization.',
      })

      expect(result.isSpam).toBe(true)
      expect(result.reasons.some((r) => r.includes('spam keywords'))).toBe(true)
    })

    test('should flag marketing agency spam', () => {
      const result = checkForSpam({
        name: 'Marketing Pro',
        email: 'info@agency.com',
        message:
          'Our digital marketing agency offers lead generation and social media marketing services.',
      })

      expect(result.isSpam).toBe(true)
    })

    test('should flag suspicious phrases', () => {
      const result = checkForSpam({
        name: 'Sales Rep',
        email: 'sales@company.com',
        message: 'I noticed your website and we can help you. Kindly reply.',
      })

      expect(result.isSpam).toBe(true)
    })
  })

  describe('Pattern detection', () => {
    test('should detect messages with multiple URLs', () => {
      const result = checkForSpam({
        name: 'Spammer',
        email: 'spam@test.com',
        message:
          'Check out https://site1.com and https://site2.com and https://site3.com for great deals!',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(result.reasons.some((r) => r.includes('suspicious pattern'))).toBe(
        true
      )
    })

    test('should detect URL shorteners', () => {
      const result = checkForSpam({
        name: 'User',
        email: 'user@test.com',
        message: 'Check this out: bit.ly/something',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(result.reasons.some((r) => r.includes('suspicious pattern'))).toBe(
        true
      )
    })

    test('should detect excessive caps', () => {
      const result = checkForSpam({
        name: 'Shouter',
        email: 'loud@test.com',
        message:
          'THIS IS AN AMAZING OPPORTUNITY YOU CANNOT MISS OUT ON THIS DEAL',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(result.reasons.some((r) => r.includes('suspicious pattern'))).toBe(
        true
      )
    })

    test('should detect short message with URL', () => {
      const result = checkForSpam({
        name: 'Link Spammer',
        email: 'links@test.com',
        message: 'Visit https://example.com now!',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(
        result.reasons.some((r) => r.includes('Short message with URL'))
      ).toBe(true)
    })

    test('should flag combined URL shortener with spam keywords', () => {
      const result = checkForSpam({
        name: 'SEO Spammer',
        email: 'spam@test.com',
        message:
          'Check out our SEO services at bit.ly/seo-deal for backlinks!',
      })

      expect(result.isSpam).toBe(true)
    })
  })

  describe('Disposable email detection', () => {
    test('should detect disposable email domains', () => {
      const result = checkForSpam({
        name: 'Test User',
        email: 'user@tempmail.com',
        message: 'Hello, this is a test message from a disposable email.',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(result.reasons.some((r) => r.includes('disposable email'))).toBe(
        true
      )
    })

    test('should detect guerrillamail', () => {
      const result = checkForSpam({
        name: 'Anonymous',
        email: 'anon@guerrillamail.com',
        message: 'Hello, this is a test message that is long enough.',
      })

      expect(result.score).toBeGreaterThan(0)
      expect(result.reasons.some((r) => r.includes('disposable email'))).toBe(
        true
      )
    })

    test('should flag disposable email with spam keywords', () => {
      const result = checkForSpam({
        name: 'Spammer',
        email: 'spam@tempmail.com',
        message: 'We offer SEO services and backlinks for your website.',
      })

      expect(result.isSpam).toBe(true)
    })
  })

  describe('Legitimate messages', () => {
    test('should pass normal contact message', () => {
      const result = checkForSpam({
        name: 'Alice Johnson',
        email: 'alice@company.com',
        message:
          'Hi Adithya, I really enjoyed reading your blog posts about software development. I would love to connect and discuss some ideas I have for a collaboration.',
      })

      expect(result.isSpam).toBe(false)
      expect(result.score).toBeLessThan(40)
    })

    test('should pass job inquiry', () => {
      const result = checkForSpam({
        name: 'HR Manager',
        email: 'hr@techcompany.com',
        message:
          'Hello, we are looking for talented developers to join our team. Would you be interested in having a conversation about opportunities at our company?',
      })

      expect(result.isSpam).toBe(false)
    })

    test('should pass project inquiry', () => {
      const result = checkForSpam({
        name: 'Startup Founder',
        email: 'founder@startup.io',
        message:
          'Hi there! I am building a new product and looking for a developer to help with the frontend. Your portfolio looks great and I think you would be a good fit.',
      })

      expect(result.isSpam).toBe(false)
    })

    test('should pass feedback message', () => {
      const result = checkForSpam({
        name: 'Blog Reader',
        email: 'reader@gmail.com',
        message:
          'Just wanted to say thanks for writing that article about React hooks. It really helped me understand the concepts better!',
      })

      expect(result.isSpam).toBe(false)
    })
  })

  describe('Score calculation', () => {
    test('should return score between 0 and 100', () => {
      const result = checkForSpam({
        name: 'Test',
        email: 'test@test.com',
        message: 'SEO services backlinks guest post digital marketing agency',
      })

      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(100)
    })

    test('should cap score at 100', () => {
      const result = checkForSpam({
        name: 'asdfghjkl',
        email: 'spam@tempmail.com',
        message:
          'SEO services backlinks guest post bit.ly/spam CHECK THIS OUT NOW!!!! https://a.com https://b.com https://c.com',
        website: 'http://filled-honeypot.com',
      })

      expect(result.score).toBe(100)
    })
  })
})
