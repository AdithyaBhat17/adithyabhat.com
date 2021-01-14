/* istanbul ignore file */

import { GA_TRACKING_ID } from '@/lib/gtag'
import Document, {
  Html,
  Main,
  NextScript,
  Head,
  DocumentContext,
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
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

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{
                "name":"Adithya NR",
                "description":"I am a Full stack Designer based in Bengaluru, India.",
                "author":{
                  "@type":"Person",
                  "name":"Adithya NR"
                },
                "disambiguatingDescription": "Web Designer & Developer",
                "jobTitle": "Full Stack Designer, Freelancer",
                "@type":"WebSite",
                "url":"https://adithyabhat.com/",
                "publisher":{
                  "@type":"Organization",
                  "logo":{
                    "@type":"ImageObject",
                    "url":"https://raw.githubusercontent.com/AdithyaBhat17/adithyabhat17.github.io/version-3/public/adithya1.png"
                  },
                    "name":"Adithya NR"
                },
                "image":"https://raw.githubusercontent.com/AdithyaBhat17/adithyabhat17.github.io/version-3/public/adithya1.png",
                "headline":"Adithya NR",
                "sameAs":[
                  "https://twitter.com/adithya__nr",
                  "https://linkedin.com/in/adithya-nr/",
                  "https://github.com/AdithyaBhat17",
                  "https://instagram.com/adithyabhat__/",
                  "https://medium.com/adithya-nr"
                ],
                "alternateName": "Adithya Bhat",
                "@context":"http://schema.org"
              }`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script type="text/javascript" src="/viewport.js"></script>
      </Html>
    )
  }
}
