---
name: Agentic AI Wiki
description: A bilingual field guide to building agentic AI, drawn as a transit system. Sections are lines, pages are stations.
colors:
  ink: "#14171B"
  paper: "#FFFFFF"
  surface: "#F3F5F8"
  muted: "#4A5059"
  ink-dark: "#ECEEF1"
  paper-dark: "#0F1216"
  surface-dark: "#171B21"
  muted-dark: "#A9B0BA"
  surface-inverse: "#0E0F0D"
  surface-inverse-text: "#FBFBF9"
  surface-inverse-dark: "#24261F"
  surface-inverse-text-dark: "#EDEDE8"
  border-emphasis-dark: "#666961"
  pill-fg: "#FFFFFF"
  pill-fg-dark: "#0F1216"
  line-hub: "#14171B"
  line-hub-ink: "#14171B"
  line-hub-inv: "#ECEEF1"
  line-hub-soft: "#ECECED"
  line-hub-dark: "#ECEEF1"
  line-hub-ink-dark: "#ECEEF1"
  line-hub-soft-dark: "#2A2C30"
  line-fg: "#D4253A"
  line-fg-ink: "#B81D30"
  line-fg-inv: "#FF8A96"
  line-fg-soft: "#FCEEEF"
  line-fg-dark: "#FF6474"
  line-fg-ink-dark: "#FF8A96"
  line-fg-soft-dark: "#2C1C21"
  line-bk: "#8A5626"
  line-bk-ink: "#7A4A1F"
  line-bk-inv: "#DDAE80"
  line-bk-soft: "#F6F1EE"
  line-bk-dark: "#D29A64"
  line-bk-ink-dark: "#DDAE80"
  line-bk-soft-dark: "#26221F"
  line-co: "#1C8A4B"
  line-co-ink: "#157240"
  line-co-inv: "#5FD394"
  line-co-soft: "#EDF6F1"
  line-co-dark: "#3DC57B"
  line-co-ink-dark: "#5FD394"
  line-co-soft-dark: "#152722"
  line-dd: "#1F5AD6"
  line-dd-ink: "#1A4FC0"
  line-dd-inv: "#8DB0FF"
  line-dd-soft: "#EDF2FC"
  line-dd-dark: "#6B97FF"
  line-dd-ink-dark: "#8DB0FF"
  line-dd-soft-dark: "#1A2232"
  line-pb: "#D46F00"
  line-pb-ink: "#A35400"
  line-pb-inv: "#FFB55E"
  line-pb-soft: "#FCF3EB"
  line-pb-dark: "#FF9F33"
  line-pb-ink-dark: "#FFB55E"
  line-pb-soft-dark: "#2C2319"
  line-op: "#7539C0"
  line-op-ink: "#6A30B3"
  line-op-inv: "#C4A0FF"
  line-op-soft: "#F4EFFA"
  line-op-dark: "#B383FF"
  line-op-ink-dark: "#C4A0FF"
  line-op-soft-dark: "#232032"
  line-bl: "#0B8585"
  line-bl-ink: "#086F6F"
  line-bl-inv: "#5AD6D6"
  line-bl-soft: "#EBF5F5"
  line-bl-dark: "#2BC8C8"
  line-bl-ink-dark: "#5AD6D6"
  line-bl-soft-dark: "#12282B"
  code-bg: "#14161A"
  code-text: "#E3E7EE"
  code-comment: "#8B94A3"
  code-key: "#9FB4FF"
  code-str: "#8FD59B"
  code-fn: "#6FD3E0"
  q-bg: "#F4F1E6"
  q-border: "#A6780A"
  q-ink: "#8A6308"
  q-bg-dark: "#1A1814"
  q-border-dark: "#D4A040"
  badge-ink: "#0E0F0D"
  badge-tip-bg: "#c5d86d"
  badge-warn-bg: "#e8a87c"
  badge-danger-bg: "#bf616a"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(40px, 5vw, 56px)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: "-0.01em"
  standfirst:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.55
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  body-prose-wide:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.45
  station-code:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 800
    lineHeight: 1.4
    fontFeature: "tnum"
  mono:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sm: "2px"
  md: "6px"
  pill: "999px"
  round: "50%"
