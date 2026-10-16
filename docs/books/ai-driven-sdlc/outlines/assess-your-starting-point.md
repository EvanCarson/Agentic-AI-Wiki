# Outline: Ch 13 — Assess Your Starting Point (`assess-your-starting-point`, ~2,500 words)

**Argument (bible §2):** Assess each phase by observable evidence — what is reviewed, what verifier exists, what credentials the AI holds, what the risk ceiling is — not by tool count or self-report, and locate the constraint before choosing where to climb.

**Lede:** stakes = the usual assessment (licences, tool count, a survey of how people feel) measures the wrong thing and drifts upward; takeaway = four observable readings per phase and task type, plus the constraint, decide where to climb.

**13.1 `what-not-to-count`** Why tool counts and self-report mislead.
- DORA 2025: 90% use AI (OG-25) → adoption no longer discriminates.
- Cui et al.: 30–40% never tried a free in-IDE tool (OG-15; T1 mixed independence) → licences ≠ use.
- Self-report: link Ch 2 `#rule-evidence` (METR, r = 0.17, Anthropic drift); do not repeat numbers beyond one line.
- Stack Overflow 2025 per-phase reluctance (RR-9, RR-48, BN-32): who wants AI where differs by phase → assess per phase.

**13.2 `four-readings`** The four readings, per phase × task type. Threat-grid: reading | evidence to pull | red flag.
- Review mode (approval logs, attribution); verifier (exists? who can edit? → Ch 2 `#oracle-principle`); credentials (inventory → Ch 12 `#migration-steps` step 1); risk ceiling (Ch 2 `#rule-ceiling`, MM-27).
- Combining rule: level = higher of review mode and credentials (Rule 2); claimed L3 without uneditable verifier = L2.

**13.3 `phase-by-phase`** One line per Part II chapter: what to look for / the entry criterion it sets (all eight Part II chapters + grid anchors).

**13.4 `find-the-constraint`** Locate the constraint.
- Link Ch 1 `#where-the-constraint-goes-next` for DORA's VSM quote; add DORA Dec 2025 blog "local optimizations that pile up work downstream" (OG-28).
- Measure where work waits (review wait vs active time, CI queue, incident load). Rule 6 check.

**13.5 `starting-profile`** The team's starting profile.
- DORA 2025 seven archetypes with shares (GP-R4; pp. 15–18), caveat "interpretation of the data"; amplifier quote (MM-12).
- Legacy bottleneck 11% / constrained by process 17% → fix stability or process first.
- Stanford matrix: brownfield high complexity +0–10% (T3, link Ch 4).
- Enablers: link Ch 2 `#enablers`; check them as preconditions (don't relist).

**13.6 `choosing-where-to-climb`** From scores to a starting point (the book's proposal).
- Order: fix red rows (credentials above review) → hold/step down → pick one candidate task type: verifier present, reversible, under ceiling, near the constraint → usually maintenance (Ch 11; Ch 14).
- Illustrative assessment summary sheet in `<pre class="standalone">`, names no organisation.

**What to do** (6 bullets).

Cases used: DORA 2025 archetypes (anchor, §5.3). Also-cited: DORA 2024/2025 (Ch 1), Anthropic telemetry (via Ch 2 link), Stanford matrix (Ch 4). Wiki links: /concepts/jagged-frontier/, /operations/governance-compliance/agent-inventory-and-registry/, /operations/governance-compliance/governance-in-practice/.
