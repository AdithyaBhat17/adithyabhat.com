#!/usr/bin/env node
/**
 * Composes the Garage Journal watercolor paintings from per-layer Figma renders.
 *
 * Why: the Figma paintings use TEXTURE / NOISE / INNER_SHADOW effects that are far
 * too expensive to ship as live SVG filters. Instead, each background layer is
 * rendered from Figma (get_screenshot on the layer node, which returns it in the
 * painting frame's coordinate space with its opacity baked in), then composited
 * here, clipped by the torn-paper mask, and written as a lossless master PNG into
 * src/assets/paintings/. Astro's <Picture> turns the masters into AVIF/WebP srcsets
 * at build time.
 *
 * Interactive things (prints, zines, napkins, signs, bikes) are NOT baked in: they
 * are real HTML / separate images layered on top so they can move.
 *
 * Usage:
 *   node scripts/art/compose-paintings.mjs [layersDir]
 *
 * layersDir defaults to $ART_LAYERS or ./art/layers. Each painting has a folder
 * with the files named below. The Figma node ID for every layer is in the
 * filename (e.g. 03-37_751 = node 37:751), so the set can be re-exported from
 * file 990bO5GIGQbI6LmALf6XPL at any time. Masters are 1x (1440 wide) because
 * the Figma MCP render caps at native size; drop 2x renders into the same folders
 * (same names) and the script scales the masks to match automatically.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const LAYERS = path.resolve(process.argv[2] ?? process.env.ART_LAYERS ?? path.join(ROOT, 'art/layers'));
const OUT = path.join(ROOT, 'src/assets/paintings');
const MASKS = path.join(ROOT, 'scripts/art/masks');

/**
 * frame: painting frame size (Figma px). mask: torn mask svg + its offset in the frame.
 * layers: bottom → top. blend defaults to 'over'.
 * outputs: { name: [layer file prefixes] } — each output is a separate masked PNG.
 */
