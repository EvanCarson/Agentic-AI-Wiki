# Outline: Appendix A — Templates (`templates`, ~2,500 words)

**Argument (bible §2):** the book's rules only change what an agent may do once they become forms someone must fill in with evidence. Every template is labelled the book's proposal; none is a published, outcome-validated standard.

**Lede:** a rule that lives in a slide deck does not change an agent's authority; nine forms turn the rules (review by evidence, an oracle the agent cannot edit, human-only sign-off, triggers written before the pilot) into blanks you fill with evidence before you climb.

Each step: one paragraph (when to use, source chapter linked, primaries) + `<pre class="standalone">` (English in both locales, byte-identical, `[placeholder]` convention).

- A.1 Using these templates — book's proposal; English in both editions; fill against the running system; dated October 2026.
- A.2 Self-assessment grid — blank copy promised by `the-maturity-model#self-assessment-template`; Rule 2 column; Ch 13 walks through it.
- A.3 Agent instruction file — `coding#l1-to-l2`; Anthropic best-practices include/exclude list and the "would removing this…" test; GitHub's six areas + Always / Ask first / Never; mandatory rules in hooks (`coding#guardrails`); wiki blog on formats.
- A.4 Spec template — `requirements-specs-and-design#migration-steps`; Anthropic's spec shape quote; one-sentence size rule; EARS (Kiro docs); frozen acceptance criteria; named approval = L2 evidence; wiki spec-driven playbook.
- A.5 Review checklist — `code-review#guardrails`; separation of duties (GitHub cloud agent docs); design stays human (uReview "only has access to the code"); size cap; oracle files; Not-useful control.
- A.6 Merge-Readiness Pack — Hassan et al. (arXiv 2509.06216 v2): five criteria + progressive disclosure; `code-review#migration-steps` bundle contents; maintenance evidence pack; wiki decision receipts.
- A.7 Provenance policy — Linux kernel coding-assistants doc (docs.kernel.org, 7.3.0-rc7, as of October 2026): `Assisted-by: LLM [TOOL1] [TOOL2]`; "AI agents MUST NOT add Signed-off-by tags"; four human responsibilities; note linux-next copy lacks the Attribution section (volatile). Book's proposal for who signs an L3 change. Links `scaling-across-teams`, `regulatory-and-licensing-status`.
- A.8 Permission-envelope checklist — `security-permissions-and-blast-radius#permission-envelope` rows as checkboxes; Rule 2 result line.
- A.9 Pilot scorecard — `the-90-day-pilot`; one phase × one task type, verifier, baseline, stop rule; flow paired with stability; cost per merged change (`economics-risk-and-measurement#what-it-costs`); success-rate definition (dotnet); not-success list (Stanford pilot, `the-bottleneck-moves#pilot-that-looked-like-success`).
- A.10 Rollback-trigger sheet — `measuring-success-and-rolling-back`; Tricorder (10%, disable until fixed); Google SRE auto-downgrade + Red Button (`operations-and-incidents#guardrails`); NIST AI RMF MANAGE 2.4 quote.

**What to do:** copy, fill per task type, store beside the code under code-owner review, re-date each quarter, never accept a blank evidence cell as a pass.

Do-not-use list respected: no 19.7% hallucination figure, no Morgan Stanley/Booking numbers.
