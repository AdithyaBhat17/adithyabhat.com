import { fetchAPI } from '../lib/datocms'
import { Use } from '../interfaces/use'
import Head from '../components/header'

export default function Uses({ data }) {
  return (
    <div className="container">
      <Head title="Adithya NR | A Full stack Designer based in Bengaluru, India." />
      {data?.allUses?.map((use: Use) => (
        <div key={use.id}>
          <h3 data-testid="category">{use.category}</h3>
          {use.tools?.map((tool, index) => (
            <span key={index}>
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
export async function getServerSideProps() {
  const data = await fetchAPI(USES_QUERY)
  return {
    props: {
      data,
    },
  }
}
