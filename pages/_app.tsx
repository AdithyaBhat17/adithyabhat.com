import '../styles/index.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <main className="p-0">
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com/"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.dribbble.com/"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://vitals.vercel-analytics.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.datocms-assets.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
