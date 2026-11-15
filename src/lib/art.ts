import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export interface LayerSources {
  w: number;
  h: number;
  avif: string;
  webp: string;
  src: string;
  sizes: string;
}

/**
 * AVIF + WebP srcsets for one layer of a full-bleed painting whose frame is
 * `frameW` Figma px wide. On desktop the layer shows at its share of the
 * viewport; on phones the painting is drawn at `mobileScale` px per Figma px.
 */
export async function layerSources(
  img: ImageMetadata,
  { frameW, mobileScale, quality = 58 }: { frameW: number; mobileScale: number; quality?: number },
): Promise<LayerSources> {
  const widths = [Math.round(img.width / 2), img.width];
  const [avif, webp] = await Promise.all([
    getImage({ src: img, widths, format: 'avif', quality }),
    getImage({ src: img, widths, format: 'webp', quality: 72 }),
  ]);
  return {
    w: img.width,
    h: img.height,
    avif: avif.srcSet.attribute,
    webp: webp.srcSet.attribute,
    src: webp.src,
    sizes: `(max-width: 767px) ${Math.round(img.width * mobileScale)}px, ${Math.round((img.width / frameW) * 100)}vw`,
  };
}
