# Ch 6: Scoping and the First Win (`scoping-and-the-first-win`)

Part II · The Engagement / 第 II 部分 · 一次交付 · phase-num 6 · 3,500–4,500 words.

## p.goal draft
> A first win nobody agreed to measure cannot be won. Fix the metric, its baseline and its threshold before building, then pick a target that matters to the business and still fits in weeks.

(First sentence: 10 words.)

## STEPs

**6.1 High stakes, small scope.**
- Jarvis: "They pick something with genuinely high stakes," not "an edge case… over to the side of the company" (T2).
- Stanford's 51 deployments: 73% started small deliberately, and 63% framed their pilots as experiments. This is T2, a draft, and counts successes only, so flag the survivorship.
- MIT NANDA: narrow wins, then expand (T2). Give the method caveat in one clause.
- The tension: the target must matter and must also fit.

**6.2 The metric before the build.**
- The success criterion has four parts: a metric, a threshold, a held-out set, and the improvement over baseline (Claude docs, T2). Make it multidimensional.
- RAND: commit to a problem for at least a year (T1). The first win is the start of that commitment, not the whole of it.
- Who owns the held-out set, and why it must be the customer.
- This chapter sets the threshold; Ch 9 builds against it. Name Ch 9 in prose until it is published.

**6.3 Measure the baseline in week 1.**
- No baseline means no win.
- How to measure the current process cheaply: sample, time and label.
- Alpine Edge's four weeks: baseline, one end-to-end workflow, harden and pilot, prepare for production. Its warning sign: "no production-like data access by end of week one" (T4).

**6.4 The "not now" list.**
- Scope creep is handled by writing it down, not by refusing it (Alpine Edge "not now", T4).
- Jarvis: "bias for moving fast, proving out any brick walls and then adjusting the scope" (T3).
- Job posts treat the scope/speed/quality trade-off as the core skill: OpenAI, Glean, Decagon (T4).

**6.5 The first demo.**
- Show the real workflow on real or redacted data, never a slide.
- Demo what the user does next, not the model's cleverness.
- Say out loud what isn't done.
- WeightWatchers/Sierra started on small traffic of about 100 concurrent inquiries, then expanded (T2).
- Sierra's "within 48 hours" is a vendor best case: low confidence, and goes in a Verified box if used.

**6.6 The composite (beat 3).**
- Scope: first-notice-of-loss triage for auto claims only. Property claims go on the "not now" list.
- Metrics: routing accuracy and time-to-first-action against a week-1 baseline. The threshold is set with the claims director.
- The demo uses redacted real documents in week 2.
- Patterns behind it: Jarvis on high stakes, the Claude docs criteria, Alpine Edge's four weeks.

**6.7 The template: the one-page scope.**
- Show it blank, then filled.
- Fields:
  - the problem (observed, from Ch 5);
  - the in-scope workflow;
  - the "not now" list;
  - success metrics, each with its baseline, how it is measured, and its threshold;
  - the held-out set and its owner;
  - the first demo date and audience;
  - a week-by-week plan;
  - the top risks and the earliest signal for each;
  - sign-off names.

## Failure signals
- The threshold is "as good as possible".
- There is no baseline by week 2.
- The target workflow has no owner.
- The demo is on synthetic data only.
- The scope has no "not now" list.

## Ready to move on (checklist)
- [ ] The metric, baseline and threshold are signed.
- [ ] The held-out set has an owner.
- [ ] The "not now" list has been agreed.
- [ ] The first demo is scheduled with real users.
- [ ] A week-by-week plan exists.

## Closing tip
Put the threshold in the sponsor's words, and get it in writing before the first line of agent code.

## Links
- `/concepts/evals-101/`
- `/operations/evaluation-and-observability/eval-driven-agent-development/`
- `/books/ai-driven-sdlc/the-90-day-pilot/`
- The discovery chapter in this book.
