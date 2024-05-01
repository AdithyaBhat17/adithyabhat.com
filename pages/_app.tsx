import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import * as gtag from '@/lib/gtag'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import '../styles/index.css'

const handleRouteChange = (url: string) => {
  gtag.pageview(url)
}

Router.events.on('routeChangeStart', (url: string) => {
  NProgress.start()
  handleRouteChange(url)
})
Router.events.on('routeChangeComplete', (url: string) => {
  NProgress.done()
  handleRouteChange(url)
})
Router.events.on('routeChangeError', (url: string) => {
  NProgress.done()
  handleRouteChange(url)
})

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col justify-around min-h-screen">
      <Navbar />
      <main className="p-0">
        <Component {...pageProps} />
      </main>
      <div className="mt-24 lg:mt-32">
        <Footer />
      </div>
      <SpeedInsights />
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
