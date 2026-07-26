# Visual redesign — Agentic AI Wiki

**Date:** 2026-07-25
**Status:** approved, ready for implementation planning
**Scope:** visual system only — no IA, route, manifest, or content changes

---

## 1. Goal

Replace the site's accumulated ad-hoc styling with a designed visual system.
The site has ~6× the content its typography was drawn for (271 entries, 688
pages) and shows it: **24 distinct font sizes** between 9px and 84px, and **29
distinct spacing values**, none of them derived from a scale.

The measured symptoms:

- Fraunces — a *display* face — sets body copy, which is why long passages
  read as effortful even though pages look handsome.
- The mobile header wraps to 3 rows and 155px, 18% of a phone viewport,
  permanently (it is `position: sticky`).
- Blog prose ran to 93 characters per line before the 2026-07-25 fix.
- Small accent text failed AA contrast site-wide until the same day.

**Out of scope:** information architecture, routing, manifests, content
fragments, component structure, the cross-link and reading-path systems.
Nothing under `src/content/` is touched.

---

## 2. Direction

Chosen from three rendered options via visual comparison of a real paragraph
from the *Prompt Caching* concept, then hybridised on user feedback.

| Role | Typeface | Notes |
|---|---|---|
| Display / headings | **Space Grotesk** | 600 weight; replaces Fraunces |
| Body | **Inter** | already loaded |
| Mono / labels / code | **JetBrains Mono** | already loaded |
| CJK | system stack | see §3.5 |

Register: precise, near-white, technical-reference. Signal blue accent.

**Font payload is a net wash or a small win.** Fraunces (variable, optical-size
axis 9..144) is removed; Space Grotesk (static) is added. Inter and JetBrains
Mono already load. Declared in `BaseLayout.astro:58`.

---

## 3. The token system

### 3.1 Type scale — 10 steps replacing 24 sizes

| Token | Size | Line-height | Used for |
|---|---:|---:|---|
| `--t-2xs` | 11px | 1.4 | STEP labels, eyebrows, spec rows |
| `--t-xs` | 13px | 1.45 | meta, captions, breadcrumb |
| `--t-sm` | 14px | 1.55 | table cells, secondary body |
| `--t-base` | 16px | 1.65 | body copy |
| `--t-md` | 18px | 1.55 | lede |
| `--t-lg` | 22px | 1.3 | h4 |
| `--t-xl` | 28px | 1.22 | h3 |
| `--t-2xl` | 36px | 1.18 | h2 |
| `--t-3xl` | `clamp(40px, 5vw, 56px)` | 1.12 | page title |
| `--t-display` | `clamp(48px, 9vw, 84px)` | 0.9 | chapter numerals |

Body copy is currently 15px, 16px, or 17px depending on template; it unifies at
16px. The two `clamp()` steps fix the mobile title problem — a Deep-Dive title
currently consumes 9 lines and ~600px before any prose appears.

### 3.2 Spacing scale — 10 steps replacing 29 values

`2 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` — 4px-based, geometric above 16.

### 3.3 Colour

Three accent tokens, not one. This is carried forward from the 2026-07-25
contrast fix, which established that a single accent hex cannot serve small
text on light, small text on dark, and graphics simultaneously.

| Token | Light | Dark | Job |
|---|---|---|---|
| `--accent` | `#1F5EFF` | `#6E9BFF` | rules, borders, display type |
| `--accent-ink` | `#1A52E0` | `#6E9BFF` | small text (≥4.5:1 required) |
| `--accent-on-inverse` | `#6E9BFF` | `#6E9BFF` | small text on dark panels |
| `--paper` | `#FBFBF9` | `#101110` | page background |
| `--surface` | `#F1F3EE` | `#191A18` | raised panels |
| `--ink` | `#12130F` | `#EDEDE8` | body text |
| `--muted` | `#3D4038` | `#A3A69C` | secondary text |

Verified ratios:

```
18.00  light body     #12130F on #FBFBF9
10.19  light muted    #3D4038 on #FBFBF9
 6.09  light accent   #1A52E0 on #FBFBF9
 5.65  light accent   #1A52E0 on #F1F3EE
16.11  dark  body     #EDEDE8 on #101110
 7.65  dark  muted    #A3A69C on #101110
 7.02  dark  accent   #6E9BFF on #101110
 6.48  dark  accent   #6E9BFF on #191A18
```

`--accent-ink` is `#1A52E0` rather than the mockup's `#1F5EFF`. The latter
passes at only 4.58:1 on `--surface` — too thin a margin to survive any later
background adjustment.

### 3.4 Token migration — every existing token accounted for

The current `:root` block defines 25 tokens. Leaving any of them unstated would
let the implementer guess. Complete disposition:

| Existing token | Disposition |
|---|---|
| `--ink`, `--paper`, `--accent`, `--accent-ink`, `--accent-on-inverse`, `--muted` | **retuned** to §3.3 values; names kept |
| `--paper-2` | **renamed** `--surface` (its actual job); keep `--paper-2` as an alias for one release so no rule breaks mid-change |
| `--accent-soft` | retuned to a blue tint (`--accent` at ~12% over paper) |
| `--surface-inverse`, `--surface-inverse-text` | kept as-is — the "always dark, both themes" contract still holds |
| `--border-soft`, `--border-softer` | kept; alpha values re-derived against the new paper |
| `--code-bg`, `--code-text`, `--code-comment`, `--code-key`, `--code-str`, `--code-fn` | **retuned** per §4.3 and contrast-checked |
| `--q-bg`, `--q-border`, `--q-answer` | retuned to sit on the new paper; contrast-checked |
| `--tab-anthropic`, `--tab-openai` | **unchanged** — brand colours, not ours to restyle |
| `--nav-h` | unchanged (56px); now actually honoured on mobile per §4.1 |
| `--subnav-h` | unchanged |

