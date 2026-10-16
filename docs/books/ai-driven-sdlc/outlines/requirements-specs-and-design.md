# Outline: Ch 5 — Requirements, Specs & Design (`requirements-specs-and-design`)

**Argument (bible §2):** when an agent implements whatever the spec says, the spec becomes the product; spec depth should scale with task size, design stays human-owned at L1–L2 by choice, and the work is moving decisions into the agent's context, not delegating them.

**Lede:** An agent builds what the spec says, including the gaps. Once implementation is cheap, the spec is the product, and its errors ship at machine speed. Scale spec depth to task size, keep design decisions human at L1–L2, and spend the effort moving those decisions into the agent's context, not handing them over.

## 5.1 What changes (`#what-changes`)
- The spec becomes the product: Spec Kit "intent is the source of truth", "our experiment" (RR-1, github.blog SDD post).
- Answer.AI "days pursuing impossible solutions" (GM-R8; link case-studies#case-answer-ai-devin); GitHub docs: keep "Tasks lacking clear definition" for humans; issues need "Complete acceptance criteria" (RR-30).
- Ch 1 said "deciding" is argued, not measured, as next constraint — refer back, don't repeat.
- Resistance: SO 2025 69.2% vs 28.9% (RR-9). Anthropic planning share 1.0% → 9.9% (RR-10, T3).
- Design: the decision moves into context — Anthropic CLAUDE.md "Architectural decisions specific to your project" (RR-15).

## 5.2 The ladder for this phase (`#ladder`)
- Two grids (requirements, design), same criteria as Ch 2; deeper per-row explanation.
- Req: L0 SO; L1 RR-10, MS (vendor box later); L2 RR-7/RR-3/RR-1 + GF-2/GF-3/GF-4; L3 Kiro Quick Spec "without approval gates" (RR-3) — no outcome evidence; L4 none; Berkeley Level III "decides what should be built" excluded (MM-10).
- Design: L0 none; L1 ICSA 2024 (RR-11), DRAFT 4,911 ADRs (RR-12); L2 dotnet 16%/8% of 253; 1.8% architectural comments (GM-R7); L3 none — Thoughtworks "Architecture drift reduction with LLMs" Assess (GM-N2), uReview no access (GM-R10); L4 none, counter-evidence Lovable/Moltbook (FR-C11/C12).

## 5.3 The case (`#the-case`)
- Anchor: Böckeler three-tool SDD evaluation (T1 qualitative; RR-4/5) — taxonomy; sledgehammer; markdown review; false sense of control.
- Then the outcome data: EPIC (GF-2, T1 correlational, confounded), Spec Kit pilot (GF-3, T3, overhead 45–90 min), Spec Kit Agents (GF-4), no Kiro/Tessl study (GF-5). Thoughtworks SDD Assess (RR-6).
- Design half: dotnet closure reasons (GM-R7, T2); Lovable/Moltbook (FR-C11, C12, T1) → link security chapter.
- Vendor box: Morgan Stanley 280,000 hours (GF-1, T4 secondary).
- Worked example (illustrative arithmetic): spec overhead 45–90 min vs pilot lead time 6–9 working days → ~1–3%; vs a one-sentence diff → overhead exceeds the change. Size rule.

## 5.4 Migration steps (`#migration-steps`)
- L0→L1; L1→L2 (named task type; interview → SPEC.md → fresh session; spec template; size threshold; design options in plan mode, human picks, ADR → instruction file; closure-reason tracking); L2→L3 (requirements only, routine inbound, reproduction test as verifier — the book's proposal, no evidence); design stays L2.

## 5.5 Guardrails (`#guardrails`)
- Approved spec frozen; agent may not edit acceptance criteria/verification step (oracle principle link).
- Security architecture human-owned, tested (Lovable "scan only checks policy exists"); link security chapter.
- Mandatory rules in hooks not prose ("advisory" vs "deterministic", RR-21).
- Instruction file minimal, human-written (GM-N1 Radar "instruction bloat"); link coding.

## 5.6 Metrics (`#metrics`)
- Closure reasons (wrong approach / design rejected); spec overhead minutes; bug-fix commit share; reverts within 2 weeks; spec review time; pair with stability (Ch 17 in prose).

## 5.7 Anti-patterns (`#anti-patterns`)
- Sledgehammer; unread spec; spec as false control; AI-generated instruction bloat; delegating security architecture; "AI decides what to build"; unsatisfiable spec.

## What to do
- Size rule; interview → spec → fresh session; spec template (files/interfaces, out of scope, e2e verification); freeze criteria; ADR into instruction file; track closure reasons; security human-owned. Next-level entry criteria: L2 = 100% recorded spec approval for a named task type; L3 = verifier + 90-day comparison (no one has published).

Links: the-maturity-model#grid-requirements, #grid-design, #oracle-principle, #rules; the-bottleneck-moves#where-the-constraint-goes-next; case-studies#case-answer-ai-devin, #case-dotnet-runtime; coding; code-review; testing-and-verification; security-permissions-and-blast-radius; Part III (pilot, templates) prose only. Wiki: §7.2 list.
