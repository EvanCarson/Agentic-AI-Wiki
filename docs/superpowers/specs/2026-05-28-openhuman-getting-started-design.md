# Design: "Getting Started with OpenHuman" — AI Blog post

**Date:** 2026-05-28
**Status:** Approved (pending spec review)
**Author:** AI agent (brainstormed with site owner)

## Goal

Add one standalone AI Blog post: a **hands-on getting-started guide** for
OpenHuman. It takes a reader from install to their first useful answer, then
explains how the agent builds context. It is the practical, doer-oriented
companion to the existing architecture-comparison post
(`openclaw-vs-openhuman-vs-hermes-agent`, 2026-05-26), not a re-tread of it.

**Slug:** `getting-started-with-openhuman`
**Post date:** `2026-05-28` (bump to the real merge day before push, per the
date-prefix rule in `CLAUDE.md` / `AUTHORING.md`).

## Why this post

The comparison post profiles OpenHuman's architecture against two rivals. It
does not tell a reader how to actually install and run it. This post fills that
gap and captures OpenHuman's current state, which has moved since the
comparison was written (see "Source of truth" — version and star count both
changed materially).

## Source of truth (verified 2026-05-28)

All facts below come from the official repo
(`github.com/tinyhumansai/openhuman`), its README, the GitBook docs
(`tinyhumans.gitbook.io/openhuman`), and the GitHub Releases API. **Do not
invent install commands, URLs, version numbers, or pricing.** If a detail is
not below and not on those sources, omit it or mark it as "verify on the site"
rather than guessing.

- **Identity:** OpenHuman by TinyHumans. Tagline: "Your Personal AI super
  intelligence. Private, Simple and extremely powerful." Creator: @senamakel.
- **License:** GPL-3.0.
- **Version:** v0.56.0, released 2026-05-27. Status badge: **Early Beta**
  ("Under active development. Expect rough edges.").
- **Traction:** ~29.2k GitHub stars as of 2026-05-28 (was 7.8k in the
  comparison post dated 2026-05-26 — strong growth; cite the current number
  and note the trajectory).
- **Platforms:** macOS, Windows, Linux desktops.
- **System requirements:** 4 GB RAM minimum; 16 GB+ recommended for large
  mailboxes/repos or local models. macOS permissions: Accessibility, Input
  Monitoring (voice hotkey); optional Camera/Microphone for the Meeting Agent.

### Trust model (the accuracy-critical nuance)

OpenHuman is **local data + managed services by default**, NOT "purely local."

- **Local on your machine:** the Memory Tree, the Obsidian-style Markdown
  vault, workspace config, local runtime state, SQLite store. Workflow data
  stays on device, encrypted locally.
- **Managed (OpenHuman-hosted) by default:** account sign-in, model routing,
  web-search proxying, and connector OAuth/integration tool calls via the
  **Composio** connector layer.
- **Custom/local mode (optional):** bring your own model (Ollama), search, or
  Composio API key. Some real-time trigger webhooks and hosted features still
  require the managed backend even then.

The post must present this honestly. It is more precise than the comparison
post's "local-only architecture" wording (see "Companion fix" below).

### Install paths (exact, from README)

Recommended native packages (verify through OS package-manager signing chain):

- **macOS (Homebrew tap):**
  ```
  brew tap tinyhumansai/core
  brew install openhuman
  ```
- **Linux (Debian/Ubuntu, signed apt repo):** the multi-line `apt-get` +
  `gpg --dearmor` keyring sequence from the README (reproduce byte-for-byte).
- **Linux (Arch, AUR):** `yay -S openhuman-bin` (once the `openhuman-bin`
  recipe is published).
- **Windows:** signed `.msi` from the latest GitHub release.
- **Manual installers:** `.dmg` / `.deb` / `.AppImage` / `.msi` from the
  latest release page.
- **Script install (call out as unverified):** `curl -fsSL …/install.sh | bash`
  and PowerShell `irm …/install.ps1 | iex`. Reproduce the README's warning that
  these have no integrity check; prefer native packages.
- **Linux caveat:** AppImage can crash on launch under Wayland and on
  Arch-based distros (`sharun: Interpreter not found!`); see issue #2463.
  The `.deb` avoids these failure modes.

