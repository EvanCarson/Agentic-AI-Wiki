# AI in Trading — Two Blog Posts (Design)

Two complementary blog posts on how AI is used to make trading decisions, drafted
together because the second presupposes the framing of the first. Both ship full
bilingual (en/zh), full visual treatment (5 SVGs each), and follow
`src/content/blogs/AUTHORING.md` exactly.

## Goal

Give a reader of the Agentic AI Wiki a sharp, accurate mental model of where AI
sits in a real trading stack — separating the broad ML landscape from the
specifically *agentic* layer the wiki already covers in its deep-dives.

## Audience

Same as the rest of the blog: engineers and technical product readers who
understand agents but not necessarily quant finance, and quant readers who
understand markets but want a current map of LLM-agent patterns.

## Scope

Two posts only. Both dated `2026-06-03` (bump before merge if the calendar
moves, per AUTHORING §0).

- Post 1 establishes the four-layer trading stack and shows where ML lives in
  each layer. Domain-application piece — first of its kind on the site.
- Post 2 zooms into the agentic / LLM-agent layer of that stack: research desk,
  bull/bear debate, supervisor patterns. Links back to existing wiki
  deep-dives (multi-agent-topologies, supervisor-worker-pattern,
  agent-debate-and-ensembles, RAG).

Out of scope:
- Crypto-specific trading agents (mentioned only in passing).
- Retail trading bots / "AI stock-picking apps".
- A general intro to quantitative finance.
- New navigation / IA changes.

## Files

| Path | Purpose |
|---|---|
| `src/content/blogs/posts/2026-06-03-ai-in-the-trading-stack.ts` | Post 1 metadata. |
| `src/content/blogs/en/ai-in-the-trading-stack.html` | Post 1 English body. |
| `src/content/blogs/zh/ai-in-the-trading-stack.html` | Post 1 Chinese body. |
| `public/blogs/ai-in-the-trading-stack/*.svg` | Post 1 diagrams (5). |
| `src/content/blogs/posts/2026-06-03-agentic-ai-for-trading-research.ts` | Post 2 metadata. |
| `src/content/blogs/en/agentic-ai-for-trading-research.html` | Post 2 English body. |
| `src/content/blogs/zh/agentic-ai-for-trading-research.html` | Post 2 Chinese body. |
| `public/blogs/agentic-ai-for-trading-research/*.svg` | Post 2 diagrams (5). |
| `src/content/changelog/entries/2026-06-03-ai-trading-blogs.ts` | One combined changelog entry covering both posts. |

Note on the changelog: one entry (not two) for the pair, since they ship in the
same change and read as a set — keeps the changelog list dense.

## Post 1 — *AI in the Trading Stack*

**Slug:** `ai-in-the-trading-stack`

**Title (en):** AI in the Trading Stack: What Hedge Funds Actually Run on the Decision
**Title (zh):** AI 在交易栈中的位置：对冲基金真正用 AI 做哪些决策

**Lede stake:** AI in trading is not one bot — it's a stack of narrow models, each
owning one decision (signal, sizing, execution, risk). Mistake the layers for
one black box and your mental model is wrong about every "AI hedge fund" headline.
**Takeaway:** map AI onto the four-layer stack and you can read any such claim
in 30 seconds.

**Sections:**

1. Hook lede (no header).
2. **At a glance** — four-layer table (Signal / Sizing / Execution / Risk), the
   dominant ML technique per layer, a representative firm or product per layer.
   Followed by `data-alpha-uplift.svg` bar chart (PwC +20% alpha 2024 vs SEC +12%
   outperformance vs flat baseline).
3. **Signal generation** — LSTM/GRU on limit-order books, NLP on earnings
   transcripts and news, alternative data (Man GLG / Versace sentiment case;
   90% alt-data adoption per Lowenstein Sandler 2025). Firms: Renaissance, Two
   Sigma, DE Shaw.
