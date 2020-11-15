/* eslint-disable @typescript-eslint/camelcase */
import '../styles/index.css'
import '../styles/fonts.css'
import { useEffect } from 'react'
import * as gtag from '@/lib/gtag'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    router?.events?.on('routeChangeComplete', handleRouteChange)
    return () => {
      router?.events?.off('routeChangeComplete', handleRouteChange)
    }
  }, [router?.events])

  return (
    <main className="p-0">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp

export function reportWebVitals({ id, name, label, value }) {
  ;(window as any).gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}
