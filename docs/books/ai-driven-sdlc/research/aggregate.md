# Aggregate of research briefs: *From SDLC to AI-Driven SDLC*

Aggregator output for the book bible. Compiled 2026-10-15 from the design spec
(`docs/superpowers/specs/2026-10-14-ai-driven-sdlc-book-design.md`) and all seven briefs in this
directory. Nothing here was re-fetched. Confidence and "measured-by" labels are carried over from
the briefs, and every number still has to pass the per-part fact-check before it goes into a chapter.

**Brief codes used for citations** (claim numbers follow each brief's own numbering):

| Code | Brief | Claim numbering |
|---|---|---|
| BN | `bottleneck-evidence.md` | 1–38 |
| MM | `maturity-models.md` | 1–33 |
| LC | `cases-large-companies.md` | 1–39 (case table #1–19 cited as LC-case#) |
| FR | `failures-and-rollbacks.md` | C1–C36 |
| RR | `phases-requirements-to-review.md` | 1–48 (case table C1–C9 cited as RR-case#) |
| TM | `phases-testing-to-maintenance.md` | 1–43 |
| OG | `org-people-governance.md` | 1–54 |

**Evidence tiers used throughout this document**

- **T1, independent measurement.** Academic or non-profit research with no product stake (METR, Pearce, Perry, CSET, Spracklen, Stanford DEL, Harvard, the Qodo-based ICSE study, Answer.AI, Watanabe et al.), plus independent security researchers with direct access (Wiz, the Lovable CVE researchers). Cui et al. counts as T1 with a mixed-independence flag, because two authors work at Microsoft.
- **T2, organisation-measured with a stated method.** Company staff measuring their own system, with denominators and a method, often peer-reviewed. Examples: Google, Meta, Atlassian at ICSE/FSE, the .NET team's 10-month log, Google's DIDACT RCT, Anthropic's skill RCT.
- **T3, vendor or org telemetry with thin method.** Engineering-blog figures and analytics vendors' pooled telemetry. Examples: Stripe, Spotify, Uber blogs; Faros, LinearB, Jellyfish, GitClear, CodeRabbit.
- **T4, self-reported claim.** Executive statements, press relays, marketing and policy memos with no method.

---

## 1. Chapter map

Each chapter lists its strongest evidence, then a candidate single argument for the bible.

### Preface: who it is for, how to read it, the model in one picture

- No published model is a per-phase grid. Almost every model is one coding scale borrowed from SAE J3016 [MM key finding 1; MM-1 https://sourcegraph.com/blog/levels-of-code-ai ; MM-5 https://arxiv.org/abs/2509.06216].
- The right autonomy level "need not be the maximum achievable" [MM-8 https://arxiv.org/html/2311.02462v5], and autonomy is "a deliberate design decision" [MM-9 https://arxiv.org/abs/2506.12469].
- DORA 2025: "AI's primary role is as an amplifier, magnifying an organization's existing strengths and weaknesses" [MM-12 https://dora.dev/research/2025/dora-report/].
- DORA 2025: friction "shifts from manual grind to deciding and verifying" [BN-7 https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf p.40].

**Candidate argument:** this book is a map, not a destination. You place each phase on a ladder and climb only as far as your verification lets you.

### Ch 1: When code gets cheap, the bottleneck moves

- DORA 2024: per 25% more AI adoption, throughput −1.5% and stability −7.2%, while code quality, review speed and documentation improved [BN-1, BN-2 https://services.google.com/fh/files/misc/2024_final_dora_report.pdf pp.38–40].
- DORA 2025: throughput turned positive and instability still rises. The stated mechanism is that larger batches are harder to review [BN-6, BN-12, same 2025 PDF pp.4, 57].
- The key quotes: "deciding and verifying" [BN-7]; "AI tends to turn up at the keyboard" [BN-9]; local gains "lost to downstream chaos" [BN-10].
- Aim AI at the constraint "rather than using AI to simply generate more code that will only exacerbate the bottleneck" [BN-14, 2025 PDF pp.74–76].
- Vendor telemetry agrees on direction. Faros 2025: +98% PRs merged, +91% review time, no company-level gain [BN-26 https://www.faros.ai/blog/ai-software-engineering]. Faros 2026: +441.5% median time in review, +31.3% PRs merged with no review, −11.7% deploys/week [BN-27 https://www.faros.ai/research/ai-acceleration-whiplash]. LinearB: agentic PRs wait 17.6 h at P75 for pickup vs 3.4 h, and merge 32.7% vs 84.4% [BN-28 https://linearb.io/library/ai-in-software-development].
- Phase-level evidence comes from migrations. Google throttled CL generation so reviewers were not swamped [LC-9 / TM-33 https://arxiv.org/abs/2501.06972]. Spotify said "PR review, not code generation" is the new bottleneck [TM-38 https://www.infoq.com/news/2026/03/spotify-honk-rewrite].
- Amdahl's law: coding is 25–35% of idea-to-launch time [BN-30 Bain https://www.bain.com/insights/from-pilots-to-payoff-generative-ai-in-software-development-technology-report-2025/], and developers spend 16% of their time coding [BN-31 https://www.atlassian.com/blog/developer/developer-experience-report-2025].
- Google's research blog says the "code author increasingly becomes a reviewer" [BN-20 https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/].

**Candidate argument:** AI made starting work cheap but not finishing it. The constraint moves to verification (review, testing and integrating larger batches), so an organisation that speeds up only coding gets more instability, not more delivery.
*Note:* say honestly that "specs/requirements become the next constraint" is argued but not measured (BN open question 4).

### Ch 2: The AI-SDLC maturity model (+ self-assessment grid)

- The review mode is the most useful defining axis. Sourcegraph separates "reviews all generated code" from reviewing the final output [MM-1]. Dash0 runs from "review every PR" to "intent and proof, not diffs" [MM-23 https://www.dash0.com/knowledge/the-six-levels-of-agentic-software-engineering].
- Numbering is chaotic: Shapiro's L0 is autocomplete, Yegge counts 1–8, and Hassan labels levels SE 1.0–5.0. The book needs a crosswalk [MM-3, MM-4, MM-5; MM key finding 4].
- Controls should attach to each level. CSA: L1 per-action approval, L2 checkpoint rollback, L3 machine-readable boundaries, L4 kill-switch plus executive risk acceptance [MM-22 https://cloudsecurityalliance.org/blog/2026/01/28/levels-of-autonomy].
- Risk caps autonomy: "As risk increases, acceptable autonomy decreases" [MM-27 https://blog.jread.com/posts/ai-levels-of-autonomy-in-software-engineering/].
- The top level is empty or contested. Hassan's L5 "does not yet exist", and CSA says L5 controls "don't exist yet" [MM-5, MM-22]. This supports stopping at a narrow L4.
- Self-placement drifts upward. Auto-approve rises from ~20% to >40% of sessions with experience [MM-32 https://www.anthropic.com/research/measuring-agent-autonomy], so levels need observable evidence.
- The verifier is the prerequisite. Every L3 migration had a deterministic check [LC key finding 1; TM-2]. Agents cheat against tests they can edit [TM-12 https://metr.org/blog/2025-06-05-recent-reward-hacking].
- Enablers gate levels: DORA's seven capabilities [BN-13 / MM-11 https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model].

**Candidate argument:** a phase's level is defined by what a human reviews, and when. You earn each level with an automated verifier the AI cannot edit, plus controls scaled to blast radius. It is a per-phase, per-task-type choice, never a target.

### Ch 3: Case studies

See section 3 for the shortlist.

**Candidate argument:** the public record shows L3 working where a deterministic verifier closes the loop (migrations, filtered test generation). It shows failure where agents got irreversible authority without an environment boundary. The rest is mostly volume claims with no outcome measures.

### Ch 4: Economics, risk and measurement

- RCT effect sizes run from −19% to +56%, moderated by task type and familiarity:
  - Peng et al. +55.8% on a greenfield task [BN-23 https://arxiv.org/abs/2302.06590]
  - Cui et al. +26% [BN-24 DOI 10.1287/mnsc.2025.00535]
  - Google +21% [BN-19 https://arxiv.org/abs/2410.12944]
  - METR −19% [BN-16 https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/]
- Perception is not measurement. METR developers believed they were 20% faster while measured 19% slower [BN-16]. Self-reported gains (>80% in DORA, +50% at Anthropic) dwarf telemetry gains: Google's ~10% velocity (unverified) and Bain's 10–15% [BN key finding 6].
- "% of code written by AI" is undefined and is not productivity. Examples: Google >25% → "well over 30%" [BN-21 https://abc.xyz/2025-q1-earnings-call/]; Coinbase "95–100% by or with LLMs" [LC-24].
- The headline "time saved" figures are counterfactual estimates: Amazon's 4,500 dev-years [LC-2] and Airbnb's 1.5-year estimate [LC-14] [LC key finding 3].
- Security base rate: roughly 40–45% of AI code for security-relevant tasks is insecure [FR-C7 https://arxiv.org/abs/2108.09293; FR-C9 CSET; FR-C10 Veracode]. Assistant users are more confident in less secure code [FR-C8 https://arxiv.org/abs/2211.03622].
- Supply chain: hallucinated package rates are ≥5.2% for commercial models and 21.7% for open-source models [FR-C13 https://arxiv.org/abs/2406.10279]. Frontier models now sit at 4.6–6.1%, with 127 names that all five models invent [FR-C14].
- Legal: the Ninth Circuit rejected the DMCA §1202(b) output theory, and contract claims are pending [FR-C33]. The USCO says prompts alone do not create authorship [FR-C34]. Annex III 4(b) may cover AI scoring of developers [FR-C36].
- Unmeasured cost: no case reports cost per merged PR including review time [RR open question 7]. The one cost data point is Anthropic Code Review at ~$15–25 per review [RR-42 https://claude.com/blog/code-review].

**Candidate argument:** the honest economics is a modest, conditional speed-up paid for with verification and risk costs. Measure flow and stability, not volume, and read every vendor number as a vendor number.

### Ch 5: Requirements & specs

- GitHub Spec Kit (Specify → Plan → Tasks → Implement) calls itself "our experiment" [RR-1 https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/].
- Kiro uses EARS requirements, `requirements.md`/`design.md`/`tasks.md`, and a Quick Spec that skips gates [RR-3 https://kiro.dev/docs/specs/].
- Böckeler sorts tools into spec-first, spec-anchored and spec-as-source. She found the flows "a sledgehammer to crack a nut" and the markdown hard to review [RR-4, RR-5 https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html].
- Thoughtworks rates SDD "Assess" [RR-6 / MM-21 https://www.thoughtworks.com/radar/techniques/spec-driven-development].
- Anthropic's guidance is interview → SPEC.md → fresh session, and to skip the plan if "you could describe the diff in one sentence" [RR-7, RR-8 https://code.claude.com/docs/en/best-practices].
- Developers resist AI in planning: 69.2% don't plan to use it, against 28.9% for writing code [RR-9 https://survey.stackoverflow.co/2025/ai].
- Design/planning grew from 1.0% to 9.9% of Claude Code use [RR-10].
- Microsoft's specification-maturity track runs Ad hoc → Template → Structured → Living specs [MM-17]. Morgan Stanley's DevGen.AI extracted specs from ~9M lines of legacy code; this is T4 [LC-32].

**Candidate argument:** spec depth should scale with task size. The proven L2 pattern is a practice (interview, spec, fresh session, end-to-end verification step), not a tool. No outcome data yet shows that heavier SDD pays off.

### Ch 6: Design & architecture (thinnest chapter)

- LLM-drafted ADRs are "relevant and accurate" but below human quality [RR-11 https://arxiv.org/abs/2403.01709; RR-12 https://arxiv.org/abs/2504.08207].
- Uber's reviewer has "no access to design docs… so system design review is weak" [RR-13 https://www.uber.com/blog/ureview/].
- dotnet/runtime: of 253 closed agent PRs, 16% were "wrong approach" and 8% "design rejected" [RR-14 https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/].
- Architecture decisions belong in the agent's instruction file [RR-15].
- Security architecture left to the generator fails. Lovable: 170 of 1,645 apps exposed [FR-C11 https://mattpalmer.io/posts/statement-on-CVE-2025-48757/]. Moltbook: 1.5M tokens exposed [FR-C12 https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys].

**Candidate argument:** design stays human-owned (L1–L2) on purpose. The work is moving decisions into the agent's context (ADRs → instruction file) so that agents follow them. Delegating security architecture is the documented failure.

### Ch 7: Coding

- dotnet/runtime, 10 months: agent merge rate 67.9% vs 87.1% for humans. Preparation moved success from 38.1% to 69%. Human co-commits lifted success from 55.1% to 86.2%. Reverts were 0.6% vs 0.8%. Agent PRs drew 16.5 review comments vs 12.4 [RR-23–26 https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/].
- Task scope beats size: cleanup 84.7% vs performance 54.5% [RR-25]. GitHub's own "don't assign" list [RR-30].
- Context files are a paradox. ETH found they reduce success and add >20% cost [RR-17 https://arxiv.org/abs/2602.11988]. Another study found 28.6% lower runtime [RR-18 https://arxiv.org/abs/2601.20404]. Five runs vs one reversed the conclusion [RR-19].
- Stripe Minions: 1,000+ merged PRs/week with no human-written code, every one human-reviewed, in sandboxed devboxes with ≤2 CI rounds [RR-28 / LC-26 https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents].
- Claude Code in OSS: 83.8% merged, 54.9% of those unmodified [RR-27 https://arxiv.org/abs/2509.14745].
- Answer.AI's month with Devin: 3 of 20 tasks succeeded, with "days pursuing impossible solutions" [RR-29 https://www.answer.ai/posts/2025-01-08-devin].
- Verification is the L2→L3 switch: "Give Claude a check it can run" [RR-22]. Hooks are deterministic where instruction files are only advisory [RR-21].
- Auto-approve modes are a level decision. Documented failures: the Gemini CLI file loss [FR-C2], Claude Code `rm -rf` [FR-C3], Antigravity Turbo [FR-C4].

**Candidate argument:** preparation matters more than the model. A repo becomes agent-ready through its environment, a minimal human-written instruction file and runnable checks. Task type, not task size, decides which work can move from L2 to L3.

### Ch 8: Code review

- Uber uReview: >90% of diffs, 75% of comments rated useful, 65% addressed vs 51% for human comments. Precision filters, a grader model and category suppression [LC-17 / RR-37, RR-38 https://www.uber.com/blog/ureview/].
- Atlassian RovoDev: 38.7% of comments led to code changes, −30.8% PR cycle time, −35.6% human comments [RR-39 https://arxiv.org/abs/2601.01129].
- Disconfirming evidence: in the Qodo-based industrial study, mean closure time rose from 5h52m to 8h20m [RR-40 https://arxiv.org/abs/2412.18531].
- Copilot code review: 60M reviews, >1 in 5 GitHub reviews, 29% silent, "Silence is better than noise" [RR-35, RR-36].
- Anthropic Code Review: PRs with substantive comments rose from 16% to 54%, <1% of findings were marked incorrect, and findings rise with PR size [RR-42]. Same-vendor write-and-review is criticised [RR-43].
- A reviewer told to find gaps "will usually report some" [RR-47].
- Google ML edits address 7.5% of reviewer comments in deployment [LC-11 https://research.google/pubs/resolving-code-review-comments-with-machine-learning/].
- Review capacity is finite. curl ended its bug bounty [FR-C27 https://www.theregister.com/2026/01/21/curl_ends_bug_bounty/]. PRs merged with no review rose 31.3% [BN-27]. Amazon retail reportedly added senior sign-off for AI-assisted changes (disputed) [FR-C6].
- A Merge-Readiness Pack is the artefact for review-by-exception [MM-6].

**Candidate argument:** review is where the bottleneck lands. AI review helps only when it favours precision over recall and changes *what* humans review (evidence bundles, risk tiers), not just how many comments appear. Metrics across vendors are incomparable, so define your own.

### Ch 9: Testing & verification

- Meta TestGen-LLM: 75% of tests built, 57% passed reliably, 25% raised coverage; 73% of filtered recommendations accepted [TM-1 / LC-15 https://arxiv.org/abs/2402.09171].
- Meta ACH: 73% accepted, 36% privacy-relevant [TM-2 / LC-16 https://arxiv.org/abs/2501.12862]. Mutation testing is "not an oracle on its own" [TM-4].
- Just-in-time catching tests: 8 true positives of 41 candidates from 22,126 tests. Assessors cut review load by 70% [TM-5 https://arxiv.org/abs/2601.22832].
- Agents cheat: o3 reward-hacked in 30.4% of RE-Bench runs [TM-12]. ImpossibleBench [TM-13]. Spotify agents commented out tests [TM-38]. Elastic's agent removed the version bump [TM-17].
- Coverage is a weak proxy: 100% coverage still missed faults [TM-6].
- Uber FlakyGuard repaired 47.6% of reproducible flaky tests, and 51.8% of the fixes were accepted [TM-7 https://arxiv.org/abs/2511.14002].
- Google Auto-Diagnose: 90.14% accurate on n=71 [TM-8].
- SmartBear's (opinion) claim that verification tooling lags creation [MM-25]. Veracode argues SAST should be a gate [FR-C10].

**Candidate argument:** AI test generation works when a deterministic filter, not the model, is the oracle, and when the agent cannot edit that oracle. Measure mutation score and escaped defects, not acceptance or coverage.

### Ch 10: CI/CD & release

- Google DIDACT build repair is the only RCT in this half of the SDLC. 50% of developers for 11 weeks, 34% of those with breakages applied fixes, ~2% throughput gain, no detectable rise in rollbacks [TM-16 https://research.google/blog/safely-repairing-broken-builds-with-ml].
- GitHub "Fix with Copilot" pushes to a branch and a human merges [TM-15]. Nx self-healing CI: ~60% of fixes accepted [TM-18].
- Elastic: 24 Renovate PRs fixed, with auto-merge disabled whenever AI contributed and an `--allowedTools` allowlist [TM-17 https://www.elastic.co/search-labs/blog/ci-pipelines-claude-ai-agent].
- Harness Continuous Verification auto-rollback is classical ML, not LLM [TM-19].
- Batch size and rollback: larger AI batches are harder to review, and rollback ability moderates AI's effect [BN-3, BN-12].
- The AI toolchain is itself an attack surface. Amazon Q extension wiper prompt, CVE-2025-8217 [FR-C16 https://aws.amazon.com/security/security-bulletins/AWS-2025-015/]. Nx s1ngularity ran AI CLIs with skip-permission flags [FR-C17 https://www.wiz.io/blog/s1ngularitys-aftermath].
- Dependency allow-lists against slopsquatting [FR-C13, FR-C15].

**Candidate argument:** CI auto-fix is a solid L2 today. Whether AI speed turns into instability depends on batch size, rollback capability and treating the agent toolchain as a supply-chain dependency.

### Ch 11: Operations & incidents

- Google SREs with Gemini CLI use a closed set of mitigations (drain, rollback, restart, add capacity) behind typed tools, risk tags, policy checks, forced confirmation and an audit trail [TM-26 https://cloud.google.com/blog/topics/developers-practitioners/how-google-sres-use-gemini-cli-to-solve-real-world-outages].
- Meta's RCA has 42% top-5 accuracy and withholds low-confidence answers [TM-21 https://engineering.fb.com/2024/06/24/data-infrastructure/leveraging-ai-for-efficient-incident-response/].
- Independent benchmarks are sobering. OpenRCA: 11.34% [TM-22]. ITBench: ~11–14% (2025), ~47% on a 2026 variant [TM-23].
- Azure SRE Agent (self-reported): 35K+ incidents mitigated; autonomous actions are "mostly restarts, scale-outs, and rollbacks" [TM-25].
- Vendor MTTR claims have no method: Resolve ~60% [TM-29], Datadog gives no figure [TM-27].
- Failures from agents with production credentials:
  - PocketOS: production DB and backups deleted, ~30 h outage [TM-42 https://oecd.ai/en/incidents/2026-04-27-6153]
  - Replit [FR-C1]
  - Kiro / Cost Explorer (disputed) [FR-C5 / LC-36]

**Candidate argument:** diagnosis can climb the ladder, but action must not outrun reversibility. Ops autonomy is a closed set of typed, reversible mitigations, and IAM, not the model, sets the blast radius.

### Ch 12: Maintenance & migrations (richest chapter)

- Google:
  - int32→int64: 80% of edits AI-authored, ~50% time saved (estimated).
  - JUnit3→4: 5,359 files in 3 months, ~87% unchanged.
  - "LLMs alone through simple prompting is not sufficient" [TM-32, TM-33 / LC-8, LC-9 https://arxiv.org/abs/2501.06972].
  - Year-long study: 39 migrations [LC-10 https://arxiv.org/abs/2504.09691].
- Airbnb: 3.5K files in 6 weeks against a 1.5-year estimate. 75% done in 4 h, 97% in 4 days. Retries beat prompt tuning [TM-34 / LC-14 https://airbnb.tech/?p=366].
- Slack: AST alone converted 45%, AST + LLM 80% on a 9-file sample [TM-35].
- Spotify Honk:
  - 1,500+ merged PRs, 60–90% time saved [TM-36 https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1].
  - Deterministic verifiers in a stop hook; an LLM judge vetoed ~25% [TM-37].
  - The judge was later removed as "too rigid". Pace reached 1,000 PRs per 10 days [TM-38].
- Amazon Java 17 (T4): 50 dev-days → hours, 79% shipped unchanged, 4,500 dev-years, $260M/yr [LC-1–5; TM-39].
- Moderne/OpenRewrite argue for deterministic recipes [TM-41]. Spotify's 20k-line Maven updater shows the limit of determinism [TM-36].

**Candidate argument:** maintenance is where L3 is reachable first, because the compiler and test suite are a ready-made verifier. The winning pattern is hybrid: deterministic tooling plus LLM, with review capacity as the throttle.

### Ch 13: Assess your starting point

- DORA 2025 clusters teams into seven profiles ("Legacy bottleneck" etc.); the shares are unverified [MM-14].
- Map the value stream to find the constraint first [BN-14; OG-28].
- The seven DORA capabilities serve as an enabler checklist [OG-26].
- Autonomy drift means self-assessment needs telemetry [MM-32].
- Risk class sets the ceiling [MM-27, MM-22].
- Phase-level reluctance: 69.2% planning, 58.7% review, 75.8% deploy/monitor "don't plan to use AI" [RR-9, RR-48, BN-32].

**Candidate argument:** assess each phase by observable evidence (what is reviewed, what verifier exists, what the risk ceiling is), not by tool count or self-report. Locate the constraint before choosing where to climb.

### Ch 14: The 90-day pilot

- Licences are not adoption: 30–40% of engineers never tried a free in-IDE tool [OG-15 Cui et al.].
- Juniors and short-tenure developers adopt more [OG-16].
- Accenture: 81.4% installed on day one [OG-17]. ZoomInfo ran a 4-phase rollout with 33% acceptance [LC-39].
- Preparation took the dotnet agent from 38% to 69% [RR-24].
- A temporary J-curve dip from platform initiatives is expected [OG-30].
- AWS AI-DLC "Bolts" and mob rituals offer a process model [MM-15].
- Measurement hygiene: one run misled, five runs did not [RR-19].

**Candidate argument:** pilot one phase × one task type with a verifier, a baseline and a pre-agreed stop rule. Maintenance or migration is the lowest-risk first pilot. Prepare the environment before judging the model.

### Ch 15: Scaling: platform, enablement, governance

- A clear, communicated AI stance amplifies impact regardless of its content [OG-27 https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model].
- Open-source policy spectrum:
  - Linux kernel: `Assisted-by:` with human-only Signed-off-by [OG-38 https://kernel.org/doc/html/next/process/coding-assistants.html]
  - Fedora: allowed with disclosure [OG-39]
  - Gentoo and QEMU: banned [OG-40, OG-42]
  - NetBSD: presumed tainted [OG-41]
- Permission-skip modes are an attack primitive [FR-C17]. CSA attaches controls to each level [MM-22].
- EU AI Act after the Omnibus: Art. 4 literacy has applied since 2 Feb 2025, and Annex III moves to 2 Dec 2027 [OG-46, OG-47]. The CRA's vulnerability reporting starts 11 Sep 2026 [OG-49]. NIST AI RMF and ISO 42001 are voluntary [OG-50, OG-52].
- Microsoft's CCC no longer requires the duplicate filter as of 3 Apr 2026 (volatile) [OG-43].
- The OpenSSF guide for AI code-assistant instructions [OG-53].
- Mandates without outcomes: Shopify [LC-33], Coinbase [LC-25], Amazon's reported 80% Kiro goal [LC-36].

**Candidate argument:** scaling is governance by level. You need a clear stance, provenance trailers and a permission model, with controls that tighten as autonomy rises. Mandates have no published outcomes; clarity does.

### Ch 16: People: roles, skills, juniors, hiring

- Stanford DEL: 22–25-year-olds in AI-exposed jobs are 19% below the counterfactual, via hiring rather than firing [OG-1, OG-4 https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/]. The authors' own caveats [OG-6].
- Harvard: junior employment −9% at adopting firms after six quarters [OG-8 https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555].
- Anthropic RCT: mastery 50% vs 67%, with the largest gap in debugging and no significant speed gain [FR-C28 https://arxiv.org/abs/2601.20245].
- PNAS: unguarded GPT-4 cut later unaided performance by 17%, while a tutor design largely mitigated it [FR-C29].
- Cui et al.: juniors gain most in output [OG-16]. This is the tension with the skill-formation result.
- Role shift: engineers become "manager[s] of AI agents", "70%+ code reviewer/reviser", and juniors ask seniors less [OG-23].
- DORA's qualitative data shows work intensification [BN-15].
- Counter-signals: Cloudflare's 1,111 interns [OG-54]; Duolingo's walk-back [LC-34]; Salesforce's hiring freeze [LC-29].

**Candidate argument:** AI raises juniors' short-term output and lowers their skill formation. An AI-driven SDLC has to design the junior track deliberately: tutor modes, review-first apprenticeship, protected mentorship.

### Ch 17: Measuring success and when to roll back

- Self-report is unsafe: −19% measured vs +20% believed [FR-C24 / BN-16].
- The METR rerun failed on selection [BN-17 https://metr.org/blog/2026-02-24-uplift-update/].
- DX AI Measurement Framework: utilisation/impact/cost; code-generation volume is gameable; no individual evaluation [OG-37 https://getdx.com/research/measuring-ai-code-assistants-and-agents/]. DX Core 4 [OG-36].
- DORA rework rate is now published [BN open question 1].
- Google DIDACT is the template for measuring downstream safety (rollbacks) [TM-16].
- No organisation has published a quantitative rollback trigger [FR open question 1]. The partial rollbacks:
  - Amazon peer review for production access [LC-36]
  - Amazon retail senior sign-off (disputed) [FR-C6]
  - Klarna "lower quality" (non-SDLC) [FR-C32]
- Anti-metric: "% of code written by AI" [LC key finding 4; OG open question 7].

**Candidate argument:** pair a flow metric with a stability metric for every phase you climb, set rollback triggers before the pilot, and never use self-report or AI-code share as success criteria. Rolling back one level in one phase is normal operation, not failure.

### Appendices

- **Agent instruction file template:**
  - GitHub's six areas plus "Always / Ask first / Never" [RR-20]
  - Anthropic's pruning rule and hooks for anything mandatory [RR-21]
  - Minimal and human-written [RR-17]
  - OpenSSF items: SBOM, hallucinated-package checks [OG-53]
  - Kernel `Assisted-by` trailer [OG-38]
- **Spec template:** Anthropic's "files and interfaces, out of scope, end-to-end verification step" [RR-7]; EARS notation [RR-3].
- **Review checklist:**
  - Uber's precision rules [RR-38]
  - Writer/Reviewer fresh context [RR-47]
  - Merge-Readiness Pack contents [MM-6]
  - Security gates [FR-C10, FR-C13]
- **Pilot scorecard:** DX utilisation/impact/cost [OG-37]; DORA four keys plus rework; Swarmia per-level metrics [MM-24]; reverts of AI-landed changes [RR-26].
- **Glossary:** includes the crosswalk (book level ↔ Sourcegraph, Shapiro, Yegge, Hassan, Microsoft, Dash0) [MM contradictions].
- **Bibliography:** every URL above, each with an "as of" date for volatile facts.

---

## 2. Maturity grid evidence (8 phases × L0–L4)

Generic criteria across all phases (from MM's proposed observable criteria, adopted with edits):

- **L0:** no AI on this phase's outputs, or AI is prohibited.
- **L1:** humans author every artefact; AI output enters only as suggestions.
- **L2:** a named task type is delegated whole, and 100% of outputs get recorded human review; agent output is attributed.
- **L3:** routine task types run end to end and humans review an evidence bundle, or by exception. Routing rules are machine-enforced, rollback has been exercised, the escape-defect rate is compared to a human baseline over ≥90 days, and the AI cannot change its evaluator.
- **L4:** one enumerated, narrow, reversible task type acts without per-item approval, with a verification record, kill-switch, named accountable owner and audit sampling.

Each cell below gives the **proposed observable criterion → best evidence (tier)**.

### Requirements

- **L0:** No AI on tickets or specs. → SO 2025: 69.2% "don't plan" AI for project planning [RR-9] (survey).
- **L1:** Chat drafts stories or PRDs, and a human rewrites them. → Anthropic: design/planning rose from 1.0% to 9.9% of Claude Code use [RR-10] (T2/T3).
- **L2:** Agent interviews the human and writes SPEC.md / EARS requirements; a human approves every gate. → Anthropic guidance [RR-7]; Kiro [RR-3]; Spec Kit [RR-1]. These are practices with no outcome data. Morgan Stanley's spec extraction from legacy code [LC-32] (T4).
- **L3:** Specs or reproducible tickets generated from routine inbound items, reviewed by exception. → Kiro Quick Spec runs "without approval gates" [RR-3]. That is a mechanism only, with no measured case. **No outcome evidence found.**
- **L4:** Auto-dedupe and auto-label of tickets with audited precision. Explicitly *not* "AI decides what to build" [MM-10]. → **No evidence found.**

### Design

- **L0:** No AI. → No direct evidence.
- **L1:** LLM drafts an ADR from a decision context. → ICSA 2024 and DRAFT [RR-11, RR-12] (T1 lab).
- **L2:** Agent proposes options in plan mode or `design.md`; an architect picks; ADRs are fed into the instruction file. → Anthropic include-list [RR-15]. dotnet closure reasons show humans reject designs: 16% wrong approach, 8% design rejected [RR-14] (T2).
- **L3:** Pattern-conforming changes gated by architecture-fitness checks. → **No evidence found.** Uber says its bot cannot judge design [RR-13].
- **L4:** Leave empty. → **No evidence.** Counter-evidence is de facto L4 for non-engineers: Lovable and Moltbook exposures [FR-C11, C12] (T1).

### Coding

- **L0:** No AI, by policy. → Gentoo and QEMU bans [OG-40, OG-42]; Samsung ban [OG-45].
- **L1:** Autocomplete and chat. → Cui et al. +26% [BN-24] (T1-mixed); Google RCT 21% [BN-19] (T2); METR −19% [BN-16] (T1).
- **L2:** Agent PRs for named task types, every diff reviewed, agent attribution, instruction file. → dotnet/runtime: 67.9% merge, 38→69% after preparation, 0.6% reverts [RR-23–26] (T2). Claude Code OSS PRs: 83.8% merged [RR-27] (T1).
- **L3:** Unattended background agents in a sandbox for routine tasks, verifier-gated; humans review the final PR or evidence. → Stripe Minions: 1,000+ merged per week [RR-28] (T3, volume only). Anthropic: interventions per session 5.4→3.3 [MM-32] (T3). Failure case: Devin 3 of 20 [RR-29] (T1).
- **L4:** Auto-merge for an enumerated class with a verification record. → **No LLM evidence.** The only examples are pre-LLM bot bumps [RR ladder]. De facto L4 failures: Replit, Antigravity, PocketOS [FR-C1, C4; TM-42].

### Review

- **L0:** No AI review. → SO: 58.7% "don't plan" AI for committing or reviewing [RR-48] (survey).
- **L1:** Author-side AI suggestions. → Google ML edits address 7.5% of comments [LC-11] (T2).
- **L2:** Bot comments on every PR and a human approves. → Uber uReview [RR-37] (T3); Atlassian RovoDev [RR-39] (T2); Qodo study, where closure got slower [RR-40] (T1); Copilot code review [RR-35] (T3).
- **L3:** AI is first reviewer; humans review by risk tier or evidence bundle (MRP). → Partial evidence: Anthropic substantive-review coverage 16→54% [RR-42] (T3); Atlassian −35.6% human comments [RR-39]; Spotify migration drivers self-approve [TM 3]. Reverse signal: Amazon retail senior sign-off [FR-C6] (T4, disputed).
- **L4:** AI approval alone merges an enumerated low-risk class. → **No primary public case found.**

### Testing

- **L0:** No AI. → No direct evidence.
- **L1:** IDE test suggestions; AI failure diagnosis surfaced to humans. → Google Auto-Diagnose: 90.14% on n=71 [TM-8] (T2).
- **L2:** AI generates tests behind deterministic filters (build, pass, coverage or mutant kill), and a human accepts each. → Meta TestGen-LLM 73% and ACH 73% [TM-1, TM-2] (T2). FlakyGuard 51.8% accepted [TM-7] (T2).
- **L3:** AI maintains regression suites; humans review mutation or coverage reports, not individual tests; the agent cannot edit the oracle. → Meta JiT catching tests (experimental; 8 true positives of 41; −70% review load) [TM-5] (T2). Airbnb's test-file migration, 97% automated [TM-34] (T3).
- **L4:** Flaky-test quarantine and fix with auto-land under an audited false-fix rate. → **No evidence found.** FlakyGuard landings were still human-approved (197 of 1,115, secondary) [MM case; TM-7].

### CI/CD

- **L0:** No AI. → SO: 75.8% "don't plan" AI for deploy or monitoring [BN-32].
- **L1:** ML-suggested build fixes; the developer applies them. → Google DIDACT RCT: 34% applied, +2% throughput, no rollback increase [TM-16] (T2, RCT).
- **L2:** Agent pushes a fix to a branch and a human merges; auto-merge is off when AI contributed. → GitHub Fix with Copilot [TM-15]; Elastic [TM-17] (T3); Nx ~60% accepted [TM-18] (T3 vendor).
- **L3:** Fixes auto-apply after a verification phase; AI diagnoses failures and opens fixes under policy. → Nx auto-apply after verification [TM-18] (vendor). Harness CV auto-rollback is classical ML [TM-19].
- **L4:** AI canary promotion or rollback for defined services within an error budget. → **No LLM evidence.** Classical-ML precedent only [TM-19]. Anti-pattern: Kiro with an over-broad role [FR-C5].

### Operations

- **L0:** No AI. → No direct evidence.
- **L1:** AI ranks candidate root causes, with confidence-gated output. → Meta RCA 42% top-5 [TM-21] (T2); RCACopilot [TM-24].
- **L2:** Agent proposes a mitigation from a closed typed set and a human authorises it. → Google SRE + Gemini CLI five-layer guardrails [TM-26] (T3, design only). PagerDuty "with approval" [TM-28].
- **L3:** Agent executes allow-listed reversible mitigations; humans are paged on exception. → Azure SRE Agent: 35K+ incidents mitigated, "mostly restarts, scale-outs, rollbacks" [TM-25] (T4, method unknown).
- **L4:** Auto-remediation for an enumerated alert type with a kill-switch. → Azure "more than half autonomously managed" for some teams [TM-25] (T4, low). Failures: PocketOS [TM-42]; Replit [FR-C1].

### Maintenance

- **L0:** No AI. Deterministic codemods count as *automation, not AI*. → Spotify Fleet Management: ~half of all PRs were deterministic [TM-36]. That makes this L0 for AI, which is a useful teaching point.
- **L1:** AI suggests migration edits and humans apply them. → No dedicated case.
- **L2:** AI drafts migration PRs and each one is reviewed. → Google int32→int64 and JUnit migrations [TM-32] (T2). Slack hybrid [TM-35] (T3). Elastic Renovate fixes [TM-17].
- **L3:** Fleet-wide changes with deterministic verifiers; sampled or owner-approved review; evidence pack. → Spotify Honk [TM-36–38] (T3); Airbnb [TM-34] (T3); Amazon Java 17, 79% unchanged [LC-4] (T4).
- **L4:** Auto-merged dependency or security updates under a verification record. → Spotify auto-merged some docs changes [TM open question 4] (T3, thin). Otherwise **no LLM evidence**; pre-LLM Renovate/Dependabot auto-merge is not AI.

**Grid-level observations for Ch 2**

1. L3 has real evidence in only three phases: coding, testing (partly) and maintenance, plus a self-reported narrow class in operations. L4 has no credible LLM evidence in any phase.
2. Classical ML reached L3/L4 in release gating years ago (Harness CV). The grid should say whether "AI" includes it. Recommendation: yes, with a footnote.
3. The cells where incidents happened (coding L4, operations L3/L4) are all cases where *permissions* granted a higher level than the team believed it was operating at. This supports a "level = granted authority" rule [FR open question 3].

---

## 3. Case shortlist

### Ranking of all cases by evidence quality

**T1, independent measurement**

1. METR RCT and rerun [BN-16, BN-17]. Coding L1–L2; −19%, then an inconclusive rerun.
2. Cui et al. field RCTs: Microsoft, Accenture, Fortune 100 [BN-24 / LC-20 / OG-15]. Coding L1; mixed independence.
3. Qodo-based industrial review study, Turkish industry partner [RR-40]. Review L2; closure got slower.
4. Answer.AI's month with Devin [RR-29]. Coding L3 attempt that failed.
5. Claude Code PRs in OSS, Watanabe et al. [RR-27]. Coding L2.
6. Lovable CVE-2025-48757 [FR-C11]. Design/coding L4 for non-engineers (failure).
7. Moltbook exposure, Wiz [FR-C12] (failure).
8. Nx s1ngularity, Wiz [FR-C17]. Toolchain attack (failure).

**T2, organisation-measured, stated method, mostly peer-reviewed**

9. Google LLM migrations [LC-8–10 / TM-32–33]. Maintenance L2→L3.
10. Meta TestGen-LLM + ACH + JiT [LC-15–16 / TM-1–5]. Testing L2→L3.
11. Google DIDACT build-repair RCT [TM-16]. CI L1; the only study with a rollback measure.
12. Microsoft .NET dotnet/runtime, 10 months of the Copilot agent [RR-23–26]. Coding L2→L3; discloses negative numbers. Published as a blog, but the method and denominators are explicit.
13. Atlassian RovoDev [RR-39]. Review L2; ICSE'26, all-Atlassian authors.
14. Google ML review edits [LC-11]. Review L1.
15. Google internal RCT [BN-19]. Coding L1.
16. Uber FlakyGuard [TM-7]. Testing L2; the Uber attribution is secondary.
17. Google Auto-Diagnose [TM-8]. Testing/CI L1.
18. Anthropic skill-formation RCT [FR-C28]. People; a result against the vendor's own interest.
19. Meta RCA [TM-21]. Ops L1.

**T3, org or vendor telemetry with thin method**

20. Spotify Honk [TM-36–38 / LC-27–28]. Maintenance L3.
21. Airbnb Enzyme→RTL [TM-34 / LC-14]. Maintenance L3.
22. Uber uReview [LC-17 / RR-37]. Review L2→L3.
23. Stripe Minions [LC-26 / RR-28]. Coding L3; volume only.
24. Slack Enzyme→RTL [TM-35]. Maintenance L2.
25. Elastic Renovate fixes [TM-17]. CI L2.
26. Anthropic internal study and Code Review [BN-37 / RR-31, RR-42]. Coding/review L2–L3.
27. Microsoft AI code reviewer [LC-19]. Review L2.
28. GitHub Copilot code review [RR-35]. Review L2.
29. Cursor Bugbot [RR-41]. Review L2.
30. Nx self-healing CI [TM-18]. CI L2→L3.
31. Accenture rollout [OG-17]. Adoption.
32. ZoomInfo rollout [LC-39]. Adoption.
33. ANZ experiment [LC-38]. Coding L1.
34. Faros, LinearB and Jellyfish pooled telemetry [BN-26–29]. Aggregate frame, not cases.
35. Google SRE + Gemini CLI [TM-26]. Ops L2; design walkthrough only.
36. Amazon Q extension compromise [FR-C16]. Vendor bulletin, high confidence on the facts.
37. curl bug-bounty ending [FR-C27]. Maintainer self-report, high confidence.

**T4, self-reported claim, press or disputed**

38. Amazon Java 17 upgrades [LC-1–5 / TM-39]. Maintenance L3; CEO and marketing figures.
39. Azure SRE Agent [TM-25]. Ops L3.
40. Replit production-DB deletion [FR-C1 / TM-43]. Acknowledged by both user and vendor, so the facts are high-confidence even though the details are not.
41. Amazon Kiro / Cost Explorer outage [LC-36 / FR-C5]. Disputed.
42. Amazon retail "high blast radius" deep dive [FR-C6]. Disputed.
43. PocketOS / Cursor [TM-42].
44. Gemini CLI file loss, Claude Code `rm -rf`, Antigravity [FR-C2–C4].
45. Morgan Stanley [LC-32], JPMorgan [LC-30], Salesforce [LC-29], Coinbase [LC-23–25], Goldman [LC-31].
46. Shopify, Duolingo [LC-33, LC-34]; Klarna [FR-C32] (non-SDLC); Samsung [OG-45]; Cloudflare interns [OG-54].
47. Vendor customer claims: Resolve/Salesforce [TM-29], Graphite [RR-44], Cleric [TM-30], Diffblue [TM-10]. Use only as "how not to evaluate" examples.

### Recommended Ch 3 set (10 cases, 4 negative or failure)

| # | Case | Tier | Phase / level | Why in Ch 3 |
|---|---|---|---|---|
| 1 | Google LLM migrations | T2 | Maintenance L2→L3 | Best-documented L3 path; review throttling; "prompting alone is not sufficient" |
| 2 | Microsoft .NET dotnet/runtime agent | T2 | Coding L2→L3 | Ten months, discloses below-human merge rate, preparation 38→69% |
| 3 | Meta TestGen-LLM + ACH | T2 | Testing L2 | "Filter is the oracle"; raw yield 25% vs 73% accepted after filters |
| 4 | Spotify Honk | T3 | Maintenance L3 | Verifier design, LLM judge added then removed, agents cheating, review bottleneck |
| 5 | Uber uReview | T3 | Review L2→L3 | Precision over recall at 90% coverage; beats human-comment addressed rate |
| 6 | Google DIDACT build repair | T2 (RCT) | CI/CD L1 | Only RCT that measured downstream safety; honest ~2% effect size |
| 7 | Qodo-based reviewer study | T1 | Review L2 (negative) | Independent evidence that AI review can slow closure |
| 8 | Answer.AI × Devin | T1 | Coding L3 attempt (failure) | Autonomy without scoping: 3/20 |
| 9 | Replit production-DB deletion | T4 (acknowledged) | Coding+Ops de facto L4 (failure) | Canonical failure; vendor's fix was environment-level (dev/prod separation) |
| 10 | Amazon Kiro / Cost Explorer | T4 (disputed) | Ops L3 → rolled back to L2 | Rollback in practice (mandatory peer review for prod access); print both accounts |

**Swaps if the owner wants a different mix:** Stripe Minions (L3 at volume; T3, volume only) for #6 or #7. Airbnb (T3) for #4. PocketOS for #10 if the dispute is judged too unresolved. Amazon Java 17 as a clearly labelled "vendor-claimed" box. Cui et al. and Faros stay in Ch 4 as the aggregate frame, not as cases (agrees with LC's recommendation).

### Assignment of remaining cases to other chapters

- **Ch 4:** Cui et al.; METR; Google RCT; Faros/LinearB/Jellyfish; Amazon Java 17 numbers (as an example of counterfactual estimates); Coinbase/Google/Microsoft "% code"; Lovable and Moltbook (security base rate in practice).
- **Ch 5:** Morgan Stanley DevGen.AI (T4, spec extraction); Böckeler's three-tool evaluation (practitioner case); Anthropic planning-share growth.
- **Ch 6:** dotnet closure reasons; Lovable/Moltbook (security architecture); Uber reviewer limits.
- **Ch 7:** Stripe Minions (chapter case); Claude Code OSS PRs; Anthropic internal; Gemini CLI, Claude Code `rm -rf` and Antigravity (anti-patterns).
- **Ch 8:** Atlassian RovoDev (chapter case; Uber if not used in Ch 3); Copilot code review; Microsoft AI reviewer; Cursor Bugbot; Anthropic Code Review; Google ML edits; curl; Amazon retail senior sign-off; Graphite (unverifiable-metrics box).
- **Ch 9:** Meta JiT catching tests; Uber FlakyGuard; Google Auto-Diagnose; METR reward hacking; Diffblue (how-not-to box).
- **Ch 10:** Elastic (chapter case); Nx self-healing; GitHub Fix with Copilot; Harness CV; Amazon Q extension compromise; Nx s1ngularity.
- **Ch 11:** Google SRE + Gemini CLI (chapter case); Meta RCA; Azure SRE Agent; OpenRCA/ITBench; PocketOS; Resolve/Datadog/PagerDuty (vendor-claims box).
- **Ch 12:** Airbnb (chapter case); Slack (contrast); Amazon Java 17; Spotify Fleet Management determinism.
- **Ch 14:** Accenture, ZoomInfo and ANZ rollouts; Cui et al. adoption curves.
- **Ch 15:** Linux kernel, Fedora, Gentoo, NetBSD, QEMU; Samsung; Shopify, Coinbase and Goldman mandates.
- **Ch 16:** Anthropic skill RCT; Duolingo; Salesforce; Cloudflare.
- **Ch 17:** Klarna (non-SDLC sidebar, framed as "add a human escape hatch", not abandonment); Amazon retail.

---

## 4. Deduplication: same fact, best source kept

| Fact | Cited in | Keep | Reason |
|---|---|---|---|
| DORA 2024 −1.5% throughput / −7.2% stability, plus process gains | BN-1/2, FR-C18, OG-29 | **BN-1/2** (2024 PDF p.38–40) | BN read the PDF; FR has secondary figures only |
| DORA 2025 throughput up, instability up, 90% adoption, trust split | BN-6/11, MM-13, FR-C19, TM-20, OG-25 | **BN-6/11** (2025 PDF) | Primary PDF with page numbers; FR's instability claim was secondary |
| DORA "amplifier" quote | MM-12, FR-C19, TM-20 | **MM-12** (dora.dev) | Primary |
| DORA AI Capabilities Model (7) | BN-13, MM-11, OG-26/27 | **OG-26/27** | Only OG quotes the "content doesn't matter, clarity does" finding |
| METR 2025 RCT | BN-16, FR-C24, RR-32, OG-31 | **BN-16** | Most complete (forecast, caveats) |
| METR 2026 rerun | BN-17, FR-C24, RR-33 | **BN-17** | Read on the primary page; RR/FR are search summaries. Use METR's "unreliable signal" wording; "very weak evidence" needs re-checking |
| Cui et al. +26.08% | BN-24, LC-20, OG-15/16 | **Management Science DOI 10.1287/mnsc.2025.00535** for the headline; **OG-15** (MIT draft) for the 30–40% never-tried figure | Check that the adoption figure survives in the published version |
| Google RCT ~21% | BN-19, LC-12 | either (same arXiv) | — |
| Google AI-code share (>25% → "well over 30%") | BN-21, LC-7, LC unverified lead | **BN-21** (abc.xyz Q1 2025 transcript) | BN verified the 30% figure LC lists as unverified |
| Google ML review edits | BN-20 (>8%), BN-22/RR-45 (offline 52%), LC-11 (7.5%) | **LC-11** for deployment (7.5%, ICSE-SEIP 2024); BN-20 for the later >8% blog figure | Different dates; cite both with dates |
| Faros 2025 paradox | BN-26, LC-37, RR-46, FR-C23, OG-32 | **BN-26** (faros.ai/blog) | FR rated the percentages low because it reached only a different page; three briefs read them on the blog |
| Faros 2026 whiplash | BN-27, RR unverified lead | **BN-27** | Primary read; RR's "+28% bugs per PR" is a different metric from BN's "+54% bugs per developer" |
| Stack Overflow 2025 | BN-32, FR-C26, RR-9/34/48, OG-33 | **FR-C26** for n and fielding dates; RR-9/48 for per-phase rows | Same source; FR has the denominator |
| GitClear | BN-33/34, FR-C20 | **BN-33/34** | Includes the 2026 report; carry FR's "4x headline vs ~1.5x body" caveat |
| CodeRabbit 1.7× | BN-35, FR-C21, RR unverified | **FR-C21** (adds authorship-inference caveat) | RR's lead is now verified |
| Uplevel +41% bugs | BN-36, FR-C22 | **FR-C22** | Same; FR notes the 2026 update |
| GitHub Copilot quality RCT | BN-25, FR-C25 | **FR-C25** | Fuller figures |
| Anthropic internal study | BN-37, RR-10/31, OG-21–23 | **OG-21–23** for the people angle, **RR-31** for coding | One primary URL; the +67% PRs figure is only in BN |
| Anthropic skill RCT | FR-C28, OG-19/20 | **FR-C28** (adds arXiv 2601.20245) | — |
| Stanford "Canaries" | FR-C31, OG-1–7 | **OG-1–7** (Aug 2026 PDF) | Latest revision, read in full; FR's developer-specific 20% is secondary |
| Google migrations | LC-8/9/10, TM-32/33 | **TM-32/33** for quotes, **LC-10** for the year-long study | — |
| Airbnb | LC-14, TM-34 | **TM-34** (adds token sizes); same URL | — |
| Spotify | LC-27/28, TM-36–38 | **TM-36–38** | Has the Part 3 verifier design |
| Amazon Java 17 | LC-1–5, TM-39 (+TM unverified lead) | **LC-1–4** (Jassy verbatim via Willison) + **LC-5/TM-39** (AWS blog) | LC resolves TM's lead |
| Meta TestGen-LLM / ACH | LC-15/16, TM-1/2 | **TM-1/2** + **LC-16** for counts | — |
| Uber uReview | LC-17/18, RR-37/38 | **RR-37/38** (guardrails) | Flag the 65k/week vs /month inconsistency |
| Stripe Minions | LC-26, RR-28 | **RR-28** (adds isolation details) | — |
| Kiro outage | LC-36, FR-C5 | **FR-C5** (both sides quoted) | — |
| Replit | FR-C1, TM-43 | **FR-C1** (The Register + AIID, vendor response) | TM's record counts come via OECD; avoid counts |
| Klarna | LC-35, FR-C32 | **FR-C32** (Klarna's own press release + PYMNTS) | Primary for the "700 agents" claim |
| Thoughtworks SDD "Assess" | MM-21, RR-6 | either | Quote exact wording from the page |
| Package hallucination | FR-C13, OG-53 (19.7% via OpenSSF) | **FR-C13** (abstract figures) | See the contradictions section |
| EU AI Act timeline | FR-C35 (FPF), OG-46/47 (Commission + Orrick) | **OG-46/47** | Commission primary |
| Uber FlakyGuard | TM-7, MM case (Swarmia) | **TM-7** (arXiv) | The numbers reconcile (see contradictions); the Uber attribution is still secondary |
| Pichai ~10% velocity | BN lead, LC-13 | neither verified | Business Insider only; get the transcript |
| Coinbase AI share | LC-23/24, OG case | **LC-23/24** | Dated figures; OG's ~33% is from a podcast |

---

## 5. Contradictions, with judgement

1. **DORA 2024 sample size.** BN says ~39,000 respondents; FR says ~3,000. *Judgement:* the 2024 survey itself had roughly 3,000 respondents, and ~39,000 is DORA's cumulative total over a decade. BN's effect sizes stand (read from the PDF), but BN's "populations differ (~39k vs ~5k)" argument for the 2024→2025 sign flip needs restating. Fact-check against the PDF.
2. **DORA throughput sign flip, 2024 → 2025.** Both years are cross-sectional surveys of different populations. *Judgement:* present instability-up as the stable finding and the throughput sign as unsettled. Don't call it a trend.
3. **Review time: up or down?**
   - Up: Faros (+91%, +441.5%), LinearB (agentic pickup 17.6 h vs 3.4 h), Qodo study (+42% closure time).
   - Down: Jellyfish (−5.1 h), Atlassian (−30.8% cycle time), Microsoft (10–20% faster), LinearB AI-assisted (non-agentic) PRs.
   - *Judgement:* both are real. Queue and wait time grow with agent-PR volume and size, while active review time can fall with good AI review. Shallow review is a third explanation (31.3% more PRs merged with no review). Ch 8 should separate wait time from active time and agentic PRs from assisted ones.
4. **RCT effect sizes from −19% to +56%.** *Judgement:* not a contradiction once task type × developer familiarity × tool generation is treated as the moderator. Never quote one number.
5. **METR 2026: "reversal" or not?** Secondary press reports a speed-up. METR calls its own signal unreliable because of selection. *Judgement:* follow METR. The refusal to work without AI is itself evidence of perceived value.
6. **Code quality.** GitHub's RCT shows small gains. GitClear, CodeRabbit and Uplevel show degradation. *Judgement:* every one is a vendor. Lean on independent security studies (Pearce, Perry, CSET) for the risk case, and put the vendor quality data in a labelled "vendor data" box.
7. **Instruction files help or hurt.** ETH found −success and +20% cost. Lulla et al. found −28.6% runtime, AAIF −27%, and the .NET team went from 38% to 69%. *Judgement:* the reconciliation in RR holds. ETH measured mostly generic or LLM-generated files, and the .NET gain bundled environment fixes. Recommend minimal, human-written files plus deterministic hooks. Never claim "AGENTS.md improves success" unqualified.
8. **Does an LLM judge help?** Spotify's Dec 2025 post says it vetoes ~25% of sessions and recovers half. In Mar 2026 Spotify removed it as "too rigid". *Judgement:* an LLM judge is a tunable guardrail with a false-positive cost. Deterministic verifiers come first.
9. **Same migration, different numbers.** Slack 80% (9-file sample, 2024) vs Airbnb 97% (2025). *Judgement:* model generation, retry budget and success definitions differ. Show both as a lesson in why migration numbers don't transfer.
10. **The Kiro outage happened? / who caused it.** TM's lead says "nothing found; do not use", while LC and FR found the FT report via Engadget, with Amazon's rebuttal. FR dates the FT piece 2026-02-19 and LC 2026-02-20. *Judgement:* the story exists (TM's search simply missed it). Use it with both accounts printed, and tag the level by *granted permissions*. Dates: FT 19 Feb, Amazon statement 20–21 Feb, to be confirmed.
11. **Amazon's own figures.** "4,500 developer-years" vs "4,500 years of development work for over a thousand developers". "Tens of thousands" of apps vs ~30,000. *Judgement:* treat as a counterfactual multiplication (T4), and use it in Ch 4 as an example of an unaudited estimate.
12. **Package-hallucination rate.** FR says "19.7%" circulates but is not in the abstract, so don't use it. OG cites OpenSSF quoting ~19.7%. *Judgement:* 19.7% is probably the pooled average across all models in the Spracklen paper body. Until the full text is checked, cite only the abstract's ≥5.2% (commercial) and 21.7% (open-source), plus the 2026 replication's 4.6–6.1%.
13. **Uber FlakyGuard figures.** Swarmia (secondary) gives 1,115 flaky tests, 798 reproduced, 380 fixes and 197 landed. TM gives 47.6% repaired and 51.8% accepted. *Judgement:* consistent (380/798 = 47.6%; 197/380 = 51.8%). Use the arXiv rates and keep the Uber attribution marked secondary.
14. **Anthropic output growth.** BN gives +67% merged PRs per engineer per day (Dec 2025 study). RR-42 gives "+200% code output per engineer in a year" (Mar 2026 Code Review post). *Judgement:* different metrics and windows. If used at all, cite each with its date and as T3; never combine them.
15. **Google AI-review share.** 7.5% of reviewer comments resolved by ML edits (ICSE-SEIP 2024, LC-11) vs ">8% of review comments addressed with AI" (Jun 2024 blog, BN-20). *Judgement:* both are fine as a dated series. The 52% figure is offline and must not be presented as deployment.
16. **Stanford DEL gap size.** 13% → 16% → 19% across revisions (OG), "15% at the July 2025 vintage" (DEL news page), and "~20% for young developers" (FR, secondary). *Judgement:* cite 19% as of the Aug 2026 revision, with the authors' caveats, and drop the developer-specific 20% unless verified.
17. **Klarna: U-turn or rebalancing?** LC says "re-hiring humans". FR notes that possibly only two pilot hires had started, and the CEO says AI remains central. *Judgement:* frame it as "add a human escape hatch after a cost-only metric hid a quality drop". It is a non-SDLC sidebar only.
18. **Is more autonomy progress?** Stride and Shapiro say L5 is inevitable. Morris, Feng and James Read say the level is a design choice capped by risk. *Judgement:* the book's stance (readers choose how far to climb) sides with the second group, and Ch 2 should cite them.
19. **Mandates vs enablement.** Cui et al. (30–40% never try a free tool) argues for active enablement. DX advises against top-down mandates. Shopify and Coinbase publish no outcomes. *Judgement:* no controlled comparison exists. Present DORA's "clear stance" finding as the evidence-backed middle path.
20. **Juniors gain more vs learn less.** Cui et al. vs the Anthropic RCT and PNAS. *Judgement:* both hold, as short-term output vs long-term skill formation. This is the core tension of Ch 16, not a contradiction to resolve.
21. **Duplicate-detection filter.** FR suggests keeping GitHub's filter on (the court treated it as evidence of verbatim emission). OG notes Microsoft no longer requires it for indemnity as of 3 Apr 2026. *Judgement:* not a conflict. Indemnity terms loosened, but the engineering reason to keep the filter (licence hygiene) stands. Mark as volatile.
22. **AI SRE claims vs benchmarks.** Vendors claim 60% MTTR cuts and "40.5 h to 3 min". Benchmarks show 11–47%, and Meta's RCA reaches 42% top-5. *Judgement:* no independent MTTR study exists. Ch 11 should present benchmarks beside self-reports and tell teams to measure time-to-mitigate per mitigation class.

---

## 6. Gaps: thin chapters and the research that would fill them

| Chapter | What is thin | Research that would fill it |
|---|---|---|
| **Ch 6 Design** | No production case of a design-review or ADR agent; only lab ADR studies | Look for design-doc review bots at Google, Meta, Uber or Shopify. Look for LLM-assisted architecture fitness functions (ArchUnit plus LLM) and Kiro `design.md` adopter write-ups. Check whether any vendor measures "design rejected" closure rates beyond dotnet |
| **Ch 5 Requirements** | No outcome data for SDD; no L3/L4 case; the Morgan Stanley primary (WSJ) is unchecked | Look for measured SDD adoption (Spec Kit or Kiro case studies with defect or rework data). Look for production bug-report triage or dedupe systems with published precision; classical-ML triage in large OSS bug trackers is a lead to verify. Fetch the WSJ Morgan Stanley piece |
| **Ch 11 Operations** | Every MTTR figure is vendor or self-reported; the Microsoft pages were unreadable | Do a manual read of the Microsoft SRE Agent GA and "Customer Zero" posts. Fetch OpenRCA 2.0. Look for any SRE-team postmortem on AI-executed remediation. Check incident.io and Traversal claims at their primaries |
| **Ch 10 CI/CD** | No evidence on AI release notes or dependency-upgrade agents beyond Elastic; no LLM-driven canary or rollback | Check Dependabot or Renovate combined with coding agents, LaunchDarkly guarded rollouts, and AWS Transform customer data |
| **Ch 3 / Ch 17 (cross-cutting)** | No large-company L3/L4 rollout measured on *outcomes* (change failure, revert rate, incidents); no published rollback trigger; only dotnet reports agent revert rates | Run a targeted search for revert or rollback rates of agent-authored PRs (Stripe, Spotify, GitHub Octoverse, the AIDev dataset). Find the DORA ROI report and the DORA rework-rate distributions (2025 PDF p.21) |
| **Ch 14 Pilot / Ch 15 Scaling** | No non-vendor enablement or AI-champions programme with before/after adoption numbers | Search engineering blogs (Booking, Zalando, Intuit, Mercado Libre, Atlassian Rovo Dev internal metrics) and conference talks (QCon, LeadDev) for enablement programmes with measured adoption |
| **Ch 16 People** | No company-level measurement of junior ramp-up time under AI, and no tutor-mode policy evaluated in industry | Look for apprenticeship or "AI-off" programme reports, the Danish near-zero-effect study, and the Yale Budget Lab primary |
| **Ch 4 Economics** | Cost per merged agent PR including review and CI is unmeasured | Look for any published compute-plus-review cost per PR (the .NET post explicitly skipped it). Check Salesforce's token spend (secondary), the DORA ROI report and the DX quarterly reports |
| **Ch 2 Maturity** | Unverified: the SAE "descriptive rather than normative" statement, Thoughtworks' "complacency" blip, GitLab's 4 stages, the DORA 2025 profile shares | Fetch each primary. The SAE line in particular would anchor "levels are not targets" |
| **Ch 15 Governance** | GitHub Copilot content-exclusion gap for agent mode (claim unverified); the CRA's applicability to AI-generated code is an inference | Read docs.github.com directly, and get a lawyer-checked paragraph on CRA and AI Act deployer status |

**Fact-check priority list:** the unverified leads most likely to be quoted.

- Pichai's ~10% velocity figure (Lex Fridman transcript)
- Nadella's 20–30% / 30–40%
- The Perry et al. participant count
- The Gemini CLI "catastrophically" quote
- The DORA 2024 respondent count
- The DORA 2025 profile shares
- The Atlassian RovoDev v2 wording of the cycle-time figure
- The Uber uReview 65k/week vs /month figure
- The Kiro GA date
- The Uber FlakyGuard primary

---

## 7. Proposed outline changes

1. **Add a cross-phase security chapter.** Proposed name: "Security, permissions and blast radius". Place it at the end of Part II (new Ch 13; renumbering is harmless because links use slugs). The evidence is too large and too cross-cutting to scatter across Ch 4, 7, 9, 10 and 15:
   - the ~40–45% insecure-code base rate [FR-C7–C10]
   - slopsquatting [FR-C13–C15]
   - the AI toolchain as attack surface [FR-C16, C17]
   - every documented agent incident (Replit, PocketOS, Kiro, Antigravity, Gemini CLI, `rm -rf`), which shares one root cause: authority over irreversible actions without an environment boundary [FR key finding 1]
   - vibe-coded apps without RLS [FR-C11, C12]

   The chapter would own the permission model, sandboxing, skip-permission modes, dependency allow-lists, SAST gates and secret scanning. Phase chapters would link to it from their Guardrails section. *Alternative if the owner wants to keep 17 chapters:* split Ch 4 into "Economics & measurement" and "Risk & security".
2. **Sharpen Ch 2's level definitions with five rules the evidence supports:**
   - (a) The defining axis is *what the human reviews*: every output, an evidence bundle, or exceptions only [MM-1, MM-23].
   - (b) L3 requires an automated verifier the AI cannot edit [LC open question 6; TM open question 2; METR reward hacking].
   - (c) A level is set by *granted authority*. An agent with production write access is operating at L4 whatever the team calls it [FR open question 3].
   - (d) Score per named task type ("Testing: L3 for flaky triage, L2 for feature tests") [MM open question 3].
   - (e) Add a risk-ceiling column and a crosswalk to other models. Do not add an L5 [MM-22, MM-27].

   Also consider BN's cross-phase rule, "don't run Coding more than one level above Review/Testing", which the Faros and DORA instability data support [BN open question 5]. Define L4 as "a narrow, *reversible* action class with deterministic verification".
3. **De-overlap Ch 4 and Ch 17.** Both currently claim "self-report vs measurement", the METR perception gap and Faros. Ch 4 (leaders) should own *how to read the evidence and what it costs*: RCT range, vendor-data policy, % code as non-productivity, security and legal risk. Ch 17 (practitioners) should own *the metric set and rollback triggers*: DORA keys plus rework, DX utilisation/impact/cost, downstream measures modelled on DIDACT, triggers stated openly as the book's proposal, since no organisation has published any [FR open question 1].
4. **Merge or shrink Ch 6 Design.** The evidence is the thinnest in the book and points to one conclusion: design stays at L1–L2 by choice. SDD tools already bundle requirements → design → tasks (Kiro `requirements.md`/`design.md`/`tasks.md`). Option A: merge Ch 5 and Ch 6 into "Requirements, specs & design", keeping two rows in the grid. Option B: keep Ch 6 as a short chapter, "why design stays human-owned and how to feed it to agents". Recommendation: Option A, unless the gap research in section 6 finds a production case.
5. **Make maintenance the recommended first pilot in Ch 14.** Keep Part II in SDLC order, but have Ch 14 point to maintenance and migrations (Ch 12) as the lowest-risk first rung: verifier built in, bounded scope, best evidence. Ch 12 can also serve as the worked example of L3 that other Part II chapters reference.
6. **Grade cases visibly and adopt one vendor-data policy.** Every case in Ch 3 and in the Part II case slots should carry an evidence-tier badge (T1–T4 or A–D) and a "measured by" line (LC and FR open questions). Vendor-measured numbers about the vendor's own product go in a labelled box, not the main argument.
7. **Add a "metric vocabulary" sidebar to Ch 8, or a glossary entry.** Normalise "useful / addressed / led to change / resolved (AI-judged) / actionable / marked incorrect" so the vendor review figures are not ranked against each other [RR contradiction 4].
8. **Add a cross-phase "oracle principle" box in Ch 2, referenced from Ch 9, 10 and 12.** Agents must not be able to modify their own evaluator. METR, ImpossibleBench, Spotify and Elastic all show the failure.
9. **Move the volatile regulatory timeline to an appendix,** "Regulatory and licensing status as of <month year>", covering the EU AI Act after the Omnibus, CRA dates, the Microsoft CCC terms, the QEMU and kernel policy states and USCO. Ch 15 keeps the governance argument and links to the appendix. This keeps the chapter from going stale.
10. **Add two appendix templates the evidence directly supports:** a Merge-Readiness Pack / evidence-bundle template for L3 review [MM-6], and a provenance policy template (an `Assisted-by:` trailer and human-only sign-off, after the kernel and Fedora) [OG-38, OG-39].
11. **Klarna:** keep it only as a clearly labelled non-SDLC sidebar in Ch 17. Do not count it among the Ch 3 cases.
