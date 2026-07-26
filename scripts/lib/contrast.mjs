// scripts/lib/contrast.mjs
// Colour maths for the design-system tests.
//
// Two things this must get right, both learned from real failures:
//   1. Composite rgba() overlays. An ad-hoc scanner that skipped this
//      reported the Concepts reading-path chips at 1:1 when they are
//      actually 14.29:1 — a checker that cries wolf gets ignored.
//   2. Operate on *computed* values from a real browser, never CSS source.

/** Parse "rgb(r, g, b)" / "rgba(r, g, b, a)" / "#rrggbb" -> [r,g,b,a]. */
export function parseColor(str) {
  if (typeof str !== 'string') return null;
  const s = str.trim();
  if (s.startsWith('#')) {
    const h = s.length === 4
      ? '#' + [1, 2, 3].map((i) => s[i] + s[i]).join('')
      : s;
    return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(1);
  }
  const nums = s.match(/[\d.]+/g);
  if (!nums || nums.length < 3) return null;
  const [r, g, b] = nums.slice(0, 3).map(Number);
  const a = nums.length > 3 ? Number(nums[3]) : 1;
  return [r, g, b, a];
}

/**
 * Flatten a stack of colour layers into one opaque colour.
 * `layers` is ordered nearest-element-first (as collected walking up the
 * DOM); compositing runs bottom-up. Assumes white under everything, which
 * only matters if the page has no opaque background at all.
 */
export function composite(layers) {
  let base = [255, 255, 255];
  for (let i = layers.length - 1; i >= 0; i--) {
    const c = Array.isArray(layers[i]) ? layers[i] : parseColor(layers[i]);
    if (!c) continue;
    const a = c[3] ?? 1;
    base = [0, 1, 2].map((k) => c[k] * a + base[k] * (1 - a));
  }
  return base;
}

function relativeLuminance([r, g, b]) {
  const lin = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** WCAG contrast ratio. Accepts arrays or colour strings. */
export function contrastRatio(fg, bg) {
  const f = Array.isArray(fg) ? fg : parseColor(fg);
  const b = Array.isArray(bg) ? bg : parseColor(bg);
  const [hi, lo] = [relativeLuminance(f), relativeLuminance(b)].sort((x, y) => y - x);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}

/** WCAG AA threshold: 3:1 for large text, else 4.5:1. */
export function requiredRatio(px, fontWeight) {
  const bold = Number(fontWeight) >= 700;
  return px >= 24 || (px >= 18.66 && bold) ? 3 : 4.5;
}
