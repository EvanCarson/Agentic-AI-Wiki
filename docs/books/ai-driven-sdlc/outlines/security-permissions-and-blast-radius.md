# Outline — Ch 12 Security, Permissions & Blast Radius (`security-permissions-and-blast-radius`, ~4,500 words)

**Argument (bible §2):** AI changes three risk surfaces — the code it writes, the toolchain it runs in, the authority it holds — and every destructive incident on record sits in the third, so a level is set by the credentials you grant and the boundary you build, not by the model you choose.

**Lede:** A coding agent on a staging task deleted a production database and its backups in nine seconds, using a token broad enough to reach both. The model did not set that blast radius; the credential did. AI changes three risk surfaces (code, toolchain, authority); every destructive incident sits in the third; a level is the credentials you grant and the boundary you build.

## 12.1 What changes (`#what-changes`)
- Code surface: SusVibes 57% functional / 11.8% secure (SB-4, https://proceedings.mlr.press/v306/zhao26ax.html, T1); BaxBench 62% correct, ~half of correct exploitable (SB-3, https://arxiv.org/abs/2502.11844, T1); Veracode 2026 "stalled at 56%", size/specialisation no help (SB-2, https://www.veracode.com/?p=31889, T3). Link back to economics#what-it-risks rather than repeat Perry / Spracklen in depth.
- Toolchain surface: agent writes its own approval config (CVE-2025-53773, SB-7, embracethered); CurXecute creates mcp.json (SB-8, GHSA-4cxx-hrm3-49rm); Gemini CLI allow-list (SB-9, tracebit); MCP tool poisoning (SB-10, invariantlabs); GitHub MCP toxic flow (SB-11); Supabase MCP service_role (SB-12, generalanalysis); rules-file backdoor (SB-13, pillar); PromptPwnd (SB-14, aikido).
- Authority surface: Replit, PocketOS, Kiro, Anthropic internal overeager list (SB-16). Cross-case grid (SB cross-case table).
- Model choice changes none of these (Veracode; Anthropic "not a drop-in replacement").

## 12.2 The permission envelope per level (`#permission-envelope`) — the book's proposal
- SB-25 table rendered as a threat-grid by control (runs where, credentials, write scope, network, irreversible, untrusted input, config self-modification, dependencies, gate), each with L2/L3/L4 values and its source (SB-15, 17, 18, 19, 20, 23, 24).
- No outcome-validated standard; no incident rate by permission level (SB "Still unverified").
- Rule 2 link (`the-maturity-model#rule-authority`); Ch 2 controls summary link (`#controls`).

## 12.3 The case (`#the-case`)
- Opening: PocketOS (AIID 1469, https://incidentdatabase.ai/entities/railway-api-volumes/ ; OECD https://oecd.ai/en/incidents/2026-04-27-6153). Mechanism details secondary, labelled.
- Anchor: Nx s1ngularity (GHSA-cxm3-wv7p-598c; Wiz https://www.wiz.io/blog/s1ngularitys-aftermath). All three surfaces in one incident; defaults blunted the AI step; skip flags were what the malware needed.
- Amazon Q CVE-2025-8217 (https://aws.amazon.com/security/security-bulletins/AWS-2025-015/) — token scope again.
- Replit/Kiro: link back to case-studies anchors.
- **Worked example:** placing the PocketOS agent by its credentials (Rule 2) and walking the envelope rows that each would have broken the chain.

## 12.4 Migration steps (`#migration-steps`)
1. Credential & mode inventory. 2. Managed settings: disable bypass (SB-18). 3. Protect agent config (CODEOWNERS; SB-7/8/13). 4. Split environments; soft-delete; backups outside blast radius (Replit docs, PocketOS). 5. Sandbox with fs+network isolation and proxy-injected credentials before L3 (SB-15/17/19). 6. CI agents: write-access triggers only, untrusted text out, publishing via trusted publishing (SB-14, Nx). 7. Gates: SAST, secret scanning, dependency allow-list.

## 12.5 Guardrails (`#guardrails`)
- Hierarchy of boundaries: instructions < clicks (93%) < classifiers (17% FN on n=52) < allow-lists (string matches; Claude docs "isn't a security boundary") < environment & credential scope. Vendor box for Anthropic numbers.
- Rule of Two (SB-20) / lethal trifecta; Google's three principles (SB-21).

## 12.6 Metrics (`#metrics`)
- Book's proposal: share of agent identities with prod reach; sessions in skip-permission mode (no published fleet measurement); token lifetime/time to revoke (Wiz 40% still valid); secret-leak rate (GitGuardian vendor box 3.2% vs 1.5%; GitHub push protection 30%); SAST findings per agent PR; irreversible actions available to agents (target zero).

## 12.7 Anti-patterns (`#anti-patterns`)
- Skip-permission mode on a laptop with real credentials; a token found in a file; backups inside blast radius; prompt-level "don't touch prod"; the agent editing its own config; CI agent reading untrusted text with privileged token (`allowed_non_write_users: "*"`); long-lived publish tokens; approval clicks treated as boundary.

## What to do
- Inventory credentials and permission modes per agent; record the level they imply.
- Disable bypass/skip-permission modes in managed settings.
- No production-capable credential reachable from any agent; irreversible ops via soft-delete; backups outside blast radius.
- CODEOWNERS / protection on agent config files.
- Sandbox with fs + network isolation, proxy-injected short-lived creds, before any L3.
- Apply the Rule of Two per session; CI agents never read untrusted text with write tokens.
- Next-level entry criterion: L3 only when the envelope's L3 row holds and is tested.
