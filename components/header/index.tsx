import NextHead from 'next/head'
import { SEO } from '../../interfaces/seo'

export default function Head({ title, description }: SEO) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}
