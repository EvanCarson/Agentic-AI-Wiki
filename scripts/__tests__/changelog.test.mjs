// Validates every changelog entry file under src/content/changelog/entries/
// for the per-file authoring convention (one file per PR; aggregator globs
// them at build time). Runs in pure Node (with --experimental-strip-types
// loading the .ts entry files); does NOT exercise the Vite aggregator —
// that's covered by `npm run build`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const entriesDir = fileURLToPath(new URL('../../src/content/changelog/entries/', import.meta.url));
const files = readdirSync(entriesDir).filter(f => f.endsWith('.ts')).sort();

test('changelog: at least one entry file exists', () => {
  assert.ok(files.length > 0, `no entry files under ${entriesDir}`);
});

test('changelog: filenames are <YYYY-MM-DD>-<slug>.ts', () => {
  const re = /^\d{4}-\d{2}-\d{2}-[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.ts$/;
  for (const f of files) assert.match(f, re, `bad filename: ${f}`);
});

test('changelog: every entry has bilingual, well-shaped content', async () => {
  const seenKeys = new Set();
  for (const f of files) {
    const m = await import(pathToFileURL(entriesDir + f).href);
    const e = m.default;
    assert.ok(e, `${f}: missing default export`);
    assert.match(e.date, /^\d{4}-\d{2}-\d{2}$/, `${f}: invalid date ${e.date}`);
    // Filename date prefix must match the entry's `date` field — keeps sort honest.
    assert.equal(f.slice(0, 10), e.date, `${f}: filename date does not match entry date ${e.date}`);
    assert.ok(e.title?.en?.trim() && e.title?.zh?.trim(), `${f}: title must be bilingual and non-empty`);
    assert.ok(Array.isArray(e.items) && e.items.length > 0, `${f}: items must be a non-empty array`);
    for (const it of e.items) {
      assert.ok(it?.en?.trim() && it?.zh?.trim(), `${f}: every item must be bilingual and non-empty`);
    }
    // Filename is the uniqueness key — readdirSync already guarantees this on disk,
    // but assert defensively in case of case-only collisions on case-insensitive FS.
    const key = f.toLowerCase();
    assert.ok(!seenKeys.has(key), `${f}: duplicate filename (case-insensitive)`);
    seenKeys.add(key);
  }
});
