/* istanbul ignore file */

import { NextApiResponse } from 'next'

export default async function exit(_req, res: NextApiResponse) {
  res.clearPreviewData()

  res.writeHead(307, { Location: '/' })
  res.end()
}
