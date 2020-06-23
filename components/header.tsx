import NextHead from 'next/head'
import { SEO } from '../interfaces/seo'
import { useEffect, useState } from 'react'

export default function Head({ title, description }: SEO) {
  const [url, setUrl] = useState('https://adithyabhat.com')

  // istanbul ignore next line
  useEffect(() => {
    const viewport = document.getElementById('viewport-meta')
    if (!viewport) return
    const viewports = {
      default: viewport.getAttribute('content'),
      landscape: 'width = 2560',
      portrait: 'width = 768',
    }
    const setViewport = function () {
      screen.width > 2560
        ? viewport.setAttribute('content', viewports.landscape)
        : screen.width >= 768 && screen.width < 1200
        ? viewport.setAttribute('content', viewports.portrait)
        : viewport.setAttribute('content', viewports.default)
    }
    setViewport()
    window.onresize = function () {
      setViewport()
    }
    setUrl(document.location.href)
  }, [])

  return (
    <NextHead>
      <title>{title || 'Adithya NR'}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
        id="viewport-meta"
      />

      <link rel="icon" href="static/logo_white.svg" />
      <meta name="author" content="Adithya NR" />
      <meta property="og:title" content="Adithya NR" />
      <meta name="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Adithya NR" />
      <meta property="og:image" content="../../public/static/logo_black.svg" />
      <meta
        name="keywords"
        content="front-end developer, front-end development, web designer, adithya, adithya nr, adithya bhat, web developer"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@adithya__nr" />
      <meta name="twitter:creator" content="@adithya__nr" />
    </NextHead>
  )
}
