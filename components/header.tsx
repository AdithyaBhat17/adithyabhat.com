import NextHead from 'next/head'
import { useEffect, useState } from 'react'
import { SEO } from '../interfaces/seo'

const defaultDescription =
  'A UX engineer from Bengaluru, helping companies of all sizes get ahead online. I am currently working on DevOps and Analytics products at Betsol.'

export default function Head({ title, description = defaultDescription }: SEO) {
  const [url, setUrl] = useState('https://adithyabhat.com')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setUrl(document.location.href)
  }, [])

  useEffect(() => {
    if (!hydrated) {
      setHydrated(true)
    }
  }, [])

  return (
    <NextHead>
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@300;600&family=Bebas+Neue&display=swap"
      />

      <link
        media={!hydrated ? 'print' : 'all'}
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@400;600;700&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />
      <title>{title || 'Adithya NR'}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
        id="viewport-meta"
      />

      <link rel="icon" type="image/svg" href="static/logo_white.svg" />
      <meta name="author" content="Adithya NR" />
      <meta property="og:title" content="Adithya NR" />
      <meta name="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Adithya NR" />
      <meta
        property="og:image"
        content="https://cdn.dribbble.com/users/2366701/screenshots/14499518/media/80880f845dd409a5d3108c8961c8d8e4.png"
      />
      <meta
        property="twitter:image"
        content="https://cdn.dribbble.com/users/2366701/screenshots/14499518/media/80880f845dd409a5d3108c8961c8d8e4.png"
      />
      <meta
        name="keywords"
        content="front-end developer, front-end development, web designer, adithya, adithya nr, adithya bhat, web developer"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@adithya__nr" />
      <meta name="twitter:creator" content="@adithya__nr" />
      <meta name="twitter:description" content={description} />
    </NextHead>
  )
}
