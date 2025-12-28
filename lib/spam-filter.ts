import { ContactData } from '@/interfaces/contact'

export interface SpamCheckResult {
  isSpam: boolean
  reasons: string[]
  score: number
}

// SEO and marketing spam keywords
const SPAM_KEYWORDS: string[] = [
  // SEO spam
  'seo services',
  'seo optimization',
  'search engine optimization',
  'rank your website',
  'first page of google',
  'google ranking',
  'backlinks',
  'link building',
  'guest post',
  'guest posting',
  'sponsored post',
  'buy traffic',
  'increase traffic',
  'website traffic',
  'organic traffic',
  // Web development spam
  'web development services',
  'website redesign',
  'mobile app development',
  'offshore development',
  'hire developers',
  'dedicated developers',
  // Marketing spam
  'email marketing',
  'email list',
  'lead generation',
  'b2b leads',
  'qualified leads',
  'social media marketing',
  'digital marketing agency',
  'marketing services',
  // Common spam phrases
  'i was impressed by your website',
  'i came across your website',
  'i noticed your website',
  'we can help you',
  'we are offering',
  'special offer',
  'limited time offer',
  'guaranteed results',
  // Suspicious patterns
  'kindly reply',
  'kindly revert',
  'do the needful',
  'awaiting your response',
  'looking forward to your positive response',
]

// Patterns that indicate spam
const SUSPICIOUS_PATTERNS: RegExp[] = [
  // 3+ URLs in message
  /https?:\/\/[^\s]+.*https?:\/\/[^\s]+.*https?:\/\/[^\s]+/i,
  // URL shorteners
  /bit\.ly|tinyurl|goo\.gl|t\.co|ow\.ly/i,
  // ALL CAPS sections (20+ chars)
  /[A-Z\s]{20,}/,
  // Excessive punctuation
  /[!?]{4,}/,
  // Template placeholders
  /\[your.?name\]|\[company\]|\[insert\]/i,
  // Unsubscribe patterns
  /unsubscribe|opt.?out|remove from list/i,
]

// Keyboard row patterns for detecting keyboard mashing
const KEYBOARD_PATTERNS = [
  'qwert',
  'asdf',
  'zxcv',
  'qwerty',
  'asdfg',
  'zxcvb',
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
]

// Common English words for word ratio check
const COMMON_WORDS = new Set([
  'the',
  'be',
  'to',
  'of',
  'and',
  'a',
  'in',
  'that',
  'have',
  'i',
  'it',
  'for',
  'not',
  'on',
  'with',
  'he',
  'as',
  'you',
  'do',
  'at',
  'this',
  'but',
  'his',
  'by',
  'from',
  'they',
  'we',
  'say',
  'her',
  'she',
  'or',
  'an',
  'will',
  'my',
  'one',
  'all',
  'would',
  'there',
  'their',
  'what',
  'so',
  'up',
  'out',
  'if',
  'about',
  'who',
  'get',
  'which',
  'go',
  'me',
  'when',
  'make',
  'can',
  'like',
  'time',
  'no',
  'just',
  'him',
  'know',
  'take',
  'people',
  'into',
  'year',
  'your',
  'good',
  'some',
  'could',
  'them',
  'see',
  'other',
  'than',
  'then',
  'now',
  'look',
  'only',
  'come',
  'its',
  'over',
  'think',
  'also',
  'hello',
  'hi',
  'thanks',
  'please',
  'help',
  'need',
  'question',
  'contact',
  'message',
  'email',
  'website',
  'project',
  'interested',
  'opportunity',
  'work',
  'working',
  'love',
  'great',
  'am',
  'is',
  'are',
  'was',
  'been',
  'being',
  'how',
  'want',
  'wanted',
  'would',
  'could',
  'should',
])

// Disposable email domains
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail',
  'temp-mail',
  'guerrillamail',
  'mailinator',
  '10minutemail',
  'throwaway',
  'fakeinbox',
  'trashmail',
]

/**
 * Calculate vowel ratio in text
 * Normal English has ~38% vowels
 */
function getVowelRatio(text: string): number {
  const cleaned = text.toLowerCase().replace(/[^a-z]/g, '')
  if (cleaned.length === 0) return 0
  const vowels = (cleaned.match(/[aeiou]/g) || []).length
  return vowels / cleaned.length
}

