// Garage Journal sound kit: tiny, synthesized, no audio files.
//
// Comes on with the visitor's first click or tap, unless they turned it off
// with the nav button before (that choice persists). The AudioContext is only
// ever created inside a click, so nothing can play before a user gesture. Everything runs through one bus: a gentle low-pass,
// a master gain, then a compressor acting as a limiter so stacked sounds never
// clip. Each sound is throttled on its own clock so hover storms stay quiet.
//
//   engine()   single-cylinder rev blip (KTM / CB300R voices): theme toggle, bikes
//   rustle()   paper sheet turning: page transitions
//   scratch()  pen nib on paper: hand notes inking in
//   chalk()    chalk tap: route signs
//   stamp()    rubber stamp thunk: build sheets
//   flick()    zine page flick: newsstand
//   tick()     watch escapement tick: nav hover
//   pour()     espresso hiss / coffee pour: the shelf's coffee things

export type SoundName = 'engine' | 'rustle' | 'scratch' | 'chalk' | 'stamp' | 'flick' | 'tick' | 'pour';

// The choice made with the sound button. (BaseLayout's head script migrates the
// old 'journal-sound' key into this one before anything reads it.)
const STORAGE_KEY = 'journal-sound-choice';
const THROTTLE: Record<SoundName, number> = {
  engine: 0.6,
  rustle: 0.35,
  scratch: 0.25,
  chalk: 0.12,
  stamp: 0.3,
  flick: 0.15,
  tick: 0.07,
  pour: 1.6,
};

let ctx: AudioContext | null = null;
let bus: GainNode | null = null;
let noise: AudioBuffer | null = null;
const last: Partial<Record<SoundName, number>> = {};

/** What the visitor picked with the sound button, or null if they never touched it. */
export function soundChoice(): 'on' | 'off' | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'on' || v === 'off' ? v : null;
  } catch {
    return null;
  }
}

/**
 * Must be called from a user gesture when turning sound on. `remember: false`
 * turns it on for this visit only (the first-click default), so it never
 * overrides a choice the visitor made with the button.
 */
export function setSoundOn(on: boolean, { remember = true } = {}): void {
  if (remember) {
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch {
      /* storage blocked: the choice just won't persist */
    }
  }
  document.documentElement.dataset.sound = on ? 'on' : 'off';
  if (on) {
    unlock();
  } else if (ctx && ctx.state === 'running') {
    void ctx.suspend();
  }
}

/** Creates/resumes the context. Only call from a user gesture. */
export function unlock(): void {
  if (typeof window === 'undefined') return;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor({ latencyHint: 'interactive' });

    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.knee.value = 6;
    limiter.ratio.value = 12;
    limiter.attack.value = 0.002;
    limiter.release.value = 0.12;

    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 9000;

    bus = ctx.createGain();
    bus.gain.value = 0.42;
    bus.connect(tone).connect(limiter).connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  prefetchEngines();
}

function getNoise(ac: AudioContext): AudioBuffer {
  if (noise) return noise;
  const len = Math.floor(ac.sampleRate * 2);
  noise = ac.createBuffer(1, len, ac.sampleRate);
  const d = noise.getChannelData(0);
  // Slightly pink-ish noise: smoother than white, less hiss.
  let b0 = 0;
  let b1 = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + w * 0.099046;
    b1 = 0.963 * b1 + w * 0.2965538;
    d[i] = (b0 + b1 + w * 0.1848) * 0.35;
  }
  return noise;
}

/** The context can still be starting inside the click that unlocked it; sounds
 *  scheduled meanwhile play as soon as it runs. */
function live(): boolean {
  if (!ctx || !bus || ctx.state === 'closed') return false;
  if (ctx.state === 'suspended') void ctx.resume();
  return true;
}

/** Returns the context only if sound is on, unlocked, and the throttle allows it. */
function ready(name: SoundName): AudioContext | null {
  if (!live() || !ctx) return null;
  if (document.documentElement.dataset.sound !== 'on') return null;
  const now = ctx.currentTime;
  if (now - (last[name] ?? -10) < THROTTLE[name]) return null;
  last[name] = now;
  return ctx;
}

