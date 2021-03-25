import '../styles/index.css'
import { useEffect } from 'react'
import * as gtag from '@/lib/gtag'
import { useRouter } from 'next/router'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

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
    <div className="flex flex-col justify-around min-h-screen">
      <Navbar />
      <main className="p-0">
        <Component {...pageProps} />
      </main>
      <div className="mt-24 lg:mt-32">
        <Footer />
      </div>
    </div>
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