Release assets confirming installers exist (v0.56.0): `*_x64.dmg`,
`*_aarch64.dmg`, `*_x64_en-US.msi`, `*_amd64.deb`, `*_amd64.AppImage`,
`*-setup.exe`, plus `.sig` signatures.

### First-run onboarding (exact order, from docs)

1. Download & launch the app.
2. Sign in — screen reads "Sign in! Let's Cook"; social login available. An
   **Advanced** panel lets you point at a custom RPC URL (self-hosted backend)
   instead of the default hosted services.
3. Connect your first integration — click **Connect** on a service (e.g.
   Gmail); a browser window opens for OAuth; on success the connection
   activates and syncs on the next 20-minute cycle.
4. Ask the first question — e.g. "What do I need to know from the last 12
   hours?"; **automatic model routing** picks the model per task.
5. Open the **Memory** tab to browse the summaries as an Obsidian vault; you
   can read, edit, and link notes by hand.

### Connectors

- One-click OAuth via **Connect**; states: **Not connected / Connected /
  Manage**.
- **Managed mode (default):** OpenHuman's backend owns the Composio API key,
  OAuth token brokering, rate limits, trigger webhook fan-out. Tokens are
  encrypted, never stored plaintext; the agent receives tool-call *results*,
  not credentials.
- **Direct mode:** bring your own Composio API key; synchronous tool calls
  work, but you host/wire real-time trigger webhooks yourself.
- A connected service shows up in four roles: agent tool, memory source,
  profile signal, trigger source. 118+ integrations (Gmail, Notion, GitHub,
  Slack, Stripe, Calendar, Drive, Linear, Jira, …).

### How context is built (the engine)

- **Auto-fetch:** every 20 minutes the core walks each active connection and
  pulls fresh data into the Memory Tree (no polling loop to write yourself).
- **TokenJuice compression:** every tool/scrape/email/search payload is
  compressed before it touches an LLM — HTML→Markdown, long URLs shortened,
  verbose output deduped/summarized; CJK/emoji preserved grapheme-by-grapheme;
  up to ~80% token reduction.
- **Memory Tree:** data canonicalized into ≤3k-token Markdown chunks, scored,
  folded into hierarchical summary trees in **SQLite** on your machine.
- **Obsidian vault:** the same chunks land as `.md` files in an
  Obsidian-compatible vault (Karpathy-style obsidian-wiki workflow) you can
  browse and edit.

### Out of the box

- Native tools: web search, web-fetch scraper, coder toolset (filesystem, git,
  lint, test, grep), voice (STT in, ElevenLabs TTS out, mascot lip-sync, live
  Google Meet agent).
- Desktop **mascot** with a face: reacts, speaks, joins Google Meets as a
  participant, keeps thinking in the background.
- Model routing: managed backend selects reasoning/fast/vision model per
  workload; one subscription includes all models.
- Messaging channels: inbound/outbound across channels you already use.

### Advanced / going local

- Optional local AI via **Ollama** for supported on-device workloads.
- Direct Composio mode (own API key).
- **agentmemory** backend: set `memory.backend = "agentmemory"` in
  `config.toml` to share a durable store with Claude Code / Cursor / Codex /
  OpenCode.
- Self-hosted RPC backend via the Advanced sign-in panel.

### Cost (mention factually, no dollar figures)

Docs say the managed path is "one subscription includes all models" plus
TokenJuice savings; BYO-model/local is the alternative. Exact prices are not
published in these sources — state the model (managed subscription vs BYO/local)
and direct readers to the site to verify pricing. No invented numbers.

## Post structure (11 sections)

Follows the `AUTHORING.md` skeleton, adapted for a single-product how-to (not a
comparison). Each `<section><h2>` gets the layout's auto-numbered prefix.

1. **Hook lede** (no label) — stakes: most agents start cold and you burn days
   briefing them; OpenHuman loads your life-context in one sync pass. Takeaway:
   install → first useful answer in ~15 minutes.
2. **At a glance** — ≤4-column table: What it is / Version (v0.56.0, Early
   Beta) / Platforms / License (GPL-3.0). One line on the cost model.
3. **Before you install** — system requirements + the managed-vs-local trust
   model. Diagram: `arch-trust-model.svg` (what's local vs what's hosted).
