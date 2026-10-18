# Running composite: locked timeline (binding for Ch 4–13)

The bible (§6) gives one beat per chapter. This file fixes the facts and the calendar, so
chapters written by different writers cannot contradict each other. **Ranges only; no point
figures; never name the insurer or the vendor.** Refer to "the insurer", "the FDE", "the lead",
"the COO", "the claims director", "the AE".

## Already published (Ch 4–6), do not contradict

- Customer: a regional property-and-casualty insurer, 2,000–5,000 staff, an on-prem claims
  system, a document store, a strict model-risk function, a new COO as sponsor.
- Ch 4: Sales had promised a free 3-month PoC with "a customer chatbot". It was reshaped into
  a **30-day paid pilot** at a 20–50% discount on prorated annual value. The full fee is credited
  if the annual deal is signed within about a month. The annual contract shape was agreed in
  advance (scope: claims triage). Terms: production-like data access by **day 5** (read-only
  replica) or the clock stops, and the security/model-risk review starts day 1. The KPI is
  **claims cycle time**, the number the COO reports to the board, with the baseline taken from
  claims-system timestamps in week 1.
- Ch 5: The FDE spends a few days observing. Adjusters spend roughly **a third to a half** of
  each day triaging incoming claim documents. "Chatbot" was a proxy for "claims take too long".
  The COO confirmed this midway through week 2.
- Ch 6: Midway through week two the scope is signed. It covers **auto first-notice-of-loss
  (FNOL) document triage** only, with property claims, the chatbot and write-back on the "not
  now" list, and the agent is **propose only**: a suggestion in the adjuster queue. The
  metrics:
  - routing accuracy, labelled by 2–3 senior adjusters on a held-out week-1 sample of a few
    hundred claims;
  - time-to-first-action, with a baseline of 1–3 days and a target of the same work day;
  - a guardrail that a litigation-flagged claim is **never** sent to the fast queue.

  The threshold, in the sponsor's words, is "at least as accurate as my senior adjusters, and
  nobody waits a day for a first look". The threshold owner is the claims director. The
  day-5 data term slipped, so the lead paused the 30-day clock, and the COO agreed to proceed
  on a redacted export. The demo is at the end of week 2 on redacted real claims. Week 3 is
  the end-to-end workflow on sanitised fixtures, with a shadow-run on live auto claims once
  read access lands. Week 4 measures against the threshold and holds a readiness review. The
  top risks are a late replica, the threshold owner disengaging, and model risk blocking.

## Locked for Ch 7–13

| Ch | When | Facts every chapter must agree with |
|---|---|---|
| 7 data access | weeks 1–3 | The replica request was filed in week 1. It needed the claims-system owner, IT security and the data-protection officer, and read access to the replica landed **in week 3** (late; that is why the clock paused). Meanwhile the FDE built on **sanitised fixtures** shaped like real FNOL packets, plus the redacted export. The documents are scanned PDFs, photos, emails and adjuster notes, and they are ugly. **Write-back stays deferred**: suggestions appear in the adjuster's existing queue view, read from a side table the insurer's team owns, so nothing writes into the claims system. Template: data-access request (blank + filled). |
| 8 security | from day 1; decision in week 3 | The model-risk review started in week 1 and was booked by week 2. Its first questions were retention and training (ZDR), residency (data stays in-region), and audit (every suggestion logged with inputs, outputs and the version). The FDE flags that **claimant-uploaded documents are an indirect prompt-injection path**, so the agent is propose-only, has no tools that act, and runs on a read-only identity. In week 3 model risk approves the **read-only shadow-run**, with production use conditional on the eval result and the audit log. Template: security-questionnaire answers. |
| 9 evals | week 2 → about month 3 | The eval starts with **five cases from the senior adjusters** in week 2, grows to dozens of real failures from the shadow-run, and gains a regression suite. Accuracy reaches the **low 80s** quickly, while the senior adjusters themselves agree in the low-to-mid 90s on the held-out set. At the **week-4 readout** (on the paused clock) time-to-first-action meets the target in the shadow-run, but routing accuracy is below threshold. The FDE delivers the bad news **with a plan**: the failure categories, what each fix is, and the date the number will be re-measured. The COO **signs the annual contract** with go-live gated on the threshold (the credit-on-conversion applies). Accuracy then **stalls below the threshold for several weeks** and reaches it in **roughly two to three months** after the pilot. Template: eval plan. |
| 10 build | months 2–3 | Production is deployed **inside the insurer's VPC / private cloud**, using an approved model endpoint and their identity provider. Rules that must hold are **enforced in code outside the model**: litigation-flagged claims are never auto-routed to the fast queue, and certain claim types always go to a human queue. The FDE builds the least clever thing that clears the eval. Template: architecture decision record. |
| 11 production & handoff | months 3–6 | Go-live follows the threshold, as a staged rollout. In the **handoff drill** the insurer's ops team deploys, breaks and recovers it from the runbook alone, with the FDE in the room but silent. Adoption lags: adjusters ignore suggestions for weeks, then use them once their **overrides visibly improve it** over months. The FDE briefs the COO with the cycle-time KPI and time-to-first-action together. Template: runbook + handoff doc. |
| 12 feeding the product | months 4–8 | The document-triage component and its eval harness become a **reusable product template**. A **second insurance customer** reuses part of it (ranges only for the reuse). Template: product-feedback brief. |
| 13 failure | months 6–9 | The expansion to **property claims** (the "not now" trigger fired once auto met the threshold) **stalls when the COO's priorities shift**. The lead and the FDE run a post-mortem and decide to **reset the scope or walk**. Show the decision rule; whichever way it goes, the auto triage stays in production, owned by the insurer. Template: engagement post-mortem. |

Each beat's last sentence cites the verified pattern it dramatises (bible §6, right column).
