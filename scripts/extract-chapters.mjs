import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const OUT_DIR = join(ROOT, 'src/content/field-guide/en');

/** Parse HTML, return [{ page, html }] for every <div> with class "page" and a data-page attribute. Strips dead legacy .page-nav blocks. */
export function extractPages(htmlString) {
  const root = parse(htmlString, { comment: true });
  const nodes = root.querySelectorAll('div.page[data-page]');
  return nodes.map(n => {
    n.querySelectorAll('.page-nav').forEach(el => el.remove());
    return { page: n.getAttribute('data-page'), html: n.innerHTML };
  });
}

function main() {
  const src = readFileSync(join(ROOT, 'legacy/agentic_ai_guide_1.html'), 'utf8');
  const pages = extractPages(src);
  mkdirSync(OUT_DIR, { recursive: true });
  for (const { page, html } of pages) {
    writeFileSync(join(OUT_DIR, `${page}.html`), html.trim() + '\n');
  }
  console.log(`extracted ${pages.length} pages:`, pages.map(p => p.page).join(', '));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
