// TEMPORARY diagnostic: what font does the design guard actually measure with?
// Prints, for a few known labels, the computed family/weight, the measured
// width, and which faces the document reports as loaded. Remove once answered.
import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';
import { startStaticServer } from './static-server.mjs';

console.log('dist/fonts:', readdirSync('dist/fonts').length, 'files;', readdirSync('dist/fonts').slice(0, 3).join(', '));

const TARGETS = [
  ['/blogs/cohere-vs-voyage-vs-jina-vs-qwen3-rerankers/', 'Qwen3-Reranker 0.6/4/8B'],
  ['/blogs/eval-harness-least-hardened-system/', '4 Aug — 19 unsanctioned'],
];

const server = await startStaticServer('dist');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

for (const [path, needle] of TARGETS) {
  const reqs = [];
  page.on('response', r => { if (r.url().includes('.woff2')) reqs.push(`${r.status()} ${r.url().split('/').pop()}`); });
  await page.goto(server.url + path, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = await page.evaluate(n => {
    const el = [...document.querySelectorAll('svg text, svg tspan')].find(t => t.textContent.trim().startsWith(n));
    const cs = el && getComputedStyle(el);
    const canvas = document.createElement('canvas').getContext('2d');
    canvas.font = '14px Inter';
    const interW = canvas.measureText('The quick brown fox').width;
    canvas.font = '14px sans-serif';
    const sansW = canvas.measureText('The quick brown fox').width;
    return {
      label: el ? { w: +el.getBBox().width.toFixed(1), family: cs.fontFamily.split(',')[0], weight: cs.fontWeight } : 'NOT FOUND',
      canvas: { inter: +interW.toFixed(1), sans: +sansW.toFixed(1), same: interW === sansW },
      faces: [...document.fonts].map(f => `${f.family}/${f.weight}=${f.status}`).join(' '),
    };
  }, needle.slice(0, 22));
  console.log(`\n${path}\n  label   ${JSON.stringify(out.label)}\n  canvas  ${JSON.stringify(out.canvas)}  <- same:true means Inter is NOT applied\n  faces   ${out.faces}\n  woff2   ${reqs.join(' | ') || 'NONE REQUESTED'}`);
}
await browser.close();
await server.close();
