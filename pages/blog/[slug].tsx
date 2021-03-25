import { fetchAPI } from '@/lib/datocms'
import { ARTICLE_QUERY, ALL_ARTICLES_QUERY } from '../../graphql/queries/posts'
import Head from '@/components/header'
import Container from '@/components/container'
import { ArticleProps } from '@/interfaces/content'
import NextHead from 'next/head'

import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import RecentArticles from '@/components/recent-articles'
import { renderMetaTags } from 'react-datocms'
import ReactMarkdown from 'react-markdown'
import Code from '@/components/Code'

export default function Article({ data }: ArticleProps) {
  const router = useRouter()
  if (!router?.isFallback && !data?.article?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div>
      <Head title={data?.article?.title} />
      <NextHead>
        {data?.article ? renderMetaTags(data?.article?.seo) : null}
      </NextHead>
      <Container>
        <div className="w-full md:w-3/4 mx-auto">
          <h1 data-testid="title" className="text-5xl font-semibold mb-5">
            {data?.article?.title}
          </h1>
          <small data-testid="date">
            {dayjs(data?.article?.date).format('DD MMM, YYYY')}
          </small>
          <ReactMarkdown
            data-testid="content"
            className="content"
            source={data?.article?.content}
            renderers={{ code: Code }}
          />
        </div>
        <div className="px-0 md:px-24 lg:px-24 mb-6">
          <RecentArticles
            data={{ allArticles: data?.moreArticles || [] }}
            type="allArticles"
            columns="3"
          />
        </div>
      </Container>
    </div>
  )
}

// istanbul ignore next line
export async function getStaticProps({ params, preview }) {
  const result = await fetchAPI(ARTICLE_QUERY, {
    variables: { slug: params.slug },
    preview,
  })
  return {
    props: {
      data: {
        ...result,
        article: {
          ...result.article,
          content: result?.article?.content ?? '',
        },
      },
    },
  }
}

// istanbul ignore next line
export async function getStaticPaths() {
  const data = await fetchAPI(ALL_ARTICLES_QUERY)
  return {
    paths: data?.allArticles?.map((article) => `/blog/${article.slug}`) || [],
    fallback: true,
  }
}
