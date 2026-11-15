/**
 * Recovers a transparent PNG from two opaque renders of the same art, one on
 * black and one on white. Over black a pixel is a·C; over white it is
 * a·C + (1 − a)·255, so a = 1 − (white − black) / 255 and C = black / a.
 * The Figma MCP only renders on an opaque background, hence the two passes.
 */
import sharp from 'sharp';

export async function loadRaw(file) {
  return sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
}

/** Mattes the [x0, y0, w, h] region of two loaded renders into RGBA. */
export function matte(black, white, [x0, y0, w, h]) {
  const W = black.info.width;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = ((y0 + y) * W + (x0 + x)) * 3;
      const o = (y * w + x) * 4;
      const d = white.data[i] - black.data[i] + white.data[i + 1] - black.data[i + 1] + white.data[i + 2] - black.data[i + 2];
      const a = Math.min(1, Math.max(0, 1 - d / (3 * 255)));
      for (let c = 0; c < 3; c++) out[o + c] = a > 0.004 ? Math.min(255, Math.round(black.data[i + c] / a)) : 0;
      out[o + 3] = Math.round(a * 255);
    }
  }
  return { data: out, width: w, height: h };
}

export function writePng({ data, width, height }, file) {
  return sharp(data, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(file);
}
