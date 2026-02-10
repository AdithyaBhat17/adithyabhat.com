/**
 * Scroll-driven animation observer
 * Uses IntersectionObserver for lightweight fade/slide reveals
 * GSAP is loaded separately for complex sequences
 */

export function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]')
  if (!elements.length) return

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-visible'))
    return
  }

  // Set stagger indices for children inside [data-animate-stagger]
  document.querySelectorAll('[data-animate-stagger]').forEach((parent) => {
    const children = parent.querySelectorAll('[data-animate]')
    children.forEach((child, index) => {
      ;(child as HTMLElement).style.setProperty('--stagger-index', String(index))
    })
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  elements.forEach((el) => observer.observe(el))
}

/**
 * Initialize GSAP-powered animations for hero and complex sequences
 */
export async function initGSAPAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Hero entrance animation
  const heroTitle = document.querySelector('[data-hero-title]')
  const heroDesc = document.querySelector('[data-hero-description]')
  const heroCTA = document.querySelector('[data-hero-cta]')
  const heroImage = document.querySelector('[data-hero-image]')

  if (heroTitle) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(heroTitle, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    })

    if (heroDesc) {
      tl.from(heroDesc, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
    }
    if (heroCTA) {
      tl.from(heroCTA, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    }
    if (heroImage) {
      tl.from(heroImage, { x: 40, opacity: 0, duration: 0.8 }, '-=0.6')
    }
  }

  // Parallax floating for hero image
  if (heroImage) {
    gsap.to(heroImage, {
      y: -30,
      scrollTrigger: {
        trigger: heroImage,
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }

  // Card grid stagger on scroll
  document.querySelectorAll('[data-card-grid]').forEach((grid) => {
    const cards = grid.querySelectorAll('.card')
    if (!cards.length) return

    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
      },
    })
  })

  // Section heading parallax slide-in
  document.querySelectorAll('[data-section-heading]').forEach((heading) => {
    gsap.from(heading, {
      x: -30,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
      },
    })
  })
}
