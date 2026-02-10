import type { APIRoute } from 'astro';
import dayjs from 'dayjs';
import { checkForSpam, type SpamCheckResult } from '@/lib/spam-filter';

export const prerender = false;

const SLACK_URL = import.meta.env.SLACK_URL;

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

export const POST: APIRoute = async ({ request }) => {
  const { name, message, email, website } = await request.json();

  if (!name?.trim() || !message?.trim() || !email?.trim()) {
    return new Response(
      JSON.stringify({ success: false, message: 'Missing fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const spamResult = checkForSpam({ name, email, message, website });

  const slackResponse = await fetch(SLACK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: getText(name, email, message, spamResult) }),
  });

  if (!slackResponse.ok) {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid message' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: 'Done! your message was sent perfectly!' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

export const ALL: APIRoute = async () => {
  return new Response(
    JSON.stringify({ success: false, message: 'This endpoint does not support this http method' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
};
