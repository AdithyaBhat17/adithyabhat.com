/**
 * Hidden easter eggs scattered across the site.
 * Because every good portfolio needs a few secrets.
 */

// Konami Code: ↑↑↓↓←→←→BA
function initKonamiCode() {
  const sequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ]
  let progress = 0

  document.addEventListener('keydown', (e) => {
    if (e.key === sequence[progress]) {
      progress++
      if (progress === sequence.length) {
        activatePartyMode()
        progress = 0
      }
    } else {
      progress = 0
    }
  })
}

function activatePartyMode() {
  const colors = ['#f97316', '#ef4444', '#a855f7', '#3b82f6', '#10b981', '#eab308', '#ec4899']
  let index = 0
  const root = document.documentElement

  showToast('Party mode activated! 🎉🥳')

  const interval = setInterval(() => {
    root.style.setProperty('--accent', colors[index % colors.length])
    index++
  }, 200)

  setTimeout(() => {
    clearInterval(interval)
    root.style.removeProperty('--accent')
  }, 5000)
}

// Click the nav logo 7 times for a secret
function initLogoSecret() {
  let clicks = 0
  let timer: ReturnType<typeof setTimeout>

  document.addEventListener('click', (e) => {
    const logo = (e.target as HTMLElement).closest('.nav-logo')
    if (!logo) return

    clicks++
    clearTimeout(timer)
    timer = setTimeout(() => { clicks = 0 }, 2000)

    if (clicks >= 7) {
      e.preventDefault()
      clicks = 0

      const logoEl = logo as HTMLElement
      logoEl.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      logoEl.style.transform = 'rotate(720deg) scale(1.2)'
      setTimeout(() => {
        logoEl.style.transform = ''
      }, 1000)

      showToast('You found a secret! Nice detective work 🕵️')
    }
  })
}

function showToast(message: string) {
  const existing = document.querySelector('.easter-egg-toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.className = 'easter-egg-toast'
  toast.textContent = message
  document.body.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.add('is-visible')
  })

  setTimeout(() => {
    toast.classList.remove('is-visible')
    setTimeout(() => toast.remove(), 400)
  }, 3000)
}

// Styled console greeting
function printConsoleMessage() {
  console.log(
    '%c👋 Hey there, curious developer!',
    'font-size: 18px; font-weight: bold; color: #f97316; padding: 8px 0;',
  )
  console.log(
    '%cPeeking under the hood? Nice. Try the Konami Code... ↑↑↓↓←→←→BA',
    'font-size: 13px; color: #a1a1aa; padding: 4px 0;',
  )
  console.log(
    '%cBuilt with Astro, React, GSAP & a lot of coffee ☕',
    'font-size: 12px; color: #71717a; padding: 4px 0;',
  )
}

export function initEasterEggs() {
  initKonamiCode()
  initLogoSecret()
  printConsoleMessage()
}
