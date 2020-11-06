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
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script type="text/javascript" src="/viewport.js"></script>
      </Html>
    )
  }
}
