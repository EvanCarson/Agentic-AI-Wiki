# Phases: requirements → design → coding → review (current practice, 2025–2026)

Research brief for *From SDLC to AI-Driven SDLC*, Part II chapters 5–8 (`requirements-specs`, `design-architecture`, `coding`, `code-review`).
Compiled 2026-10-15. Every claim below was read on the cited page during this session unless it says otherwise.

**Search limits.** The session's shared WebSearch budget ran out partway through. After that I only fetched primary URLs directly. Because of this, design and architecture (Ch 6) and independent code-review benchmarks are under-researched. See "Unverified leads".

**Labels used:**
- **Measured-by** says who produced the number:
  - *independent*: academic authors with no product stake
  - *vendor*: the company selling the tool
  - *self-reported (org)*: a company measuring its own internal use
  - *survey*: self-reported perception
- **Confidence** is about whether the source says what we claim it says. It is not a judgement on whether the underlying number is true.

---

## Key findings

1. **Spec-driven development (SDD) is the 2025–26 answer to "vibe coding", and the evidence for it is still opinion, not measurement.**
   - Spec Kit (GitHub, Sep 2025), Kiro (AWS) and Tessl all productise a requirements → design → tasks flow. I found no controlled study showing that SDD improves outcomes.
   - The most credible practitioner review (Böckeler, Thoughtworks, Oct 2025) found the flows "overkill" for small changes and the markdown "tedious to review".
   - Thoughtworks put SDD at **Assess**, not Trial.
   - *Serves Ch 5.*
2. **The working L2 pattern for requirements is lighter than the SDD tools.**
   - Anthropic's official Claude Code guidance: have the agent interview you, write `SPEC.md`, then implement in a fresh session.
   - Skip planning entirely when "you could describe the diff in one sentence".
   - Task size decides how much spec you need, not a blanket policy. *Serves Ch 5, Ch 7.*
3. **Agent instruction files (AGENTS.md, CLAUDE.md, copilot-instructions.md) are now standard infrastructure. The evidence on them is mixed, and that mix is the lesson.**
   - AGENTS.md claims 60k+ projects and is now under the Linux Foundation's Agentic AI Foundation.
   - An ETH Zurich study (arXiv 2602.11988) found context files *reduced* task success on average and raised cost by over 20%.
   - A separate study (arXiv 2601.20404) found a 28.6% lower median runtime.
   - The reconciling advice, given by both the paper and Anthropic's docs: keep the files minimal and human-written. *Serves Ch 7.*
4. **The best public L2→L3 coding case is the .NET team's 10-month log of Copilot Coding Agent in dotnet/runtime.**
   - Merge rate was 67.9%, against 87.1% for Microsoft humans.
   - It rose from 38.1% to 69% after the team invested in instructions and environment.
   - Human-pushed commits lifted success from 55.1% to 86.2%.
   - Revert rate was no worse than for human PRs.
   - Their conclusion: "preparation matters more than the model." *Serves Ch 3, Ch 7.*
5. **Task scope predicts agent success better than size.**
   - In dotnet/runtime: cleanup 84.7%, tests 75.6%, features 64.5%, performance 54.5%.
   - GitHub's own docs say not to assign ambiguous, cross-repo, security-sensitive or incident work.
   - The Devin evaluation by Answer.AI (3 of 20 tasks succeeded, Jan 2025) shows the failure mode of autonomy without scoping: "days pursuing impossible solutions." *Serves Ch 7.*
6. **L3 coding exists in production at a few companies, always with human review of every PR.**
   - Stripe: over 1,000 merged PRs a week are entirely agent-written, from unattended runs in isolated devboxes with at most 2 CI rounds.
   - Every PR is still human-reviewed. No public case shows L4 (no human review) for general code. *Serves Ch 3, Ch 7.*
