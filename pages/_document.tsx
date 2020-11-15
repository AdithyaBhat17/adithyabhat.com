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
