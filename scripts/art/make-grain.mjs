// Generates the tiny tileable paper-grain texture used by `.grain`.
import sharp from 'sharp';
const S = 160;
const px = Buffer.alloc(S * S * 4);
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
for (let i = 0; i < S * S; i++) {
  const v = 150 + Math.round(rnd() * 105);
  px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = v;
  px[i * 4 + 3] = Math.round(rnd() * 70);
}
await sharp(px, { raw: { width: S, height: S, channels: 4 } }).png({ palette: true, colours: 32 }).toFile('public/art/grain.png');
