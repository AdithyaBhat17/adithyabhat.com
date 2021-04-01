import { fetchAPI } from '@/lib/datocms'
import Head from '@/components/header'
import processMarkdown from '@/lib/processMarkdown'
import Container from '@/components/container'
import NextHead from 'next/head'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { renderMetaTags } from 'react-datocms'
import { CASE_STUDY, RECENT_WORK } from 'graphql/queries/work'
import Link from 'next/link'
import RecentProjects from '@/components/recent-articles'
import { Project } from '@/interfaces/content'
import { event as logEvent } from '@/lib/gtag'
import PreviewBanner from '@/components/PreviewBanner'

type Props = {
  data: {
    project: Project
    allProjects: Project[]
  }
  preview?: boolean
}

export default function CaseStudy({ data, preview }: Props) {
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
      {preview ? <PreviewBanner /> : null}
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
          <hr className="border-gray-800 mt-20 mb-16 px-6" />
          {/* @todo move view project link to a separate component */}
          <a
            href={data?.project?.link}
            onClick={() => {
              logEvent({
                action: `User visited ${data?.project?.title} from /${data?.project?.slug}`,
                label: 'user_success',
                category: 'engagement',
                value: data?.project?.title,
              })
            }}
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
          <RecentProjects
            data={{ allProjects: data?.allProjects ?? [] }}
            type="allProjects"
            columns={data?.allProjects?.length < 3 ? '2' : '3'}
          />
          <h1 className="font-semibold text-4xl my-48 leading-relaxed">
            Have a similar project in mind? <br />{' '}
            <Link href={`/contact?ref=${data?.project?.slug}`}>
              <a className="left">Let&apos;s chat!</a>
            </Link>
          </h1>
        </div>
      </Container>
    </div>
  )
}

// istanbul ignore next line
export async function getStaticProps({ params, preview = false }) {
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
      preview,
    },
  }
}

// istanbul ignore next line
export async function getStaticPaths() {
  const data = await fetchAPI(RECENT_WORK)
  return {
    paths: data?.allProjects?.map((project) => `/work/${project.slug}`) || [],
    fallback: false,
  }
}
