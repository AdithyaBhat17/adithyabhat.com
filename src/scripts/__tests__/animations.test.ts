// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initScrollAnimations } from '../animations';

let observerCallback: IntersectionObserverCallback;
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe = mockObserve;
  unobserve = mockUnobserve;
  disconnect = vi.fn();
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

function stubMatchMedia(reducedMotion = false) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reducedMotion && query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

stubMatchMedia();

beforeEach(() => {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  mockObserve.mockClear();
  mockUnobserve.mockClear();
});

afterEach(() => {
  stubMatchMedia();
});

describe('initScrollAnimations', () => {
  it('does nothing when no [data-animate] elements exist', () => {
    initScrollAnimations();
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('observes all [data-animate] elements', () => {
    const el1 = document.createElement('div');
    el1.setAttribute('data-animate', '');
    const el2 = document.createElement('div');
    el2.setAttribute('data-animate', '');
    document.body.appendChild(el1);
    document.body.appendChild(el2);

    initScrollAnimations();
    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it('adds is-visible and unobserves when element intersects', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    initScrollAnimations();

    observerCallback(
      [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(el.classList.contains('is-visible')).toBe(true);
    expect(mockUnobserve).toHaveBeenCalledWith(el);
  });

  it('does not add is-visible when not intersecting', () => {
    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    initScrollAnimations();

    observerCallback(
      [{ isIntersecting: false, target: el } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(el.classList.contains('is-visible')).toBe(false);
  });

  it('assigns stagger indices to children of [data-animate-stagger]', () => {
    const parent = document.createElement('div');
    parent.setAttribute('data-animate-stagger', '');
    const child0 = document.createElement('div');
    child0.setAttribute('data-animate', '');
    const child1 = document.createElement('div');
    child1.setAttribute('data-animate', '');
    parent.appendChild(child0);
    parent.appendChild(child1);
    document.body.appendChild(parent);

    initScrollAnimations();

    expect(child0.style.getPropertyValue('--stagger-index')).toBe('0');
    expect(child1.style.getPropertyValue('--stagger-index')).toBe('1');
  });

  it('immediately shows all elements when prefers-reduced-motion is active', () => {
    stubMatchMedia(true);

    const el = document.createElement('div');
    el.setAttribute('data-animate', '');
    document.body.appendChild(el);

    initScrollAnimations();

    expect(el.classList.contains('is-visible')).toBe(true);
    expect(mockObserve).not.toHaveBeenCalled();
  });
});
