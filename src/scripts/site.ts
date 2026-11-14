// Site-wide behaviour for the Garage Journal. One small module, no framework.
// Global listeners are bound once (event delegation); per-page work re-runs on
// every `astro:page-load` (initial load and each client-side navigation).

import { isSoundOn, play, setSoundOn, unlock } from './sound';

type Theme = 'light' | 'dark';

const html = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ------------------------------------------------------------------ theme */

function currentTheme(): Theme {
  return html.dataset.theme === 'dark' ? 'dark' : 'light';
}

function syncThemeControls() {
  const dark = currentTheme() === 'dark';
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(dark));
    b.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

// An irregular ink blot, used as a growing mask for the theme reveal.
const BLOT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 3c9 0 13 6 21 7s15 2 19 11-1 14 3 22 5 15-1 23-12 8-17 15-11 15-24 15-16-7-24-11-17-4-21-13 2-15-1-23-6-14-1-22 13-9 20-14S41 3 50 3z'/%3E%3C/svg%3E\")";

/** Make sure the target theme's paintings are decoded before the reveal. */
function warmArt(theme: Theme): Promise<void> {
  const imgs = [...document.querySelectorAll<HTMLImageElement>(`img[data-art="${theme === 'dark' ? 'night' : 'day'}"]`)];
  if (!imgs.length) return Promise.resolve();
  const jobs = imgs.map((img) => {
    img.loading = 'eager';
    return img.decode().catch(() => {});
  });
  const timeout = new Promise<void>((r) => window.setTimeout(r, 700));
  return Promise.race([Promise.all(jobs).then(() => {}), timeout]);
}

let switchTimer = 0;

export async function setTheme(next: Theme, origin?: { x: number; y: number }) {
  if (next === currentTheme()) return;
  await warmArt(next);
  html.classList.add('theme-switching');
  window.clearTimeout(switchTimer);
  switchTimer = window.setTimeout(() => html.classList.remove('theme-switching'), 1800);
  const apply = () => {
    html.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode */
    }
    syncThemeControls();
    document.dispatchEvent(new CustomEvent('journal:theme', { detail: next }));
  };

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
  };
  if (!doc.startViewTransition || reducedMotion.matches) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth - 60;
  const y = origin?.y ?? 32;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  html.classList.add('theme-vt');
  const vt = doc.startViewTransition(apply);
  vt.ready
    .then(() => {
      const end = r * 2.9; // the blot's inscribed circle is ~70% of its box
      html.animate(
        {
          maskImage: [BLOT, BLOT],
          webkitMaskImage: [BLOT, BLOT],
          maskRepeat: ['no-repeat', 'no-repeat'],
          webkitMaskRepeat: ['no-repeat', 'no-repeat'],
          maskSize: ['0px 0px', `${end}px ${end}px`],
          webkitMaskSize: ['0px 0px', `${end}px ${end}px`],
          maskPosition: [`${x}px ${y}px`, `${x - end / 2}px ${y - end / 2}px`],
          webkitMaskPosition: [`${x}px ${y}px`, `${x - end / 2}px ${y - end / 2}px`],
        } as unknown as Keyframe[],
        { duration: 820, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)', fill: 'both' },
      );
    })
    .catch(() => {});
  vt.finished.finally(() => html.classList.remove('theme-vt'));
}

/* ------------------------------------------------------------------ sound */

function syncSoundControls() {
  const on = html.dataset.sound === 'on';
  document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
    b.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on');
  });
}

/* ---------------------------------------------------------------- reveals */

let observer: IntersectionObserver | null = null;

function initReveals() {
  observer?.disconnect();
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-observe], .ink-stroke[data-draw]');
  if (!targets.length) return;
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add('is-in');
        observer?.unobserve(el);
        if (el.matches('[data-ink-in], [data-scratch]') || el.querySelector('[data-scratch]')) {
          window.setTimeout(() => play('scratch'), 380);
        }
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
  );
  targets.forEach((el) => observer!.observe(el));
}

/* --------------------------------------------------------------- per page */

