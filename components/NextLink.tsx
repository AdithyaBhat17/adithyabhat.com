import Link from 'next/link'

type Props = {
  href: string
  text: string
}

export default function NextLink({ href, text }: Props) {
  return (
    <Link legacyBehavior href={href}>
      <a className="text-gray-900 hover:text-black poppins mt-16 mx-auto text-center flex items-center justify-center w-auto">
        {text} &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          fill="#000"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </Link>
  )
}
