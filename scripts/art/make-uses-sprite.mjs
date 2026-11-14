// Slices the 64px Uses/Art/* tiles off a render of the Uses components board
// (Figma 83:2013) into one sprite: public/art/uses-sprite.webp, plus an index.
import sharp from 'sharp';
import fs from 'node:fs/promises';

const [src = '/tmp/gj/uses-comps.png'] = process.argv.slice(2);
// [key, x, y] on the board, from Figma.
const TILES = [
  ['laptop', 40, 115], ['monitor', 120, 115], ['keyboard', 200, 115], ['mouse', 280, 115], ['earbuds', 360, 115], ['phone', 440, 115],
  ['tablet', 520, 115], ['drive', 600, 115], ['design-tool', 680, 115], ['code-editor', 760, 115], ['terminal', 840, 115], ['git', 920, 115],
  ['ai-assistant', 40, 195], ['browser', 120, 195], ['launcher', 200, 195], ['screenshot', 280, 195], ['window-manager', 360, 195],
  ['system-monitor', 440, 195], ['notes', 520, 195], ['chat', 600, 195], ['tracker', 680, 195], ['helmet-airoh', 760, 195],
  ['perfume-imagination', 840, 195], ['perfume-hacivat', 920, 195], ['perfume-ombre-nomade', 40, 275], ['espresso-machine', 120, 275],
  ['moka-pot', 200, 275], ['dumbbell', 280, 275], ['watch-alpinist', 360, 275], ['headphones', 440, 275], ['watch', 520, 275],
  ['fitness-band', 600, 275], ['bottle', 680, 275], ['shoe', 760, 275], ['helmet', 840, 275],
];
const COLS = 8;
const comps = await Promise.all(
  TILES.map(async ([, x, y], i) => ({
    input: await sharp(src).extract({ left: x, top: y, width: 64, height: 64 }).png().toBuffer(),
    left: (i % COLS) * 64,
    top: Math.floor(i / COLS) * 64,
  })),
);
const rows = Math.ceil(TILES.length / COLS);
await sharp({ create: { width: COLS * 64, height: rows * 64, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(comps)
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile('public/art/uses-sprite.webp');
const index = Object.fromEntries(TILES.map(([k], i) => [k, i]));
await fs.writeFile('src/data/uses-sprite.json', JSON.stringify({ cols: COLS, rows, index }, null, 2) + '\n');
console.log('sprite', COLS * 64, 'x', rows * 64);