4. **Trade execution** — RL for optimal execution. Cite Almgren–Chriss as the
   classical baseline, recent RL extensions (arxiv 2507.06345, A3C-LSTM 2025).
   Note overfitting concern from the literature. Firms: Jane Street, HRT.
5. **Risk and sizing** — multi-agent portfolio optimisation (one hedges tails,
   another reallocates on drawdowns; cited at Citadel / Jane Street for 2025
   vol). RL momentum sizing at DE Shaw / AQR.
6. **Cross-cutting comparison** — four axes (latency / interpretability / data
   dependency / regulatory exposure) compared across the four layers in
   comparative prose, NOT sequential descriptions.
7. **When AI is the wrong answer** — overfitting, regime shifts, data leakage,
   the EU AI Act 2026 high-risk classification of trading models.
8. **FAQ** — at least 4 Q+A pairs (rendered for FAQPage JSON-LD):
   - Do funds let AI pull the trigger autonomously?
   - Why do quant funds still hire PhDs if AI does this?
   - Is the alpha edge from the model or the data?
   - What happens to AI strategies when the regime shifts?
9. **Further reading** — internal: `react-pattern`, `rl-for-tool-use`,
   `reward-design-and-hacking`, `inference-time-scaling`. External: SEC 2024
   AI fund study; arxiv 2507.06345 RL execution; PwC alt-data report.

**SVGs (5):**

| File | viewBox | Content |
|---|---|---|
| `arch-trading-stack.svg` | 900×500 | Four stacked layers (Signal → Sizing → Execution → Risk) with side annotations naming the dominant ML technique. |
| `data-alpha-uplift.svg` | 900×400 | Horizontal bar: PwC +20%, SEC +12%, baseline 0%. Accent fills per AUTHORING §4. |
| `compare-layers.svg` | 900×300 | Three columns (Signal · Execution · Risk; sizing folded into risk for width). Per axis: latency, interpretability, regulatory exposure. |
| `arch-rl-execution.svg` | 900×500 | RL agent ↔ limit-order-book environment loop with reward = implementation shortfall. |
| `data-failure-modes.svg` | 900×400 | Heatmap matrix: layer (rows) × failure mode (cols: overfitting / regime shift / data leakage / interpretability). |

**Tags:** `ai-trading`, `quant-finance`, `reinforcement-learning`, `applications`.

## Post 2 — *Agentic AI for Trading Research*

**Slug:** `agentic-ai-for-trading-research`

**Title (en):** Agentic AI for Trading Research: When the LLM Sits in the Loop
**Title (zh):** 智能体 AI 用于交易研究：当 LLM 坐进决策回路

**Lede stake:** The hype says "AI agents run the fund." The reality in 2026: LLM
agents run the *research desk* — fundamentals, sentiment, bull/bear debate, risk
sign-off — while rule-based code still pulls the trigger. Miss that line and
you'll either over-trust an agent or dismiss the whole pattern. **Takeaway:**
the agentic layer is research and decision support; execution stays
deterministic.

**Sections:**

1. Hook lede.
2. **At a glance** — projects table: TradingAgents (Tauric Research) · FinGPT ·
   BloombergGPT · LiveTradeBench. Released, primary role, deployment shape.
   Followed by *LiveTradeBench finding* call-out: LMArena rank ≠ trading P&L.
3. **The agent-firm architecture** — TradingAgents-style: fundamentals analyst,
   sentiment analyst, technical analyst → bull and bear researcher debate →
   trader synthesises → risk supervisor signs off. One arch SVG.
4. **Memory and tools the trading agent needs** — market-data tool, news /
   earnings-call RAG, portfolio-state read tool, broker-write tool (whether
   guarded by human approval or not). Link back to wiki deep-dives on
   tool-design-principles, retrieval-augmented-memory, structured-tool-io.
5. **Domain LLMs vs prompted general LLMs** — BloombergGPT (closed, finance
   pre-train) vs FinGPT (open, fine-tune over open base) vs prompted Claude /
   GPT-class generalist. When each wins.
