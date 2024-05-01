import { remark } from 'remark'
import html from 'remark-html'

export default async function processMarkdown(markdownContent: string) {
  const processedMarkdown = await remark()
    .use(html)
    .processSync(markdownContent)
  return processedMarkdown.toString()
}
