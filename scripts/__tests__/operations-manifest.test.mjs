// Validates every Deep-Dive group file under src/content/operations/groups/
// for the per-file authoring convention (one file per group; aggregator globs
// them at build time). Runs in pure Node (with --experimental-strip-types
// loading the .ts group files); does NOT exercise the Vite aggregator —
// that's covered by `npm run build`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const groupsDir = fileURLToPath(new URL('../../src/content/operations/groups/', import.meta.url));
const fragEnDir = fileURLToPath(new URL('../../src/content/operations/en/', import.meta.url));
const fragZhDir = fileURLToPath(new URL('../../src/content/operations/zh/', import.meta.url));
const files = readdirSync(groupsDir).filter(f => f.endsWith('.ts')).sort();

test('operations: at least one group file exists', () => {
  assert.ok(files.length > 0, `no group files under ${groupsDir}`);
});

test('operations: filenames are <kebab-key>.ts', () => {
  const re = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.ts$/;
  for (const f of files) assert.match(f, re, `bad group filename: ${f}`);
});

test('operations: every group file is well-shaped and entries match HTML fragments', async () => {
  const keys = new Set();
  const orders = new Map();   // order -> file (for duplicate detection)
  const slugs = new Set();    // global entry slug uniqueness across groups
  for (const f of files) {
    const m = await import(pathToFileURL(groupsDir + f).href);
    const g = m.default;
    assert.ok(g, `${f}: missing default export`);
    // filename basename === key
    assert.equal(f.slice(0, -3), g.key, `${f}: filename basename must equal group.key (${g.key})`);
    assert.match(g.key, /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, `${f}: invalid key ${g.key}`);
    assert.equal(typeof g.order, 'number', `${f}: order must be a number`);
    assert.ok(Number.isFinite(g.order), `${f}: order must be finite`);
    assert.ok(g.name?.en?.trim() && g.name?.zh?.trim(), `${f}: name must be bilingual non-empty`);
    assert.ok(g.groupSummary?.en?.trim() && g.groupSummary?.zh?.trim(), `${f}: groupSummary must be bilingual non-empty`);
    assert.ok(Array.isArray(g.entries) && g.entries.length > 0, `${f}: entries must be non-empty array`);

    // unique key
    assert.ok(!keys.has(g.key), `${f}: duplicate group key ${g.key}`);
    keys.add(g.key);
    // warn on duplicate order (allowed by aggregator — falls back to key — but signals an intent collision)
    if (orders.has(g.order)) {
      assert.fail(`${f}: order ${g.order} collides with ${orders.get(g.order)} — pick a unique number with gaps`);
    }
    orders.set(g.order, f);

    for (const e of g.entries) {
      assert.equal(e.page, e.slug, `${g.key}/${e.slug}: page must equal slug`);
      assert.match(e.slug, /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, `${g.key}/${e.slug}: invalid slug`);
      assert.ok(e.title?.en?.trim() && e.title?.zh?.trim(), `${g.key}/${e.slug}: title not bilingual`);
      assert.ok(e.summary?.en?.trim() && e.summary?.zh?.trim(), `${g.key}/${e.slug}: summary not bilingual`);
      // The aggregator inflates `group` from the parent — group files MUST NOT set it themselves.
      assert.ok(!('group' in e), `${g.key}/${e.slug}: do not set 'group' in entries — the aggregator inflates it from the parent group's name`);
      // Global slug uniqueness (catches an entry accidentally living in two groups)
      assert.ok(!slugs.has(e.slug), `duplicate entry slug across groups: ${e.slug}`);
      slugs.add(e.slug);
      // The bilingual HTML fragments must exist for every registered entry.
      assert.ok(existsSync(`${fragEnDir}${e.slug}.html`), `${g.key}/${e.slug}: missing en fragment`);
      assert.ok(existsSync(`${fragZhDir}${e.slug}.html`), `${g.key}/${e.slug}: missing zh fragment`);
    }
  }
});