7. **AI code review is the most widely deployed agentic phase and the best measured. Metrics are not comparable across vendors.**
   - Copilot reviews more than 1 in 5 GitHub reviews (60M total).
   - Uber's uReview covers 90% of diffs, with 75% of comments rated useful and 65% addressed (against 51% for human comments).
   - Atlassian RovoDev: 38.7% of comments led to code changes, and PR cycle time fell 30.8% (ICSE'26 paper, authored by Atlassian).
   - Every vendor defines "resolved/accepted" differently. *Serves Ch 8.*
8. **AI review can slow delivery as well as speed it up.**
   - The ICSE 2025 industrial study of a Qodo-based reviewer: 73.8% of comments were resolved, *but* mean PR closure time rose from 5h52m to 8h20m.
   - Faros telemetry (10k+ devs): high-AI-adoption teams merged 98% more PRs, PR review time rose 91%, PR size rose 154%, and there was no company-level improvement.
   - Review is where the bottleneck moves. *Serves Ch 1, Ch 4, Ch 8.*
9. **Precision beats recall in review bots, and every serious implementer learned this.**
   - Uber filters by confidence score, dedupes, and suppresses low-value categories.
   - GitHub: "Silence is better than noise." In 29% of reviews Copilot posts nothing.
   - Cursor uses majority-vote passes plus a validator.
   - Anthropic warns that an adversarial reviewer "will usually report some [gaps], even when the work is sound." *Serves Ch 8.*
10. **Design/architecture (Ch 6) is the thinnest phase in the evidence.**
    - Academic work shows LLMs can draft ADRs "relevant and accurate" but below human quality (ICSA 2024, DRAFT 2025).
    - Uber explicitly says its reviewer cannot judge system design because it has no access to design docs.
    - I found no measured production case of a design-review agent. *Serves Ch 6.*

---

## Claims

Format of each: **claim** · figure/quote · source · date · measured-by · confidence · chapter

### A. Requirements & specs (Ch 5)

1. **GitHub launched Spec Kit as an open-source SDD toolkit, which it calls an experiment.**
   - Figure/quote: four phases, Specify → Plan → Tasks → Implement. The post calls it "our experiment in making that transition real" and frames the shift as from "code is the source of truth" to "intent is the source of truth".
   - Source: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
   - Date: 2025-09-02 · Measured-by: vendor (no measurement) · Confidence: high · Chapter: Ch 5
2. **Spec Kit adoption signal.**
   - Figure: about 141.4k GitHub stars as of 2026-10-15. The command set now includes `/speckit-constitution`, `specify`, `plan`, `tasks`, `implement` and `converge`, plus bug-fix and idea-assessment skills.
   - Source: https://github.com/github/spec-kit
   - Date: read 2026-10-15 · Measured-by: GitHub counter · Confidence: medium (stars measure interest, not use; the page is volatile) · Chapter: Ch 5
3. **Kiro specs use three files per feature, and requirements are written in EARS notation.**
   - Files: `requirements.md` (or `bugfix.md`), `design.md` and `tasks.md`.
   - EARS form: "WHEN [condition/event] THE SYSTEM SHALL [expected behavior]".
   - Variants: Requirements-First and Design-First. Quick Spec runs "without approval gates". Task execution runs in dependency "waves".
   - Sources: https://kiro.dev/docs/specs/ (updated 2026-10-02) and https://kiro.dev/docs/specs/feature-specs/
   - Date: 2026-10 · Measured-by: vendor docs · Confidence: high · Chapter: Ch 5
4. **Böckeler's taxonomy: spec-first, spec-anchored, spec-as-source.**
   - Quote: Spec Kit "is still what I would call spec-first only, not spec-anchored over time"; Kiro "seems to be mostly spec-first"; Tessl "is the only one of these three tools that explicitly aspires to a spec-anchored approach."
   - Source: https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
   - Date: 2025-10-15 · Measured-by: independent practitioner evaluation (Thoughtworks) · Confidence: high · Chapter: Ch 5
5. **SDD tools are heavy for small changes and their output is hard to review.**
   - Quotes: for a small bug in Kiro the workflow was "like using a sledgehammer to crack a nut"; "I'd rather review code than all these markdown files"; "I frequently saw the agent ultimately not follow all the instructions"; "I'm very skeptical that lots of up-front spec design is a good idea."
   - Source: same as claim 4
   - Date: 2025-10-15 · Measured-by: independent practitioner · Confidence: high · Chapter: Ch 5 (anti-patterns)
6. **Thoughtworks Technology Radar places SDD at "Assess".**
   - It cautions that workflows are "elaborate and opinionated", behave differently by task size, and produce spec files that are hard to review. It suggests the field may be relearning the "bitter lesson".
   - Source: https://www.thoughtworks.com/radar/techniques/spec-driven-development
   - Date: 2025-11-05 · Measured-by: independent (practitioner panel) · Confidence: high (paraphrased from the page; quote exact wording from the page) · Chapter: Ch 5
7. **Anthropic's official guidance is "interview, then spec, then a fresh session".**
   - Quote: "for larger features have Claude interview you and write a spec before you start implementing… Once the spec is complete, start a fresh session to execute it."
   - Good specs "name the files and interfaces involved, state what is out of scope, and end with an end-to-end verification step."
   - Source: https://code.claude.com/docs/en/best-practices
   - Date: read 2026-10-15 (living doc) · Measured-by: vendor guidance · Confidence: high · Chapter: Ch 5 (L2 practice; template for the Appendix spec)
8. **Planning has a cost, so skip it for one-sentence diffs.**
   - Quote: "Plan mode is useful, but also adds overhead… If you could describe the diff in one sentence, skip the plan."
   - Source: same as claim 7
   - Date: read 2026-10-15 · Measured-by: vendor guidance · Confidence: high · Chapter: Ch 5 / Ch 7 (task sizing)
9. **Developers resist AI in planning more than in coding.**
   - Figure: 69.2% of respondents "don't plan to use" AI for project planning, against 28.9% for writing code. For deployment and monitoring the figure is 75.8%.
   - Source: https://survey.stackoverflow.co/2025/ai
   - Date: 2025 (survey run mid-2025) · Measured-by: survey (~25k responses on that row) · Confidence: high · Chapter: Ch 5, Ch 2 (where L-levels sit by phase)
10. **Design/planning grew as a share of Claude Code use at Anthropic.**
    - Figure: design/planning rose from 1.0% to 9.9% of Claude Code usage, and feature implementation from 14.3% to 36.9% (Feb → Aug 2025, 200k transcripts).
    - Source: https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic
    - Date: 2025-12-02 · Measured-by: self-reported (org), transcript classification · Confidence: high · Chapter: Ch 5, Ch 6

### B. Design & architecture (Ch 6)

11. **LLMs can draft ADRs, but below human quality.**
    - Quote/finding: GPT-4 zero-shot produces "relevant and accurate" design decisions but "falls short of human-level performance". Few-shot GPT-3.5 and fine-tuned Flan-T5 come close to it.
    - Source: https://arxiv.org/abs/2403.01709 (ICSA 2024)
    - Date: 2024-03-04 · Measured-by: independent (academic) · Confidence: high · Chapter: Ch 6
12. **The DRAFT method improves LLM ADR generation.**
    - Evaluated on 4,911 ADRs. Few-shot, RAG and fine-tuning each help, and DRAFT "outperforms all other approaches". The abstract gives no headline score.
    - Source: https://arxiv.org/abs/2504.08207
    - Date: 2025-04-11 · Measured-by: independent (academic) · Confidence: medium (abstract only) · Chapter: Ch 6
13. **Production review bots are blind to system design.**
    - Uber says uReview has "no access to design docs or past PRs, so system design review is weak."
    - Source: https://www.uber.com/blog/ureview/
    - Date: 2025-08-12 · Measured-by: self-reported (org) · Confidence: high (paraphrase of the post's limitations section) · Chapter: Ch 6, Ch 8
14. **Agents rarely get the overall approach wrong on scoped tasks, but design rejection is a real closure cause.**
    - In dotnet/runtime, only 1.8% of human comments on merged agent PRs were architectural feedback.
    - Of 253 closed agent PRs: 16% were "wrong approach" and 8% "design rejected".
    - Source: https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/
    - Date: 2026-03-23 · Measured-by: self-reported (org, the .NET team analysing its own repo) · Confidence: high · Chapter: Ch 6, Ch 7
15. **Architecture decisions belong in the agent's instruction file.**
    - Anthropic lists "Architectural decisions specific to your project" under Include and "file-by-file descriptions of the codebase" under Exclude.
    - Source: https://code.claude.com/docs/en/best-practices
    - Date: read 2026-10-15 · Measured-by: vendor guidance · Confidence: high · Chapter: Ch 6 (ADR → agent context bridge)

### C. Coding (Ch 7)

16. **AGENTS.md is a cross-vendor open format.**
    - "Used by over 60k open-source projects". "The closest AGENTS.md to the edited file wins". OpenAI's main repo held 88 AGENTS.md files. It is stewarded by the Agentic AI Foundation (Linux Foundation).
    - Source: https://agents.md/
    - Date: read 2026-10-15 · Measured-by: self-reported (format maintainers; the count is a GitHub code search) · Confidence: medium for the 60k count, high for the rest · Chapter: Ch 7
17. **Context files can hurt task success.**
    - Quote: "context files tend to reduce task success rates compared to providing no repository context", with inference cost "over 20%" higher. "Unnecessary requirements from context files make tasks harder". "Human-written context files should describe only minimal requirements."
    - Source: https://arxiv.org/abs/2602.11988 (Gloaguen, Mündler, Müller, Raychev, Vechev, ETH Zurich/LogicStar; v3 2026-09-29)
    - Date: 2026-02-12 (v1) · Measured-by: independent (academic; agents tested include Claude Sonnet 4.5 and GPT-5.x per secondary summaries) · Confidence: high for the abstract claims · Chapter: Ch 7 (contradiction with claim 18)
18. **AGENTS.md was associated with faster, cheaper runs.**
    - Figure: 28.64% lower median runtime and 16.58% fewer output tokens, with "comparable" completion. Based on 124 PRs across 10 repos.
    - Source: https://arxiv.org/abs/2601.20404 (Lulla, …, Baltes, Treude)
    - Date: 2026-01-28 · Measured-by: independent (academic), correlational · Confidence: high · Chapter: Ch 7
19. **A small A/B test shows that single runs mislead.**
    - A 12-line AGENTS.md cut median time by 27%, credits by 24% and diff size by 26% on an ambiguous task (Copilot CLI, 5 runs each).
    - A single run had shown the *opposite* (44% slower).
    - Source: https://aaif.io/blog/measuring-agents-md-what-five-runs-show-that-one-doesn-t
    - Date: 2026-07-22 · Measured-by: self-reported (AAIF, which stewards the format; n=1 repo) · Confidence: medium · Chapter: Ch 7, Ch 17 (measurement hygiene)
20. **GitHub's analysis of more than 2,500 agents.md files gives a content recipe.**
    - Cover six areas: commands, testing, project structure, code style, git workflow and boundaries.
    - Use three-tier boundaries: "Always do / Ask first / Never do".
    - "Never commit secrets" is the most common helpful constraint.
    - Source: https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/
    - Date: 2025-11-19 · Measured-by: vendor (qualitative analysis, no outcome data) · Confidence: high · Chapter: Ch 7, Appendix template
21. **Anthropic's CLAUDE.md rule is to prune and to use hooks for anything mandatory.**
    - Quotes: "For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it. Bloated CLAUDE.md files cause Claude to ignore your actual instructions!" And: "Unlike CLAUDE.md instructions which are advisory, hooks are deterministic."
    - Source: https://code.claude.com/docs/en/best-practices
    - Date: read 2026-10-15 · Measured-by: vendor guidance · Confidence: high · Chapter: Ch 7 (guardrails)
22. **Verification is the precondition for leaving an agent unattended (L2→L3).**
    - Quote: "Give Claude a check it can run… It's the difference between a session you watch and one you walk away from."
    - Escalating gates: in-prompt check → `/goal` → Stop hook → verification subagent.
    - Source: same as claim 21
    - Date: read 2026-10-15 · Measured-by: vendor guidance · Confidence: high · Chapter: Ch 7, Ch 9
23. **dotnet/runtime merge rates: agent below humans.**
    - Over 878 PRs (May 2025 – Mar 2026), Copilot Coding Agent merged at 67.9%, against 87.1% for Microsoft humans, 79.7% for community humans and 85.9% for bots.
    - It produced 22.2% of Microsoft-originated PRs.
    - Across 7 .NET repos: 2,963 PRs, 68.6% merged.
    - Source: https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/
    - Date: 2026-03-23 · Measured-by: self-reported (org; Microsoft analysing a Microsoft product) · Confidence: high · Chapter: Ch 3, Ch 7
24. **Preparation roughly doubled the agent's success.**
    - 38.1% before instruction/environment setup, 69% after. Monthly rates went from 41.7% (May 2025) to about 71%.
    - Fixes included a firewall allowlist for NuGet feeds and a `copilot-instructions.md` "revised many times".
    - Quote: "preparation matters more than the model."
    - Source: same as claim 23 · Date: 2026-03-23 · Measured-by: self-reported (org) · Confidence: high · Chapter: Ch 7, Ch 14
25. **Success depends on task type.**
    - Removal/cleanup 84.7%, testing 75.6%, refactoring 69.7%, bug fix 69.4%, feature 64.5%, performance 54.5%.
    - By size: 1–10 lines 80.0%, 101–500 lines 64.0%. Quote: "task scope matters more than size."
    - Source: same as claim 23 · Date: 2026-03-23 · Measured-by: self-reported (org) · Confidence: high · Chapter: Ch 7 (task sizing)
26. **Human co-authorship lifts agent PRs, and review costs more.**
    - PRs where humans pushed commits succeeded 86.2% of the time; without human commits, 55.1%.
    - Agent PRs drew 16.5 review comments on average, against 12.4 for human PRs.
    - Agent reverts: 0.6%, against 0.8% for non-agent PRs (the post calls the sample too small to compare).
    - Source: same as claim 23 · Date: 2026-03-23 · Measured-by: self-reported (org) · Confidence: high · Chapter: Ch 7, Ch 8
27. **Claude Code PRs in open source are mostly merged, but half need changes.**
    - Of 567 PRs across 157 OSS projects, 83.8% were merged, and 54.9% of those merged without further modification.
    - Agents are used mainly for refactoring, docs and tests.
    - Source: https://arxiv.org/abs/2509.14745 (Watanabe, Li, …, Hassan; accepted ACM TOSEM)
    - Date: 2025-09-18 (v3 2026-02-09) · Measured-by: independent (academic) · Confidence: high · Chapter: Ch 7
28. **Stripe "Minions": unattended one-shot agents at volume.**
    - Over 1,000 merged PRs a week are entirely minion-produced, with "no human-written code", and every one is human-reviewed.
    - Runs happen in isolated devboxes with no production or internet access. Local lints take under 5 seconds. CI picks from more than 3M tests. A run gets at most 2 CI rounds.
    - Source: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents
    - Date: 2026-02-09 · Measured-by: self-reported (org) · Confidence: high for what is stated. The share of all Stripe PRs is not given · Chapter: Ch 3, Ch 7 (L3 example)
29. **Answer.AI's month with Devin: 3 of 20 tasks succeeded.**
    - Tally: 3 successes, 14 failures, 3 inconclusive. Quote: "Devin would spend days pursuing impossible solutions rather than recognizing fundamental blockers."
    - Source: https://www.answer.ai/posts/2025-01-08-devin
    - Date: 2025-01-08 · Measured-by: independent (practitioner team, n=20) · Confidence: high (note: early-2025 Devin, now dated) · Chapter: Ch 3 (failure), Ch 7 anti-patterns
30. **GitHub says what *not* to assign to its coding agent.**
    - Keep for humans: "Broad-scoped, context-rich refactoring problems requiring cross-repository knowledge", production-critical, security, personal-data and incident work, and "Tasks lacking clear definition".
    - Issues should carry "Complete acceptance criteria".
    - Source: https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results
    - Date: read 2026-10-15 · Measured-by: vendor guidance · Confidence: high · Chapter: Ch 7
31. **Anthropic internal: high use, limited full delegation.**
    - Engineers report using Claude in 59% of their work (up from 28%), with a self-reported +50% productivity gain.
    - Over half can "fully delegate" only 0–20% of their work.
    - Claude Code consecutive tool calls rose from 9.8 to 21.2, and human turns per transcript fell from 6.2 to 4.1.
    - Source: https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic
    - Date: 2025-12-02 · Measured-by: self-reported (org) survey (n=132), plus transcript analysis · Confidence: high · Chapter: Ch 7, Ch 16 (the "paradox of supervision")
32. **METR RCT: experienced OSS developers took 19% longer with early-2025 AI tools, yet believed they were 20% faster.**
    - Source: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
    - Date: 2025-07-10 · Measured-by: independent RCT (16 devs, 246 tasks) · Confidence: high · Chapter: Ch 1, Ch 7 (owned by the bottleneck brief; cited here for context)
33. **METR's follow-up study is unreliable because developers refuse to work without AI.**
    - Estimates: −18% time for returning developers (CI −38% to +9%) and −4% for new ones. METR calls this "very weak evidence".
    - Source: https://metr.org/blog/2026-02-24-uplift-update/
    - Date: 2026-02-24 · Measured-by: independent · Confidence: medium (taken from the search summary of METR's page; re-read before quoting) · Chapter: Ch 1, Ch 4
34. **Most developers don't use agents yet, and trust is low.**
    - 14.1% use agents daily at work; 37.9% don't plan to. 46% distrust AI accuracy and 3.1% highly trust it.
    - 66% cite "almost right, but not quite".
    - Source: https://survey.stackoverflow.co/2025/ai
    - Date: 2025 · Measured-by: survey (~31–33k) · Confidence: high · Chapter: Ch 2, Ch 7

### D. Code review (Ch 8)

35. **Copilot code review at scale.**
    - 60M reviews; usage up 10x since April 2025; "more than one in five code reviews on GitHub".
    - 71% of reviews surface actionable feedback, and 29% post nothing. About 5.1 comments per review. Runs automatically for 12,000+ orgs.
    - A reasoning model gave +6% positive feedback at +16% latency.
    - Source: https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/
    - Date: 2026-03-05 · Measured-by: vendor · Confidence: high (that GitHub says it). "Actionable" is self-defined · Chapter: Ch 8
36. **GitHub's review quality model.**
    - Accuracy is tracked by thumbs up/down and by whether flagged issues are resolved before merge. Quote: "Silence is better than noise."
    - Source: same as claim 35 · Date: 2026-03-05 · Measured-by: vendor · Confidence: high · Chapter: Ch 8 metrics
37. **Uber's uReview.**
    - Analyses over 90% of about 65k weekly diffs. Median review time is 4 minutes.
    - 75% of comments are marked useful. Over 65% are addressed in the same changeset, against 51% for human comments (internal audit).
    - Estimated saving: about 1,500 hours a week.
    - Source: https://www.uber.com/blog/ureview/
    - Date: 2025-08-12 · Measured-by: self-reported (org) · Confidence: high (note: the post gives 65k/week and 65k/month in different places) · Chapter: Ch 3, Ch 8
38. **uReview's guardrails.**
    - Three parallel assistants: bugs, best practices and AppSec.
    - Filtering by confidence score with per-category thresholds, semantic dedup, and suppression of categories with low developer value.
    - A grader model scores the generator (best pairing: Claude 4 Sonnet generating, o4-mini-high grading).
    - Lessons: "Precision matters more than volume"; developers dislike readability and style comments.
    - Source: same as claim 37 · Date: 2025-08-12 · Measured-by: self-reported (org) · Confidence: high · Chapter: Ch 8 guardrails
39. **Atlassian RovoDev Code Reviewer.**
    - 38.70% of comments led to code changes in later commits. PR cycle time fell 30.8% and human-written comments fell 35.6% (interrupted time series over about a year).
    - Source: https://arxiv.org/abs/2601.01129 (ICSE 2026 SEIP)
    - Date: 2026-01-03 · Measured-by: self-reported (org), peer-reviewed. All authors are Atlassian-affiliated · Confidence: high for the abstract figures. Note that v2 wording reportedly softens the cycle-time figure · Chapter: Ch 3, Ch 8
40. **An industrial study (Qodo PR-Agent based, ICSE 2025 SEIP) found AI review slowed PR closure.**
    - 73.8% of AI comments were resolved, but mean PR closure time rose from 5h52m to 8h20m (statistically significant), with variation across projects.
    - Drawbacks: "faulty reviews, unnecessary corrections, irrelevant comments".
    - Source: https://arxiv.org/abs/2412.18531
    - Date: 2024-12-24 · Measured-by: independent (academic, industry partner) · Confidence: high · Chapter: Ch 8 (disconfirming evidence)
41. **Cursor Bugbot resolution rate.**
    - Rose from 52% to over 70% across about 40 experiments (V1 Jul 2025 → V11 Jan 2026). Bugs flagged per run went from 0.4 to 0.7, and resolved bugs per PR from about 0.2 to about 0.5.
    - "Resolution" is judged by an AI at merge time.
    - Source: https://cursor.com/blog/building-bugbot
    - Date: 2026-01-15 · Measured-by: vendor · Confidence: high (that Cursor says it; the metric is AI-judged and not precision) · Chapter: Ch 8
42. **Anthropic Code Review, internal results.**
    - PRs with substantive review comments rose from 16% to 54%. Under 1% of findings were marked incorrect by engineers.
    - PRs over 1,000 lines: 84% get findings, averaging 7.5 issues. PRs under 50 lines: 31%, averaging 0.5.
    - About 20 minutes and $15–25 per review. Code output per engineer +200% in a year.
    - Source: https://claude.com/blog/code-review
    - Date: 2026-03-09 · Measured-by: vendor and self-reported (org) · Confidence: high (that Anthropic says it) · Chapter: Ch 8 (how review changes when output triples)
43. **Critique of same-vendor write-and-review.**
    - A user quoted by InfoQ said Claude writing *and* reviewing code "does not even meet minimum safety standard". A researcher said the announcement "doesn't share any technical details".
    - Source: https://infoq.com/news/2026/04/claude-code-review
    - Date: 2026-04 · Measured-by: secondary press (quotes of individuals) · Confidence: medium · Chapter: Ch 8 debates
44. **Graphite/Claude case study.**
    - 67% of AI suggestions led to code changes; 96% positive feedback; PR feedback loop went from 1 hour to 90 seconds.
    - The page gives no definitions or time window.
    - Source: https://claude.com/customers/graphite
    - Date: undated · Measured-by: vendor (both companies) · Confidence: low–medium (metrics undefined) · Chapter: Ch 8 (as an example of unverifiable vendor metrics)
45. **Google ML-suggested edits for review comments.**
    - Offline: addresses 52% of comments at 50% target precision. Authors apply 40–50% of previewed edits.
    - Source: https://research.google/blog/resolving-code-review-comments-with-ml/
    - Date: 2023-05-23 · Measured-by: self-reported (org) · Confidence: high (pre-2025 baseline; L1 assisted review on the author side) · Chapter: Ch 8
46. **Review becomes the bottleneck when AI output rises.**
    - High-AI-adoption teams: +21% tasks, +98% PRs merged, +91% PR review time, +154% PR size, +9% bugs per developer.
    - "No significant correlation between AI adoption and improvements at the company level."
    - Source: https://www.faros.ai/blog/ai-software-engineering
    - Date: 2025-07-23 · Measured-by: vendor (Faros sells engineering analytics), telemetry from 10k+ devs and 1,255 teams; correlational · Confidence: medium–high · Chapter: Ch 1, Ch 4, Ch 8
47. **Anthropic warns against chasing reviewer findings.**
    - Quote: "A reviewer prompted to find gaps will usually report some, even when the work is sound… Chasing every finding leads to over-engineering."
    - Recommended pattern: Writer/Reviewer sessions; the reviewer runs in a fresh context and sees "only the diff and the criteria".
    - Source: https://code.claude.com/docs/en/best-practices
    - Date: read 2026-10-15 · Measured-by: vendor guidance · Confidence: high · Chapter: Ch 8 anti-patterns
48. **Developers are least willing to hand commit/review to AI among coding tasks.**
    - 58.7% "don't plan to use" AI for committing and reviewing code, against 28.9% for writing code.
    - Source: https://survey.stackoverflow.co/2025/ai
    - Date: 2025 · Measured-by: survey · Confidence: high · Chapter: Ch 8

---

## Cases

| # | Company | What they did | What was measured, by whom | Result | Source | Level / phase |
|---|---|---|---|---|---|---|
| C1 | Microsoft .NET (dotnet/runtime + 6 repos) | 10 months of GitHub Copilot Coding Agent on a critical runtime repo. Invested in `copilot-instructions.md`, firewall allowlist, 8 skills, build-only-when-needed. | Merge rate, task type, size, reverts, review comments, closure reasons. Self-reported by the .NET team. | 67.9% merged (humans 87.1%); 38%→69% after setup; reverts 0.6% vs 0.8%; 16.5 vs 12.4 review comments; 86.2% when humans co-commit | devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/ (2026-03-23) | **L2 coding** (every PR human-reviewed, heavy iteration), edging to L3 for cleanup/tests |
| C2 | Stripe | "Minions": Slack-triggered, unattended, one-shot agents in isolated devboxes; ≤2 CI rounds; human review of every PR | PR count. Self-reported. | 1,000+ merged PRs/week with no human-written code | stripe.dev/blog/minions-… (2026-02-09) | **L3 coding** (routine tasks run unattended; humans review output) |
| C3 | Uber | uReview, an in-house multi-assistant review bot in CI across 6 monorepos, with grader and filters | Usefulness rating, addressed rate, coverage. Self-reported. | 75% useful; 65% addressed (vs 51% human); ~1,500 h/week estimated | uber.com/blog/ureview/ (2025-08-12) | **L2→L3 review** (AI first-pass on 90% of diffs; humans still approve) |
| C4 | Atlassian | RovoDev Code Reviewer across 1,900+ repos (secondary figure) | Code resolution, cycle time via ITS. Atlassian authors, ICSE'26 peer-reviewed. | 38.7% of comments → code change; −30.8% PR cycle time; −35.6% human comments | arxiv.org/abs/2601.01129 | **L2 review** |
| C5 | Unnamed company (Turkish industry partner; secondary sources say Beko, unverified) | Qodo PR-Agent based review on 3 projects, 1,568 PRs | Resolution and closure time. Independent academics. | 73.8% resolved, **but closure time 5h52m → 8h20m** | arxiv.org/abs/2412.18531 | **L2 review, mixed/negative outcome** |
| C6 | Anthropic (internal) | Claude Code across engineering; multi-agent Code Review on internal PRs | Survey (n=132), 200k transcripts, review coverage. Self-reported. | 59% of work uses Claude; 0–20% fully delegable for most; substantive-review PRs 16%→54%; <1% findings marked wrong | anthropic.com/research/how-ai-is-transforming-work-at-anthropic; claude.com/blog/code-review | **L2–L3 coding, L2→L3 review** |
| C7 | Answer.AI | A month delegating 20 real tasks to Devin | Success tally. Independent practitioners. | 3/20 successes, 14 failures | answer.ai/posts/2025-01-08-devin | **Failed attempt at L3/L4 coding**: autonomy without scoping |
| C8 | GitHub (Copilot code review, product-wide) | Agentic review on >1 in 5 GitHub reviews | Actionable %, comments/review, positive feedback. Vendor. | 71% actionable, 29% silent, 5.1 comments | github.blog/…60-million… (2026-03-05) | **L2 review** at ecosystem scale |
| C9 | Cursor (Bugbot product) | 40 experiments; moved to an agentic reviewer | AI-judged resolution at merge. Vendor. | 52%→70%+ resolution | cursor.com/blog/building-bugbot (2026-01-15) | **L2 review**; shows how to iterate on a reviewer |

---

## Proposed ladder per phase (drawn from the evidence above; for the bible to settle)

**Requirements & specs (Ch 5)**
- **L1:** Chat helps draft user stories or PRDs.
- **L2:** The agent interviews the human and writes `SPEC.md` / Kiro `requirements.md` (EARS) / Spec Kit `spec.md`. The human approves every phase gate (C6 guidance, claim 7).
- **L3:** Specs are generated from tickets for routine work and reviewed by exception. Kiro "Quick Spec" skips gates (claim 3).
- **L4:** No credible public case. Böckeler's "spec-as-source" (Tessl) is the aspiration, not practice.

**Design (Ch 6)**
- **L1:** LLM drafts an ADR from a decision context (claims 11–12).
- **L2:** An agent proposes design options in plan mode or a `design.md`, and a human picks one. ADRs feed the agent's instruction file (claim 15).
- **L3/L4:** No measured case found. This is evidence that design remains human-owned.

**Coding (Ch 7)**
- **L1:** Autocomplete and chat.
- **L2:** Interactive agent: plan → implement → human reviews every diff.
- **L3:** Background/cloud agents (Copilot Coding Agent, Codex cloud, Jules, Devin, Stripe Minions) run routine, well-scoped tasks unattended. The output is a PR that humans review (C1, C2).
- **L4:** Narrow task types with deterministic verification, merged without per-PR human review. No public general-code case found. Closest are bot-class changes, such as dependency bumps, which predate LLMs.

**Review (Ch 8)**
- **L1:** Author-side suggestions (Google ML edits).
- **L2:** A bot comments on every PR and humans decide (C3–C5, C8, C9).
- **L3:** AI is the first reviewer and humans review by exception or by risk tier. Anthropic's 16→54% coverage shift and Atlassian's −35.6% human comments point here.
- **L4:** AI approval merges low-risk PRs without a human. No primary public case found (see leads).

---

## Contradictions & debates

1. **Do instruction files help?**
   - Against: arXiv 2602.11988 found lower success and +20% cost.
   - For: arXiv 2601.20404 found −28.6% runtime with comparable completion. The AAIF test found −27% time. The .NET team saw 38%→69% success after improving instructions and environment.
   - Reconciliation: the ETH study measured mostly LLM-generated or generic files on benchmark tasks. The .NET gain bundled instructions with environment fixes (firewall, build tooling). Both point the same way: **minimal, specific, human-written, plus deterministic environment fixes**. The book should not claim "AGENTS.md improves success" unqualified.
2. **Is SDD progress or waterfall?**
   - Pro: GitHub and Kiro say it gives "intent as source of truth".
   - Against: Böckeler and Thoughtworks say it is verbose, hard to review, ignored by agents, a possible "bitter lesson". Anthropic's own docs say to skip planning for one-sentence diffs.
   - No outcome data exists on either side.
3. **Does AI review speed delivery?**
   - Atlassian: −30.8% cycle time.
   - Qodo-based industrial study: +42% closure time.
   - Faros: +91% review time at high adoption.
   - These differences may come from noise filtering (Uber, GitHub and Cursor all emphasise precision) and from PR-size inflation.
4. **Metric incomparability.** Each vendor uses its own "acceptance" metric:
   - "Useful" (Uber, human rating)
   - "Addressed in same changeset" (Uber automated, 65%)
   - "Led to code changes" (Atlassian 38.7%, Graphite 67%)
   - "Resolved at merge, AI-judged" (Cursor 70%+, Qodo study 73.8%)
   - "Actionable" (GitHub 71%, which is *reviews* with comments, not comment precision)
   - "Marked incorrect <1%" (Anthropic)
   - These cannot be ranked against each other. Human baselines: Uber 51%; Graphite's CEO reportedly ~50% (unverified).
5. **Same-model write and review.** Anthropic recommends fresh-context reviewers. Critics say same-vendor review falls short of independence (claim 43). The book should treat model and vendor diversity in review as an open question.
6. **Perceived vs measured productivity.**
   - Anthropic: +50% self-reported, and a 67% rise in merged PRs per engineer per day (attributed to an internal source).
   - METR: −19% measured in 2025, with 2026 data unreliable.
   - Survey and telemetry evidence should never be presented as RCT evidence.
7. **Agent-PR merge rates.**
   - Claude Code OSS PRs: 83.8% (arXiv 2509.14745).
   - dotnet/runtime: 67.9%.
   - Rates depend on repository difficulty and on who invokes the agent. The MCP csharp-sdk repo reached 77.3% against runtime's 67.9% under the same team.

---

## Unverified leads

These were not confirmed against a primary source in this session. Do not cite them without checking.

- **CodeRabbit "State of AI vs Human Code Generation"** (Dec 2025): AI-coauthored PRs had about 10.83 issues against 6.45 (~1.7x), from 470 OSS PRs. Seen only via search summaries of The Register and BusinessWire. Vendor with a commercial interest. Fetch coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report.
- **Faros "Acceleration Whiplash" 2026** (22k devs): 5x median review time, +51% PR size, +28% bugs per PR. Secondary only.
- **Cortex benchmark**: PRs per author +20%, incidents per PR +23.5% (via The Register). Unverified.
- **AIDev dataset per-agent merge rates** (Emergent Mind summary: humans 76.8%, Codex 64%, Devin 49%). The MSR'26 dataset paper (arXiv 2602.09185) does *not* report them. Check arXiv 2507.15003 ("AI Teammates in SE 3.0").
- **Cursor Bugbot ~80% resolution** (May 2026 changelog, default effort; "High" finds 35% more bugs). Secondary only.
- **Graphite reviewer "<3% unhelpful comments" and "<4% downvote"** (CEO talk at AI Engineer World's Fair 2025); human comments ~50% → change. Vendor; secondary.
- **Copilot code review "44.5% F1 across 747K reviews"** (vendor-comparison blog). Very doubtful.
- **Spec Kit "120k stars, 30+ agents"** (codemyspec.com). Superseded by the 141.4k read directly. The agent count is unconfirmed.
- **Kiro GA date** (one blog says "May 2026"; other sources suggest late 2025). Check kiro.dev/blog.
- **Anthropic 2026 Agentic Coding Trends Report** (PDF, file last modified 2026-01-12): 8 trends; cases Rakuten, CRED, TELUS, Zapier. I could not extract the PDF text. Secondary summaries cite "~60% of work, 0–20% fully delegable", which matches the Dec 2025 Anthropic research.
- **"Claude Code is ~90% written by Claude"** and similar founder claims. Not checked; do not use without a primary source.
- **OpenAI Codex code review internal usage** (openai.com/index/introducing-upgrades-to-codex/, Sep 2025) returned 403. It reportedly states that Codex reviews most OpenAI PRs. Re-fetch.
- **Uber uReview**: the post states the diff volume as both 65k/week and 65k/month.
- **METR time-horizon latest** (Wikipedia: "Claude Mythos" ≥16h at 50%, May 2026; doubling ~4–7 months). Relevant for task sizing. Owned by the bottleneck/maturity briefs; verify on metr.org.
- **Design-review agents in production** (e.g., Uber, Google, Meta design-doc review bots). Not searched; budget exhausted.
- **Gloaguen et al.**: per-model numbers, and the +4% (human-written) vs −2% (LLM-generated) split. Secondary summary only.

---

## Open questions for the book

1. Does Ch 5 recommend a *tool* (Spec Kit/Kiro) or a *practice* (interview → spec → fresh session → verification step)? The evidence supports the practice. The tools are at Thoughtworks "Assess".
2. Ch 6 has almost no production evidence. Should design be described as "stays at L1–L2 by design", with the case drawn from agent-PR closure reasons (dotnet: 16% wrong approach, 8% design rejected)?
3. Ch 8 needs one normalised metric vocabulary (useful / addressed / resolved / incorrect). Should the bible define these terms and map every vendor figure onto them?
4. Is there any public, primary case of **L4 review** (AI approval merging without a human) or **L4 coding** for general code? If not, the book should say so plainly in Ch 2.
5. How should the book treat vendor-on-vendor evidence? Examples: the Microsoft team on GitHub's agent, and Anthropic on Claude Code Review. They are self-reported but detailed. Proposal: label them as such and prefer cases with negative numbers disclosed (C1 qualifies).
6. Should the "instruction-file paradox" (claims 17–19) go in Ch 7 as an anti-pattern, "the over-specified CLAUDE.md"? Or in Ch 17 as a measurement-hygiene lesson (single run vs five runs)?
7. Background-agent economics, i.e. the cost per merged PR including review time, are unmeasured in every case found. The .NET post explicitly did not analyse compute or CI cost. This may be a gap for Ch 4.
