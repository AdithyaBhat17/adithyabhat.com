#!/usr/bin/env node
/**
 * Builds the layers for the About page's misty hills game.
 *
 * Source: the "Hills game — export sheet" frame on the About page of Figma
 * file 990bO5GIGQbI6LmALf6XPL. Each hills layer is a seamless 2880 strip (the
 * layer plus a mirrored copy), plus a grass band drawn for the game to fill
 * under the road; the fog sky, the overlay (ink edges, note and arrow) and the
 * torn mask are single 1440 frames. The scene is 480 tall: the torn bottom
 * edge sits 60px lower than in the original 420 painting so the road never
 * dips under it. Every item is rendered on
 * black and on white and matted back to transparency (see matte.mjs).
 *
 * It also measures the road: for every 4px column of the road strip, where the
 * asphalt starts and ends, so the bike can follow the road's curves.
 *
 * Usage:
 *   node scripts/art/make-hills-game.mjs <dir>
 * where <dir> holds <item>-{black,white}.png for each item below.
 * Writes src/assets/hills/*.png (the overlay also split into overlay-ink and
 * overlay-note) and src/data/hills-road.json.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadRaw, matte, writePng } from './matte.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const SRC = path.resolve(process.argv[2] ?? '.');
const OUT = path.join(ROOT, 'src/assets/hills');
const ITEMS = ['back', 'far', 'fog', 'mid', 'trees', 'near', 'grass', 'road', 'overlay', 'mask'];
const STEP = 4;

await fs.mkdir(OUT, { recursive: true });
let road = null;
for (const name of ITEMS) {
  const black = await loadRaw(path.join(SRC, `${name}-black.png`));
  const white = await loadRaw(path.join(SRC, `${name}-white.png`));
  const img = matte(black, white, [0, 0, black.info.width, black.info.height]);
  if (name === 'overlay') {
    await splitOverlay(img);
    continue;
  }
  await writePng(img, path.join(OUT, `${name}.png`));
  console.log('wrote', `src/assets/hills/${name}.png`, `${img.width}x${img.height}`);
  if (name === 'road') road = img;
}

// The note and its arrow fade out while you ride; the ink edges stay.
// NOTE is the box around them in the 1440x420 frame.
async function splitOverlay(img) {
  const NOTE = [800, 196, 300, 112];
  const [nx, ny, nw, nh] = NOTE;
  const ink = Buffer.from(img.data);
  for (let y = ny; y < ny + nh; y++) ink.fill(0, (y * img.width + nx) * 4, (y * img.width + nx + nw) * 4);
  await writePng({ data: ink, width: img.width, height: img.height }, path.join(OUT, 'overlay-ink.png'));
  const note = Buffer.alloc(nw * nh * 4);
  for (let y = 0; y < nh; y++) img.data.copy(note, y * nw * 4, ((ny + y) * img.width + nx) * 4, ((ny + y) * img.width + nx + nw) * 4);
  await writePng({ data: note, width: nw, height: nh }, path.join(OUT, 'overlay-note.png'));
  console.log('wrote src/assets/hills/overlay-{ink,note}.png, note box', NOTE.join(','));
}

// Road surface per column: the longest run of (mostly) opaque pixels.
const top = [];
const bottom = [];
for (let x = 0; x < road.width; x += STEP) {
  let best = [0, 0];
  let start = -1;
  for (let y = 0; y <= road.height; y++) {
    const a = y < road.height ? road.data[(y * road.width + x) * 4 + 3] : 0;
    if (a > 150 && start < 0) start = y;
    if ((a <= 150 || y === road.height) && start >= 0) {
      if (y - start > best[1] - best[0]) best = [start, y];
      start = -1;
    }
  }
  top.push(best[0]);
  bottom.push(best[1]);
}
const file = path.join(ROOT, 'src/data/hills-road.json');
await fs.writeFile(file, JSON.stringify({ period: road.width, step: STEP, top, bottom }) + '\n');
console.log('wrote src/data/hills-road.json', top.length, 'columns');
