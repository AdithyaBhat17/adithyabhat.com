// The default social preview: the dawn hero painting with the fennec mark.
// node scripts/art/make-og.mjs  →  public/brand/og.png (1200 × 630)
import sharp from 'sharp';

const W = 1200, H = 630;
const art = sharp('src/assets/paintings/hero-dawn.png');
const { width, height } = await art.metadata();
// Cover-crop to 1200 × 630, keeping the bike (right of centre) in frame.
const scale = Math.max(W / width, H / height);
const sw = Math.round(width * scale), sh = Math.round(height * scale);
const left = Math.min(sw - W, Math.max(0, Math.round(sw * 0.62 - W / 2)));
const top = Math.round((sh - H) / 2);
const bg = await art.resize(sw, sh).extract({ left, top, width: W, height: H }).flatten({ background: '#F3EAD8' }).toBuffer();
// The KTM on the road, as on the hero (bikes are a separate layer there).
const bikeW = 440;
const bike = await sharp('src/assets/bikes/ktm-390-adventure.png').resize(bikeW).toBuffer();
const { height: bikeH } = await sharp(bike).metadata();
// Paper badge with the mark, top-left.
const badge = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="168" height="168"><circle cx="84" cy="84" r="80" fill="#F3EAD8" stroke="#1C2124" stroke-width="3"/></svg>`);
const mark = await sharp('public/brand/fennec-mark.svg', { density: 400 }).resize(112, 112, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp(bg)
  .composite([
    { input: bike, left: W - bikeW - 150, top: H - 78 - bikeH },
    { input: badge, left: 56, top: 56 },
    { input: mark, left: 56 + 28, top: 56 + 28 },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile('public/brand/og.png');
console.log('public/brand/og.png');
