export const easing = [0.6, -0.05, 0.01, 0.99]

export const fadeInUp = {
  initial: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
}

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}
