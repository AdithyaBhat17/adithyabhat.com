import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
export default function useCustomInView() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.2 },
      }))
    }
  }, [inView])

  return { ref, inView, controls }
}
