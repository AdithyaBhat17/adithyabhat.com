import Container from '@/components/container'
import Head from '@/components/header'
import { ArticleProps } from '@/interfaces/content'
import { fetchAPI } from '@/lib/datocms'
import NextHead from 'next/head'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { ALL_ARTICLES_QUERY, ARTICLE_QUERY } from '../../graphql/queries/posts'

import PreviewBanner from '@/components/PreviewBanner'
import RecentArticles from '@/components/recent-articles'
import dayjs from 'dayjs'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { renderMetaTags } from 'react-datocms'
import ReactMarkdown from 'react-markdown'

export default function Article({
  data,
  preview,
}: {
  data: ArticleProps['data']
  preview?: boolean
}) {
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
      {preview ? <PreviewBanner /> : null}
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
            components={{
              code: ({ className, children, node: _node, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={atomOneDark}
                    language={match[1]}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {data?.article?.content}
          </ReactMarkdown>
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
export async function getStaticProps({ params, preview = false }) {
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
      preview,
    },
  }
}

// istanbul ignore next line
export async function getStaticPaths() {
  const data = await fetchAPI(ALL_ARTICLES_QUERY)
  return {
    paths: data?.allArticles?.map((article) => `/blog/${article.slug}`) || [],
    fallback: false,
  }
}
