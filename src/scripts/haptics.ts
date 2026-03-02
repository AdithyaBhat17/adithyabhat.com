/**
 * Haptic feedback for mobile/tablet devices.
 *
 * Android: uses the Vibration API (navigator.vibrate).
 * iOS Safari 17.4+: exploits the <input type="checkbox" switch> element
 * which triggers native Taptic Engine feedback when toggled.
 *
 * Respects prefers-reduced-motion.
 */

let hapticLabel: HTMLLabelElement | null = null;
let domReady = false;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

const canVibrate =
  typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

/**
 * Create and persist the hidden switch checkbox used for iOS haptics.
 * The element lives in the DOM for the lifetime of the page.
 */
function ensureDOM(): void {
  if (domReady || typeof document === 'undefined') return;

  const id = 'haptic-switch';
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.ariaHidden = 'true';
  label.style.display = 'none';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.setAttribute('switch', '');
  input.id = id;
  input.style.all = 'initial';
  input.style.display = 'none';

  label.appendChild(input);
  document.body.appendChild(label);

  hapticLabel = label;
  domReady = true;
}

/** Single iOS haptic pulse by toggling the hidden switch. */
function iOSTap(): void {
  if (!hapticLabel) return;
  hapticLabel.click();
}

/**
 * Run a multi-pulse pattern on iOS by clicking the switch at timed intervals.
 * Each entry: { duration: ms, delay?: ms before this pulse }
 */
function iOSPattern(steps: { duration: number; delay?: number }[]): void {
  if (!hapticLabel) return;

  let elapsed = 0;

  for (const step of steps) {
    const offset = elapsed + (step.delay ?? 0);

    // Click at the start of each pulse
    if (offset === 0) {
      iOSTap();
    } else {
      setTimeout(() => iOSTap(), offset);
    }

    // For longer pulses, click repeatedly during the duration
    // to simulate a sustained vibration (one click per ~60ms)
    const clickInterval = 60;
    if (step.duration > clickInterval) {
      const clicks = Math.floor(step.duration / clickInterval);
      for (let i = 1; i <= clicks; i++) {
        const t = offset + i * clickInterval;
        setTimeout(() => iOSTap(), t);
      }
    }

    elapsed = offset + step.duration;
  }
}

// ── Public API ──────────────────────────────────────────────

export function tapFeedback(): void {
  if (prefersReducedMotion()) return;

  if (canVibrate) {
    navigator.vibrate(50);
    return;
  }

  ensureDOM();
  iOSTap();
}

export function mediumFeedback(): void {
  if (prefersReducedMotion()) return;

  if (canVibrate) {
    navigator.vibrate(80);
    return;
  }

  ensureDOM();
  iOSTap();
}

export function errorFeedback(): void {
  if (prefersReducedMotion()) return;

  if (canVibrate) {
    navigator.vibrate([50, 40, 50, 40, 50]);
    return;
  }

  ensureDOM();
  iOSPattern([
    { duration: 30 },
    { delay: 80, duration: 30 },
    { delay: 80, duration: 30 },
  ]);
}

export function successFeedback(): void {
  if (prefersReducedMotion()) return;

  if (canVibrate) {
    navigator.vibrate([50, 60, 40]);
    return;
  }

  ensureDOM();
  iOSPattern([
    { duration: 25 },
    { delay: 80, duration: 35 },
  ]);
}

// ── Event delegation ────────────────────────────────────────

const HAPTIC_SELECTORS = [
  '.btn-primary',
  '.btn-outlined',
  '#theme-toggle',
  '#theme-toggle-mobile',
  '#mobile-menu-btn',
  '#mobile-menu-close',
  '.menu-link',
  '#back-to-top',
  '[data-magnetic]',
].join(', ');

/**
 * Initialize global click-based haptics via event delegation.
 * Single listener on `document` covers all Astro-rendered buttons.
 */
export function initHaptics(): void {
  if ((document as any).__hapticsInit) return;
  (document as any).__hapticsInit = true;

  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(HAPTIC_SELECTORS)) {
      tapFeedback();
    }
  }, { passive: true });
}