const PAINTINGS = [
  {
    id: 'hero-dawn',
    frame: [1440, 640],
    mask: { file: 'hero.svg', x: -18, y: 105.49 },
    ink: { top: true, bottom: false },
    crops: { 'hero-dawn': [357, 1083] },
    outputs: {
      'hero-dawn': [
        '01-3_4', '02-3_7', '03-3_80', '04-3_83', '05-3_117', '06-3_123', '07-3_126',
        '08-3_148', '09-3_151', '10-3_154', '11-3_162', '12-3_165',
        ['13-3_182', 'screen'], '14-3_185', ['15-3_189', 'screen'],
      ],
    },
  },
  {
    id: 'hero-night',
    frame: [1440, 640],
    mask: { file: 'hero.svg', x: -18, y: 105.49 },
    crops: { 'hero-night': [357, 1083] },
    outputs: {
      'hero-night': [
        '01-36_592', '02-36_595', '03-36_668', '04-36_671', '05-36_706', '06-36_712', '07-36_715',
        '08-36_738', '09-36_741', '10-36_744', '11-36_752', '12-36_755',
        ['13-36_772', 'screen'], '14-36_775', ['15-36_779', 'screen'],
      ],
    },
  },
  {
    id: 'garage',
    frame: [1440, 660],
    mask: { file: 'garage.svg', x: -10, y: 10 },
    ink: { top: true, bottom: true },
    crops: { garage: [320, 800] },
    outputs: {
      garage: ['01-37_739', '02-37_741', ['03-37_751', 'screen'], '04-37_753', '05-37_759', '06-37_763', '07-37_768'],
    },
  },
  {
    id: 'route',
    frame: [1440, 720],
    mask: { file: 'route.svg', x: -10, y: 15.7 },
    ink: { top: true, bottom: true },
    outputs: {
      route: [
        '01-38_739', '02-38_741', '03-38_743', '04-38_773', '05-38_776', '06-38_778', '07-38_780',
        '08-38_782', '09-38_787', '10-38_791', '11-38_797', '12-38_803', '13-38_809',
      ],
    },
  },
  {
    // Mobile: the route is re-composed vertically, winding down the page.
    id: 'route-m',
    frame: [390, 1330],
    mask: { file: 'route-m.svg', x: -10, y: 16 },
    inkFiles: { top: ['route-m-ink-top.svg', -10, 15], bottom: ['route-m-ink-bottom.svg', -6, 1277] },
    outputs: {
      'route-m': [
        ['01-47_1237', 'over', 0, 16], ['02-47_1238', 'over', 39, 91], ['03-47_1239', 'over', 0, 64],
        ['04-47_1268', 'over', 94, 190], ['05-47_1274', 'over', 2, 202], ['06-47_1275', 'over', 0, 279],
        ['07-47_1276', 'over', 0, 510], ['08-47_1277', 'over', 0, 984], ['09-47_1281', 'over', 0, 355],
        ['10-47_1282', 'over', 118, 350], ['11-47_1287', 'over', 283, 606], ['12-47_1292', 'over', 101, 848],
        ['13-47_1297', 'over', 278, 1030],
      ],
    },
  },
  {
    id: 'newsstand',
    frame: [1440, 760],
    mask: { file: 'newsstand.svg', x: -10, y: 16.7 },
    ink: { top: true, bottom: true },
    crops: { newsstand: [340, 800] },
    outputs: {
      newsstand: ['01-39_915', '02-39_917', ['03-39_936', 'screen'], '04-39_938', '06-39_989', 'fg1-39_977', 'fg2-39_980'],
    },
  },
  {
    id: 'cafe',
    frame: [1440, 760],
    mask: { file: 'cafe.svg', x: -10, y: 10 },
    ink: { top: true, bottom: true },
    outputs: {
      cafe: ['01-38_986', ['02-38_1015', 'screen'], '03-38_1017'],
      // Espresso cups + pen sit above the napkins in the painting's z-order.
      'cafe-fg': ['fg1-38_1045', 'fg2-38_1060'],
    },
  },
  {
    // Mobile: a tall café table, notes stacked down it.
    id: 'cafe-m',
    frame: [390, 1680],
    mask: { file: 'cafe-m.svg', x: -15, y: 10 },
    unmasked: ['cafe-m-fg'], // carries the ink lines, which straddle the torn edge
    outputs: {
      'cafe-m': ['01-50_2053', ['02-50_2137', 'over', 0, 780], ['03-50_2166', 'over', 0, 1560], ['04-50_2082', 'screen'], '05-50_2084'],
      'cafe-m-fg': ['fg1-50_2092', 'fg2-50_2107', 'ink-50_2112'],
    },
  },
  {
    // About: the workbench under the service book.
    id: 'service',
    frame: [1440, 640],
    mask: { file: 'service.svg', x: -10, y: 12 },
    unmasked: ['service-fg'],
    outputs: {
      service: ['01-47_2062', '02-47_2089', '03-47_2092'],
      'service-fg': ['fg1-47_2101', 'ink-47_2104'],
    },
  },
  {
    id: 'footer',
    frame: [1440, 520],
    mask: null, // the sky layer carries its own torn shape
    outputs: {
      footer: [
        '01-33_873', '02-33_875', '03-32_398', '04-32_400', '05-32_402', '06-32_404', '07-32_411',
        ['08-32_414', 'screen'], ['09-32_416', 'screen'],
        // Instances render at their own bounds; [file, blend, left, top]
        ['bike1-32_418', 'over', 559, 258], ['bike2-32_568', 'over', 865, 282],
        '12-32_714',
      ],
    },
  },
];

async function maskBuffer(mask, w, h, scale) {
  const svg = await fs.readFile(path.join(MASKS, mask.file), 'utf8');
  const d = svg.match(/\sd="([^"]+)"/)[1];
  const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w / scale} ${h / scale}"><path transform="translate(${mask.x} ${mask.y})" d="${d}" fill="#fff"/></svg>`;
  return sharp(Buffer.from(out)).png().toBuffer();
}

