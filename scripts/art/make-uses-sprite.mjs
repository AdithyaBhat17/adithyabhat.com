// Slices the 64px Uses/Art/* tiles off a 2x render of the Uses components board
// (Figma 83:2013, exported as PNG at scale 2) into one sprite of 128px tiles:
// src/assets/art/uses-sprite.webp, plus an index. The page shows each tile at 40px.
// The painted tiles' SVG sources live in scripts/art/uses-art/.
import sharp from 'sharp';
import fs from 'node:fs/promises';

const [src = '/tmp/gj/uses-comps@2x.png'] = process.argv.slice(2);
const SCALE = 2; // render scale of `src`
const T = 64 * SCALE;
// [key, x, y] on the board, from Figma (1x units).
const TILES = [
  ['monitor', 120, 115], ['keyboard', 200, 115], ['mouse', 280, 115], ['design-tool', 680, 115], ['code-editor', 760, 115], ['terminal', 840, 115], ['git', 920, 115],
  ['ai-assistant', 40, 195], ['browser', 120, 195], ['launcher', 200, 195], ['screenshot', 280, 195], ['window-manager', 360, 195],
  ['system-monitor', 440, 195], ['notes', 520, 195], ['chat', 600, 195], ['tracker', 680, 195], ['helmet-airoh', 760, 195],
  ['perfume-imagination', 840, 195], ['perfume-hacivat', 920, 195], ['perfume-ombre-nomade', 40, 275], ['espresso-machine', 120, 275],
  ['moka-pot', 200, 275], ['dumbbell', 280, 275], ['watch-alpinist', 360, 275], ['watch', 520, 275],
  ['fitness-band', 600, 275], ['bottle', 680, 275], ['shoe', 760, 275], ['helmet', 840, 275],
  // Painted objects, one per product (the keys above this line are the earlier tiles; the line icons stay as fallbacks).
  ['laptop', 920, 275], ['monitor-lg', 40, 355], ['monitor-dell', 120, 355], ['keyboard-rainy75', 200, 355], ['keyboard-wd75', 280, 355],
  ['drive', 360, 355], ['tablet', 440, 355], ['headphones', 520, 355], ['mouse-mx-master', 600, 355], ['mouse-superlight', 680, 355],
  ['earbuds', 760, 355], ['phone', 840, 355], ['app-raycast', 920, 355], ['app-istat', 40, 435], ['app-dia', 120, 435],
  ['app-notion', 200, 435], ['app-figma', 280, 435], ['app-rex', 360, 435], ['app-slack', 440, 435], ['app-pi', 520, 435],
  ['app-claude-code', 600, 435], ['app-cleanshot', 680, 435], ['app-devrev', 760, 435], ['app-git', 840, 435], ['app-jira', 920, 435],
  ['app-linear', 40, 515], ['app-zed', 120, 515], ['watch-ssk036', 200, 515], ['watch-whoop', 280, 515], ['watch-instinct', 360, 515],
  ['watch-gshock', 440, 515], ['perfume-adg', 520, 515], ['perfume-aventus', 600, 515], ['perfume-eau-sauvage', 680, 515],
  ['perfume-dior-homme-sport', 760, 515], ['perfume-sauvage', 840, 515], ['perfume-afternoon-swim', 920, 515], ['perfume-dylan-blue', 40, 595],
  ['perfume-the-one', 120, 595], ['shoe-kayano-30', 200, 595], ['shoe-gel-nyc', 280, 595], ['shoe-nb-1000', 360, 595], ['shoe-vomero-5', 440, 595],
  ['shoe-velocity-nitro-4', 520, 595],
];
const COLS = 8;
const comps = await Promise.all(
  TILES.map(async ([, x, y], i) => ({
    input: await sharp(src).extract({ left: x * SCALE, top: y * SCALE, width: T, height: T }).png().toBuffer(),
    left: (i % COLS) * T,
    top: Math.floor(i / COLS) * T,
  })),
);
const rows = Math.ceil(TILES.length / COLS);
await sharp({ create: { width: COLS * T, height: rows * T, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(comps)
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile('src/assets/art/uses-sprite.webp');
const index = Object.fromEntries(TILES.map(([k], i) => [k, i]));
await fs.writeFile('src/data/uses-sprite.json', JSON.stringify({ cols: COLS, rows, index }, null, 2) + '\n');
console.log('sprite', COLS * T, 'x', rows * T);
