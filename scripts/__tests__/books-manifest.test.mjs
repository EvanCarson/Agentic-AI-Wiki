// Validates every book manifest under src/content/books/<book>/manifest.ts.
// Pure Node: imports the manifest .ts directly (type-only imports are erased
// by --experimental-strip-types), so it does not exercise index.ts, which is
// covered by `npm run build`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const booksDir = fileURLToPath(new URL('../../src/content/books/', import.meta.url));
const KEBAB = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const bookDirs = readdirSync(booksDir, { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name).sort();

const bilingual = (v) => typeof v?.en === 'string' && v.en.trim() && typeof v?.zh === 'string' && v.zh.trim();

test('books: at least one book directory with a manifest', () => {
  assert.ok(bookDirs.length > 0, 'no book directories');
  for (const d of bookDirs) assert.ok(existsSync(`${booksDir}${d}/manifest.ts`), `${d}: missing manifest.ts`);
});

for (const dir of bookDirs) {
  test(`books/${dir}: manifest is well-shaped`, async () => {
    const book = (await import(pathToFileURL(`${booksDir}${dir}/manifest.ts`).href)).default;
    assert.ok(book, `${dir}: missing default export`);
    assert.equal(book.slug, dir, `${dir}: slug must equal its directory name`);
    assert.match(book.slug, KEBAB);
    for (const k of ['title', 'subtitle', 'pitch']) assert.ok(bilingual(book[k]), `${dir}: ${k} not bilingual`);
    assert.ok(Array.isArray(book.howToRead) && book.howToRead.length > 0, `${dir}: howToRead empty`);
    book.howToRead.forEach((h, i) => assert.ok(bilingual(h), `${dir}: howToRead[${i}] not bilingual`));
    assert.ok(Array.isArray(book.parts) && book.parts.length > 0, `${dir}: no parts`);

    const partKeys = new Set();
    const slugs = new Set();
    const numeric = [];
    for (const p of book.parts) {
      assert.match(p.key, KEBAB, `${dir}: bad part key ${p.key}`);
      assert.ok(!partKeys.has(p.key), `${dir}: duplicate part key ${p.key}`);
      partKeys.add(p.key);
      assert.ok(p.roman?.trim(), `${dir}/${p.key}: roman empty`);
      assert.ok(bilingual(p.name) && bilingual(p.audience), `${dir}/${p.key}: name/audience not bilingual`);
      assert.ok(p.chapters.length > 0, `${dir}/${p.key}: no chapters`);
      for (const c of p.chapters) {
        assert.match(c.slug, KEBAB, `${dir}: bad chapter slug ${c.slug}`);
        assert.ok(!slugs.has(c.slug), `${dir}: duplicate chapter slug ${c.slug}`);
        slugs.add(c.slug);
        assert.ok(bilingual(c.title) && bilingual(c.summary), `${dir}/${c.slug}: title/summary not bilingual`);
        assert.ok(['published', 'planned'].includes(c.status), `${dir}/${c.slug}: bad status ${c.status}`);
        if (/^\d+$/.test(c.num)) numeric.push(Number(c.num));
      }
    }
    // Numbered chapters run 1..N in reading order, across parts.
    assert.deepEqual(numeric, numeric.map((_, i) => i + 1), `${dir}: chapter numbers must be 1..N in order, got ${numeric.join(',')}`);
  });

  test(`books/${dir}: published chapters have both fragments; fragments have a published chapter`, async () => {
    const book = (await import(pathToFileURL(`${booksDir}${dir}/manifest.ts`).href)).default;
    const chapters = book.parts.flatMap(p => p.chapters);
    const published = new Set(chapters.filter(c => c.status === 'published').map(c => c.slug));
    for (const loc of ['en', 'zh']) {
      const fragDir = `${booksDir}${dir}/${loc}/`;
      for (const slug of published) {
        const f = `${fragDir}${slug}.html`;
        assert.ok(existsSync(f) && statSync(f).size >= 200, `${dir}: published chapter ${slug} missing ${loc} fragment`);
      }
      const files = existsSync(fragDir) ? readdirSync(fragDir).filter(f => f.endsWith('.html')) : [];
      for (const f of files) {
        assert.ok(published.has(f.slice(0, -5)), `${dir}/${loc}/${f}: fragment has no published chapter in the manifest`);
      }
    }
  });
}
