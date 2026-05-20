// scripts/research/issue-body.mjs
// Pure functions: build markdown for per-idea + umbrella research issues.
// No I/O, no `gh` calls — easy to unit-test.

function pad2(n) { return String(n).padStart(2, '0'); }

function mockupPaths(idea) {
  // Hyphen suffix matches scripts/screenshot.mjs `${name}-${label}.png`.
  const stem = `${pad2(idea.rank)}-${idea.slug}`;
  return {
    html: `docs/research/mockups/${stem}.html`,
    desktopPng: `docs/research/mockups/screenshots/${stem}-desktop.png`,
    mobilePng:  `docs/research/mockups/screenshots/${stem}-mobile.png`,
  };
}

function rawUrl(repo, branch, path) {
  return `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
}

function blobUrl(repo, branch, path) {
  return `https://github.com/${repo}/blob/${branch}/${path}`;
}

export function composeTitle(idea) {
  return `[${idea.tier}] ${idea.title}`;
}

export function composeIssueBody(idea, branch, repo) {
  const paths = mockupPaths(idea);
  const lenses = idea.lenses.map(l => `\`lens/${l}\``).join(', ');
  const competitors = (idea.competitor_examples ?? []).length
    ? idea.competitor_examples.map(c => `- ${c.startsWith('http') ? `<${c}>` : c}`).join('\n')
    : '_None cited._';
  const affected = (idea.affected_pages ?? []).length
    ? idea.affected_pages.map(p => `- \`${p}\``).join('\n')
    : '_TBD during scoping._';
  const questions = (idea.open_questions ?? []).length
    ? idea.open_questions.map(q => `- ${q}`).join('\n')
    : '_None._';

  return `> Research idea ${pad2(idea.rank)}/20 · Tier **${idea.tier}** · Lenses: ${lenses}

## Problem

${idea.problem}

## Proposal

${idea.proposal}

## Mockup

Desktop:

![desktop mockup](${rawUrl(repo, branch, paths.desktopPng)})

Mobile:

![mobile mockup](${rawUrl(repo, branch, paths.mobilePng)})

Live preview (HTML, branch-pinned): ${blobUrl(repo, branch, paths.html)}

## Evidence & competitor refs

${idea.evidence}

${competitors}

## Impact / Effort / Risk

- Impact: **${idea.impact}**
- Effort: **${idea.effort}**
- Risk: **${idea.risk}**

## Affected pages

${affected}

## Open questions

${questions}

---

_Filed by the 2026-05-19 multi-lens research pass. See umbrella issue for the full ranked list._
`;
}

export function composeUmbrellaBody(ideas, branch, repo) {
  const byTier = { P0: [], P1: [], P2: [] };
  for (const i of ideas) byTier[i.tier].push(i);

  const line = (i) => `- #${i.issueNumber} — **${i.title}** — ${i.problem.split('. ')[0].slice(0, 120)}.`;
  const block = (tier, label) => {
    if (byTier[tier].length === 0) return `## ${tier} — ${label}\n\n_None._\n`;
    return `## ${tier} — ${label}\n\n${byTier[tier].map(line).join('\n')}\n`;
  };

  return `# Site enhancement research — 20 ideas, ranked

Methodology: five parallel research agents (UX/IA, content, competitor scan, SEO/perf/a11y, engagement) each produced 5–7 idea cards; output was deduped, scored, and tiered into P0/P1/P2.

Artifacts on branch \`${branch}\`:

- Spec: ${blobUrl(repo, branch, 'docs/superpowers/specs/2026-05-19-site-enhancement-research-design.md')}
- Plan: ${blobUrl(repo, branch, 'docs/superpowers/plans/2026-05-19-site-enhancement-research.md')}
- Mockups: ${blobUrl(repo, branch, 'docs/research/mockups')}
- Raw agent reports: ${blobUrl(repo, branch, 'docs/research/raw')}

${block('P0', 'Must-have')}
${block('P1', 'High value')}
${block('P2', 'Nice-to-have')}
---

_This umbrella issue is the entry point. Each P-tagged issue links its mockups directly; close issues individually as they ship or as \`wontfix\`._
`;
}
