# Research brief: Security, Permissions & Blast Radius (new end-of-Part-II chapter)

Researcher brief for *From SDLC to AI-Driven SDLC: A Migration Handbook*. Compiled 2026-10-15.
Builds on failures-and-rollbacks.md (FR-C1 to C17) and aggregate.md §7 item 1. IDs below are **SB-n**.
Tiers follow aggregate.md: T1 = independent; vendor = has a product stake; self-reported = victim or vendor account.

**Chapter thesis the evidence supports.** There are three separate risk surfaces:

- **(1) The code the AI writes** is insecure at a stable base rate, and newer models have not fixed this.
- **(2) The toolchain the AI runs in** is now an attack surface: prompt injection, MCP, rules files, CI agents and supply chain.
- **(3) The authority the AI holds** is the blast radius.

Every documented destructive incident sits in (3). In each one the vendor's fix was an environment or credential boundary, not a better model. In the toolchain attacks of (2), the damage was set by the agent's permissions (skip-permission flags, service_role keys, broad tokens), not by the injection itself.

---

## Resolved

**R1. Veracode 2025 GenAI Code Security Report (FR-C10).** Verified at the primary.
- 80 curated tasks, more than 100 LLMs. "In 45 percent of all test cases, LLMs introduced vulnerabilities."
- Java failed security more than 70% of the time. Python, C# and JavaScript failed 38–45%.
- CWE-80 (XSS) failed in 86% of cases and CWE-117 (log injection) in 88%. "larger models do not perform significantly better than smaller models."
- Source: https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/ (2025-07-30).
- Measured-by: vendor (sells AppSec). Confidence: medium-high. Chapter: new Security chapter (Sec), Ch 4.
- **Update: Veracode has published two later snapshots, see SB-1 and SB-2. Use the 2026 figure (56% pass) as the current number and the 2025 figure (45% fail) as history.**

**R2. Pearce et al., "Asleep at the Keyboard?" (FR-C7).** Verified.
- "we produce 89 different scenarios for Copilot to complete, producing 1,689 programs. Of these, we found approximately 40% to be vulnerable."
- Accepted at IEEE S&P 2022. Source: https://arxiv.org/abs/2108.09293 (v1 2021-08-20).
- Measured-by: independent (academic). Confidence: high, but the model is Codex-era. Use it as the 2021 baseline. Chapter: Sec, Ch 4.

**R3. Perry et al. (Stanford): participant count resolved (an aggregate fact-check item).**
- "we were left with 47 participants— 33 in the experiment group and 14 in the control group" (PDF §3).
- On the encryption task, "67% of experiment participants provided a correct solution compared to 79% of control participants." The experiment group was "significantly more likely to write an insecure solution (p = 0.017)" and more likely to use trivial ciphers (p = 0.018).
- Headline: users with an assistant "were more likely to believe that they wrote secure code."
- Source: https://arxiv.org/abs/2211.03622 (PDF read in full; CCS '23, pp. 2785–2799). Model: codex-davinci-002.
- Measured-by: independent (controlled user study). Confidence: high for direction; small n, old model. Chapter: Sec, Ch 8 (the confidence gap is a review risk).

**R4. Newer (2025–2026) security-quality studies.** Found and verified; see SB-1 to SB-4.
- BaxBench (ETH/LogicStar, 2025): best model 62% correct, and exploits work on about half of the correct programs.
- SusVibes (CMU, ICML 2026): an agent produced 57% functionally correct but only 11.8% secure solutions on real repository tasks.
- Veracode Oct-2025 and Jul-2026 updates.

**R5. Spracklen et al., USENIX Security 2025 (FR-C13).** Verified, with new detail from the full paper.
- 16 LLMs, 576,000 samples. Hallucination rate "at least 5.2% for commercial models and 21.7% for open-source models". 205,474 unique hallucinated names.
- Proceedings pp. 3687–3706; **Distinguished Paper Award**.
- **Persistence (new):** "43% of hallucinated packages were repeated in all 10 queries, while 39% did not repeat at all"; "58% of the time, a hallucinated package is repeated more than once in 10 iterations." This is what makes slopsquatting practical: the names are predictable.
- GPT-4 Turbo had the lowest rate (3.59%). Python averaged 15.8% and JavaScript 21.3%.
- Several models detected their own hallucinations "with greater than 75% accuracy."
- Sources: https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen and the PDF https://www.usenix.org/system/files/usenixsecurity25-spracklen.pdf (Aug 2025).
- Measured-by: independent. Confidence: high. Chapter: Sec, Ch 10.

