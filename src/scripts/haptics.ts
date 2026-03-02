/**
 * Haptic feedback via the Vibration API.
 * Only fires on devices that support it (mobile/tablet).
 * Respects prefers-reduced-motion.
 */

type VibrationPattern = number | number[];

const patterns = {
  tap: 8,
  medium: 15,
  error: [0, 40, 30, 40] as number[],
  success: 12,
} as const;

function vibrate(pattern: VibrationPattern = patterns.tap): void {
  if (typeof navigator === 'undefined') return;
  if (!('vibrate' in navigator)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    navigator.vibrate(pattern);
  } catch {
    // Silently ignore — some browsers throw in certain contexts
  }
}

export function tapFeedback(): void {
  vibrate(patterns.tap);
}

export function mediumFeedback(): void {
  vibrate(patterns.medium);
}

export function errorFeedback(): void {
  vibrate(patterns.error);
}

export function successFeedback(): void {
  vibrate(patterns.success);
}

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
