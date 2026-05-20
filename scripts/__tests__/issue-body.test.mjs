// scripts/__tests__/issue-body.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { composeIssueBody, composeUmbrellaBody, composeTitle } from '../research/issue-body.mjs';

const BRANCH = 'research/site-enhancements-2026-05-19';
const REPO = 'EvanCarson/Agentic-AI-Wiki';

const sampleIdea = {
  rank: 3,
  slug: 'prev-next-on-detail-pages',
  title: 'Add prev/next navigation on detail pages',
  tier: 'P0',
  lenses: ['ux-ia', 'engagement'],
  problem: 'Field Guide chapters and Concepts have ordered manifests but no in-page prev/next; readers must return to the index.',
  proposal: 'Render prev/next buttons in the detail-page footer using the existing manifest order.',
  evidence: 'NAVIGATION-PLAN.md P3 calls this out. Lilian Weng and Anthropic agent guide both have it.',
  impact: 'H',
  effort: 'S',
  risk: 'L',
  competitor_examples: ['https://lilianweng.github.io/', 'https://www.anthropic.com/research/building-effective-agents'],
  affected_pages: ['src/pages/field-guide/[chapter].astro', 'src/components/SectionDetailView.astro'],
  open_questions: ['Wrap-around at the section boundary, or stop?'],
};

test('composeTitle prefixes with tier', () => {
  assert.equal(composeTitle(sampleIdea), '[P0] Add prev/next navigation on detail pages');
});

test('composeIssueBody includes all required sections', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  for (const heading of ['## Problem', '## Proposal', '## Mockup', '## Evidence', '## Impact', '## Affected pages', '## Open questions']) {
    assert.ok(body.includes(heading), `missing section: ${heading}`);
  }
});

test('composeIssueBody embeds both desktop and mobile screenshot URLs against the branch', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  // Hyphen-separated to match scripts/screenshot.mjs `${name}-${label}.png` naming.
  const desktop = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/docs/research/mockups/screenshots/03-prev-next-on-detail-pages-desktop.png`;
  const mobile  = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/docs/research/mockups/screenshots/03-prev-next-on-detail-pages-mobile.png`;
  assert.ok(body.includes(desktop), 'missing desktop screenshot URL');
  assert.ok(body.includes(mobile),  'missing mobile screenshot URL');
});

test('composeIssueBody links to the HTML mockup via blob URL on branch', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  const blob = `https://github.com/${REPO}/blob/${BRANCH}/docs/research/mockups/03-prev-next-on-detail-pages.html`;
  assert.ok(body.includes(blob), 'missing HTML mockup blob URL');
});

test('composeIssueBody renders the I/E/R triple', () => {
  const body = composeIssueBody(sampleIdea, BRANCH, REPO);
  assert.match(body, /Impact:\s*\*\*H\*\*/);
  assert.match(body, /Effort:\s*\*\*S\*\*/);
  assert.match(body, /Risk:\s*\*\*L\*\*/);
});

test('composeUmbrellaBody groups ideas by tier with cross-refs', () => {
  const ideas = [
    { ...sampleIdea, rank: 1, tier: 'P0', issueNumber: 101 },
    { ...sampleIdea, rank: 2, tier: 'P1', issueNumber: 102, title: 'B', slug: 'b' },
    { ...sampleIdea, rank: 3, tier: 'P2', issueNumber: 103, title: 'C', slug: 'c' },
  ];
  const body = composeUmbrellaBody(ideas, BRANCH, REPO);
  assert.ok(body.includes('## P0'), 'missing P0 heading');
  assert.ok(body.includes('## P1'), 'missing P1 heading');
  assert.ok(body.includes('## P2'), 'missing P2 heading');
  assert.ok(body.includes('#101'), 'missing P0 issue ref');
  assert.ok(body.includes('#102'), 'missing P1 issue ref');
  assert.ok(body.includes('#103'), 'missing P2 issue ref');
});