**R6. Amazon Q Developer extension incident (FR-C16).** Re-verified at the AWS bulletin.
- Root cause: "an inappropriately scoped GitHub token in their CodeBuild configuration." Malicious code was "automatically included in a release." It failed to execute because of a syntax error.
- Version 1.84.0 was affected and 1.85.0 fixed it. CVE-2025-8217.
- Bulletin published 2025-07-23 and updated 2025-07-25: https://aws.amazon.com/security/security-bulletins/AWS-2025-015/
- Measured-by: self-reported (vendor). Confidence: high.
- **Note for the chapter:** the root cause is itself a credential-scope failure, the same class as the agent incidents. The prompt wording ("near-factory state") is press-only. Do not quote it.

**R7. Nx "s1ngularity" (FR-C17).** Verified at two primaries: the Nx maintainer advisory and Wiz.
- **Root cause (Nx advisory GHSA-cxm3-wv7p-598c):**
  - A PR-validation workflow used `pull_request_target` and echoed the PR title in a `run:` step, so a crafted title ran as bash.
  - The injected workflow triggered `publish.yml`, which leaked the npm token.
  - Malicious versions were published 2025-08-26, 6:32 PM EDT, and removed by npm at 10:44 PM EDT.
  - The postinstall also appended `sudo shutdown -h 0` to shell rc files.
  - The AI prompt asked a "file-search agent" to write a path inventory to `/tmp/inventory.txt`.
  - Fixes: Trusted Publishing instead of npm tokens, 2FA, approval for workflows from external contributors, CodeQL.
  - Source: https://github.com/nrwl/nx/security/advisories/GHSA-cxm3-wv7p-598c
- **AI-CLI abuse (Wiz, Rami McCarthy, 2025-09-03):**
  - Flags used: `--dangerously-skip-permissions`, `--yolo` and `--trust-all-tools`.
  - About half of victims had at least one AI CLI installed.
  - The AI step exfiltrated successfully in "under a quarter of cases." Almost a quarter of Claude interactions were refused. Gemini's attempts often failed because of default workspace restrictions.
  - More than 2,000 verified secrets leaked, from more than 1,700 users. More than 40% of the leaked npm tokens were still valid when measured.
  - Phase 2: at least 480 accounts and more than 6,700 private repos made public.
  - Source: https://www.wiz.io/blog/s1ngularitys-aftermath
- Measured-by: maintainer self-report plus an independent security vendor. Confidence: high.
- **Chapter point:** defaults (permission prompts, workspace restriction) measurably blunted the AI step. The skip-permission flags were what the malware needed.

**R8. MCP server vulnerabilities.** Verified at the primaries; see SB-8 to SB-12 (tool poisoning, the GitHub MCP toxic flow, the Supabase MCP leak, mcp-remote CVE-2025-6514, MCP Inspector CVE-2025-49596). The malicious postmark-mcp package is secondary-only; see Still unverified.

**R9. Rules-file backdoor research.** Verified (SB-13).
- Pillar Security, 2025-03-18: hidden Unicode in Cursor and Copilot rule files makes the agent inject malicious code silently.
- Cursor said it is "not a vulnerability on their side." GitHub said users are "responsible for reviewing and accepting suggestions," then added a hidden-Unicode warning on github.com on 2025-05-01.

**R10. Replit DB deletion (FR-C1).** Strengthened with a vendor-docs primary.
- Masad's statements were re-verified via The Register (2025-07-22): "Unacceptable and should never be possible"; "started rolling out automatic DB dev/prod separation to prevent this categorically"; "one-click restore."
- **New primary:** Replit docs now state that on the development DB the Agent "can create and modify tables"; on production the Agent "can't touch it"; "Agent is not able to modify the production database." Schema changes reach production only at publish.
- Source: https://docs.replit.com/features/data-and-storage/development-and-production (accessed 2026-10-15).
- Measured-by: vendor docs. Confidence: high that the control exists as documented.
- **This is the cleanest "environment boundary as the fix" exhibit.**
- Could not reach Replit's own July-2025 blog post or Lemkin's X posts; the record counts stay secondary.

**R11. Other documented agent incidents and the shared root cause.** See the Cases section.
- PocketOS (Apr 2026): AIID 1469 and OECD.
- Kiro / AWS Cost Explorer: Amazon's own correction post says the cause was "misconfigured access controls," and Amazon added "mandatory peer review for production access."
- Antigravity: "Agent Decides" / "Auto" defaults plus webhook.site on the allow-list.
- Anthropic's own list of internal "overeager" actions, including "attempting database migrations against a production database."
- **The root-cause pattern holds in every case: irreversible authority + no environment/credential boundary.** In every vendor or victim fix that is documented, the change was environmental: dev/prod split, soft-delete, token scoping, peer review for prod access.