/** Splits the torn mask outline into its top and bottom torn edges (frame coords). */
async function tornEdges(mask, ink) {
  const svg = await fs.readFile(path.join(MASKS, mask.file), 'utf8');
  const d = svg.match(/\sd="([^"]+)"/)[1];
  const pts = [...d.matchAll(/[ML]\s*([-\d.]+)[ ,]([-\d.]+)/g)].map((m) => [
    +(+m[1] + mask.x).toFixed(1),
    +(+m[2] + mask.y).toFixed(1),
  ]);
  const runs = [[pts[0]]];
  for (let i = 1; i < pts.length; i++) {
    const big = Math.abs(pts[i][1] - pts[i - 1][1]) > 120;
    if (big) runs.push([pts[i]]);
    else runs[runs.length - 1].push(pts[i]);
  }
  const toPath = (r) => 'M' + r.map(([x, y]) => `${x} ${y}`).join('L');
  const edges = {};
  if (ink?.top) edges.top = toPath(runs[0]);
  if (ink?.bottom && runs[1] && runs[1].length > 4) edges.bottom = toPath(runs[1]);
  return edges;
}

async function compose(p) {
  const dir = path.join(LAYERS, p.id);
  const results = {};
  for (const [name, layers] of Object.entries(p.outputs)) {
    const first = typeof layers[0] === 'string' ? layers[0] : layers[0][0];
    const meta = await sharp(path.join(dir, `${first}.png`)).metadata();
    const scale = p.scale ?? Math.max(1, Math.round(meta.width / p.frame[0]));
    const [w, h] = [Math.round(p.frame[0] * scale), Math.round(p.frame[1] * scale)];
    const comps = [];
    for (const l of layers) {
      const [file, blend = 'over', left, top] = typeof l === 'string' ? [l] : l;
      const input = path.join(dir, `${file}.png`);
      const c = { input, blend };
      if (left !== undefined) Object.assign(c, { left: Math.round(left * scale), top: Math.round(top * scale) });
      comps.push(c);
    }
    let img = sharp({ create: { width: w, height: h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite(comps)
      .png();
    let buf = await img.toBuffer();
    if (p.mask && !p.unmasked?.includes(name)) {
      const m = await maskBuffer(p.mask, w, h, scale);
      buf = await sharp(buf).composite([{ input: m, blend: 'dest-in' }]).png().toBuffer();
    }
    const outFile = path.join(OUT, `${name}.png`);
    await sharp(buf).png({ compressionLevel: 9, palette: false }).toFile(outFile);
    const st = await fs.stat(outFile);
    console.log(`${name}.png  ${w}x${h}  ${(st.size / 1024).toFixed(0)} KB`);
    // Art-directed mobile crop: [x, width] in frame px, full height.
    const crop = p.crops?.[name];
    if (crop) {
      const [cx, cw] = crop.map((v) => Math.round(v * scale));
      await sharp(buf).extract({ left: cx, top: 0, width: cw, height: h }).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${name}-m.png`));
      console.log(`${name}-m.png  ${cw}x${h}`);
    }
  }
  if (p.mask && p.ink) results.edges = await tornEdges(p.mask, p.ink);
  if (p.inkFiles) {
    results.edges = {};
    for (const [k, [file, x, y]] of Object.entries(p.inkFiles)) {
      const svg = await fs.readFile(path.join(MASKS, file), 'utf8');
      results.edges[k] = svg.match(/\sd="([^"]+)"/)[1];
      results.edges[`${k}T`] = `translate(${x} ${y})`;
    }
  }
  return results;
}

await fs.mkdir(OUT, { recursive: true });
const edges = {};
for (const p of PAINTINGS) {
  const r = await compose(p);
  if (r.edges) edges[p.id] = { w: p.frame[0], h: p.frame[1], ...r.edges };
}
await fs.writeFile(path.join(OUT, 'edges.json'), JSON.stringify(edges, null, 2) + '\n');
console.log('edges.json written');
