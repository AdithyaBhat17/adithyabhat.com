import type { APIRoute } from 'astro';
import dayjs from 'dayjs';
import { checkForSpam, type SpamCheckResult } from '@/lib/spam-filter';

export const prerender = false;

const SLACK_URL = import.meta.env.SLACK_URL;
const ALLOWED_ORIGINS = ['https://adithyabhat.com', 'https://www.adithyabhat.com'];

// Simple in-memory rate limiter (per serverless instance)
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimit.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimit.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

const getText = (
  name: string,
  email: string,
  message: string,
  spamResult: SpamCheckResult
): string => {
  const spamPrefix = spamResult.isSpam ? '[SPAM] ' : '';
  const spamDetails = spamResult.isSpam
    ? `\n\n:warning: *Spam Detection Details:*\nScore: ${spamResult.score}/100\nReasons: ${spamResult.reasons.join('; ')}`
    : '';

  return `${spamPrefix}Hey Adithya, ${name} just sent you this message from https://adithyabhat.com/contact on ${dayjs().format(
    'DD MMM [at] h:mm a'
  )}\n"${message}"\nYou can reach them at ${email}${spamDetails}`;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Origin check: reject requests from unknown origins
  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response(
      JSON.stringify({ success: false, message: 'Forbidden' }),
      { status: 403, headers: JSON_HEADERS }
    );
  }

  // Rate limiting by IP
  const ip = clientAddress ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ success: false, message: 'Too many requests. Please try again later.' }),
      { status: 429, headers: JSON_HEADERS }
    );
  }

  const { name, message, email, website } = await request.json();

  if (!name?.trim() || !message?.trim() || !email?.trim()) {
    return new Response(
      JSON.stringify({ success: false, message: 'Missing fields' }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  const spamResult = checkForSpam({ name, email, message, website });

  // Block high-confidence spam silently (don't forward to Slack)
  if (spamResult.score >= 80) {
    return new Response(
      JSON.stringify({ success: true, message: 'Done! your message was sent perfectly!' }),
      { status: 200, headers: JSON_HEADERS }
    );
  }

  const slackResponse = await fetch(SLACK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: getText(name, email, message, spamResult) }),
  });

  if (!slackResponse.ok) {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid message' }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: 'Done! your message was sent perfectly!' }),
    { status: 200, headers: JSON_HEADERS }
  );
};

export const ALL: APIRoute = async () => {
  return new Response(
    JSON.stringify({ success: false, message: 'This endpoint does not support this http method' }),
    { status: 405, headers: JSON_HEADERS }
  );
};