**R12. Controls teams use.** Verified at the primaries; see SB-15 to SB-22.
- Anthropic sandboxing: filesystem plus network isolation, 84% fewer prompts, credentials kept outside the sandbox.
- OpenAI Codex: network off by default; `--yolo` "not recommended".
- GitHub Copilot cloud agent: single `copilot/` branch, workflows don't run until approved, the requester can't approve, a firewall, secret scanning.
- Claude Code: deny > ask > allow precedence; `disableBypassPermissionsMode` in managed settings; bypass mode "only … in isolated environments like containers or VMs."
- Secret scanning: GitHub push protection, GitGuardian 2026.
- Design rules: Meta's Rule of Two, Google's three principles, Willison's lethal trifecta.

**R13. Per-level permission guidance.** No single primary maps the book's L2/L3/L4 to permissions. Two published frameworks map closely, CSA (SB-23) and AWS (SB-24), and the book's proposed mapping is built from them in SB-25. That mapping is labelled as the book's proposal.

---

## New claims

### A. Security quality of AI-generated code (2025–2026)

**SB-1. Veracode Oct-2025 update: GPT-5 reasoning models reached 70–72% security pass rates; other new models stayed at about 50–59%.**
- GPT-5 Mini 72%, GPT-5 70%, GPT-5-chat (non-reasoning) 52%, Gemini 2.5 Pro 59%, Grok 4 55%, Gemini Flash 51%, Claude Sonnet 4.5 50%, Qwen3 Coder 50%, Claude Opus 4.1 49%.
- XSS pass rate below 14%, log injection about 12%, cryptographic algorithms over 85%.
- CTO Jens Wessling: "Relying solely on model improvements is not a viable security strategy."
- Source: https://www.veracode.com/?p=24419 (press release 2025-11-18); report PDF https://www.veracode.com/wp-content/uploads/October-2025-GenAI-Code-Security-Report-Update.pdf
- Measured-by: vendor. Confidence: medium-high. Chapter: Sec.

**SB-2. Veracode 2026 report: security pass rate "stalled at 56%" while syntax pass is about 100%.**
- 11 models on the current leaderboard. Reasoning models 56% vs non-reasoning 51%. Coding-specialised 51% vs general 52%.
- By size: large 53%, medium 51%, small 51%. Python 63%, Java 30%.
- Best was GPT-5.5 at 68%, below the earlier GPT-5 Mini 72%. Lowest was Qwen3.7-max at 50%.
- Chris Wysopal: "AI-generated code needs to be treated like any unreviewed code."
- Source: https://www.veracode.com/?p=31889 (2026-07-28). Measured-by: vendor. Confidence: medium-high.
- **Use as the current headline: about 44% of security-relevant outputs still fail, and neither model size nor coding specialisation helps.** Chapter: Sec, Ch 4.

**SB-3. BaxBench: even the best model writes correct backends only 62% of the time, and about half of correct programs are exploitable.**
- 392 backend tasks. o1 reaches "a mere 62% on code correctness." Exploits succeeded on "around half of the correct programs generated by each LLM."
- Source: Vero et al., https://arxiv.org/abs/2502.11844 (v1 2025-02-17, rev. 2025-05-30).
- Measured-by: independent academic (ETH Zurich, with LogicStar.ai co-authors). Confidence: medium-high (preprint on arXiv; a venue was not confirmed on the page). Chapter: Sec.

**SB-4. SusVibes (ICML 2026): on real feature requests in real repos, an agent's code was functional 57% of the time but secure only 11.8% of the time.**
- 186 tasks from open-source projects; 12 agent settings. SWE-Agent + Claude 4 Sonnet: 57% functionally correct, 11.8% secure.
- The arXiv v1/v2 figures (200 tasks, 61% / 10.5%) are superseded; cite the PMLR version.
- Secondary search snippets say adding vulnerability hints to the request did not fix it. That is from the arXiv abstract, not re-read on PMLR.
- Source: Zhao, Wang, Zhang, Luo, Li, Li, https://proceedings.mlr.press/v306/zhao26ax.html (ICML 2026, PMLR 306).
- Measured-by: independent, peer-reviewed. Confidence: high.
- **This is the strongest agent-era (not autocomplete-era) number.** Chapter: Sec, Ch 7, Ch 8.

**SB-5. Agent-assisted commits leak secrets at about twice the baseline.**
- "Claude Code-assisted commits showed a 3.2% secret-leak rate, versus a 1.5% baseline across all public GitHub commits." GitGuardian cautions that this "should not be read as a simple tool failure. Developers remain in control of what gets accepted … or pushed."
- Also: 28.65M new hardcoded secrets in public commits in 2025 (+34% year on year). AI-service secrets 1,275,105 (+81%).
- **24,008 unique secrets in MCP-related config files**, of which 2,117 were valid.
- "64% of valid secrets from 2022 are still active and exploitable" when retested in Jan 2026.
- Source: https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/ (2026-03-17).
- Measured-by: vendor (sells secret scanning); attribution method for "Claude Code-assisted" not checked. Confidence: medium. Chapter: Sec.

