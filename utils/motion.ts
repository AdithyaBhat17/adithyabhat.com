export const easing = [0.6, -0.05, 0.01, 0.99]

export const fadeInUp = {
  initial: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.4, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
}

export const fadeInRight = {
  initial: {
    x: -20,
    opacity: 0,
    transition: { duration: 0.4, ease: easing },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
  exit: {
    x: -20,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easing,
    },
  },
}

export const fadeInDown = {
  initial: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.4, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
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

export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}