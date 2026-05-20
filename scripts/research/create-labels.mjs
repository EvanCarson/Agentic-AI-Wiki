// scripts/research/create-labels.mjs
// Idempotently create the 9 research labels. Each label is created if
// missing and edited if present, so running twice is safe.
//
// Usage: node scripts/research/create-labels.mjs
import { spawnSync } from 'node:child_process';

const LABELS = [
  { name: 'research',         color: 'cccccc', description: 'Discovery output, not yet committed work' },
  { name: 'tier/P0',          color: 'd73a4a', description: 'Must-have / next sprint' },
  { name: 'tier/P1',          color: 'fb8500', description: 'High value, scope first' },
  { name: 'tier/P2',          color: 'fde047', description: 'Backlog candidate' },
  { name: 'lens/ux-ia',       color: '1f77b4', description: 'Surfaced by IA/UX audit' },
  { name: 'lens/content',     color: '2ca02c', description: 'Surfaced by content audit' },
  { name: 'lens/competitor',  color: '9467bd', description: 'Borrowed from a peer site' },
  { name: 'lens/seo-perf',    color: '17becf', description: 'SEO / perf / a11y win' },
  { name: 'lens/engagement',  color: 'e377c2', description: 'Retention / engagement' },
];

function gh(args) {
  const r = spawnSync('gh', args, { encoding: 'utf8' });
  return { ok: r.status === 0, stdout: r.stdout, stderr: r.stderr };
}

for (const l of LABELS) {
  const create = gh(['label', 'create', l.name, '--color', l.color, '--description', l.description]);
  if (create.ok) {
    console.log(`created ${l.name}`);
    continue;
  }
  const edit = gh(['label', 'edit', l.name, '--color', l.color, '--description', l.description]);
  if (edit.ok) {
    console.log(`updated ${l.name}`);
  } else {
    console.error(`FAILED ${l.name}: ${create.stderr.trim()} / ${edit.stderr.trim()}`);
    process.exit(1);
  }
}
console.log(`done: ${LABELS.length} labels`);