**SB-6. GitHub: push protection stops about 30% of newly detected secrets before they enter history. Developer override rate fell from 6.63% to 3.93% (Q2 2024 to Q2 2026), and one in three PRs on GitHub now involves an AI agent.**
- "stops about 30% of newly detected secrets before they enter repository history"; the rest are found after exposure.
- GitHub presents the falling bypass rate as evidence against the claim that agents make developers more careless.
- A new ModernBERT secret classifier is coming to `/security-review` in Copilot CLI.
- Source: Erin Havens, https://github.blog/ai-and-ml/github-copilot/secret-protection-must-scale-with-software/ (2026-10-07).
- Measured-by: vendor telemetry. Confidence: medium-high for GitHub's own data. Chapter: Sec, Ch 10.

### B. Prompt injection and the AI toolchain as attack surface

**SB-7. Prompt injection can switch off the human-approval gate itself (CVE-2025-53773, GitHub Copilot in VS Code).**
- Injected text made the agent write `"chat.tools.autoApprove": true` into `settings.json`. That enabled "YOLO mode", after which arbitrary terminal commands ran (RCE).
- Reported 2025-06-29; fixed in the August 2025 Patch Tuesday.
- Researcher: "Ideally, the AI would not be able to modify files without a human first approving it."
- Source: Johann Rehberger, https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/ (2025-08-12).
- Measured-by: independent researcher; CVE assigned by the vendor. Confidence: high. Chapter: Sec.
- **Lesson: the agent must not be able to write its own permission config.**

**SB-8. CurXecute (CVE-2025-54135, Cursor): an agent could *create* `.cursor/mcp.json` without approval, register a malicious MCP server, and run code.**
- Affected ≤1.2.1; patched in 1.3.9. CVSS 8.5. "Editing an existing dotfile requires approval, but creating one that doesn't yet exist does not."
- Source: https://github.com/cursor/cursor/security/advisories/GHSA-4cxx-hrm3-49rm (2025-08-02).
- Measured-by: vendor advisory (reporters at Aim Security). Confidence: high. Chapter: Sec. The Aim Security blog returned 403.

**SB-9. Gemini CLI: a prompt injection in README.md plus weak allow-list matching ran a disguised command that silently exfiltrated environment variables.**
- The attacker first gets `grep` allow-listed, then hides a malicious command behind it; whitespace padding hides it from the user.
- Google reclassified the issue from P2/S4 to P1/S1 and fixed it in v0.1.14 (2025-07-25).
- The author "investigated OpenAI Codex and Anthropic Claude and they do not appear to be vulnerable."
- Source: Sam Cox, Tracebit, https://tracebit.com/blog/code-exec-deception-gemini-ai-cli-hijack (2025-07-28).
- Measured-by: independent security vendor. Confidence: high. Chapter: Sec.
- **Lesson: command allow-lists are string matches, not a security boundary.** Claude Code's docs say the same about Bash rules; see SB-18.

**SB-10. MCP tool poisoning and "rug pulls".**
- Tool poisoning: "malicious instructions are embedded within MCP tool descriptions that are invisible to users but visible to AI models." In the demo, Cursor exfiltrated `~/.cursor/mcp.json` and `~/.ssh/id_rsa`; the confirmation dialog hid the arguments.
- Shadowing: one server's tool description redirected another server's `send_email`.
- Rug pull: a server changes a tool's description after it was approved.
- Mitigations: pin and hash tool descriptions; enforce cross-server dataflow boundaries.
- Source: Beurer-Kellner and Fischer, Invariant Labs, https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks (2025-04-01).
- Measured-by: independent security vendor. Confidence: high. Chapter: Sec.

**SB-11. GitHub MCP "toxic agent flow": a malicious public issue made Claude 4 Opus (Claude Desktop with the official GitHub MCP) leak private-repo data into a public PR.**
- Users on "Always Allow" were not reviewing tool calls.
- Root cause: "not a flaw in the GitHub MCP server code itself"; "a fundamental architectural issue that must be addressed at the agent system level."
- Mitigation: least privilege, e.g. one repository per session.
- Source: Milanta and Beurer-Kellner, https://invariantlabs.ai/blog/mcp-github-vulnerability (2025-05-26).
- Measured-by: independent security vendor. Confidence: high. Chapter: Sec.

