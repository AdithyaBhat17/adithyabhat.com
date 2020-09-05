import { fetchAPI } from '@/lib/datocms'
import { ARTICLE_QUERY } from 'graphql/queries/posts'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.query?.secret !== process.env.DATOCMS_PREVIEW_SECRET ||
    !req.query?.slug
  ) {
    return res.status(403).send({ message: 'Invalid token' })
  }

  const articleData = await fetchAPI(ARTICLE_QUERY, {
    variables: { slug: req.query.slug },
    preview: true,
  })

  if (!articleData || !articleData.article) {
    return res.status(400).send({ message: 'Invalid slug' })
  }

  // enables preview mode using cookies
  res.setPreviewData({})

  res.writeHead(307, { Location: `/blog/${articleData.article.slug}` })
  res.end()
}
