// scripts/__tests__/blogs.test.mjs
// Validates every blog post file under src/content/blogs/posts/ for the
// one-file-per-post convention and that every registered post has bilingual
// HTML fragments. Mirrors changelog.test.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const postsDir = fileURLToPath(new URL('../../src/content/blogs/posts/', import.meta.url));
const enDir    = fileURLToPath(new URL('../../src/content/blogs/en/',    import.meta.url));
const zhDir    = fileURLToPath(new URL('../../src/content/blogs/zh/',    import.meta.url));
const files    = readdirSync(postsDir).filter(f => f.endsWith('.ts')).sort();

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const FILE_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\.ts$/;

test('blogs: at least one post file exists', () => {
  assert.ok(files.length > 0, `no post files under ${postsDir}`);
});

test('blogs: filenames are <YYYY-MM-DD>-<slug>.ts', () => {
  for (const f of files) assert.match(f, FILE_RE, `bad filename: ${f}`);
});

test('blogs: every post is well-shaped, bilingual, and has en+zh fragments', async () => {
  const seenSlugs = new Set();
  for (const f of files) {
    const m = await import(pathToFileURL(postsDir + f).href);
    const p = m.default;
    assert.ok(p, `${f}: missing default export`);

    const fileMatch = f.match(FILE_RE);
    assert.ok(fileMatch, `${f}: filename did not match expected pattern`);
    const [, fileDate, fileSlug] = fileMatch;

    assert.match(p.date, /^\d{4}-\d{2}-\d{2}$/, `${f}: invalid date ${p.date}`);
    assert.equal(p.date, fileDate, `${f}: filename date prefix (${fileDate}) must equal post.date (${p.date})`);

    assert.match(p.slug, SLUG_RE, `${f}: invalid slug ${p.slug}`);
    assert.equal(p.slug, fileSlug, `${f}: filename slug (${fileSlug}) must equal post.slug (${p.slug})`);
    assert.ok(!seenSlugs.has(p.slug), `${f}: duplicate slug ${p.slug}`);
    seenSlugs.add(p.slug);

    assert.ok(p.title?.en?.trim() && p.title?.zh?.trim(),     `${f}: title must be bilingual non-empty`);
    assert.ok(p.summary?.en?.trim() && p.summary?.zh?.trim(), `${f}: summary must be bilingual non-empty`);

    assert.ok(Array.isArray(p.tags) && p.tags.length > 0, `${f}: tags must be a non-empty array`);
    for (const t of p.tags) {
      assert.equal(typeof t, 'string', `${f}: tag must be a string`);
      assert.match(t, SLUG_RE, `${f}: tag "${t}" must be lowercase kebab-case`);
    }

    if (p.author !== undefined) {
      assert.ok(p.author.en?.trim() && p.author.zh?.trim(), `${f}: author override must be bilingual non-empty`);
    }

    assert.ok(existsSync(`${enDir}${p.slug}.html`), `${f}: missing en fragment for ${p.slug}`);
    assert.ok(existsSync(`${zhDir}${p.slug}.html`), `${f}: missing zh fragment for ${p.slug}`);
  }
});
