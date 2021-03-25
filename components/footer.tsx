import Container from './container'
import Link from 'next/link'
import { useCallback, memo } from 'react'
import { useRouter } from 'next/router'
import Socials from './socials'

export const footerRoutes = [
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
  {
    name: 'Resume',
    link: '/resume.pdf',
  },
  {
    name: 'Uses',
    link: '/uses',
  },
  {
    name: 'Legal',
    link: '/legal',
  },
]

function Footer() {
  const router = useRouter()
  const activeStyle = useCallback(
    (link: string) => {
      return router?.route === link ? 'border-gray-900' : ''
    },
    [router?.route]
  )

  return (
    <Container>
      <hr className="border-gray-800 mt-12 px-6" />
      <br />
      <footer className="footer flex-wrap">
        <div className="flex justify-start items-center">
          <Link href="/">
            <a className="hover:border-white flex justify-start items-center">
              <img
                className="fill-current lg:h-16 lg:w-12 w-12 h-12 mr-3"
                src="/static/logo_black.svg"
                alt="Adithya NR logo"
              />
              <span className="font-semibold text-black poppins">
                adithya nr
              </span>
            </a>
          </Link>
        </div>

        <ul className="flex justify-between">
          {footerRoutes?.map((route, i) => (
            <li className="ml-0 md:ml-10" key={i}>
              <Link href={`${route.link}`}>
                <a
                  data-testid="footer-link"
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
        <Socials />
      </footer>
    </Container>
  )
}

export default memo(Footer)
