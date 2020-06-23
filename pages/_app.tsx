import '../styles/index.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;531;600;900&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