spacing:
  s-0: "2px"
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
components:
  station-code-pill:
    backgroundColor: "{colors.line-dd-ink}"
    textColor: "{colors.pill-fg}"
    typography: "{typography.station-code}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
  callout-note:
    backgroundColor: "{colors.line-dd-soft}"
    textColor: "{colors.ink}"
    padding: "24px"
    rounded: "{rounded.md}"
  callout-badge:
    backgroundColor: "{colors.line-dd-ink}"
    textColor: "{colors.pill-fg}"
    rounded: "{rounded.pill}"
    padding: "0 8px"
  home-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    height: "56px"
    padding: "0 24px"
  home-search-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    height: "44px"
    padding: "0 12px"
  nav-link-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  station-ring:
    backgroundColor: "{colors.paper}"
    size: "14px"
    rounded: "{rounded.round}"
  station-ring-current:
    backgroundColor: "{colors.paper}"
    size: "22px"
    rounded: "{rounded.round}"
  step-ring:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    size: "36px"
    rounded: "{rounded.round}"
  deliverable:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.surface-inverse-text}"
    rounded: "{rounded.md}"
    padding: "32px"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-text}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Agentic AI Wiki

## Overview

**Creative North Star: "The Line Map"**

The wiki is a transit system. Each of the seven sections is a line with its own colour, every page is a station with a code (D15, Y7, 3.3), and wayfinding is the design. A reader arriving cold from search onto page 400 sees which line they are on (the 5px band under the header and the ticked nav item), which station (the code pill beside the title), what comes before and after (the sidebar's vertical line diagram, or the station strip on a phone), and which stations they have already visited (filled rings). Then the chrome goes quiet and they read a calm, measured column.

The ground is white paper and near-black ink, with one reading family, Atkinson Hyperlegible Next, at every size, the way station signage uses one face from platform sign to timetable. Its Mono carries code, dates and tags. Colour has exactly one job: it marks the line. It appears as strokes, rings, ticks, the band and the code pill, and the 8% "-soft" tint of the line behind callouts, inline code and text selection. It never colours a paragraph. Depth is flat. Structure comes from 1px hairline rules, 4px line strokes and the one inverse panel, with no shadows except on the search overlay.

The world was chosen in deliberate refusal of the documentation-site default: boxed cards, tracked uppercase eyebrows, and one brand accent. The home page carries no boxes below the fold, step numbers sit in rings instead of eyebrows, and the accent is no longer one blue but whichever line the page sits on.

**Key Characteristics:**
- Seven line colours plus an ink "hub", each in four shades (mark, -ink, -inv, -soft), light and dark.
- A page's accent is its line, set once by `data-line` on `<html>`. Home, About and Changelog ride the ink hub.
- One reading family (Atkinson Hyperlegible Next) for headings and text; Atkinson Hyperlegible Mono for code, dates and tags. Chinese falls through to the system CJK stack.
- Heavy display weight (800) with negative tracking for titles; sentence case everywhere.
- Round station rings (3-5px strokes) on 4px line strokes; pill-ended ticks; rounded code pill.
- Flat: hairlines, tints and one inverse surface; a single overlay shadow.
- A 53ch reading measure (about 72 characters in Atkinson) and a bounded 1440px shell.

## Colors

A white-and-ink ground carrying seven saturated transit-line colours that only ever appear as marks.

### Primary
The primary is not one hue: it is **the line the page is on**. Every component reads `--line` / `--line-ink` / `--line-inv` / `--line-soft` (aliased as `--accent*`), and `:root[data-line='xx']` swaps them. Each line has four shades:
- **Mark** (`line-xx`): line strokes, station rings, nav ticks, the header band, dotted link underlines. Clears 3:1 on paper.
- **Ink** (`line-xx-ink`): small text in the line's colour and the fill behind the station-code pill. Clears 4.5:1 on paper and surface; white pill text clears at least 5.49:1 (the weakest is Playbooks).
- **Inverse** (`line-xx-inv`): small text and marks on the inverse surface, which is dark in both themes. Not redefined for dark.
- **Soft** (`line-xx-soft`): the line tinted 8% over paper (12% over dark paper), for panels that carry ink text: callouts, inline code, `::selection`, search-result highlights. These are explicit hexes, not `color-mix()`, because the contrast guard reads computed colours.

The lines:
- **Signal Red** (Field Guide, `fg`): the flagship series; also the fixed colour of "The whole path" on the home page.
- **Saddle Brown** (Books, `bk`).
- **Platform Green** (Concepts, `co`).
- **Interchange Blue** (Deep-Dives, `dd`).
- **Signal Orange** (Playbooks, `pb`): the lowest-contrast ink shade, so it sets the pill-text floor.
- **Violet** (Operations, `op`).
- **Harbour Teal** (AI Blog, `bl`).
- **Hub Ink** (`hub`): pages on no line. The mark is ink itself, so these pages show no header band.

In dark, the marks and ink shades lighten (for example Signal Red becomes `#FF6474` with ink `#FF8A96`), and the pill text flips to dark paper (`pill-fg-dark`).

### Tertiary
- **Q&A Ochre** (`q-bg`, `q-border`, `q-ink`): the Q&A block and the "Trap" callout surface. The rule and its small-text shade are split, the same as mark and ink.
- **Badge hues** (`badge-tip-bg`, `badge-warn-bg`, `badge-danger-bg` with `badge-ink`): theme-invariant warm fills behind the Tip, Trap and Danger callout badges. They are deliberately the same in both themes.
- **Code palette** (`code-*`): an always-dark, cool code surface; the same values in both themes.

### Neutral
- **Station Ink** (`ink` / `ink-dark`): all running text and headings, and the hub line.
- **Paper** (`paper` / `paper-dark`): the page ground. Light is pure white; dark is a blue-black.
- **Platform Grey** (`surface` / `surface-dark`): hover fills on chrome, table heads, figure grounds, the Observe aside.
- **Timetable Grey** (`muted` / `muted-dark`): secondary text, breadcrumbs, counts, inactive nav and TOC entries. Clears 7.4:1 on surface.
- **Inverse Panel** (`surface-inverse`): the Deliverable block and the "Start here" reading-path callout. Darker than paper in light and raised above it in dark, where `border-emphasis-dark` carries the edge.
- **Hairlines** (`--border-soft` rgba(18,19,15,0.20), `--border-softer` rgba(18,19,15,0.09); dark rgba(237,237,232,0.16 / 0.1)): the only dividers.

### Named Rules
**The One Job Rule.** Line colour marks; it never fills behind running text. Only the 8% soft tint may sit under ink text, and only in a bounded panel (callout, inline code, selection).

**The Mark/Ink Split Rule.** Strokes, rings and ticks use the mark shade (3:1 minimum). Any text in a line colour, and the pill fill, uses the -ink shade (4.5:1 minimum). Never set text in the mark shade.

**The Hub Rule.** Pages on no line use ink as their line. A language is not a line either: the current-language tick is ink.

## Typography

**Display Font:** Atkinson Hyperlegible Next (with system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible Next (with system-ui, sans-serif)
**Label/Mono Font:** Atkinson Hyperlegible Mono (with ui-monospace, monospace)
**Chinese:** PingFang SC, Hiragino Sans GB, Microsoft YaHei, Noto Sans CJK SC, Source Han Sans SC. No CJK webfont is loaded.

**Character:** One legibility-first face, drawn by the Braille Institute, carries everything from a 56px home headline to a 12px count, so hierarchy comes from size and weight, never from a family swap. The Mono's slashed, open forms make dates, codes and tags read as data.

Both families ship as variable fonts, self-hosted (Latin and Latin-Extended subsets). The faces are declared at 400, 500, 600, 700 and 800 for Next, 400 to 700 for Mono, plus an italic. Legacy Inter, Space Grotesk and JetBrains Mono faces remain in `fonts.css` only for the ~700 blog SVG diagrams that name them; no site CSS uses them.

### Hierarchy
The scale is ten fixed steps: 12, 13, 14, 16, 18, 22, 28, 36, clamp(40px, 5vw, 56px), each with its own line height.
- **Display** (800, clamp(40px, 5vw, 56px), 1.12, -0.025em): the home headline only. Balanced wrap.
- **Headline** (800, 36px from 700px up, 28px below, 1.18, -0.02em): the page title (`.phase` h2 or the standfirst-inserted `h1`) and the blog post `h1`.
- **Title** (700, 28px from 700px up, 22px below, 1.22, -0.01em): step headings and blog section headings (800 there), each led by a ringed number.
- **Standfirst** (500, 22px, 1.55, ink, max 28em): a thesis-sentence opener demoted from heading by `lib/standfirst.ts` when the opening h2 is far longer than the page title.
- **Body** (400, 16px, 1.65): running text. Article prose steps to 18px (`--t-prose`) at 1360px and up. On Chinese pages, line height opens to 1.8 (1.75 at 18px).
- **Label** (600-700, 13-14px): nav links (600, 14px), sidebar group names (700, 13px), breadcrumbs and meta (13px, muted). Sentence case.
- **Station code** (800, 14px, tabular numerals): the code pill.
- **Mono** (400-500, 12-13px): code blocks (13px), inline code (0.85em), dates in lists, blog tags, the changelog jump bar.

### Named Rules
**The One Face Rule.** Headings and text share one family. Hierarchy comes from the ten-step scale and weights 400-800, never from a second display face.

**The Sentence Case Rule.** No uppercase labels. Even "STEP 3" in source fragments is lowercased and recapitalised in CSS, and Chinese passes through untouched.

**The Measure Rule.** Running text caps at 53ch (`--w-measure`), about 72 characters in Atkinson, inside the guard's 60-78 band. Re-measure, never re-estimate, if the face or size changes.

**The CJK Rule.** Chinese gets no synthesised italic (`--prose-italic: normal`, with `<em>` set to weight 600 instead), no negative heading tracking, and label tracking scaled to 0.15 (`--track-mul`).

## Layout

A bounded rail-to-edge shell. Article pages run a three-column flex shell up to `--w-shell` (1440px), centred beyond that, with 32px side padding and 32px gaps: the left rail (`--w-rail-nav`, 240px, sticky under the header) holds the group's line diagram; the centre column holds the article with prose capped at 53ch; the right rail (`--w-rail-toc`, 208px, sticky) holds "On this page" behind a 1px left rule. Index and landing pages use `.wrap` (1080px); About and Privacy use a 760px prose wrap.

The breakpoint ladder: 1360px steps prose to 18px and brings the TOC in as a rail; 900-1359px renders the TOC in flow above the article; below 1024px the left rail hides; below 900px the TOC is not rendered and the **station strip** replaces the sidebar diagram; 1180px is the single point where the header nav collapses to a disclosure panel (both locales); 760px swaps the home SVG map for the bar list; header controls tighten at 640, 430 and 360px. No horizontal overflow from 375px up.

The home first viewport is a two-column grid at 1024px and up (a 500px text column at left, the system map at right), stacked below. Below the fold every home section shares the hero's 64px left edge, capped at 1000px, with no boxes.

Spacing is a 4px-based scale, geometric above 16 (2, 4, 8, 12, 16, 24, 32, 48, 64, 96). Sections breathe at 48-64px (`.phase` and `.step` padding); groups separate at 24px; list rows at 12-16px. The header is 56px (60px from 700px up). Every interactive target is at least 44px in both dimensions.

## Elevation & Depth

Flat by conviction. Surfaces separate by 1px hairline rules, the 8% line tint, the always-dark code surface and the one inverse panel, never by shadow. In dark, where an inverse fill can only reach about 1.24:1 against paper, the panel's edge (`--border-emphasis`) carries the separation instead.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 24px 60px rgba(10, 10, 10, 0.35)`): the search modal only, over a `rgba(10,10,10,0.55)` backdrop.
- **Scroll affordance** (`--scroll-shadow`, `--code-scroll-shadow`): edge fades on horizontally scrollable nav, tables and `<pre>`, tuned to clear 3:1. These are cues, not elevation.

### Named Rules
**The One Overlay Rule.** There is one shadow token, and only a true overlay uses it. A second overlay reuses it; cards and headers never get one.

## Shapes

Round where the map is round, square everywhere else. Station rings, step rings and the hub are perfect circles (`50%`); nav ticks, the current-language tick, the home search field, the mobile bar list and callout badges are pill-ended (`999px`); the station-code pill, code blocks, callouts and the deliverable take a gentle 6px corner (`--radius-md`) from 700px up and bleed square to the edge on phones; inline code and the theme toggle take 2px. Line strokes are 4px in the sidebar, the station strip and the home "whole path" (7px on the home map, 11px on hover). Ring strokes are 3px for an ordinary station, 4px for group rows and step rings, and 5px for the current station. Rules are 1px hairlines, with 2px ink rules reserved for structural edges (footer top, table heads, the open mobile nav panel).

## Components

### Header and line band
Station signage. The brand is an interchange mark (two linked 6.5px rings in currentColor) plus the wordmark at 18px/800. Nav links are 14px/600 muted text, each carrying a 16×4px pill tick in its own line's colour, so the nav doubles as the map key. The current section's tick runs the label's full width and its text turns to ink: "you are here" is a mark, not a hue. Hover fills with surface. Under the header, a full-width 5px band in the page's line colour, absent on hub pages. Below 1180px the nav becomes a full-width disclosure panel of 44px rows, clipped (not removed) when closed.

### Navigation: the sidebar line diagram
The signature wayfinding component. Each group's name (13px/700 ink) sits above its stations like a line name on a strip map. A 4px stroke in the page's line runs from ring centre to ring centre and stops at the group's last station. Each station is a 14px ring with a 3px stroke on paper; **visited** stations (from this browser's own history) are filled with the line; the **current** station is a 22px ring with a 5px stroke, hollow, and its label is ink at 700. Other labels are 14px muted, ink on hover.

### Station strip (phones, below 900px)
Where the sidebar is hidden, a strip shows the station before, this station (a 22px hollow ring) and the one after (12px filled rings) on a 4px line, with hairline segments past either terminus, over a label pairing the line's name (ink, 700) with "Station 4 of 15". It is purely visual (`aria-hidden`); breadcrumb and prev/next carry the facts.

### Station-code pill
The page's platform sign: a code such as D15 set in 14px/800 tabular numerals, white (dark paper in dark) on the line's -ink shade, 4×12px padding, 6px corners. The line and group name (14px muted) sit beside it as one sign, above the title.

### Step rings and blog section rings
Numbered headings are stations. A 36px ring with a 4px line-colour stroke holds the number at 14px/800 ink, upright and tabular, beside the heading. `lib/standfirst.ts` rewrites "STEP n" eyebrows into this ring at build time; blog posts number their top-level sections the same way with a CSS counter.

### Home system map
The home page's table of contents and its scale at once. One ink hub ring (r15, 6px stroke) labelled "You are here" sends seven rays to a common x, then each runs horizontally in its line colour (7px, round caps) for a length proportional to its entry count, ending at a terminus ring (r9, 5px stroke on paper) labelled with the line name (19px/700) and count (14px muted). Hover or focus thickens the track to 11px and underlines the name. Below 760px the same data renders as a list of rows, each with name, count and a 6px pill bar of proportional width. Counts come from the manifests at build time.

### Home search
A 56px pill field with a 2px ink border, 18px muted placeholder text and an ink search icon; hover fills with surface; focus draws a 2px line-colour outline offset 3px. It opens the Pagefind modal: a 640px panel with a 2px ink border and the overlay shadow, themed onto the site tokens with square corners.

### Group rows (section indexes)
Each group is a branch of the section's line: a row on a 1px top hairline, led by a 16px ring with a 4px line stroke. The name is 18px/700, then a muted 14px summary and a 13px tabular count. On hover the ring fills and the name turns line-ink.

### Callouts
- **Note** (`.callout`): the line's 8% soft tint, no rule, prose at full body size. A pill badge ("Note") in 13px/800, pill-fg on the line's -ink shade, names the kind.
- **Trap / Tip / Danger**: the same shape, with the fixed warm badge hues and `badge-ink`; Trap sits on `q-bg`.
- **Composite / Verified** (Books): `q-bg` with a 1px dashed ochre border, or surface; badge text from `data-badge`.
- **Start here**: the inverse panel, with line-inverse links and mono path pills.
- **Observe**: surface, with top and bottom hairlines.
- **Deliverable**: the inverse panel, 32px padding, a mono checklist with line-inverse boxes.

### Links
Running-text links are ink with a 1px dotted underline in the line's mark colour; hover and focus turn them line-ink with a solid underline. Focus everywhere is a 2px solid line-colour outline (inset on chrome, offset on content).

### Code
Blocks sit on the always-dark `code-bg` in 13px Mono, 6px corners from 700px up, with scroll fades. Inline code is 0.85em Mono on the line's soft tint, with 2px corners. Vendor code tabs keep their brand hue as a 2px underline, with a separate -ink shade for the label.

### Departures board (About)
The About page's evidence that a scheduled agent drafts part of the site: the inverse panel (the page's only one) holding a real table of the last seven content batches, with merge time in tabular Mono, a dot plus section name for each line called at (dots in the `-inv` shades), the rebuilt page and the PR link in `line-dd-inv`. The newest row sits on `--surface-inverse-hi` with a `line-co-inv` status dot; secondary text uses `--surface-inverse-muted`, rules `--surface-inverse-rule`. Data comes from GitHub at build time (`lib/batches.ts`), falling back to the changelog. Below it, the six stops every batch calls at run on a 4px hub-ink line with 16px rings, horizontal from 760px and vertical below.

