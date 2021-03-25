import Head from '@/components/header'
import { fetchAPI } from '@/lib/datocms'
import processMarkdown from '@/lib/processMarkdown'
import Container from '@/components/container'

export default function Legal({ document }: { document: string }) {
  return (
    <div className="p-0">
      <Head title="Legal | Adithya NR" />
      <Container>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: document }}
        />
      </Container>
      <br />
    </div>
  )
}

export async function getStaticProps() {
  const result = await fetchAPI(`query Legal {
    legal {
        document
    }
  }`)

  return {
    props: {
      document: await processMarkdown(result?.legal?.document),
    },
  }
}