6. **What the live benchmarks reveal** — LiveTradeBench 50-day Aug–Oct 2025
   eval, 21 LLMs. Three findings: LMArena rank doesn't transfer; portfolio
   styles vary by model; some adapt to live signals, most don't.
7. **When to pick which** — decision matrix:
   - Research-only vs research+execution use case
   - Anonymised vs raw market data
   - Retail vs institutional
   - With vs without human-in-the-loop on order placement
8. **FAQ** — at least 4 Q+A:
   - Can an LLM agent actually trade autonomously?
   - Why do production stacks still use rule-based execution?
   - How do you handle hallucination in agent research output?
   - Does fine-tuning on finance data beat a prompted frontier model?
9. **Further reading** — internal: `multi-agent-topologies`,
   `supervisor-worker-pattern`, `agent-debate-and-ensembles`,
   `agentic-retrieval`. External: TradingAgents (arxiv 2412.20138),
   LiveTradeBench (arxiv 2511.03628), BloombergGPT, FinGPT.

**SVGs (5):**

| File | viewBox | Content |
|---|---|---|
| `arch-trading-agent-firm.svg` | 900×500 | Three analyst boxes → debate pair → trader → risk supervisor → broker. Arrows. |
| `data-livetradebench.svg` | 900×400 | Horizontal bar: model family P&L (placeholder ordering per paper findings, captioned with date range). |
| `compare-domain-vs-general.svg` | 900×300 | Three columns: BloombergGPT · FinGPT · Prompted-generalist on axes (finance recall / generality / openness / cost). |
| `arch-agent-tools-and-memory.svg` | 900×500 | LLM agent loop with four tools (market data, RAG news, portfolio read, broker write) and short-term + long-term memory blocks. |
| `data-feature-matrix.svg` | 900×400 | 4 systems × 5 capabilities (finance recall · tool use · multi-agent · open · production-ready). 3-level heat per AUTHORING §4. |

**Tags:** `agentic-ai`, `llm-agents`, `quant-finance`, `multi-agent-systems`, `applications`.

## Bilingual & translation notes

- All ledes, headers, prose translated faithfully (not byte-mirrored) per
  CLAUDE.md.
- Firm and product names stay in English in the zh prose: BloombergGPT, FinGPT,
  TradingAgents, LSTM, GRU, RL, LLM, RAG, JSON-LD.
- Full-width punctuation in zh prose; ASCII in code/identifiers.
- Internal links in zh use `/zh/...` prefix.
- No `<pre>` code blocks in either post (these are conceptual essays, not
  tutorials), so byte-identical `<pre>` rule does not apply — but if any
  inline `<code>` arrives during drafting, keep it ASCII-identical.

## Verification gates

After both posts and the changelog entry exist:

```
npm run build       # all pages emit, no new warnings
npm run verify      # bilingual completeness, internal links resolve
npm test            # blogs.test.mjs (slug, date prefix, tags), changelog.test.mjs
npm run search:index && npm run test:search
```

Then manual: open `/blogs/ai-in-the-trading-stack` and
`/blogs/agentic-ai-for-trading-research` (plus `/zh/...` mirrors) in a browser,
toggle dark mode, confirm JSON-LD `BlogPosting` and `FAQPage` blocks both emit
into `dist/blogs/<slug>/index.html`.

## Risks / open questions

- **Source dating accuracy.** Several search results are dated 2025–2026 with
  forward-looking claims (e.g. "EU AI Act 2026 demands explainability"). Treat
  these as drafted-from-secondary-source and verify each citation before the
  PR opens.
- **No real firm endorses these claims.** All firm references (Renaissance,
  Two Sigma, Citadel, Jane Street, HRT, Man GLG) come from secondary press;
  prose uses hedging language ("reportedly", "press reports describe") and
  not "X firm runs Y model".
- **SVG count is high (10 total).** If the SVG load slows the session, the
  fallback is to drop the two `data-*-failure-modes` / `data-feature-matrix`
  matrices to HTML tables — they degrade cleanly.
