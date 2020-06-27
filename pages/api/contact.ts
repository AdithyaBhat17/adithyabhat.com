import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'

const SLACK_URL = process.env.SLACK_URL

const getText = (name: string, email: string, message: string): string => {
  const text = `
    Hey Adithya, ${name} just sent you this message from https://adithyabhat.com/contact on ${dayjs().format(
    'DD MMM [at] h:mm a'
  )}\n"${message}"\nYou can reach them at ${email}
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

  const { name, message, email } = JSON.parse(req.body)

  if (!name.trim() || !message.trim() || !email.trim())
    return res.status(400).json({ success: false, message: 'Missing fields' })

  const slackResponse = await fetch(SLACK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: getText(name, email, message),
    }),
  })

  if (slackResponse.statusText !== 'OK') {
    return res.status(400).json({ success: false, message: 'Invalid message' })
  }

  return res
    .status(200)
    .json({ success: true, message: 'Done! your message was sent perfectly!' })
}
