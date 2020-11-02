import React from 'react'
import Container from '@/components/container'
import { Image, ResponsiveImageType } from 'react-datocms'
import Link from 'next/link'
// import Image from 'next/image'

type WorkProps = {
  data: {
    allProjects: {
      date: Date | string
      tags: string
      thumbnail: {
        alt: string
        blurhash: string
        title: string
        responsiveImage: ResponsiveImageType
        url: string
      }
      title: string
      caseStudy?: string
    }[]
  }
}

export default function Work({ data }: WorkProps) {
  return (
    <>
      <Container>
        <h1 className="mt-6 lg:mt-16 xl:mt-24 mb-6 text-2xl font-semibold">
          Recent work
        </h1>
        <div className="flex justify-between items-start flex-wrap md:flex-no-wrap">
          {/* <div className="grid grid-cols-3 gap-4"> */}
          {data?.allProjects
            ?.slice(0, 3)
            ?.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
            .map((project) => {
              return (
                <div className="w-full md:w-2/7 mt-5" key={project.title}>
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
          <Link href="/">
            <a className="text-gray-900 hover:text-black poppins mt-16 mx-auto text-center flex items-center justify-center w-auto">
              View more projects &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        ) : null}
      </Container>
    </>
  )
}