function initShelf() {
  // Touch: tap an object to show its note (hover covers pointer devices).
  document.querySelectorAll<HTMLElement>('[data-shelf]').forEach((shelf) => {
    if (shelf.dataset.bound) return;
    shelf.dataset.bound = '1';
    shelf.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>('[data-shelf-item]');
      if (!item) return;
      shelf.querySelectorAll('[data-shelf-item].is-active').forEach((el) => el !== item && el.classList.remove('is-active'));
      item.classList.toggle('is-active');
    });
  });
}

/** After load, quietly fetch the other theme's art so toggling is instant. */
function prefetchOtherArt() {
  const other = currentTheme() === 'dark' ? 'day' : 'night';
  const run = () =>
    document.querySelectorAll<HTMLImageElement>(`img[data-art="${other}"]`).forEach((img) => {
      img.loading = 'eager';
    });
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (document.readyState === 'complete') (idle ? idle(run, { timeout: 5000 }) : window.setTimeout(run, 3000));
  else window.addEventListener('load', () => (idle ? idle(run, { timeout: 5000 }) : window.setTimeout(run, 3000)), { once: true });
}

function onPageLoad() {
  prefetchOtherArt();
  syncThemeControls();
  syncSoundControls();
  initReveals();
  initShelf();
}

/* ------------------------------------------------------------- one-time */

let started = false;

export function initSite() {
  if (started) return;
  started = true;

  // Keep theme/sound/js state when Astro swaps in the next page's <html>.
  document.addEventListener('astro:before-swap', (e) => {
    const next = (e as unknown as { newDocument: Document }).newDocument.documentElement;
    next.dataset.theme = html.dataset.theme;
    next.dataset.sound = html.dataset.sound;
    next.classList.add('js');
  });
  document.addEventListener('astro:before-preparation', () => play('rustle'));
  document.addEventListener('astro:page-load', onPageLoad);

  // A returning visitor with sound on: unlock audio on their first gesture.
  if (isSoundOn()) {
    const once = () => {
      unlock();
      window.removeEventListener('pointerdown', once, true);
      window.removeEventListener('keydown', once, true);
    };
    window.addEventListener('pointerdown', once, true);
    window.addEventListener('keydown', once, true);
  }

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const themeBtn = target.closest<HTMLElement>('[data-theme-toggle]');
    if (themeBtn) {
      const rect = themeBtn.getBoundingClientRect();
      const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
      // Each bike has its own voice: the CB300R rides in at night, the KTM at dawn.
      play(next === 'dark' ? 'engine-cb' : 'engine-ktm');
      void setTheme(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      return;
    }

    const soundBtn = target.closest<HTMLElement>('[data-sound-toggle]');
    if (soundBtn) {
      const on = html.dataset.sound !== 'on';
      setSoundOn(on);
      syncSoundControls();
      if (on) window.setTimeout(() => play('tick'), 30);
      return;
    }

    const clicky = target.closest<HTMLElement>('[data-sound-click]');
    if (clicky) play(clicky.dataset.soundClick);

    const bike = target.closest<HTMLElement>('[data-bike]');
    if (bike && !reducedMotion.matches) {
      bike.classList.remove('is-revving');
      void bike.offsetWidth;
      bike.classList.add('is-revving');
    }
  });

  // Hover sounds, delegated. pointerover bubbles; ignore moves within the same element.
  document.addEventListener('pointerover', (e) => {
    if ((e as PointerEvent).pointerType === 'touch') return;
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-sound-hover]');
    if (!el) return;
    const from = e.relatedTarget as Node | null;
    if (from && el.contains(from)) return;
    play(el.dataset.soundHover);
  });
  document.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement).closest?.<HTMLElement>('[data-sound-hover]');
    if (el && el.matches(':focus-visible')) play(el.dataset.soundHover);
  });

  // Follow the OS theme live, unless the visitor picked one.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {
      /* ignore */
    }
    if (!saved) void setTheme(e.matches ? 'dark' : 'light');
  });
}
