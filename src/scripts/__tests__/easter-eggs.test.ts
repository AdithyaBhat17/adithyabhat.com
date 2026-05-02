// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initEasterEggs } from '../easter-eggs';

beforeEach(() => {
  // Reset DOM between tests
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function pressKeys(keys: string[]) {
  keys.forEach((key) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key }));
  });
}

describe('initEasterEggs', () => {
  it('prints a console greeting', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    initEasterEggs();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('Hey there'),
      expect.any(String),
    );
    spy.mockRestore();
  });

  describe('Konami code', () => {
    it('shows a toast when the full sequence is entered', () => {
      initEasterEggs();
      const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a',
      ];
      pressKeys(konamiSequence);

      const toast = document.querySelector('.easter-egg-toast');
      expect(toast).not.toBeNull();
      expect(toast!.textContent).toContain('Party mode');
    });

    it('does not trigger on an incomplete sequence', () => {
      initEasterEggs();
      pressKeys(['ArrowUp', 'ArrowUp', 'ArrowDown', 'x']);

      const toast = document.querySelector('.easter-egg-toast');
      expect(toast).toBeNull();
    });
  });

  describe('logo secret', () => {
    it('shows a toast after 7 clicks on .nav-logo', () => {
      initEasterEggs();
      const logo = document.createElement('a');
      logo.className = 'nav-logo';
      document.body.appendChild(logo);

      for (let i = 0; i < 7; i++) {
        logo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      const toast = document.querySelector('.easter-egg-toast');
      expect(toast).not.toBeNull();
      expect(toast!.textContent).toContain('secret');
    });

    it('resets click count after timeout', () => {
      initEasterEggs();
      const logo = document.createElement('a');
      logo.className = 'nav-logo';
      document.body.appendChild(logo);

      for (let i = 0; i < 4; i++) {
        logo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      vi.advanceTimersByTime(3000);

      for (let i = 0; i < 4; i++) {
        logo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      const toast = document.querySelector('.easter-egg-toast');
      expect(toast).toBeNull();
    });
  });

  describe('toast', () => {
    it('auto-removes after delay', () => {
      initEasterEggs();
      pressKeys([
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a',
      ]);

      expect(document.querySelector('.easter-egg-toast')).not.toBeNull();

      // Toast fades out after 3s, removed after another 400ms
      vi.advanceTimersByTime(3400);
      expect(document.querySelector('.easter-egg-toast')).toBeNull();
    });
  });
});
