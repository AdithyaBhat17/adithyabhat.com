#!/usr/bin/env node
/**
 * Builds the looping layers for the home hero's endless ride.
 *
 * Source: the "Hero ride — loop strips (export)" frame on the Home page of
 * Figma file 990bO5GIGQbI6LmALf6XPL. It holds three sheets (dawn, night, bikes):
 *   - each scenery layer as a seamless strip (the layer plus a mirrored copy),
 *   - the far band as skyline | desert | mountains | desert,
 *   - each bike split into shadow, rear wheel, front wheel and body.
 *
 * Each sheet is rendered twice, on black and on white, and matted back to
 * transparency (see matte.mjs).
 *
 * Usage:
 *   node scripts/art/make-hero-ride.mjs <dir>
 * where <dir> holds {dawn,night,bikes}-{black,white}.png.
 * Writes src/assets/ride/*.png.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { loadRaw, matte, writePng } from './matte.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const SRC = path.resolve(process.argv[2] ?? '.');
const OUT = path.join(ROOT, 'src/assets/ride');

// [x, y, w, h] of each item on its sheet (from the Figma layout).
const SCENE = {
  back: [0, 0, 1440, 640],
  cloudsBack: [0, 660, 2880, 250],
  cloudsFront: [0, 930, 2880, 143],
  duneFar: [0, 1093, 2880, 319],
  duneMidPalms: [0, 1432, 2880, 368],
  verge: [0, 1820, 2880, 122],
  far: [0, 1962, 5760, 274],
  lamp: [0, 2256, 1440, 251],
  lampLight: [0, 2527, 1440, 389],
};
const BIKES = {};
['ktm', 'cb'].forEach((bike, b) =>
  ['shadow', 'wheelRear', 'wheelFront', 'body'].forEach((part, p) => {
    BIKES[`${bike}-${part}`] = [(b * 4 + p) * 420, 0, 400, 256];
  }),
);
const SHEETS = { dawn: SCENE, night: SCENE, bikes: BIKES };

await fs.mkdir(OUT, { recursive: true });
for (const [sheet, items] of Object.entries(SHEETS)) {
  const black = await loadRaw(path.join(SRC, `${sheet}-black.png`));
  const white = await loadRaw(path.join(SRC, `${sheet}-white.png`));
  for (const [name, box] of Object.entries(items)) {
    const file = path.join(OUT, sheet === 'bikes' ? `bike-${name}.png` : `${sheet}-${name}.png`);
    await writePng(matte(black, white, box), file);
    console.log('wrote', path.relative(ROOT, file), `${box[2]}x${box[3]}`);
  }
}
