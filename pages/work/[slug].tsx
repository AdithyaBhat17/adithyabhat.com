import { fetchAPI } from '@/lib/datocms'
import Head from '@/components/header'
import processMarkdown from '@/lib/processMarkdown'
import Container from '@/components/container'
import Navbar from '@/components/navbar'
import NextHead from 'next/head'
import Footer from '@/components/footer'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { renderMetaTags } from 'react-datocms'
import { Project } from '@/interfaces/work'
import { CASE_STUDY, RECENT_WORK } from 'graphql/queries/work'
import Link from 'next/link'
import { event as logEvent } from '@/lib/gtag'

export default function CaseStudy({ data }: Project) {
  const router = useRouter()
  if (!router?.isFallback && !data?.project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div>
      <Head title={data?.project?.title} />
      <NextHead>
        {data?.project ? renderMetaTags(data?.project?.seo) : null}
      </NextHead>
      <Navbar />
      <Container>
        <div className="w-full md:w-2/3 mx-auto">
          <h1 data-testid="title" className="text-5xl font-semibold mb-5">
            {data?.project?.title}
          </h1>
          <div
            data-testid="content"
            className="casestudy"
            dangerouslySetInnerHTML={{ __html: data?.project?.caseStudy }}
          />
          <hr className="border-gray-800 mt-20 mb-12 px-6" />
          {/* @todo refactor pagination links */}
          <div className="flex justify-between items-end flex-wrap">
            <a
              href={data?.project?.link}
              rel="noopener noreferrer"
              target="_blank"
              className="poppins font-semibold left items-center text-lg text-black hover:text-blue-900"
            >
              <span className="inline">Visit Project</span>{' '}
              <svg
                className="w-6 h-6 ml-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <div className="mt-5">
              <span className="md:float-right">Next Project</span> <br />
              <Link
                href={`/work/[slug]`}
                as={`/work/${data?.moreProjects[0].slug}`}
              >
                <a
                  onClick={() =>
                    logEvent({
                      action: `User visited ${data?.project?.title} from /${data?.project?.slug}`,
                      label: 'user_success',
                      category: 'engagement',
                      value: data?.project?.title,
                    })
                  }
                  className="text-blue-800 font-semibold left text-lg"
                >
                  {data?.moreProjects[0].title}
                </a>
              </Link>
            </div>
          </div>
          <h1 className="font-semibold text-4xl my-20">
            Have a similar project in mind? <br />{' '}
            <Link href={`/contact?ref=${data?.project?.slug}`}>
              <a className="left">Let&apos;s chat!</a>
            </Link>
          </h1>
        </div>
      </Container>
      <Footer />
    </div>
  )
}

// istanbul ignore next line
export async function getStaticProps({ params, preview }) {
  const result = await fetchAPI(CASE_STUDY, {
    variables: { slug: params.slug },
    preview,
  })
  return {
    props: {
      data: {
        ...result,
        project: {
          ...result.project,
          content: await processMarkdown(result?.project?.content ?? ''),
        },
      },
    },
  }
}

// istanbul ignore next line
export async function getStaticPaths() {
  const data = await fetchAPI(RECENT_WORK)
  return {
    paths: data?.allProjects?.map((project) => `/work/${project.slug}`) || [],
    fallback: true,
  }
}