4. **Install** — real per-OS steps (native packages, manual installers,
   warned-against script path, Linux AppImage/Wayland caveat). `<pre>` blocks
   byte-identical en/zh.
5. **First run: install → first useful answer** — onboarding as numbered steps.
   Diagram: `flow-onboarding.svg`.
6. **How your context gets built** — auto-fetch → TokenJuice → Memory Tree
   (SQLite) → Obsidian vault. Diagram: `arch-context-pipeline.svg`.
7. **Connecting more of your stack** — connector states, managed vs direct
   Composio, the four roles a connection plays.
8. **What it does out of the box** — native tools, mascot, model routing,
   messaging channels.
9. **Going local / advanced** — Ollama, direct Composio, agentmemory backend,
   self-hosted RPC.
10. **FAQ** (`<section class="faq">`, for FAQPage JSON-LD) — is it really
    local? / is it free? / does it work offline? / minimum specs? / where is my
    data? / can I bring my own model? Each `<h3>` immediately followed by one
    `<p>`; no nested `<section>`.
11. **Further reading** — on-wiki links (the comparison post + relevant
    Concepts: The Agent Loop, Memory, Tools/Actions/Environments) and project
    sources (repo, docs, releases).

## Diagrams (3 new SVGs)

Under `public/blogs/getting-started-with-openhuman/`. Themeable per the
`AUTHORING.md` §3 conventions (CSS-var fills only, `role="img"` +
`<title>`/`<desc>`, no scripts, no caption text inside the SVG). Reuse the
existing `openhuman.svg` logo (copy from the comparison post's `logos/`).

- `arch-trust-model.svg` (viewBox 0 0 900 500) — two columns: "On your machine"
  (Memory Tree, Obsidian vault, SQLite, config) vs "Managed by default"
  (sign-in, model routing, search proxy, Composio OAuth), with the
  custom/local override noted.
- `flow-onboarding.svg` (viewBox 0 0 900 400) — install → sign in → connect →
  first answer, left to right.
- `arch-context-pipeline.svg` (viewBox 0 0 900 500) — 118+ connectors →
  auto-fetch (20 min) → TokenJuice → Memory Tree (SQLite) → Obsidian vault →
  agent context.

## Files to create

- `src/content/blogs/posts/2026-05-28-getting-started-with-openhuman.ts`
- `src/content/blogs/en/getting-started-with-openhuman.html`
- `src/content/blogs/zh/getting-started-with-openhuman.html`
- `public/blogs/getting-started-with-openhuman/arch-trust-model.svg`
- `public/blogs/getting-started-with-openhuman/flow-onboarding.svg`
- `public/blogs/getting-started-with-openhuman/arch-context-pipeline.svg`
- `public/blogs/getting-started-with-openhuman/logos/openhuman.svg` (copied)
- `src/content/changelog/entries/2026-05-28-getting-started-with-openhuman.ts`

## Companion fix (same PR)

Correct the existing comparison post to match current reality:

- `src/content/blogs/en/openclaw-vs-openhuman-vs-hermes-agent.html` and its
  `zh/` mirror: soften "local-only architecture" / "memory tree never leaves
  the machine" to the accurate managed-data-local / managed-services framing,
  and update the **~7,800 stars** figure to the current ~29.2k (with a date).
  Keep edits minimal and parity-correct (en/zh prose stays faithful; any `<pre>`
  stays byte-identical). Add a line to the changelog entry noting the
  correction.

## Tags

Reuse where they fit; mint sparingly. Proposed:
`open-source`, `getting-started`, `personal-assistant`, `memory`. (`open-source`
already exists on the comparison post.)

## Verification gates (must pass before PR/merge)

```
npm run build                              # static build, no new warnings
npm run verify                             # bilingual complete, links resolve, OG meta
npm test                                   # incl. blogs.test.mjs (slug/date/tag shape)
npm run search:index && npm run test:search
```

Then manual: open `/blogs/getting-started-with-openhuman` (toggle dark mode,
click TOC), confirm `"@type":"BlogPosting"` and `"@type":"FAQPage"` JSON-LD in
view-source, check the `/zh/blogs/...` mirror.

## Out of scope

- No changes to site IA/nav beyond the new post + changelog.
- No new Concepts/Deep-Dive pages.
- No pricing figures (not published in sources).