### Tags and chips
Blog tags are 12px Mono pills with a 1px hairline border, turning line-ink on hover.

## Do's and Don'ts

### Do:
- **Do** take the accent from the page's line through `--line` / `--line-ink` / `--line-inv` / `--line-soft`. Never hard-code a line hex in a component.
- **Do** use the mark shade for strokes, rings and ticks, and the -ink shade for any text or pill fill in a line colour.
- **Do** express position as a map: a ring for a station, a filled ring for visited, a larger hollow ring (22px, 5px stroke) for "you are here".
- **Do** set numbers in rings or the code pill, upright and tabular, at weight 800.
- **Do** cap running text at `--w-measure` (53ch) and measure in-browser before changing it.
- **Do** keep every interactive target at least 44×44px and every text pair at WCAG AA in both themes. `npm run test:design` enforces it.
- **Do** redefine tokens, not selectors, for Chinese: font stacks, line height, `--prose-italic` and `--track-mul`.

### Don't:
- **Don't** put a line colour behind running text. Only the 8% soft tint may sit under ink text, inside a bounded panel.
- **Don't** add tracked uppercase eyebrows or kickers above headings. Labels are sentence case, and step numbers are rings.
- **Don't** introduce a second display family, or reach for the legacy Inter, Space Grotesk or JetBrains Mono faces outside the blog SVGs.
- **Don't** add shadows to cards, headers or panels. The overlay shadow belongs to the search modal alone.
- **Don't** use `transition: all`. Animate only colour, border and stroke width, at `--dur-fast` (120ms) or `--dur-base` (150ms) on `cubic-bezier(0.2, 0, 0, 1)`, and add no enter or exit motion.
- **Don't** draw new boxed cards or hairline boxes for index entries. A group is a ring on a rule.
