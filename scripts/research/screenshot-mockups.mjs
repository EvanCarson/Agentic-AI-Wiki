// scripts/research/screenshot-mockups.mjs
// Render every docs/research/mockups/*.html at 1280x800 (desktop) and
// 390x844 (mobile), via the reusable `capture()` from scripts/screenshot.mjs.
//
// Usage: node scripts/research/screenshot-mockups.mjs
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { capture } from '../screenshot.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../');
const mockupsDir = path.join(repoRoot, 'docs/research/mockups');
const outDir = path.join(mockupsDir, 'screenshots');

const htmlFiles = readdirSync(mockupsDir)
  .filter(f => f.endsWith('.html'))
  .sort();

if (htmlFiles.length === 0) {
  console.error(`No .html files in ${mockupsDir}`);
  process.exit(1);
}

const targets = htmlFiles.map(f => ({
  url: pathToFileURL(path.join(mockupsDir, f)).toString(),
  name: f.replace(/\.html$/, ''),
}));

// capture() resolves `target.url` against `base` via `new URL(...)`. Since
// our urls are already absolute file:// URLs, `base` is effectively ignored.
await capture({ base: 'file:///', outDir, targets });
console.log(`done: ${htmlFiles.length * 2} screenshots`);