function env(g: GainNode, t: number, peak: number, attack: number, decay: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
}

function noiseBurst(
  ac: AudioContext,
  t: number,
  opts: { type: BiquadFilterType; freq: number; q?: number; peak: number; attack: number; decay: number; offset?: number; rate?: number },
) {
  const src = ac.createBufferSource();
  src.buffer = getNoise(ac);
  src.playbackRate.value = opts.rate ?? 1;
  const f = ac.createBiquadFilter();
  f.type = opts.type;
  f.frequency.value = opts.freq;
  f.Q.value = opts.q ?? 0.8;
  const g = ac.createGain();
  env(g, t, opts.peak, opts.attack, opts.decay);
  src.connect(f).connect(g).connect(bus!);
  src.start(t, opts.offset ?? Math.random() * 1.5);
  src.stop(t + opts.attack + opts.decay + 0.05);
  return f;
}

/* ------------------------------------------------------ recorded engines
 * The synthesized blip never quite convinced, so the bikes use tiny CC0
 * recordings (BigSoundBank, see CREDITS.md), Opus with an AAC fallback.
 * They're fetched and decoded only once sound is switched on, cached as
 * AudioBuffers, and played through the same bus and limiter as everything else.
 */

/** Which recording each bike uses (both share clip C, BigSoundBank #281). */
export const ENGINE_SAMPLES: Record<EngineVoice, string> = { ktm: 'C-blip', cb: 'C-blip' };

const SAMPLE_BASE = '/sounds/engine/';
const samples = new Map<string, Promise<AudioBuffer | null>>();

function sampleExts(): string[] {
  const a = document.createElement('audio');
  const opus = a.canPlayType('audio/webm; codecs="opus"');
  return opus ? ['webm', 'm4a'] : ['m4a', 'webm'];
}

function loadSample(name: string): Promise<AudioBuffer | null> {
  if (!ctx) return Promise.resolve(null);
  const cached = samples.get(name);
  if (cached) return cached;
  const ac = ctx;
  const job = (async () => {
    for (const ext of sampleExts()) {
      try {
        const res = await fetch(`${SAMPLE_BASE}${name}.${ext}`);
        if (!res.ok) continue;
        return await ac.decodeAudioData(await res.arrayBuffer());
      } catch {
        /* try the other container */
      }
    }
    return null;
  })();
  samples.set(name, job);
  return job;
}

/** Warm the bikes' recordings (called once sound is on and unlocked). */
function prefetchEngines() {
  Object.values(ENGINE_SAMPLES).forEach((n) => void loadSample(n));
}

/** Plays a recorded engine. `force` skips the throttle (sound lab). */
export function engineSample(name: string, { level = 0.9, force = false } = {}): void {
  if (!live() || !ctx || !bus) return;
  if (document.documentElement.dataset.sound !== 'on') return;
  if (!force && !ready('engine')) return;
  const ac = ctx;
  const out = bus;
  void loadSample(name).then((buf) => {
    if (!buf) return;
    const src = ac.createBufferSource();
    src.buffer = buf;
    const g = ac.createGain();
    g.gain.value = level;
    src.connect(g).connect(out);
    src.start(ac.currentTime + 0.01);
  });
}

/** A bike's engine: its recording, or the synth if that can't load. */
export function engine(voice: EngineVoice = 'ktm'): void {
  if (!ready('engine')) return;
  const name = ENGINE_SAMPLES[voice];
  void loadSample(name).then((buf) => {
    if (buf) engineSample(name, { force: true });
    else {
      last.engine = -10;
      engineSynth(voice);
    }
  });
}

/* --------------------------------------------------------------- engines
 * A 4-stroke single is a train of sharp combustion pops ringing through an
 * exhaust resonance, with valve-train clatter on top. So: no continuous
 * oscillator. Each firing is scheduled as its own tiny event (granular),
 * at rpm / 120 per second, with a little jitter so it doesn't sound machined.
 */

