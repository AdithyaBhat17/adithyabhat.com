import { fetchAPI } from '@/lib/datocms'
import { Stack } from '../interfaces/use'
import Head from '@/components/header'
import Container from '@/components/container'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { stagger } from '@/utils/motion'

export default function Uses({ data, categories }) {
  const [selectedCategory, updateCategory] = useState<string | null>(null)

  const filteredStack = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All categories')
      return data?.allStacks
    return (
      data?.allStacks
        ?.filter((stack) => stack.category === selectedCategory)
        .map((stack) => stack) ?? data?.allStacks
    )
  }, [selectedCategory])

  const handleCategoryChange = (event) => {
    updateCategory(event.target.value)
  }

  return (
    <div>
      <Head title="Toolbox | Adithya NR" />
      <Container className="px-4">
        <div className="justify-start max-w-screen-sm">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }}
            className="grid grid-cols-1 md:grid-cols-2 justify-between items-center my-10 flex-wrap sm:flex-nowrap"
          >
            <h1 className="col-start-1 text-black font-semibold text-4xl">
              My Toolbox
            </h1>
            <div className="w-max md:col-start-13 bg-gray-100 px-4 py-2 mt-5 sm:mt-0 rounded-md">
              <select
                onChange={handleCategoryChange}
                className="bg-gray-100 cursor-pointer"
                name="category"
                id="category"
              >
                {['All categories', ...categories]?.map((category, index) => {
                  return (
                    <option key={`${category}-${index}`} value={category}>
                      {category}
                    </option>
                  )
                })}
              </select>
            </div>
          </motion.div>
          <motion.div variants={stagger} className="space-y-2">
            {filteredStack?.map((stack: Stack, index: number) => (
              <motion.a
                aria-label="product"
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                href={stack.link}
                className="hover:bg-gray-50 flex items-start rounded-md px-2 py-4 sm:px-4"
                rel="noopener noreferrer"
                target="_blank"
                key={stack.id}
              >
                {stack?.logo?.url ? (
                  <img
                    width="50"
                    height="50"
                    loading="lazy"
                    alt={`${stack.product} brand icon`}
                    title={stack.product}
                    src={stack.logo?.url}
                    className="stack-icon rounded-lg h-auto object-contain"
                  />
                ) : null}
                <div className=" pl-5 space-y-2">
                  <h2>{stack.product}</h2>
                  <p className="text-gray-700 text-md">{stack.description}</p>
                  <div>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-sm text-gray-900">
                      {stack.category}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>
    </div>
  )
}

const STACK_QUERY = `
    query Stack {
        allStacks (orderBy: product_ASC, first: 50) {
            id
            category
            product
            link
            logo {
              url
            }
            description
        }
    }
`
// istanbul ignore next line
export async function getStaticProps() {
  const data = await fetchAPI(STACK_QUERY)

  let categories = data.allStacks.map((product) => product.category)
  categories = Array.from(new Set([...categories]))

  return {
    props: {
      data,
      categories,
    },
  }
}