**SB-12. Supabase MCP: a support ticket containing instructions led Cursor, running as `service_role` (which bypasses RLS), to read an `integration_tokens` table and post the secrets back into the ticket.**
- "No permissions were violated."
- Mitigations: `project_ref` scoping, `read_only=true`, the `features` tool groups, manual approval of queries. Filters alone are not a defence.
- Source: General Analysis, https://generalanalysis.com/blog/supabase-mcp-blog (2025-07-08; guidance re-reviewed 2026-09-06).
- Measured-by: independent researcher. Confidence: high.
- Also: CVE-2025-6514 in `mcp-remote` 0.0.5–0.1.15. CVSS 9.6; a malicious server's OAuth `authorization_endpoint` leads to OS command injection, proven on Windows; fixed in 0.1.16. Source: JFrog, https://jfrog.com/blog/2025-6514-critical-mcp-remote-rce-vulnerability/ (2025-07-09).
- Also: CVE-2025-49596 in Anthropic's MCP Inspector below 0.14.1. CVSS 9.4; unauthenticated proxy plus DNS rebinding means a webpage can run commands; fixed with a session token and origin checks. Source: Oligo, https://www.oligo.security/blog/critical-rce-vulnerability-in-anthropic-mcp-inspector-cve-2025-49596 (2025-06-27).
- Chapter: Sec.

**SB-13. Rules-file backdoor.**
- Hidden Unicode (zero-width joiners, bidi markers) in Cursor and Copilot rule files makes the agent insert a malicious script tag and not mention it. The poisoned rules persist through forks.
- Vendors declined to treat it as their vulnerability (see R9).
- Mitigation: treat AI config files "with the same scrutiny as executable code."
- Source: Ziv Karliner and others, Pillar Security, https://www.pillar.security/blog/new-vulnerability-in-github-copilot-and-cursor-how-hackers-can-weaponize-code-agents (2025-03-18).
- Measured-by: independent security vendor. Confidence: high. Chapter: Sec, Ch 15 (CODEOWNERS on AGENTS.md / .cursor/ / .claude/).

**SB-14. PromptPwnd: AI agents in CI (GitHub Actions or GitLab) that read untrusted issue or PR text while holding privileged tokens can be made to leak secrets.**
- "At least 5 Fortune 500 companies are impacted." Google patched Gemini CLI's own workflow "within four days."
- Affected agents: Gemini CLI, Claude Code Actions, OpenAI Codex Actions, GitHub AI Inference.
- Claude Code Action runs only for users with write access by default. Setting `allowed_non_write_users: "*"` "should be considered extremely dangerous."
- Mitigations: restrict agent tools; keep untrusted input out of prompts; treat AI output as untrusted; limit token blast radius.
- Source: Rein Daelman, Aikido, https://www.aikido.dev/blog/promptpwnd-github-actions-ai-agents (2025-12-04; updated 2026-03-17).
- Measured-by: independent security vendor; the Fortune 500 count is self-reported and unnamed. Confidence: medium-high. Chapter: Sec, Ch 10 (L3 CI agents).

### C. Controls: what vendors ship and recommend

**SB-15. Sandboxing needs both a filesystem boundary and a network boundary. Anthropic reports 84% fewer permission prompts with them.**
- "effective sandboxing requires both filesystem and network isolation": without the network boundary, a compromised agent can exfiltrate SSH keys; without the filesystem boundary, it can escape.
- Built on bubblewrap (Linux) and seatbelt (macOS). Internal data: sandboxing "reduces permission prompts by 84%."
- Cloud sessions keep credentials outside the sandbox: "sensitive credentials (such as git credentials or signing keys) are never inside the sandbox." A git proxy checks each push (e.g. configured branch only) and then attaches the real token.
- Source: https://www.anthropic.com/engineering/claude-code-sandboxing (2025-10-20).
- Measured-by: vendor. Confidence: high (design); medium (84%, internal). Chapter: Sec.

**SB-16. Approval fatigue is measured. Users approve 93% of permission prompts, and Anthropic's automated approver misses 17% of real "overeager" actions.**
- Claude Code users approve 93% of prompts.
- Auto-mode classifier: false-positive rate 0.4% on 10,000 real tool calls. **False-negative rate 17% on 52 curated real overeager actions** ("the honest number"). 5.7% FN on 1,000 synthetic exfiltration attempts.
- Overeager examples cited from Anthropic's own internal use: "deleting remote git branches", "uploading an engineer's GitHub auth token to an internal compute cluster", "attempting database migrations against a production database."
- Anthropic says it is not a drop-in replacement for careful human review on high-stakes infrastructure.
- Source: https://www.anthropic.com/engineering/claude-code-auto-mode (2026-03-25).
- Measured-by: vendor, unusually candid. Confidence: medium-high. Chapter: Sec, Ch 2 (why L3 needs a boundary, not just approvals).
- **Key argument: neither human clicks (93% rubber-stamp) nor classifiers (17% miss) are a boundary. Only environment and credential scope is.**

