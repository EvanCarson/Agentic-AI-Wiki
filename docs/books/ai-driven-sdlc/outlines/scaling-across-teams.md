# Ch 15 Scaling Across Teams — outline (`scaling-across-teams`, ~3,000 words)

**Argument (bible §2):** scaling is governance by level: a clear and communicated stance, provenance, and a permission model whose controls tighten as autonomy rises; mandates have no published outcomes, clarity does.

**Lede:** The companies that ordered every engineer onto AI tools have published no outcomes; the one organisational capability measured to amplify AI's benefit is a stance that is clear, whatever it says. Scaling past the pilot team is governance by level: a written stance per phase and task type, provenance on every change, and central controls that tighten as the AI's authority rises.

## 15.1 What changes after the pilot (`#what-changes`)
- Pilot proved one task type on one team; scaling multiplies teams, tools, credentials.
- DORA: "AI adoption is an organizational transformation"; value-stream mapping so gains aren't local (OG-28). Back-ref bottleneck #queue-in-telemetry.
- Platform J-curve (DORA 2024, OG-30).
- The book's proposal: three things central (stance, provenance, permission model), the rest local. Zalando "never centrally mandated the use of a single tool" (GF-27).

## 15.2 Mandate or clarity (`#mandate-or-clarity`)
- Cui et al.: 30–40% never tried a free tool (OG-15; anchored Ch 4).
- Mandates/bans: Shopify memo (LC-33, secondary), Coinbase firings (LC-25, secondary), Goldman "hundreds of Devins" plan (LC-31, secondary), Samsung ban (OG-45, Bloomberg via secondary). No outcomes. Measured-by: T4 policy.
- DORA clear stance quotes (OG-27, verified 2026-10-16).
- DX: "strongly caution against top-down mandates" (OG-37, verified; vendor).
- Trade-off: clarity without enablement leaves the 30–40%.

## 15.3 Write the stance by level (`#stance-by-level`) — the book's proposal
- threat-grid: element / what it says / where enforced (scope per task type, risk ceiling, tools & data, permission mode per level, provenance, step-down authority, measurement).
- Climb by entry criteria, not by request; stance versioned in a repo.

## 15.4 Central and local, by level (`#central-and-local`) — the book's proposal
- threat-grid L1–L4: decided centrally / decided by the team.
- Mechanisms: managed settings (back-ref Ch 12 #migration-steps); code-owner review on agent config (Pillar rules-file backdoor, SB-13); GitHub cloud agent disabled by default, enabled per organisation (docs, verified); model gateway (Zalando LiteLLM proxy: MAU/WAU/model/User-Agent; "blocking access is the only effective measure"); inventory by scanning images (Zalando). Nx one line → Ch 12 #case-nx.

## 15.5 Provenance (`#provenance`)
- threat-grid of three OSS camps: ban (Gentoo, QEMU), presumed tainted (NetBSD), allow with disclosure (kernel, Fedora). All verified at primaries 2026-10-16 except Fedora (Phoronix, secondary).
- `<pre>` kernel Assisted-by format; flux note (linux-next moves attribution to a separate guidelines doc).
- The L3/L4 question: who signs when no human wrote the diff → book's proposal: the approver (L2) or named task-class owner (L3/L4); attribution machine-readable so the L3 escaped-defect comparison is computable.
- Microsoft CCC filter no longer required as of 3 Apr 2026 (OG-43, verified) → Appendix B.

## 15.6 Enablement and platform (`#enablement`)
- Zalando case (GF-28, verified): guild, labs, hackathons, trainings, Tech Radar, manual coding expected. T3, no adoption figures.
- No non-vendor before/after enablement data; Booking via DX is in the pilot chapter.
- DORA quality-platform trade-off (back-ref Ch 2 #enablers). Budgets: back-ref Ch 4 Uber.

## 15.7 Regulation and performance reviews (`#regulation`)
- EU AI Act Art. 4 literacy since 2 Feb 2025 (OG-46); Annex III 4(b) worker evaluation, inference (FR-C36). DX: keep metrics out of individual evaluation. Link Appendix B, people-and-roles, measuring-success.

## What to do (callout tip)