export type EngineVoice = 'ktm' | 'cb';
export type EngineVariant = 'A1' | 'A2';

interface Voice {
  idle: number; // rpm
  peak: number; // rpm at the top of the blip
  exhaust: number; // main exhaust resonance (Hz)
  q: number;
  formant: number; // second, brighter formant (Hz)
  body: number; // level of the pitched thump in each pop
  mech: number; // valve-train/chain rattle level
  overrun: number; // number of crackly pops on the way down
  level: number;
}

const VOICES: Record<EngineVoice, Voice> = {
  // KTM 390 Adventure: higher idle, bright and raspy, crackles on the overrun.
  ktm: { idle: 1700, peak: 7000, exhaust: 280, q: 5, formant: 1050, body: 0.55, mech: 0.05, overrun: 3, level: 0.9 },
  // Honda CB300R: lower, rounder, smoother; fewer pops.
  cb: { idle: 1450, peak: 6200, exhaust: 170, q: 4, formant: 820, body: 0.7, mech: 0.03, overrun: 2, level: 0.85 },
};

let tanhCurve: Float32Array | null = null;
function softClip(ac: AudioContext): WaveShaperNode {
  if (!tanhCurve) {
    const n = 1024;
    tanhCurve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1;
      tanhCurve[i] = Math.tanh(2.4 * x) / Math.tanh(2.4);
    }
  }
  const ws = ac.createWaveShaper();
  ws.curve = tanhCurve as Float32Array<ArrayBuffer>;
  ws.oversample = '2x';
  return ws;
}

/** rpm over the blip: snap up, brief hold, fall back with a small dip below idle. */
function rpmAt(t: number, v: Voice): number {
  const { idle, peak } = v;
  if (t < 0.08) return idle;
  if (t < 0.33) {
    const k = (t - 0.08) / 0.25;
    return idle + (peak - idle) * (1 - Math.pow(1 - k, 3));
  }
  if (t < 0.42) return peak;
  if (t < 1.1) {
    const k = (t - 0.42) / 0.68;
    return peak - (peak - idle * 0.9) * (1 - Math.pow(1 - k, 2));
  }
  const k = Math.min(1, (t - 1.1) / 0.3);
  return idle * 0.9 + idle * 0.1 * k;
}

const jitter = (amount: number) => 1 + (Math.random() * 2 - 1) * amount;

