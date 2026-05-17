# Chinese Translation Glossary & Rules (zh-Hans)

Authoritative terminology + rules for translating the Agentic AI Field Guide.
Applied consistently across all 22 bodies; reviewers enforce it.

## Hard rules
1. **Never alter code.** Inside `<pre>…</pre>` blocks, every byte is verbatim
   — keywords, identifiers, strings, and existing English code comments are
   NOT translated. (Code comments are left as-is to keep the byte-identical
   parity gate green.)
2. Keep every HTML tag, attribute, class, id, `data-*`, and `href` unchanged.
   Translate only human-readable text nodes and visible prose.
3. Established technical terms: on first use in a body, write
   `中文（English）`; thereafter use 中文 alone.
4. Do not translate: product/API names (Anthropic, OpenAI, Claude, GPT),
   library names, CLI flags, file paths, numbers, identifiers.
5. Preserve inline `<code>…</code>` payloads (identifiers/symbols) verbatim;
   surrounding prose is translated.
6. Register: precise, professional, plain technical Chinese; match the
   English author's direct voice; avoid machine-translation stiffness.

## Glossary (English → 中文)
| English | 中文 |
|---|---|
| agent | 代理 / 智能体 (use 智能体 for the autonomous-software sense) |
| agent loop | 代理循环 |
| tool use / tool calling | 工具调用 |
| prompt | 提示词 |
| context window | 上下文窗口 |
| token | 令牌（token） |
| hallucination | 幻觉 |
| retrieval | 检索 |
| retrieval-augmented | 检索增强 |
| eval / evaluation | 评估 |
| eval suite | 评估套件 |
| LLM-as-judge | LLM 作为评判者 |
| benchmark | 基准 |
| regression | 回归 |
| observability | 可观测性 |
| trace / span | 追踪 / 跨度 |
| latency | 延迟 |
| throughput | 吞吐量 |
| cost | 成本 |
| safety | 安全 |
| guardrail | 护栏 |
| deployment | 部署 |
| multi-agent | 多智能体 |
| computer use | 计算机操作 |
| code agent | 代码智能体 |
| frontier | 前沿 |
| ground truth | 真实标签 |
| noise floor | 噪声基线 |
| delta | 增量（delta） |
| schema | 模式（schema） |

## Process per body
translate → independent review (accuracy, glossary, HTML/code fidelity,
completeness, register) → fix → re-review until pass.
