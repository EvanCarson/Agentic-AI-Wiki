import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Parse HTML, return [{ page, html }] for every <div class="page" data-page>. */
export function extractPages(htmlString) {
  const root = parse(htmlString, { comment: false });
  const nodes = root.querySelectorAll('div.page[data-page]');
  return nodes.map(n => ({
    page: n.getAttribute('data-page'),
    html: n.innerHTML,
  }));
}

function main() {
  const src = readFileSync(join(ROOT, 'legacy/agentic_ai_guide_1.html'), 'utf8');
  const pages = extractPages(src);
  const outDir = join(ROOT, 'src/content/field-guide');
  mkdirSync(outDir, { recursive: true });
  for (const { page, html } of pages) {
    writeFileSync(join(outDir, `${page}.html`), html.trim() + '\n');
  }
  console.log(`extracted ${pages.length} pages:`, pages.map(p => p.page).join(', '));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
