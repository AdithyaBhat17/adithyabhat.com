import '../styles/index.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;531;900&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