/** Synthesized fallback (and the /sound-lab A1/A2 variants). */
export function engineSynth(voiceName: EngineVoice = 'ktm', variant: EngineVariant = 'A1'): void {
  const ac = ready('engine');
  if (!ac || !bus) return;
  const v = VOICES[voiceName];
  const t0 = ac.currentTime + 0.03;
  const dur = 1.45;
  const noiseBuf = getNoise(ac);

  // Exhaust: two resonances in parallel, then a soft clip and a level trim.
  const pops = ac.createGain();
  const exhaust = ac.createBiquadFilter();
  exhaust.type = 'bandpass';
  exhaust.frequency.value = v.exhaust;
  exhaust.Q.value = variant === 'A2' ? v.q * 1.4 : v.q;
  const formant = ac.createBiquadFilter();
  formant.type = 'bandpass';
  formant.frequency.value = v.formant;
  formant.Q.value = 3;
  const formantGain = ac.createGain();
  formantGain.gain.value = variant === 'A2' ? 0.22 : 0.45;
  const dry = ac.createGain();
  dry.gain.value = 0.18;
  const clip = softClip(ac);
  const out = ac.createGain();
  out.gain.value = v.level * 0.55;
  pops.connect(exhaust).connect(clip);
  pops.connect(formant).connect(formantGain).connect(clip);
  pops.connect(dry).connect(clip);
  clip.connect(out).connect(bus);

  // Mechanical layer: highpassed noise, gated on each firing.
  const mechSrc = ac.createBufferSource();
  mechSrc.buffer = noiseBuf;
  mechSrc.loop = true;
  const mechHp = ac.createBiquadFilter();
  mechHp.type = 'highpass';
  mechHp.frequency.value = 3200;
  const mechGate = ac.createGain();
  mechGate.gain.value = 0;
  mechSrc.connect(mechHp).connect(mechGate).connect(bus);
  mechSrc.start(t0, Math.random());
  mechSrc.stop(t0 + dur + 0.1);

  // Intake/exhaust whoosh that rises with rpm.
  const whoosh = ac.createBufferSource();
  whoosh.buffer = noiseBuf;
  whoosh.loop = true;
  const whooshLp = ac.createBiquadFilter();
  whooshLp.type = 'lowpass';
  const whooshGain = ac.createGain();
  const steps = 48;
  const freqCurve = new Float32Array(steps);
  const gainCurve = new Float32Array(steps);
  for (let i = 0; i < steps; i++) {
    const r = (rpmAt((i / (steps - 1)) * dur, v) - v.idle * 0.9) / (v.peak - v.idle * 0.9);
    freqCurve[i] = 300 + r * 1400;
    gainCurve[i] = 0.015 + r * 0.06;
  }
  whooshLp.frequency.setValueCurveAtTime(freqCurve, t0, dur);
  whooshGain.gain.setValueCurveAtTime(gainCurve, t0, dur);
  whoosh.connect(whooshLp).connect(whooshGain).connect(bus);
  whoosh.start(t0, Math.random());
  whoosh.stop(t0 + dur + 0.05);

  // The firing train.
  let t = 0;
  while (t < dur) {
    const rpm = rpmAt(t, v);
    const at = t0 + t;
    const onThrottle = t > 0.06 && t < 0.42;
    const level = (onThrottle ? 1 : 0.62) * jitter(0.05);

    // Combustion pop: a short noise burst...
    const n = ac.createBufferSource();
    n.buffer = noiseBuf;
    const ng = ac.createGain();
    const len = 0.006 + Math.random() * 0.006;
    ng.gain.setValueAtTime(0.0001, at);
    ng.gain.exponentialRampToValueAtTime(level, at + 0.0015);
    ng.gain.exponentialRampToValueAtTime(0.0001, at + len);
    n.connect(ng).connect(pops);
    n.start(at, Math.random() * 1.8);
    n.stop(at + len + 0.01);

    // ...plus a quick pitched thump for body.
    const o = ac.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(variant === 'A2' ? 150 : 180, at);
    o.frequency.exponentialRampToValueAtTime(60, at + 0.03);
    const og = ac.createGain();
    og.gain.setValueAtTime(0.0001, at);
    og.gain.exponentialRampToValueAtTime(level * v.body, at + 0.002);
    og.gain.exponentialRampToValueAtTime(0.0001, at + 0.04);
    o.connect(og).connect(pops);
    o.start(at);
    o.stop(at + 0.05);

    // Gate the valve-train rattle with the firing.
    mechGate.gain.setValueAtTime(v.mech * level, at);
    mechGate.gain.setTargetAtTime(0.0001, at + 0.004, 0.006);

    t += (120 / rpm) * jitter(0.04);
  }

  // Overrun: a few sharper, louder pops with crackle as the revs fall.
  for (let i = 0; i < v.overrun; i++) {
    const at = t0 + 0.55 + Math.random() * 0.45;
    const n = ac.createBufferSource();
    n.buffer = noiseBuf;
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = v.exhaust * 2.2;
    bp.Q.value = 2;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.5 * jitter(0.2), at + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.03);
    n.connect(bp).connect(g).connect(out);
    n.start(at, Math.random() * 1.8);
    n.stop(at + 0.05);
    // crackle
    for (let c = 0; c < 3; c++) {
      const ct = at + 0.01 + c * (0.008 + Math.random() * 0.01);
      noiseBurst(ac, ct, { type: 'highpass', freq: 4500, peak: 0.08 * jitter(0.3), attack: 0.0008, decay: 0.006 });
    }
  }
}

