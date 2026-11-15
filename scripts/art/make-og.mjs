#!/usr/bin/env node
/**
 * Social preview cards (1200 x 630): the page's title in the site's own type
 * on paper, over a strip of that page's painting with a torn, inked edge.
 *
 *   node scripts/art/make-og.mjs
 *   → public/brand/og.png (home, and the default) and public/brand/og/<page>.png
 *
 * Scenes are composed with sharp (the home card uses the hero ride layers and
 * the KTM; About uses the hills game layers); the card itself is HTML rendered
 * by headless Chrome so the fonts are the real Young Serif and Onest.
 * Set CHROME to the browser binary if it isn't in the default macOS place.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1200;
const H = 630;
const STRIP = 330; // painting height on the card
const r = (p) => path.join(ROOT, p);

async function bike(left, top, width = 400) {
  const parts = ['shadow', 'wheelRear', 'wheelFront', 'body'];
  const bufs = await Promise.all(parts.map((p) => sharp(r(`src/assets/ride/bike-ktm-${p}.png`)).resize(width).toBuffer()));
  return bufs.map((input) => ({ input, left: Math.round(left), top: Math.round(top) }));
}

/** Home: the dawn ride at its opening frame, skyline and KTM. */
async function homeScene() {
  const L = { cloudsBack: 118, far: 160, cloudsFront: 241, duneFar: 321, duneMidPalms: 272, verge: 518, lamp: 316, lampLight: 197 };
  const layers = [];
  for (const [k, top] of Object.entries(L)) {
    const file = r(`src/assets/ride/dawn-${k}.png`);
    const m = await sharp(file).metadata();
    layers.push({ input: await sharp(file).extract({ left: 0, top: 0, width: 1440, height: m.height }).toBuffer(), left: 0, top, blend: k === 'lampLight' ? 'screen' : 'over' });
  }
  const img = await sharp(r('src/assets/ride/dawn-back.png'))
    .composite([...layers, ...(await bike(701, 313))])
    .png()
    .toBuffer();
  return { img, w: 1440, h: 640, focusY: 0.78 };
}

