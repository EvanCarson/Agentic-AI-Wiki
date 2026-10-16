# Ch 14 outline — The 90-Day Pilot (`the-90-day-pilot`)

**Argument (bible §2):** pilot one phase × one task type with a verifier, a baseline and a pre-agreed stop rule, start in maintenance, and prepare the environment before judging the model.

**Lede:** Most published AI rollouts report who installed the tool, not what it changed, so they cannot tell anyone whether to go further. A pilot that can: one phase, one task type, a check the AI cannot edit, a baseline before day one, a stop rule signed before results. Start in maintenance; fix the environment before judging the model (dotnet 38.1% → 69%, RR-24/GM-R7).

## 14.1 What a pilot decides (`#what-a-pilot-decides`)
- A pilot decides one level change for one task type (Ch 2 #rule-task-type), not "should we adopt AI".
- Adoption funnels are not outcomes: Accenture 81.4% same-day install, 67% ≥5 days/week, n not given (T3 vendor · GF-22); ZoomInfo four-phase rollout, >400 devs, 33% acceptance, no time saved (T2 · GF-23); Cui et al. 30–40% never tried a free tool (T1 mixed · OG-15) — link Ch 4.
- Volume trap: Ch 1 #pilot-that-looked-like-success (link only).
- Weak-claim example: Mercado Libre seat counts disagree (9,000+ / 10,000+ / 13,300), 50% is an SVP estimate (T4 · GF-24).
- Vendor box: Booking.com via DX (+16% daily vs non-users; +31% over baseline; observational) (GF-29).

## 14.2 Pick the task: start in maintenance (`#pick-the-task`)
- Four tests: an existing verifier the agent cannot edit; reversible by revert; recurring volume; a named owner. Risk ceiling (Ch 2 #rule-ceiling). Input: Ch 13 assessment.
- Maintenance first (bible Decision 6; Ch 11 #ladder): compiler + tests pre-exist. Exclude schema/data migrations.
- Fallback in coding: task type matters (dotnet cleanup 84.7%, testing 75.6%, performance 54.5%; T2 · GM-R7).
- Level under test is L2; the pilot collects the 90-day data that L3 entry demands (Ch 2 #level-3).

## 14.3 Prepare the environment first (`#prepare-the-environment`)
- dotnet: 38.1% → 69%; first month 41.7% → ~71% (T2 · RR-24); Ch 6 #anti-patterns.
- Permission envelope for L2 (Ch 12 #permission-envelope).
- Single-run trap: AAIF one run −44% vs five runs +9–10% (T3 · RR-19); wiki eval-variance page.
- Spec overhead 45–90 min per medium feature if the task needs specs (T3 · GF-3) — link Ch 5.

## 14.4 Baseline and comparison (`#baseline`)
- ANZ: controlled design before scaling; −42.36% time, n=22, security inconclusive; "participation rates fluctuated" (T2 · GF-21).
- Spec Kit pilot: before/after without control; "temporal confounds (e.g. improving AI model capabilities…)" (T3 · GF-3).
- Book's proposal: concurrent comparison (same-class human changes, same window), pin the model and harness, baseline from the previous 90 days.
- Cost baseline: Ch 4 cost per merged change incl. review minutes (#what-it-costs).
- Pair flow + stability; wiki shadow-mode / online-experiments pages.

## 14.5 Write the stop rule before day one (`#stop-rule`)
- dotnet reverts 3/535 vs 33/4,251, not significant (T2) → pilots cannot prove small harms.
- Illustrative arithmetic (pre): 150 PRs, 0.8% baseline, trigger at ≥4 reverts → 3% false alarm, 66% catch at 3%.
- Book's proposal: hard stops (safety), soft holds (flow), named decider; don't stop on an early dip (DORA platform J-curve, OG-30). Detail of thresholds → Ch 17.

## 14.6 The 90 days (`#the-90-days`)
- Threat-grid: Days 1–15 prepare & baseline; 16–30 shake-down (not counted); 31–75 measured run; 76–90 read and decide.
- Scorecard `<pre>` (book's proposal); Appendix A Templates carries the blank.

## 14.7 Reading the result (`#reading-the-result`)
- Three outcomes: extend (start L3 groundwork / next task type), hold, step down. Each is a valid result.
- What the pilot doesn't tell you: numbers don't transfer (Ch 11 #slack-contrast); ANZ's ~1,000-engineer rollout only "early data" → scaling needs its own measurement (Ch 15).

## What to do (callout tip)