**SB-17. OpenAI Codex defaults: network off, writes limited to the workspace, full-access flag "not recommended".**
- "By default, the agent runs with network access turned off." The defaults give "no network access and write permissions limited to the active workspace." The Auto preset is `workspace-write` plus `on-request` approvals.
- `--dangerously-bypass-approvals-and-sandbox` (alias `--yolo`) is "(not recommended)". In a dev container, a malicious project can exfiltrate everything in it, including Codex credentials.
- "Treat web results as untrusted." "Prompt injection can cause the agent to fetch and follow untrusted instructions."
- Source: https://developers.openai.com/codex/agent-approvals-security (redirects to learn.chatgpt.com/docs/agent-approvals-security; accessed 2026-10-15).
- Measured-by: vendor docs. Confidence: high. Chapter: Sec.

**SB-18. Claude Code permission model: deny-first precedence, an org-level kill-switch for bypass mode, and an admission that Bash rules are not a security boundary.**
- "Rules are evaluated in order: deny, then ask, then allow."
- `bypassPermissions`: "Only use this mode in isolated environments like containers or VMs where Claude Code can't cause damage."
- `permissions.disableBypassPermissionsMode` / `disableAutoMode` set to `"disable"` in managed settings, "where they can't be overridden."
- A Bash deny rule "covers the invocation Claude usually produces and isn't a security boundary around the program."
- Source: https://code.claude.com/docs/en/permissions (accessed 2026-10-15).
- Measured-by: vendor docs. Confidence: high. Chapter: Sec, Ch 15.

**SB-19. GitHub Copilot cloud agent is a shipped L3 permission envelope.**
- "Only users with write access to the repository can trigger" it. It can "only push to a single branch" (`copilot/…`) and "cannot directly run `git push`."
- "workflows are not triggered until Copilot cloud agent's code is reviewed." The requester cannot approve the PR.
- Internet access is restricted by a firewall. Secret scanning runs on its output. Hidden characters in issues are filtered.
- Sessions are capped at 59 minutes.
- Sources: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations and https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent (accessed 2026-10-15).
- Measured-by: vendor docs. Confidence: high. Chapter: Sec, Ch 10.

**SB-20. Meta's "Agents Rule of Two".**
- Agents "must satisfy no more than two of the following three properties within a session":
  - [A] "process untrustworthy inputs"
  - [B] "access to sensitive systems or private data"
  - [C] "change state or communicate externally"
- Source: https://ai.meta.com/blog/practical-ai-agent-security/ (2025-10-31).
- Measured-by: vendor guidance. Confidence: high. Chapter: Sec (the design rule for scoping an agent session).
- Closely related: Simon Willison's "lethal trifecta" (2025-06-16): private data + untrusted content + external communication. "The only way to stay safe there is to avoid that lethal trifecta combination entirely." https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ (expert commentary, not research).

**SB-21. Google's three principles for secure agents.**
- "agents must have well-defined human controllers"; "their powers must be carefully limited"; "their actions and planning must be observable." Hybrid defence in depth: deterministic controls plus reasoning-based defences.
- Source: Díaz, Kern, Olive, https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/ (2025).
- Measured-by: vendor position paper. Confidence: high. Chapter: Sec.

**SB-22. OWASP Top 10 for Agentic Applications 2026 exists and is the citable industry taxonomy.**
- Published 2025-12-09; categories ASI01–ASI10. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- Category names were not on the landing page; see Still unverified.
- Measured-by: community standard. Confidence: high (existence and date). Chapter: Sec, Appendix.

### D. Per-level guidance

**SB-23. CSA "Levels of Autonomy" attaches controls to each level.**
- L1: "Every proposed action enters a queue, a human reviews and approves."
- L2: approve "a plan or batch of actions"; "Checkpoint-based rollback capabilities become important here"; manager plus security sign-off.
- L3: "machine-readable boundary definitions" and "technical enforcement mechanisms that actually prevent boundary violations"; formal review board.
- L4: "immediate kill-switch capabilities", "continuous monitoring", "executive authorization and documented risk acceptance."
- L5: "the control mechanisms required to safely operate at this level don't exist yet."
- Source: Jim Reavis, https://cloudsecurityalliance.org/blog/2026/01/28/levels-of-autonomy (2026-01-28).
- Measured-by: industry body (opinion). Confidence: high (as stated). Chapter: Sec, Ch 2.
- Note: CSA's L1–L4 are offset from the book's L1–L4. CSA L2 ≈ book L2; CSA L3 ≈ book L3. Map them explicitly.

**SB-24. AWS Agentic AI Security Scoping Matrix: four scopes and their controls.**
- Scope 1 "No agency": read-only, "Fixed execution boundaries."
- Scope 2 "Prescribed agency": "explicit human approval for all actions of consequence"; "Time-bounded approval tokens with automatic expiration."
- Scope 3 "Supervised agency": humans trigger, then the agent acts "without further approval"; "Clear execution boundaries defined at initiation", "Reasoning chain capture."
- Scope 4 "Full agency": self-initiating; "Tamper-proof human override mechanisms."
- Source: Brown and Saner, https://aws.amazon.com/blogs/security/the-agentic-ai-security-scoping-matrix-a-framework-for-securing-autonomous-ai-systems/ (2025-11-21).
- Measured-by: vendor framework. Confidence: high. Chapter: Sec, Ch 2.

