import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const routes = [
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'Uses',
    link: '/uses',
  },
]

export default function Navbar() {
  const activeStyle = useCallback((link: string) => {
    return useRouter()?.route === link ? 'border-gray-900' : ''
  }, [])

  return (
    <>
      <nav className="navbar px-6 md:px-36 lg:px-48">
        <Link href="/">
          <a className="hover:border-white">
            <img
              className="fill-current lg:h-16 lg:w-16 w-12 h-12"
              src="/static/logo_black.svg"
              alt="Adithya NR"
            />
          </a>
        </Link>

        <ul className="flex justify-between">
          {routes?.map((route, i) => (
            <li className="ml-6" key={i}>
              <Link href={`${route.link}`}>
                <a
                  data-testid="nav-link"
                  className={`${activeStyle(
                    route.link
                  )} text-black hover:border-gray-900`}
                >
                  {route.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
