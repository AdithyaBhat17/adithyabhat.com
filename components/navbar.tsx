import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, memo } from 'react'

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
    name: 'Contact',
    link: '/contact',
  },
]

function Navbar() {
  const activeStyle = useCallback((link: string) => {
    return useRouter()?.route === link ? 'border-gray-900' : ''
  }, [])

  const getRoute = () => useRouter()?.pathname?.split('/')[1] ?? null

  return (
    <>
      <nav className="navbar px-6 md:px-36 lg:px-48">
        <div className="flex justify-start items-center">
          <Link href="/">
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

        <ul className="flex justify-between">
          {routes?.map((route, i) => (
            <li className="ml-6" key={i}>
              <Link href={`${route.link}`}>
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
    </>
  )
}

export default memo(Navbar)
