import React from 'react'
import Container from '@/components/container'
import useResizeObserver from 'hooks/useResizeObserver'
import Socials from './socials'
import Link from 'next/link'

export default function Hero() {
  const [gif, showGif] = React.useState(false)

  const imageRef = React.useRef(undefined)

  const { width } = useResizeObserver()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (width > 1100) showGif(true)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [width])

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const { x, y, height, width } = imageRef?.current?.getBoundingClientRect()
    const centerPoint = { x: x + width / 2, y: y + height / 2 }
    const degreeX = (event.clientY - centerPoint.y) * 0.02
    const degreeY = (event.clientX - centerPoint.x) * -0.02

    imageRef.current.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`
  }

  return (
    <Container>
      <div className="flex justify-between items-center flex-wrap md:flex-no-wrap">
        <div>
          <h1 className="font-semibold text-3xl">
            Hey, I&apos;m <span className="font-bold">Adithya </span>
            <span role="img">👋</span>
          </h1>
          <p className="mt-5 w-full md:w-3/4 leading-7 poppins">
            A UX engineer from Bengaluru, helping companies of all sizes get
            ahead online. I am currently working on a DevOps and Analytics
            product at <span className="text-blue-800">Betsol</span>.
          </p>
          <div className="mt-6 mb-8 flex justify-start items-center">
            <Link href="/about">
              <a className="button_primary mr-5">About me</a>
            </Link>
            <Link href="/contact">
              <a className="button_outlined">Get in touch</a>
            </Link>
          </div>
          <div className="mb-5">
            <Socials />
          </div>
        </div>
        <div ref={imageRef} className="mx-auto">
          <img
            onMouseMove={handleMouseOver}
            src="/static/hero.svg"
            loading="eager"
            className="block mx-auto w-full sm:w-auto"
            alt="Hero image"
          />
        </div>
      </div>
      <img
        src="/static/gifs/scroll.gif"
        loading="eager"
        className={`mx-auto text-center w-1/6 ${gif ? '' : 'hidden'}`}
        alt="scroll down"
      />
    </Container>
  )
}
