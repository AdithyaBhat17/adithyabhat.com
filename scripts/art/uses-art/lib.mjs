// Tiny helpers for hand-built 64px painted tiles. Everything is baked to
// absolute path data (no group transforms) so Figma imports it as plain vectors.
export const INK = '#1C2124';
const f = (n) => +n.toFixed(2);
const K = 0.5523;

export const ap = (m, x, y) => (m ? [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]] : [x, y]);
// yaw: turn a front-facing shape a little (shear y by x, squash x).
export const yaw = (cx, k, sx = 1) => [sx, k, 0, 1, cx - sx * cx, -k * cx];
export const rot = (deg, cx, cy, sx = 1, sy = 1) => {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return [c * sx, s * sx, -s * sy, c * sy, cx - (c * sx * cx - s * sy * cy), cy - (s * sx * cx + c * sy * cy)];
};
export const mul = (m2, m1) => [
  m2[0] * m1[0] + m2[2] * m1[1], m2[1] * m1[0] + m2[3] * m1[1],
  m2[0] * m1[2] + m2[2] * m1[3], m2[1] * m1[2] + m2[3] * m1[3],
  m2[0] * m1[4] + m2[2] * m1[5] + m2[4], m2[1] * m1[4] + m2[3] * m1[5] + m2[5],
];
export const move = (dx, dy) => [1, 0, 0, 1, dx, dy];
export const flipX = (cx) => [-1, 0, 0, 1, 2 * cx, 0];

// --- command builders -------------------------------------------------------
export const RR = (x, y, w, h, r = 0) => {
  r = Math.min(r, w / 2, h / 2);
  const k = r * K;
  if (!r) return [['M', x, y], ['L', x + w, y], ['L', x + w, y + h], ['L', x, y + h], ['Z']];
  return [
    ['M', x + r, y], ['L', x + w - r, y], ['C', x + w - r + k, y, x + w, y + r - k, x + w, y + r],
    ['L', x + w, y + h - r], ['C', x + w, y + h - r + k, x + w - r + k, y + h, x + w - r, y + h],
    ['L', x + r, y + h], ['C', x + r - k, y + h, x, y + h - r + k, x, y + h - r],
    ['L', x, y + r], ['C', x, y + r - k, x + r - k, y, x + r, y], ['Z'],
  ];
};
export const EL = (cx, cy, rx, ry = rx) => {
  const kx = rx * K, ky = ry * K;
  return [
    ['M', cx + rx, cy], ['C', cx + rx, cy + ky, cx + kx, cy + ry, cx, cy + ry],
    ['C', cx - kx, cy + ry, cx - rx, cy + ky, cx - rx, cy], ['C', cx - rx, cy - ky, cx - kx, cy - ry, cx, cy - ry],
    ['C', cx + kx, cy - ry, cx + rx, cy - ky, cx + rx, cy], ['Z'],
  ];
};
export const PG = (pts, close = true) => [...pts.map((p, i) => [i ? 'L' : 'M', p[0], p[1]]), ...(close ? [['Z']] : [])];
// Parse an absolute M/L/C/Q/Z path string into commands.
export const S = (d) => {
  const out = [];
  const re = /([MLCQZ])([^MLCQZ]*)/g;
  let mt;
  while ((mt = re.exec(d))) {
    const nums = (mt[2].match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number);
    const n = { M: 2, L: 2, C: 6, Q: 4, Z: 0 }[mt[1]];
    if (!n) out.push(['Z']);
    else for (let i = 0; i < nums.length; i += n) out.push([i && mt[1] === 'M' ? 'L' : mt[1], ...nums.slice(i, i + n)]);
  }
  return out;
};
export const D = (cmds, m) =>
  (typeof cmds === 'string' ? S(cmds) : cmds)
    .map((c) => {
      if (c[0] === 'Z') return 'Z';
      const o = [];
      for (let i = 1; i < c.length; i += 2) { const [X, Y] = ap(m, c[i], c[i + 1]); o.push(f(X), f(Y)); }
      return c[0] + o.join(' ');
    })
    .join('');

