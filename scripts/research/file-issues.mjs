// scripts/research/file-issues.mjs
// Load docs/research/ideas-final.json, file 20 per-idea issues, then
// one umbrella issue referencing all 20.
//
// Pre-requisites: labels exist (run create-labels.mjs first), research
// branch is pushed (so raw-content URLs resolve in issue bodies).
//
// Usage: node scripts/research/file-issues.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { composeTitle, composeIssueBody, composeUmbrellaBody } from './issue-body.mjs';

const REPO = 'EvanCarson/Agentic-AI-Wiki';
const BRANCH = 'research/site-enhancements-2026-05-19';
const ideas = JSON.parse(readFileSync('docs/research/ideas-final.json', 'utf8'));

if (!Array.isArray(ideas) || ideas.length !== 20) {
  console.error(`expected 20 ideas, got ${ideas?.length}`);
  process.exit(1);
}

function ghCreate(title, body, labels) {
  const args = ['issue', 'create', '--repo', REPO, '--title', title, '--body', body];
  for (const l of labels) { args.push('--label', l); }
  const r = spawnSync('gh', args, { encoding: 'utf8' });
  if (r.status !== 0) {
    console.error(`gh issue create failed: ${r.stderr}`);
    process.exit(1);
  }
  const url = r.stdout.trim().split('\n').pop();
  const num = Number(url.split('/').pop());
  return { url, num };
}

ideas.sort((a, b) => a.rank - b.rank);

for (const idea of ideas) {
  const labels = ['research', `tier/${idea.tier}`, ...idea.lenses.map(l => `lens/${l}`)];
  const { url, num } = ghCreate(composeTitle(idea), composeIssueBody(idea, BRANCH, REPO), labels);
  idea.issueNumber = num;
  idea.issueUrl = url;
  console.log(`#${num} — ${idea.title}`);
}

writeFileSync('docs/research/ideas-final.json', JSON.stringify(ideas, null, 2) + '\n');

const umbrella = ghCreate(
  `Site enhancement research — 20 ideas, ranked (2026-05-19)`,
  composeUmbrellaBody(ideas, BRANCH, REPO),
  ['research'],
);
console.log(`umbrella: ${umbrella.url}`);

writeFileSync('docs/research/REPORT.md', composeUmbrellaBody(ideas, BRANCH, REPO));
console.log('wrote docs/research/REPORT.md');
