import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'

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
    name: 'Work',
    link: '/work',
  },
  {
    name: "Gallery",
    link: '/photos',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
]

function Navbar() {
  const activeStyle = useCallback((link: string) => {
    return useRouter()?.route === link ? 'border-gray-900' : ''
  }, [])

  const getRoute = () => useRouter()?.pathname?.split('/')[1] ?? null

  let padding = 'px-6 md:px-36 lg:px-48'

  const useLargeContainer = useRouter()?.route === '/photos';

  if(useLargeContainer) {
    padding = 'px-6 md:px-16'
  }

  return (
    <nav className={`navbar ${padding}`}>
      <div className="flex justify-start items-center">
        <Link legacyBehavior href="/">
          <a className="hover:border-white">
            <img
              className="fill-current lg:h-16 lg:w-16 w-12 h-12"
              src="/static/logo_black.svg"
              alt="Adithya NR logo"
            />
          </a>
        </Link>
        <span className="sm:inline hidden ml-6 text-gray-500 capitalize">
          {getRoute()}
        </span>
      </div>

      <ul className="flex justify-between gap-x-4 md:gap-x-8 w-full md:w-auto">
        {routes?.map((route, i) => (
          <li key={i}>
            <Link legacyBehavior href={`${route.link}`}>
              <a
                data-testid="nav-link"
                className={`${activeStyle(
                  route.link
                )} text-black text-sm hover:border-gray-900`}
              >
                {route.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default memo(Navbar)
