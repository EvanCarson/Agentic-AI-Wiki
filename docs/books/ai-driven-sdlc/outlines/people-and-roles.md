# Ch 16 People: Roles, Skills and the Junior Pipeline — outline (`people-and-roles`, ~3,000 words)

**Argument (bible §2):** AI raises juniors' short-term output and lowers their skill formation, so an AI-driven SDLC must design the junior track deliberately — tutor modes, review-first apprenticeship, protected mentorship — and redesign roles around supervising and verifying.

**Lede:** Anthropic's RCT (50% vs 67% mastery, no significant speed gain, biggest gap in debugging) → AI lifts a junior's output today and can cut the skill supervision needs tomorrow → design the junior track and the roles on purpose.

## 16.1 The work moves to supervising (`#what-changes`)
- Level = what a human reviews (back-ref Ch 2 `#defining-axis`), so every climb changes jobs.
- Anthropic internal study (OG-21–23, fetched primary): "manager[s] of AI agents"; "70%+ to being a code reviewer/reviser"; "supervising Claude requires the very coding skills that may atrophy from AI overuse"; juniors ask less. n=132 survey, 53 interviews, vendor self-study, T3.
- DORA 2025 work intensification (BN-15).
- Danish null: employers absorb AI through task reorganisation incl. "AI oversight" (GF-31; back-ref Ch 4).

## 16.2 Output up, skill down (`#output-versus-skill`)
- Cui et al. (OG-15/16): juniors and short-tenure adopt and gain more; noisy. Back-ref Ch 4 `#the-range`.
- Anthropic skill RCT (FR-C28, OG-19/20; arXiv 2601.20245) with Measured-by; patterns high vs low; agentic caveat.
- Bastani et al. PNAS (FR-C29): GPT Base −17% later; tutor with hints mitigated. Different population.
- Microsoft/CMU CHI '25 (FR-C30): confidence in GenAI ↔ less critical thinking.
- Both hold: short-term output vs long-term formation (AG §5.20).

## 16.3 The hiring signal (`#junior-hiring`)
- Canaries Aug 2026 (OG-1, 3, 4, 6; GF-25): 19% below counterfactual, hiring not firing, no economy-wide displacement, authors' caveats; no developer-specific figure.
- Hosseini & Lichtinger (OG-8–10, GF-26): −9% after six quarters, seniors unchanged, exposed tasks removed from junior postings.
- Callout: counter-signals and reversals (Cloudflare 1,111 interns OG-54; Duolingo walk-back LC-34; Salesforce freeze LC-29) — T4.
- The pipeline logic: L3 needs reviewers who can debug; they come from juniors (argument, not a forecast).

## 16.4 Designing the junior track (`#junior-track`) — the book's proposal
- Grid: practice / what it guards against / evidence: tutor mode (comprehension patterns; Bastani hints; Zalando "manual coding expected"), review-first apprenticeship (link code-review), protected mentorship (juniors ask less), AI-off debugging drills (debugging gap), graduated authority (juniors climb the same ladder).
- Wiki: tutoring-and-learning-agents.

## 16.5 Measuring ramp-up honestly (`#ramp-up`)
- DX vendor box (GF-30): 49 vs 91 days; reverse causation; DX's own quality caveat.
- Pair speed with a comprehension check.

## 16.6 Roles by level (`#roles-by-level`) — the book's proposal
- Grid: L2 reviewer of every diff; L3 verifier owner / router / evidence-bundle reader; L4 named accountable human with documented risk acceptance (bible §3.2).
- Provenance: human accountability, link scaling-across-teams.

## 16.7 People metrics and consent (`#people-metrics`)
- DX framework: against "top-down mandates and individual evaluation" (OG-37). Mandates tied to reviews unmeasured (Shopify, Coinbase; LC-33, LC-25), link scaling-across-teams.
- Stack Overflow 2026: 17.1% avoid AI over skills concern (OG-34).
- Link measuring-success-and-rolling-back; worker-consultation wiki page; afk-coding blog.

## What to do (callout tip, 6–7 bullets)
