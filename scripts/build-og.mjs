// scripts/build-og.mjs
// Renders the 14 social-share OG cards (7 sections × en/zh) to public/og/.
// Run via `npm run og:build`. Idempotent: writes only when bytes change.
//
// Layout: Direction A — dark editorial card (see the spec).
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { OG_SECTIONS } from '../src/content/og.ts';
import { ogImageBasename } from '../src/lib/og.ts';
import { ui } from '../src/i18n/ui.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'public', 'og');
const FONT_DIR = resolve(ROOT, 'vendor', 'fonts');

const LOCALES = /** @type {const} */ (['en', 'zh']);
const WIDTH = 1200;
const HEIGHT = 630;
const MIN_BYTES = 20 * 1024;     // 20 KB lower band
const MAX_BYTES = 500 * 1024;    // 500 KB upper band

const FONTS = [
  { name: 'Fraunces',         file: 'Fraunces-Light.ttf',        weight: 300, style: 'normal' },
  { name: 'Inter',            file: 'Inter-Regular.otf',         weight: 400, style: 'normal' },
  { name: 'JetBrains Mono',   file: 'JetBrainsMono-Medium.ttf',  weight: 500, style: 'normal' },
  { name: 'Noto Sans SC',     file: 'NotoSansSC-Regular.otf',    weight: 400, style: 'normal' },
];

const INK = '#0a0a0a';
const PAPER = '#f4f1ea';
const PAPER_2 = '#ebe7dc';
const ACCENT = '#d4421e';

function loadFonts() {
  return FONTS.map((f) => ({
    name: f.name,
    data: readFileSync(resolve(FONT_DIR, f.file)),
    weight: f.weight,
    style: f.style,
  }));
}

function dot(opacity) {
  return {
    type: 'div',
    props: {
      style: {
        width: 24, height: 24, borderRadius: 12,
        background: ACCENT, opacity, marginLeft: opacity === 1 ? 0 : 16,
      },
    },
  };
}

/** Returns a Satori-shape virtual DOM node for one card. */
function renderCard({ name, tagline }) {
  // Tighter font size for longer strings so the 1200px width stays comfortable.
  const sectionFontSize = name.length >= 9 ? 144 : 168;
  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH, height: HEIGHT,
        background: INK, color: PAPER,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '88px 112px',
        fontFamily: 'Inter',
      },
      children: [
        // Top row: brand line + accent dots
        {
          type: 'div',
          props: {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'JetBrains Mono', fontSize: 24, fontWeight: 500,
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: PAPER_2,
                  },
                  children: 'Agentic AI Wiki',
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center' },
                  children: [dot(1), dot(0.6), dot(0.3)],
                },
              },
            ],
          },
        },
        // Middle: section name + accent rule
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Fraunces', fontSize: sectionFontSize, fontWeight: 300,
                    lineHeight: 1, letterSpacing: '-0.01em', color: PAPER,
                  },
                  children: name,
                },
              },
              {
                type: 'div',
                props: { style: { width: 112, height: 4, background: ACCENT, marginTop: 28 } },
              },
            ],
          },
        },
        // Bottom row: tagline + URL
        {
          type: 'div',
          props: {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontFamily: 'Inter', fontSize: 32, color: PAPER_2, maxWidth: 720, lineHeight: 1.45 },
                  children: tagline,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: PAPER_2, opacity: 0.85,
                  },
                  children: 'menuagentic.com',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

function writeIfChanged(path, bytes) {
  if (existsSync(path)) {
    const existing = readFileSync(path);
    if (existing.equals(bytes)) return { wrote: false };
  }
  writeFileSync(path, bytes);
  return { wrote: true };
}

function nameFor(section, locale) {
  if (section.key === 'default') return section.name[locale];
  // ui.<locale>.nav.<key>
  return ui[locale].nav[section.key];
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const fonts = loadFonts();
  const expected = new Set();
  let wroteCount = 0;

  for (const section of OG_SECTIONS) {
    for (const locale of LOCALES) {
      const name = nameFor(section, locale);
      const tagline = ui[locale].og.tagline;
      const basename = ogImageBasename(section.key, locale);
      const outPath = resolve(OUT_DIR, basename);
      expected.add(basename);

      const svg = await satori(renderCard({ name, tagline }), {
        width: WIDTH, height: HEIGHT, fonts,
      });
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();

      // PNG integrity assertions (in-process, hard-fail).
      if (png.length < MIN_BYTES) {
        throw new Error(`[og] ${basename} too small (${png.length} bytes < ${MIN_BYTES}) — likely blank render`);
      }
      if (png.length > MAX_BYTES) {
        throw new Error(`[og] ${basename} too large (${png.length} bytes > ${MAX_BYTES}) — font fallback explosion?`);
      }
      // PNG dimensions live in bytes 16..23 (big-endian uint32 width then height).
      const w = png.readUInt32BE(16);
      const h = png.readUInt32BE(20);
      if (w !== WIDTH || h !== HEIGHT) {
        throw new Error(`[og] ${basename} dims ${w}x${h} != ${WIDTH}x${HEIGHT}`);
      }

      const { wrote } = writeIfChanged(outPath, png);
      if (wrote) wroteCount++;
      console.log(`[og] ${basename} ${wrote ? 'wrote' : 'unchanged'} (${(png.length / 1024).toFixed(1)} KB)`);
    }
  }

  // Prune orphan PNGs that no longer have a section mapping.
  for (const f of readdirSync(OUT_DIR)) {
    if (f === '.DS_Store') continue;
    if (!expected.has(f)) {
      const stale = resolve(OUT_DIR, f);
      unlinkSync(stale);
      console.log(`[og] removed orphan ${f}`);
    }
  }

  console.log(`[og] done — ${expected.size} expected, ${wroteCount} updated this run`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
