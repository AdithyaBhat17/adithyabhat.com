import Container from './container'
import Link from 'next/link'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export const footerRoutes = [
  {
    name: 'Home',
    link: '/home',
  },
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
    link: '/',
  },
]

export const socials = [
  {
    icon: 'behance',
    link: 'https://behance.net/adithyabhat',
  },
  {
    icon: 'dribbble',
    link: 'https://dribbble.com/adithyanr',
  },
  {
    icon: 'twitter',
    link: 'https://twitter.com/adithya__nr',
  },
  {
    icon: 'github',
    link: 'https://github.com/adithyabhat17',
  },
  {
    icon: 'linkedin',
    link: 'https://linkedin.com/in/adithya-nr',
  },
]

export default function Footer() {
  const router = useRouter()
  const activeStyle = useCallback((link: string) => {
    return router?.route === link ? 'border-gray-900' : ''
  }, [])

  return (
    <Container>
      <hr className="border-gray-800" />
      <br />
      <footer className="footer flex-wrap">
        <div className="flex justify-start items-center">
          <Link href="/">
            <a className="hover:border-white flex justify-start items-center">
              <img
                className="fill-current lg:h-16 lg:w-12 w-12 h-12 mr-3"
                src="/static/logo_black.svg"
                alt="Adithya NR"
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
      </footer>
      <div className="flex justify-start items-center">
        {socials.map((social, i) => (
          <a
            key={i}
            data-testid="socials-link"
            href={social.link}
            target="_blank"
            rel="noreferrer noopener"
            className="text-black mr-5"
          >
            <img src={`/static/${social.icon}.svg`} alt={social.icon} />
          </a>
        ))}
      </div>
    </Container>
  )
}
