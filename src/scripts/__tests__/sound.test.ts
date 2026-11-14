// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('sound kit', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.documentElement.removeAttribute('data-sound');
  });

  it('is off by default', async () => {
    const { isSoundOn } = await import('../sound');
    expect(isSoundOn()).toBe(false);
  });

  it('never creates an AudioContext while sound is off', async () => {
    const Ctor = vi.fn();
    (window as unknown as { AudioContext: unknown }).AudioContext = Ctor;
    const { play } = await import('../sound');
    play('engine-ktm');
    play('tick');
    play('rustle');
    expect(Ctor).not.toHaveBeenCalled();
  });

  it('persists the choice and reflects it on <html>', async () => {
    (window as unknown as { AudioContext: unknown }).AudioContext = undefined;
    const { setSoundOn, isSoundOn } = await import('../sound');
    setSoundOn(true);
    expect(isSoundOn()).toBe(true);
    expect(document.documentElement.dataset.sound).toBe('on');
    setSoundOn(false);
    expect(isSoundOn()).toBe(false);
    expect(document.documentElement.dataset.sound).toBe('off');
  });

  it('ignores unknown sound names', async () => {
    const { play } = await import('../sound');
    expect(() => play('kazoo')).not.toThrow();
    expect(() => play(undefined)).not.toThrow();
  });
});
