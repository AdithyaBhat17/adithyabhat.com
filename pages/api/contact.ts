import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import { checkForSpam, SpamCheckResult } from '@/lib/spam-filter'

const SLACK_URL = process.env.SLACK_URL

const getText = (
  name: string,
  email: string,
  message: string,
  spamResult: SpamCheckResult
): string => {
  const spamPrefix = spamResult.isSpam ? '[SPAM] ' : ''
  const spamDetails = spamResult.isSpam
    ? `\n\n:warning: *Spam Detection Details:*\nScore: ${spamResult.score}/100\nReasons: ${spamResult.reasons.join('; ')}`
    : ''

  const text = `
    ${spamPrefix}Hey Adithya, ${name} just sent you this message from https://adithyabhat.com/contact on ${dayjs().format(
    'DD MMM [at] h:mm a'
  )}\n"${message}"\nYou can reach them at ${email}${spamDetails}
    `
  return text
}

export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'This endpoint does not support this http method',
    })
  }

  const { name, message, email, website } = JSON.parse(req.body)

  if (!name.trim() || !message.trim() || !email.trim())
    return res.status(400).json({ success: false, message: 'Missing fields' })

  // Run spam detection
  const spamResult = checkForSpam({ name, email, message, website })

  const slackResponse = await fetch(SLACK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: getText(name, email, message, spamResult),
    }),
  })

  if (slackResponse.statusText !== 'OK') {
    return res.status(400).json({ success: false, message: 'Invalid message' })
  }

  return res
    .status(200)
    .json({ success: true, message: 'Done! your message was sent perfectly!' })
}
