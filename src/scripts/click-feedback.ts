// Bubble click sound + haptic buzz on buttons and links.
// Disable per-element with `data-no-click-sound`, or globally with
// `localStorage.setItem('clickFeedback', 'off')`. Auto-disables when the user
// prefers reduced motion.

let ctx: AudioContext | null = null;
let bound = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function playBubble() {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, t0);
  osc.frequency.exponentialRampToValueAtTime(900, t0 + 0.085);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.2, t0 + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.085);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + 0.1);
}

function isEnabled(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (localStorage.getItem('clickFeedback') === 'off') return false;
  // Skip on the sound preview page so its buttons play their own samples.
  if (location.pathname.startsWith('/sounds')) return false;
  return true;
}

function shouldHandle(e: MouseEvent): HTMLElement | null {
  if (e.defaultPrevented) return null;
  if (e.button !== 0) return null;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const target = (e.target as Element | null)?.closest<HTMLElement>(
    'button, a[href], [role="button"]'
  );
  if (!target) return null;
  if (target.closest('[data-no-click-sound]')) return null;
  if (target.hasAttribute('disabled') || target.getAttribute('aria-disabled') === 'true') return null;
  return target;
}

export function initClickFeedback() {
  if (bound) return;
  bound = true;
  document.addEventListener(
    'click',
    (e) => {
      if (!isEnabled()) return;
      if (!shouldHandle(e)) return;
      playBubble();
      if ('vibrate' in navigator) navigator.vibrate(8);
    },
    { capture: true }
  );
}