/** A sheet of paper turning: two soft bandpassed noise swells. */
export function rustle(): void {
  const ac = ready('rustle');
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  const f = noiseBurst(ac, t, { type: 'bandpass', freq: 2400, q: 0.7, peak: 0.16, attack: 0.05, decay: 0.22 });
  f.frequency.setValueAtTime(1800, t);
  f.frequency.exponentialRampToValueAtTime(4200, t + 0.2);
  noiseBurst(ac, t + 0.12, { type: 'highpass', freq: 3200, peak: 0.07, attack: 0.02, decay: 0.16 });
}

/** Pen nib scratch: a run of tiny high noise grains. */
export function scratch(): void {
  const ac = ready('scratch');
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  for (let i = 0; i < 7; i++) {
    const at = t + i * 0.045 + Math.random() * 0.015;
    noiseBurst(ac, at, { type: 'bandpass', freq: 3800 + Math.random() * 1800, q: 4, peak: 0.05 + Math.random() * 0.03, attack: 0.004, decay: 0.035 });
  }
}

/** Chalk tap on a board: a dry, short mid-high click. */
export function chalk(): void {
  const ac = ready('chalk');
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  noiseBurst(ac, t, { type: 'bandpass', freq: 2600, q: 2.5, peak: 0.16, attack: 0.002, decay: 0.05 });
  noiseBurst(ac, t + 0.012, { type: 'highpass', freq: 5000, peak: 0.05, attack: 0.002, decay: 0.03 });
}

/** Rubber stamp: a felt-damped low thump with a papery slap. */
export function stamp(): void {
  const ac = ready('stamp');
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.12);
  const g = ac.createGain();
  env(g, t, 0.55, 0.004, 0.16);
  osc.connect(g).connect(bus!);
  osc.start(t);
  osc.stop(t + 0.2);
  noiseBurst(ac, t, { type: 'lowpass', freq: 1400, peak: 0.22, attack: 0.002, decay: 0.07 });
}

/** Zine page flick: one quick bright swish. */
export function flick(): void {
  const ac = ready('flick');
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  const f = noiseBurst(ac, t, { type: 'bandpass', freq: 3000, q: 1.4, peak: 0.12, attack: 0.008, decay: 0.09 });
  f.frequency.setValueAtTime(5200, t);
  f.frequency.exponentialRampToValueAtTime(1800, t + 0.09);
}

/** Watch tick: the escapement's tick-tock, very small. */
export function tick(): void {
  const ac = ready('tick');
  if (!ac) return;
  const t = ac.currentTime + 0.003;
  noiseBurst(ac, t, { type: 'bandpass', freq: 5400, q: 9, peak: 0.07, attack: 0.001, decay: 0.012 });
  noiseBurst(ac, t + 0.03, { type: 'bandpass', freq: 3900, q: 9, peak: 0.045, attack: 0.001, decay: 0.012 });
}

/** Espresso hiss into a pour: steam noise then a gurgling low trickle. */
export function pour(): void {
  const ac = ready('pour');
  if (!ac) return;
  const t = ac.currentTime + 0.01;
  noiseBurst(ac, t, { type: 'highpass', freq: 4200, peak: 0.08, attack: 0.08, decay: 0.55 });
  const trickle = noiseBurst(ac, t + 0.35, { type: 'bandpass', freq: 700, q: 5, peak: 0.1, attack: 0.1, decay: 0.9 });
  // Bubbly wobble on the pour.
  const lfo = ac.createOscillator();
  lfo.frequency.value = 9;
  const depth = ac.createGain();
  depth.gain.value = 260;
  lfo.connect(depth).connect(trickle.frequency);
  lfo.start(t + 0.35);
  lfo.stop(t + 1.4);
}

const SOUNDS: Record<string, () => void> = {
  'engine-ktm': () => engine('ktm'),
  'engine-cb': () => engine('cb'),
  rustle,
  scratch,
  chalk,
  stamp,
  flick,
  tick,
  pour,
};

export function play(name: string | undefined | null): void {
  if (!name) return;
  const fn = SOUNDS[name];
  if (fn) fn();
}