New tokens added: the 10 `--t-*` type steps, the 10 `--s-*` spacing steps, and
`--surface`.

### 3.5 CJK

Chinese pages currently load **no** webfont, so a zh reader sees a different
face per operating system. **Decision: keep the system fallback** and add a
tuned `font-family` stack naming good system CJK faces in preference order
(PingFang SC, Hiragino Sans GB, Microsoft YaHei, Noto Sans CJK SC, sans-serif).

Loading a real CJK webfont is a separate performance decision requiring its own
measurement; it is explicitly deferred, not forgotten.

---

## 4. Components

### 4.1 The mobile header — the largest single win

`site.css:384–393` contains `@media (max-width: 640px)` setting
`height: auto; flex-wrap: wrap` on `.site-header` and `flex-wrap: wrap` on its
`nav`. The 10 nav links need **697px of intrinsic width** in a 390px viewport,
so they wrap to 3 rows → 155px.

**Fix:** make the nav scroll instead of wrap, in the same rule —
`flex-wrap: nowrap`, `overflow-x: auto`, a scroll affordance, and retain
`height: var(--nav-h)`. `guide.css` already uses this exact pattern for its
legacy `.nav-parts`.

**Result:** 155px → 56px, recovering ~99px (12% of a phone viewport) on every
page, with no new component and no IA change.

This was previously deferred as needing a structural disclosure component. It
does not.

### 4.2 Restyle inventory

| Group | Components | Work |
|---|---|---|
| Chrome | header, footer, lang switch, theme toggle, search trigger | new type; header scroll fix; ≥44px tap targets |
| Section indexes | `SectionIndexView`, `GroupIndexView`, `ReadingPathCallout`, `BlogCard` | card/list restyle on new spacing scale |
| Entry body | `.phase`, `.step`, `.step-num`, `.callout`, `.callout.warn`, `.observe`, `.deliverable`, `.threat-row` | core reading surface; re-cut callout hierarchy |
| Code | `pre`, `.c-kw` `.c-st` `.c-fn` `.c-cm` `.c-out` | new mono + syntax palette re-tune (§4.3) |
| Tables | blog comparison tables | new type; retain existing scroll affordance |
| Rails | `PageTOC`, `BlogPostTOC`, `ChapterSidebar`, `SectionSidebar` | new type; density pass |
| Page footers | `page-nav` prev/next buttons | restyle on `--surface-inverse` |

### 4.3 Syntax colours

`--code-key: #e8a87c`, `--code-str: #c5d86d`, `--code-fn: #88c0d0` and
siblings were chosen for the warm cream palette and will read muddy against a
cool system. They need re-tuning **and** a contrast check against
`--code-bg` — which has never been done. Expect at least one existing failure.

---

## 5. Rollout

**One complete PR** (user decision; the two-phase alternative was offered and
declined). To keep an inherently large diff reviewable, the commit is organised
in layers, in this order:

1. Token layer — fonts, colour, type scale, spacing scale
2. Scale application — replace hardcoded `font-size`/spacing with tokens
3. Component restyle
4. The header fix
5. Verification tooling (§6.3)

Production is never left in a half-themed state.

---

## 6. Verification

### 6.1 Existing gates

`npm run build` · `npm run verify` · `npm test` · `npm run search:index && npm run test:search`

### 6.2 Change-specific checks

| Check | Method | Pass condition |
|---|---|---|
| Contrast | scripted scan, all page types × light/dark × 390/1280 | zero failures |
| Reading measure | rendered glyph widths | 60–75 chars, all prose templates |
| Header height | computed, mobile | ≤60px, single row |
| Tap targets | computed, mobile | ≥44px, all nav/controls |
| Horizontal overflow | `scrollWidth > innerWidth` | false everywhere |
| Syntax colours | contrast vs `--code-bg` | every token ≥4.5:1 |
| Lighthouse a11y | mobile navigation run | 100 |

### 6.3 Permanent contrast test

Add the contrast check to `npm test` so the new palette cannot drift the way
the old one did. Two requirements, both learned from real failures on
2026-07-25:

- **It must composite `rgba()` overlays.** The ad-hoc scanner used during the
  audit did not, and reported the Concepts reading-path chips at 1:1 when they
  are actually 14.29:1. A checker that cries wolf gets ignored.
- **It must run against built HTML, not CSS source.** Two near-misses that day
  were invisible in source: a rule declaring `28px` that computed to `17px`,
  and a colour set by an inline `style` attribute in `SeriesTOC.astro` that no
  stylesheet could override.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Large diff across 688 pages | layered commit (§5); full gate suite; before/after captures |
| Syntax palette regression | contrast-check every token before merge |
| CJK rendering shifts per OS | tuned fallback stack; zh pages checked in verification |
| Accent too close to AA floor | `--accent-ink` chosen with ~35% headroom over 4.5:1 |
| Space Grotesk lacks CJK coverage | headings in zh fall back to the CJK stack; verify visually |

---

## 8. Open items deliberately excluded

- **Concepts index findability** — 9.6 screens on mobile, 55 links, no filter.
  Needs an IA decision, not a restyle. Recorded in memory; still open.
- **CJK webfont** — see §3.5.
