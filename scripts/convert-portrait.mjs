// Convert source portrait images to optimized 4:5 WebP + JPG at multiple widths.
// Usage: node scripts/convert-portrait.mjs <slot-number> <source-path>
//   e.g. node scripts/convert-portrait.mjs 1 "C:/Users/Adithya NR/Downloads/IMG_2087.HEIC"
//
// Outputs to public/static/portrait/portrait-<slot>-{w}.{webp,jpg} for w in [480,720,960,1200].

import sharp from 'sharp';
import heicConvert from 'heic-convert';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public/static/portrait');
const WIDTHS = [480, 720, 960, 1200];
const RATIO = 4 / 5; // width / height target

function panic(msg) {
  console.error('error: ' + msg);
  process.exit(1);
}

const slot = process.argv[2];
const source = process.argv[3];
if (!slot || !source) panic('expected: <slot-number> <source-path>');
if (!existsSync(source)) panic('source not found: ' + source);

mkdirSync(OUT_DIR, { recursive: true });

// HEIC files: decode to JPEG buffer first via heic-convert (libheif WASM),
// since sharp's prebuilt Windows binary lacks the HEVC plugin.
let inputBuffer;
const ext = extname(source).toLowerCase();
if (ext === '.heic' || ext === '.heif') {
  console.log('decoding HEIC via libheif-wasm...');
  const raw = readFileSync(source);
  inputBuffer = await heicConvert({ buffer: raw, format: 'JPEG', quality: 1 });
} else {
  inputBuffer = readFileSync(source);
}

const meta = await sharp(inputBuffer).metadata();
console.log(`source: ${source} (${meta.width}x${meta.height}, ${meta.format})`);

// Largest 4:5 crop centered on original.
const sw = meta.width, sh = meta.height;
const targetH = sw / RATIO; // height for full-width 4:5
let cropW, cropH, left, top;
if (targetH <= sh) {
  cropW = sw;
  cropH = Math.round(targetH);
  left = 0;
  top = Math.round((sh - cropH) / 2);
} else {
  cropH = sh;
  cropW = Math.round(sh * RATIO);
  left = Math.round((sw - cropW) / 2);
  top = 0;
}

console.log(`crop: ${cropW}x${cropH} at (${left},${top})`);

// Run all width × format encodes in parallel. Sharp uses libvips' internal
// thread pool, so 8 concurrent pipelines on the same source buffer share work
// efficiently rather than oversubscribing.
await Promise.all(
  WIDTHS.flatMap((w) => {
    const h = Math.round(w / RATIO);
    const base = `${OUT_DIR}/portrait-${slot}-${w}`;
    const pipeline = () =>
      sharp(inputBuffer)
        .rotate()
        .extract({ left, top, width: cropW, height: cropH })
        .resize(w, h, { fit: 'cover', position: 'attention' });

    return [
      pipeline()
        .webp({ quality: 86, effort: 6 })
        .toFile(`${base}.webp`)
        .then(() => console.log(`  -> ${base}.webp (${w}x${h})`)),
      pipeline()
        .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toFile(`${base}.jpg`)
        .then(() => console.log(`  -> ${base}.jpg (${w}x${h})`)),
    ];
  })
);

console.log('done');
