import React from 'react'
import Container from '@/components/container'
import { Image } from 'react-datocms'
import { WorkProps } from '@/interfaces/work'
import NextLink from './NextLink'

export default function Work({ data }: WorkProps) {
  return (
    <>
      <Container>
        <h1 className="mt-6 lg:mt-16 xl:mt-24 mb-6 text-2xl font-semibold">
          Recent work
        </h1>
        <div className="flex items-start flex-wrap -mx-5">
          {data?.allProjects
            ?.slice(0, 3)
            ?.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
            .map((project) => {
              return (
                <div className="w-full md:w-1/3 mt-5 px-5" key={project.title}>
                  <Image
                    className="rounded-lg shadow-sm"
                    data={project.thumbnail.responsiveImage}
                  />
                  <h3 className="mt-3 font-semibold text-xl">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 poppins">{project.tags}</p>
                </div>
              )
            })}
        </div>
        {data?.allProjects?.length > 3 ? (
          <NextLink href="/" text="View more projects" />
        ) : null}
      </Container>
    </>
  )
}