/**
 * Find long consonant clusters (4+ consecutive consonants)
 */
function findConsonantClusters(text: string): string[] {
  const matches = text.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]{4,}/g)
  return matches || []
}

/**
 * Check for keyboard mashing patterns
 */
function hasKeyboardPatterns(text: string): boolean {
  const lower = text.toLowerCase()
  return KEYBOARD_PATTERNS.some((pattern) => lower.includes(pattern))
}

/**
 * Calculate ratio of common words in text
 */
function getCommonWordRatio(text: string): number {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 0)
  if (words.length === 0) return 0

  const commonCount = words.filter((w) => COMMON_WORDS.has(w)).length
  return commonCount / words.length
}

/**
 * Calculate gibberish score (0-100, higher = more likely gibberish)
 */
function calculateGibberishScore(text: string): number {
  if (!text || text.trim().length < 3) return 0

  let score = 0

  // Vowel ratio check (normal ~0.38)
  const vowelRatio = getVowelRatio(text)
  if (vowelRatio < 0.15 || vowelRatio > 0.6) {
    score += 25
  } else if (vowelRatio < 0.25 || vowelRatio > 0.5) {
    score += 10
  }

  // Consonant cluster check
  const clusters = findConsonantClusters(text)
  score += Math.min(clusters.length * 15, 30)

  // Keyboard pattern check
  if (hasKeyboardPatterns(text)) {
    score += 25
  }

  // Common word ratio (low ratio = suspicious)
  const wordRatio = getCommonWordRatio(text)
  if (wordRatio < 0.2) {
    score += 20
  } else if (wordRatio < 0.4) {
    score += 10
  }

  return Math.min(score, 100)
}

/**
 * Main spam detection function
 */
export function checkForSpam(data: ContactData): SpamCheckResult {
  const reasons: string[] = []
  let score = 0

  // 1. Honeypot check (instant spam flag)
  if (data.website && data.website.trim() !== '') {
    return {
      isSpam: true,
      reasons: ['Honeypot field was filled (bot detected)'],
      score: 100,
    }
  }

  // 2. Gibberish detection on name and message
  const nameGibberishScore = calculateGibberishScore(data.name)
  const messageGibberishScore = calculateGibberishScore(data.message)

  if (nameGibberishScore >= 50) {
    reasons.push(`Name appears to be gibberish (score: ${nameGibberishScore})`)
    score += 30
  }

  if (messageGibberishScore >= 50) {
    reasons.push(
      `Message appears to be gibberish (score: ${messageGibberishScore})`
    )
    score += 25
  }

  // 3. Keyword blocklist check
  const combinedText = `${data.name} ${data.message}`.toLowerCase()
  const matchedKeywords = SPAM_KEYWORDS.filter((keyword) =>
    combinedText.includes(keyword.toLowerCase())
  )

  if (matchedKeywords.length > 0) {
    reasons.push(`Contains spam keywords: ${matchedKeywords.join(', ')}`)
    score += Math.min(matchedKeywords.length * 15, 40)
  }

  // 4. Pattern matching
  const matchedPatterns = SUSPICIOUS_PATTERNS.filter(
    (pattern) => pattern.test(data.message) || pattern.test(data.name)
  )

  if (matchedPatterns.length > 0) {
    reasons.push(`Matches ${matchedPatterns.length} suspicious pattern(s)`)
    score += matchedPatterns.length * 10
  }

  // 5. Short message with URL
  const wordCount = data.message.trim().split(/\s+/).length
  const hasUrl = /https?:\/\//i.test(data.message)
  if (wordCount < 15 && hasUrl) {
    reasons.push('Short message with URL')
    score += 15
  }

  // 6. Disposable email domain check
  const emailDomain = data.email.split('@')[1]?.toLowerCase() || ''
  if (DISPOSABLE_EMAIL_DOMAINS.some((d) => emailDomain.includes(d))) {
    reasons.push('Suspicious disposable email domain')
    score += 20
  }

  return {
    isSpam: score >= 40,
    reasons,
    score: Math.min(score, 100),
  }
}