// Flatten to points (for hulls).
const flat = (cmds, m) => {
  const pts = [];
  let cur = [0, 0];
  for (const c of typeof cmds === 'string' ? S(cmds) : cmds) {
    if (c[0] === 'M' || c[0] === 'L') { cur = [c[1], c[2]]; pts.push(ap(m, ...cur)); }
    else if (c[0] === 'C' || c[0] === 'Q') {
      const p = c[0] === 'C' ? [cur, [c[1], c[2]], [c[3], c[4]], [c[5], c[6]]] : [cur, [cur[0] + (2 / 3) * (c[1] - cur[0]), cur[1] + (2 / 3) * (c[2] - cur[1])], [c[3] + (2 / 3) * (c[1] - c[3]), c[4] + (2 / 3) * (c[2] - c[4])], [c[3], c[4]]];
      for (let t = 0.1; t <= 1.001; t += 0.1) {
        const u = 1 - t;
        const x = u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0];
        const y = u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1];
        pts.push(ap(m, x, y));
      }
      cur = p[3];
    }
  }
  return pts;
};
// Convex hull of a shape swept by (dx, dy): the silhouette of an extruded slab.
export const HULL = (cmds, m, dx, dy) => {
  const a = flat(cmds, m);
  const pts = [...a, ...a.map(([x, y]) => [x + dx, y + dy])].sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  const cross = (o, p, q) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
  const lo = [], up = [];
  for (const p of pts) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (const p of pts.reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  const h = [...lo.slice(0, -1), ...up.slice(0, -1)];
  return h.map((p, i) => (i ? 'L' : 'M') + f(p[0]) + ' ' + f(p[1])).join('') + 'Z';
};

// --- element writers ---------------------------------------------------------
const attrs = (fill, o = {}) => {
  const s = o.s === undefined ? INK : o.s;
  const sw = o.sw ?? 0.6;
  return (
    `fill="${fill || 'none'}"` +
    (o.op != null ? ` fill-opacity="${o.op}"` : '') +
    (o.rule ? ` fill-rule="evenodd"` : '') +
    (s ? ` stroke="${s}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="${o.cap || 'round'}"` + (o.sop != null ? ` stroke-opacity="${o.sop}"` : '') : '')
  );
};
const dd = (d, m) => (typeof d === 'string' && !m && !/[MLCQZ]/.test(d[0]) ? d : typeof d === 'string' && !m ? d : D(d, m));
// outlined shape
export const P = (d, fill, o = {}) => `<path d="${dd(d, o.m)}" ${attrs(fill, o)}/>`;
// facet: no outline
export const F = (d, fill, op, m) => `<path d="${dd(d, m)}" ${attrs(fill, { s: null, op })}/>`;
// line
export const L = (d, stroke = INK, sw = 0.7, o = {}) => `<path d="${dd(d, o.m)}" ${attrs(null, { s: stroke, sw, ...o })}/>`;
export const SH = (cx, cy, rx, ry = 2.1) => `<path d="${D(EL(cx, cy, rx, ry))}" fill="#3a2e1f" fill-opacity="0.22"/>`;
// bilinear point/quad inside a quadrilateral [tl,tr,br,bl]
export const bq = (c, u, v) => {
  const t = [c[0][0] + (c[1][0] - c[0][0]) * u, c[0][1] + (c[1][1] - c[0][1]) * u];
  const b = [c[3][0] + (c[2][0] - c[3][0]) * u, c[3][1] + (c[2][1] - c[3][1]) * u];
  return [t[0] + (b[0] - t[0]) * v, t[1] + (b[1] - t[1]) * v];
};
export const bquad = (c, u0, v0, u1, v1) => PG([bq(c, u0, v0), bq(c, u1, v0), bq(c, u1, v1), bq(c, u0, v1)]);
export const svg = (inner, tile = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">${tile ? '<rect width="64" height="64" rx="10" fill="#E9DCC3"/>' : ''}${inner}</svg>`;