/** About: the misty hills with the little KTM on the road. */
async function aboutScene() {
  const road = JSON.parse(await fs.readFile(r('src/data/hills-road.json'), 'utf8'));
  const centre = (x) => (road.top[Math.round(x / road.step)] + road.bottom[Math.round(x / road.step)]) / 2;
  const layers = [];
  for (const k of ['far', 'fog', 'mid', 'trees', 'near', 'grass', 'road']) {
    const file = r(`src/assets/hills/${k}.png`);
    const m = await sharp(file).metadata();
    layers.push({ input: await sharp(file).extract({ left: 0, top: 0, width: 1440, height: m.height }).toBuffer(), left: 0, top: 0 });
  }
  const back = await sharp(r('src/assets/hills/back.png')).extend({ bottom: 60, background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const y = (centre(660) + centre(718)) / 2 - 59;
  const img = await sharp(back)
    .composite([...layers, ...(await bike(640, y, 96))])
    .png()
    .toBuffer();
  return { img, w: 1440, h: 480, focusY: 0.72 };
}

async function paintingScene(name, focusY) {
  const file = r(`src/assets/paintings/${name}.png`);
  const m = await sharp(file).metadata();
  return { img: await fs.readFile(file), w: m.width, h: m.height, focusY };
}

const CARDS = [
  { out: 'public/brand/og.png', scene: homeScene, title: 'I design and build software that feels <em>hand-made</em>.', sub: 'Adithya NR, product engineer in Abu Dhabi' },
  { out: 'public/brand/og/about.png', scene: aboutScene, title: 'The owner’s manual', sub: 'About Adithya NR, product engineer in Abu Dhabi' },
  { out: 'public/brand/og/work.png', scene: () => paintingScene('builds-garage', 0.62), title: 'Builds', sub: 'Things I’ve designed and shipped' },
  { out: 'public/brand/og/writing.png', scene: () => paintingScene('newsstand-night', 0.6), title: 'Writing', sub: 'Notes on building for the web' },
  { out: 'public/brand/og/photos.png', scene: () => paintingScene('darkroom', 0.4), title: 'Photos', sub: 'From trips and everyday life' },
  { out: 'public/brand/og/uses.png', scene: () => paintingScene('pegboard', 0.5), title: 'Uses', sub: 'The gear, apps, bikes and coffee I use' },
  { out: 'public/brand/og/contact.png', scene: () => paintingScene('contact-garage', 0.62), title: 'Leave a note', sub: 'Got a project or a question? Send me a note.' },
];

// A torn top edge for the strip: the same jag for every card.
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const edge = [];
for (let x = -10; x <= W + 10; x += 9) edge.push([x, 10 + Math.sin(x / 140) * 5 + (rnd() - 0.5) * 9]);
const edgePath = edge.map(([x, y]) => `${x},${y.toFixed(1)}`).join(' ');
const clip = `polygon(${edge.map(([x, y]) => `${x}px ${y.toFixed(1)}px`).join(', ')}, ${W + 10}px ${STRIP}px, -10px ${STRIP}px)`;

const font = async (f) => `data:font/woff2;base64,${(await fs.readFile(r(`public/fonts/${f}`))).toString('base64')}`;
const [youngSerif, onest] = await Promise.all([font('young-serif-latin.woff2'), font('onest-latin.woff2')]);
const mark = (await fs.readFile(r('public/brand/fennec-mark.svg'))).toString('base64');

function html({ title, sub }, sceneUrl, focusY) {
  return `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: 'Young Serif'; src: url(${youngSerif}) format('woff2'); }
@font-face { font-family: 'Onest'; src: url(${onest}) format('woff2'); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
html, body { width: ${W}px; height: ${H}px; background: #f3ead8; overflow: hidden; }
body { position: relative; font-family: Onest, sans-serif; color: #1c2124; -webkit-font-smoothing: antialiased; }
.top { position: absolute; left: 64px; right: 64px; top: 52px; }
.brand { display: flex; align-items: center; gap: 12px; font-size: 22px; font-weight: 500; color: #464b4d; }
.brand img { width: 44px; height: 44px; }
h1 { margin-top: 26px; max-width: 900px; font-family: 'Young Serif', serif; font-weight: 400; font-size: 60px; line-height: 1.08; letter-spacing: -0.01em; }
h1 em { font-style: normal; color: #e2560b; }
p { margin-top: 16px; font-size: 24px; color: #464b4d; }
.strip { position: absolute; left: 0; right: 0; bottom: 0; height: ${STRIP}px; }
.scene { position: absolute; inset: 0; clip-path: ${clip}; background: url(${sceneUrl}) center ${Math.round(focusY * 100)}% / cover no-repeat; }
svg { position: absolute; left: 0; top: 0; overflow: visible; }
</style>
<div class="top">
  <div class="brand"><img src="data:image/svg+xml;base64,${mark}" alt="">adithyabhat.com</div>
  <h1>${title}</h1>
  <p>${sub}</p>
</div>
<div class="strip">
  <div class="scene"></div>
  <svg width="${W}" height="30"><polyline points="${edgePath}" fill="none" stroke="#e2560b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>
</div>`;
}

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'og-'));
await fs.mkdir(r('public/brand/og'), { recursive: true });
for (const card of CARDS) {
  const scene = await card.scene();
  // Pre-scale the scene to the card width so Chrome only has to place it.
  const scaled = await sharp(scene.img).resize(W).png().toBuffer();
  const sceneUrl = `data:image/png;base64,${scaled.toString('base64')}`;
  const file = path.join(tmp, 'card.html');
  await fs.writeFile(file, html(card, sceneUrl, scene.focusY));
  const shot = path.join(tmp, 'card.png');
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${W},${H}`, '--virtual-time-budget=3000', `--user-data-dir=${path.join(tmp, 'profile')}`, `--screenshot=${shot}`, `file://${file}`], { stdio: 'ignore' });
  await sharp(shot).extract({ left: 0, top: 0, width: W, height: H }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(r(card.out));
  console.log('wrote', card.out);
}
await fs.rm(tmp, { recursive: true, force: true });
