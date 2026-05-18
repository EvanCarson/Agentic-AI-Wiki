// Reusable Playwright screenshot capture.
// Usage:
//   node scripts/screenshot.mjs --base http://localhost:4321 --out docs/superpowers/screenshots/baseline
// Captures each target at desktop (1280x800) and mobile (390x844).
// Targets can be overridden by importing capture(); defaults are the
// current-site baseline set.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_TARGETS = [
  { url: '/',                      name: 'home-en' },
  { url: '/zh/',                   name: 'home-zh' },
  { url: '/field-guide',           name: 'field-guide-index' },
  { url: '/field-guide/llm-mental-model', name: 'field-guide-chapter' },
  { url: '/about',                 name: 'about-en' },
];

const VIEWPORTS = [
  { label: 'desktop', width: 1280, height: 800 },
  { label: 'mobile',  width: 390,  height: 844 },
];

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

export async function capture({ base, outDir, targets = DEFAULT_TARGETS, viewports = VIEWPORTS }) {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const saved = [];
  try {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      for (const t of targets) {
        const target = new URL(t.url, base).toString();
        await page.goto(target, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);
        const file = path.join(outDir, `${t.name}-${vp.label}.png`);
        await page.screenshot({ path: file, fullPage: true });
        saved.push(file);
        console.log(`saved ${file}`);
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
  return saved;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const base = arg('--base', 'http://localhost:4321');
  const outDir = arg('--out', 'docs/superpowers/screenshots/baseline');
  capture({ base, outDir }).then(
    (s) => { console.log(`done: ${s.length} screenshots`); },
    (e) => { console.error(e); process.exit(1); },
  );
}
