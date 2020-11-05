import { useEffect } from 'react'

export default function useResetScroll() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}
