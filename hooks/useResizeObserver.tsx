import React from 'react'

interface WindowState {
  width?: number
  height?: number
}

export default function useResizeObserver() {
  const [windowSize, setWindowSize] = React.useState<WindowState>({
    width: undefined,
    height: undefined,
  })

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