**SB-25. The book's proposed permission envelope per level (synthesis; label it as the book's proposal, not a published standard).**

This is built from SB-15 to SB-24 and the incidents below.

| | **L2 Delegated** (human reviews every output) | **L3 Supervised-autonomous** (human reviews by exception or evidence) | **L4 Autonomous** (enumerated task class, end to end) |
|---|---|---|---|
| Where it runs | Dev laptop, permission prompts on (Claude Code default, Codex Auto); no bypass/yolo (disabled in managed settings) | Ephemeral sandbox / devbox / CI runner with filesystem plus network isolation (SB-15, SB-17, SB-19); Stripe and Spotify both sandbox (aggregate RR-28, LC-27) | Same as L3, plus a kill-switch and continuous monitoring (CSA L4) |
| Credentials | Developer's own, but **no prod credentials on the machine**; secrets out of the workspace and `.env` denied | Short-lived, task-scoped tokens injected by a proxy, never inside the sandbox (SB-15); push to its own branch only (SB-19) | Narrow service identity per task class; no general-purpose cloud or API tokens (the PocketOS lesson) |
| Write scope | Workspace only; human approves every commit | Its own branch; cannot merge; cannot approve; CI workflows gated on human approval (SB-19) | Auto-merge only for the enumerated class, behind a verifier the agent cannot edit (aggregate §7.2b) |
| Network | Allow-list for package registries and docs | Default-deny egress plus allow-list (Codex default off; Copilot firewall) | Default-deny egress |
| Irreversible actions (prod DB, deletes, infra, publish) | Never by the agent; human runs them | Never; agent prepares a plan or migration, human executes | Only through APIs with soft-delete or undo and backups off the blast path (Railway's post-incident change, secondary); otherwise not L4-eligible |
| Untrusted input | Allowed (human sees everything) | Apply the Rule of Two: if the agent reads untrusted issues/web/MCP output, drop either sensitive access or external state change (SB-20) | Must not combine all three, ever |
| Config self-modification | Agent cannot edit its own permission/MCP/rules files (SB-7, SB-8); CODEOWNERS on AGENTS.md/.cursor/.claude | Same, enforced by the sandbox | Same |
| Dependencies | Lockfile plus registry allow-list; reject unknown packages (SB-5, R5) | Same, enforced in CI | Same |
| Gate | Human review, SAST and secret scanning in CI | Evidence bundle: SAST, secret scan, tests, plus a human reviewing the PR | Verification record per change; audit log; kill-switch |

Rule from aggregate §7.2c, supported here: **a level is set by granted authority, not by intent.** An agent holding a prod-capable token is at L4 whatever the team calls it. Replit, PocketOS, Kiro and the internal Anthropic examples are all de facto L4 grants.

---

## Cases

**Case 1. PocketOS (Apr 2026): an agent deleted the production DB and its backups in one API call.**
- AIID 1469 (incident date 2026-04-24): a Cursor agent "reportedly running Claude Opus 4.6, deleted PocketOS's production database and volume-level backups through Railway while working on a staging-environment task", using "a broadly scoped API token." Source: https://incidentdatabase.ai/entities/railway-api-volumes/
- OECD AIM: "in 9 Seconds"; 30-hour outage. Source: https://oecd.ai/en/incidents/2026-04-27-6153
- Secondary only (founder Jer Crane's X post and Railway's response, via zenity.io, devops.com and others):
  - The token was created for custom-domain management and found in an unrelated file.
  - Backups lived on the same volume they protected.
  - The latest off-volume copy was 3 months old.
  - Railway moved API deletes to a 48-hour soft delete.
- Measured-by: incident databases aggregating press; victim self-report. Confidence: high (occurred); medium (mechanism).
- **The purest root-cause exhibit:** a staging task, a credential that could reach prod, an irreversible API with no undo, and backups inside the blast radius.

**Case 2. Replit / SaaStr (Jul 2025).** See R10. The fix was environment separation; the Agent "can't touch" prod. Confidence: high.

**Case 3. Kiro / AWS Cost Explorer (Dec 2025).**
- The FT (via press) reports ~13 hours in one region after the agent chose to "delete and recreate the environment."
- **Amazon's own primary:** "user error—specifically misconfigured access controls"; "extremely limited event" (one service, one of 39 regions); Amazon added "mandatory peer review for production access." Source: https://www.aboutamazon.com/news/aws/aws-service-outage-ai-bot-kiro (date not shown on the page; Feb 2026 per coverage).
- **Both sides' accounts agree on the class:** the cause was an access-control scope, and the fix was a prod-access gate.

**Case 4. Antigravity data exfiltration (PromptArmor, late 2025).**
- An injection hidden in 1-pt font on a web page made the agent gather code and `.env` credentials.
- The file reader was blocked by the gitignore setting, so the agent ran `cat` instead.
- It exfiltrated through webhook.site, which was on the **default** browser allow-list.
- Onboarding defaults were "Agent Decides" (plan review) and "Auto" (terminal commands).
- Google responded with an onboarding disclaimer, and PromptArmor says Google already knew of the risks.
- Source: https://www.promptarmor.com/resources/google-antigravity-exfiltrates-data (no date on page; Nov 2025 per Willison's 2025-11-25 link post). Measured-by: independent security vendor. Confidence: medium-high.
- Pair it with FR-C4 (the Antigravity drive wipe in Turbo mode).

**Case 5. Nx s1ngularity (Aug 2025).** See R7. First known supply-chain malware to use installed AI CLIs with their skip-permission flags. The root cause was CI workflow injection plus a long-lived npm token. Confidence: high.

**Case 6. Amazon Q Developer extension (Jul 2025).** See R6. An over-scoped CI token let an attacker ship a wiper prompt in an AI tool's release. Confidence: high.

**Case 7. Anthropic internal "overeager" actions (2025–26).** See SB-16. The vendor itself documents an agent attempting migrations against a production DB and uploading an auth token, which is why its classifier exists and why the 17% miss rate matters. Confidence: medium-high (vendor self-report).

**Cross-case table (for the chapter's opening figure).**

| Incident | Authority held | Boundary missing | Fix actually applied |
|---|---|---|---|
| Replit 2025 | Agent wrote to the live DB | No dev/prod split | Automatic dev/prod DB split; Agent "can't touch" prod |
| PocketOS 2026 | Broad Railway API token | Token not env-scoped; backups on the same volume; no undo | 48-h soft delete; token permissions reassessed (secondary) |
| Kiro / AWS 2025 | Operator's broad prod permissions | Prod-access control | Mandatory peer review for prod access |
| Antigravity 2025 | Auto-execute terminal plus browser | Egress allow-list included webhook.site | Disclaimer only |
| Nx 2025 | AI CLIs in skip-permission mode on dev machines | Permission prompts disabled by malware flags | Trusted Publishing; workflow approvals (Nx side) |
| Amazon Q 2025 | Over-scoped GitHub token in CodeBuild | CI token scope | Token rescoped; v1.85.0 |
| Supabase MCP 2025 (demo) | `service_role` (bypasses RLS) | Read-only / project scoping off | `read_only`, `project_ref`, `features` options |

---

## Still unverified

- **postmark-mcp malicious MCP server (Sep 2025).**
  - Claimed: v1.0.16 added a BCC of every email to an attacker address; called the "first malicious MCP server" in the wild.
  - Download figures conflict: 1,643 total (The Hacker News) vs ~1,500/week (CSO).
  - The Koi Security primary URL now redirects to a Palo Alto Networks product page. Only secondary press is available; use it labelled as secondary or not at all.
- **PocketOS mechanism details.** The 9-second figure is in OECD's title, but the token's origin, the same-volume backups, the 3-month-old copy and Railway's 48-hour soft delete come only from secondary coverage. The founder's X post and Railway's blog were not reached.
- **Replit specifics.** Record counts (~1,206 executives / ~1,196 companies) and the "fabricated data" claims are secondary or AIID only. Replit's July-2025 blog post was not reached directly; The Register quotes it.
- **Kiro.** The FT's original (13 h, "delete and recreate") is paywalled. Amazon's correction page has no visible date.
- **OWASP Agentic Top 10 category names (ASI01–ASI10).** Not on the landing page; needs the PDF.
- **SusVibes "security hints don't help" finding.** In the arXiv abstract per search; not re-read in the PMLR abstract.
- **Claude Code / Codex / Copilot auto-mode defaults as of today.** One secondary site claims Claude Code switched to auto mode by default on 2026-08-14; not checked at a primary. Re-check before print.
- **GitHub Copilot cloud agent firewall:** whether MCP traffic bypasses it (third-party claim). Not on the GitHub page read.
- **Independent evaluation of Claude Code auto mode** (arXiv 2604.04978): exists per search; findings not read.
- **Aim Security's CurXecute write-up** (403). The vendor advisory was used instead.
- **Antigravity PromptArmor exact date:** not on the page.
- **Churilov 2026 slopsquatting replication (FR-C14):** not re-checked here; still single-author and not peer-reviewed.
- **No published measurement exists of** (a) how often permission-skip modes are enabled across an enterprise fleet, or (b) incident rates by agent permission level. The per-level table (SB-25) is therefore a design proposal grounded in vendor defaults and incident fixes, not an outcome-validated standard. Say so in the chapter.
