// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockOscillator = {
  type: 'sine',
  frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  connect: vi.fn().mockReturnThis(),
  start: vi.fn(),
  stop: vi.fn(),
};
const mockGain = {
  gain: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  connect: vi.fn(),
};

class MockAudioContext {
  currentTime = 0;
  state = 'running';
  destination = {};
  resume = vi.fn();
  createOscillator = vi.fn(() => mockOscillator);
  createGain = vi.fn(() => mockGain);
}

vi.stubGlobal('AudioContext', MockAudioContext);

function stubMatchMedia(reducedMotion = false) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: reducedMotion && query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

stubMatchMedia();

// Fresh module import per test to reset module-level state (ctx, bound)
let playClickFeedback: typeof import('../click-feedback').playClickFeedback;
let initClickFeedback: typeof import('../click-feedback').initClickFeedback;

beforeEach(async () => {
  vi.resetModules();
  localStorage.clear();
  const mod = await import('../click-feedback');
  playClickFeedback = mod.playClickFeedback;
  initClickFeedback = mod.initClickFeedback;
  mockOscillator.start.mockClear();
});

afterEach(() => {
  stubMatchMedia();
});

describe('playClickFeedback', () => {
  it('creates an oscillator and plays a sound', () => {
    playClickFeedback();
    expect(mockOscillator.start).toHaveBeenCalled();
  });

  it('does nothing when prefers-reduced-motion is active', async () => {
    stubMatchMedia(true);
    vi.resetModules();
    const mod = await import('../click-feedback');
    mockOscillator.start.mockClear();

    mod.playClickFeedback();
    expect(mockOscillator.start).not.toHaveBeenCalled();
  });

  it('does nothing when localStorage opt-out is set', () => {
    localStorage.setItem('clickFeedback', 'off');
    playClickFeedback();
    expect(mockOscillator.start).not.toHaveBeenCalled();
  });
});

describe('initClickFeedback', () => {
  it('plays sound on button click', () => {
    initClickFeedback();
    const btn = document.createElement('button');
    btn.textContent = 'Click me';
    document.body.appendChild(btn);

    btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));
    expect(mockOscillator.start).toHaveBeenCalled();
  });

  it('skips elements with data-no-click-sound', () => {
    initClickFeedback();
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-no-click-sound', '');
    const btn = document.createElement('button');
    btn.textContent = 'Muted';
    wrapper.appendChild(btn);
    document.body.appendChild(wrapper);

    btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));
    expect(mockOscillator.start).not.toHaveBeenCalled();
  });

  it('skips disabled buttons', () => {
    initClickFeedback();
    const btn = document.createElement('button');
    btn.textContent = 'Disabled';
    btn.setAttribute('disabled', '');
    document.body.appendChild(btn);

    btn.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0 }));
    expect(mockOscillator.start).not.toHaveBeenCalled();
  });
});
