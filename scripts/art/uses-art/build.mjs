// Builds the painted Uses tiles from desk.mjs, software.mjs and wear.mjs.
// Writes one 64px SVG per art key to scripts/art/uses-art/svg/ (these are what
// gets imported into Figma as the Uses/Art/<key> components) and a preview sheet.
//
//   node scripts/art/uses-art/build.mjs [preview.png]
//   ONLY=phone,drive Z=6 node scripts/art/uses-art/build.mjs   (preview a few, bigger)
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { svg } from './lib.mjs';
import desk from './desk.mjs';
import software from './software.mjs';
import wear from './wear.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const [out = '/tmp/uses-art-preview.png'] = process.argv.slice(2);
const art = { ...desk, ...software, ...wear };
fs.mkdirSync(path.join(here, 'svg'), { recursive: true });
for (const k of Object.keys(art)) fs.writeFileSync(path.join(here, 'svg', `${k}.svg`), svg(art[k]) + '\n');

const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
const keys = Object.keys(art).filter((k) => !only || only.includes(k));
const Z = +(process.env.Z || 3), COLS = +(process.env.COLS || 9), T = 64 * Z, G = 8;
const comps = [];
for (const [i, k] of keys.entries()) {
  const big = await sharp(Buffer.from(svg(art[k], true)), { density: 72 * Z }).resize(T, T).png().toBuffer();
  comps.push({ input: big, left: G + (i % COLS) * (T + G), top: G + Math.floor(i / COLS) * (T + G) });
}
const H = G + Math.ceil(keys.length / COLS) * (T + G);
// the size they render at on the page
for (const [i, k] of keys.entries()) {
  const small = await sharp(Buffer.from(svg(art[k], true)), { density: 72 * 4 }).resize(40, 40).png().toBuffer();
  comps.push({ input: small, left: G + i * 48, top: H + 4 });
}
await sharp({ create: { width: Math.max(G + COLS * (T + G), G + keys.length * 48), height: H + 52, channels: 3, background: '#F2EADA' } }).composite(comps).png().toFile(out);
console.log(`${Object.keys(art).length} svgs written, preview of ${keys.length} at ${out}`);
