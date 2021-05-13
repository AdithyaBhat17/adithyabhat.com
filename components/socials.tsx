import React from 'react'

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

export default function Socials() {
  return (
    <div className="flex justify-start items-center mt-10 lg:mt-0">
      {socials.map((social, i) => (
        <a
          key={i}
          data-testid="socials-link"
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className="text-black mr-5"
        >
          <img
            loading="lazy"
            src={`/static/${social.icon}.svg`}
            alt={social.icon}
          />
        </a>
      ))}
    </div>
  )
}
