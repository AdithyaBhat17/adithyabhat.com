import { fetchAPI } from '@/lib/datocms'
import { Use } from '../interfaces/use'
import Head from '@/components/header'
import Navbar from '@/components/navbar'
import Container from '@/components/container'

export default function Uses({ data }) {
  return (
    <div>
      <Head title="Uses | Adithya NR" />
      <Navbar />
      <Container>
        <h1 className="text-black font-semibold text-6xl text-gray-900">
          <b>Uses</b>
        </h1>
        {data?.allUses?.map((use: Use) => (
          <div key={use.id}>
            <h3
              data-testid="category"
              className="text-md font-semibold text-black mb-2 mt-5"
            >
              {use.category}
            </h3>
            {use.tools?.map((tool, index) => (
              <span
                key={index}
                className="text-sm mr-3 text-md bg-gray-100 shadow-sm px-2 py-1 rounded-sm flex-wrap break-all leading-10"
              >
                <a
                  data-testid="link"
                  href={tool.link}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {tool.name}
                </a>
              </span>
            ))}
          </div>
        ))}
      </Container>
    </div>
  )
}

const USES_QUERY = `
    query Uses {
        allUses {
            id
            category
            tools
        }
    }
`
// istanbul ignore next line
export async function getStaticProps() {
  const data = await fetchAPI(USES_QUERY)
  return {
    props: {
      data,
    },
  }
}
