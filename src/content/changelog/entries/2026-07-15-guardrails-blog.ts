import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-15',
  title: L(
    'AI Blog: four shapes of a guardrail (NeMo Guardrails / Guardrails AI / Llama Guard / LLM Guard)',
    'AI 博客：护栏的四种形态（NeMo Guardrails / Guardrails AI / Llama Guard / LLM Guard）',
  ),
  items: [
    L(
      'New comparison post framing LLM/agent guardrails as four archetypes — a programmable rails DSL (NeMo Guardrails / Colang), a validator library (Guardrails AI), a safety-classifier model (Llama Guard family), and a scanner pipeline (LLM Guard) — and telling the story through the 2025-26 consolidation wave that archived LLM Guard (Protect AI → Palo Alto) and pulled Lakera and Invariant into Check Point and Snyk.',
      '新增对比文章，把 LLM/智能体护栏归纳为四种原型——可编程的 rails DSL（NeMo Guardrails / Colang）、验证器库（Guardrails AI）、安全分类模型（Llama Guard 家族），以及扫描器流水线（LLM Guard）——并通过 2025–26 的整合潮讲述：LLM Guard 被归档（Protect AI → Palo Alto），Lakera 与 Invariant 被并入 Check Point 与 Snyk。',
    ),
    L(
      'Threads the durable framing throughout: guardrails are pre/post checks around a model (not a wall), prompt injection is not "solved" by any single filter (defense-in-depth), every model-based check adds latency and cost, and the dangerous input in an agent also arrives via tool output and retrieved content. Includes a decision table and FAQ.',
      '全文贯穿持久的框架：护栏是模型前后的检查（而非一堵墙）、提示注入不会被任何单一过滤器"解决"（纵深防御）、每一次基于模型的检查都增加延迟与成本，而智能体里危险的输入也会经由工具输出与检索内容抵达。附选型表与 FAQ。',
    ),
    L(
      'Companion to the Guardrails 101 concept and the Agent Security deep-dive group; fully bilingual (en/zh) with SVG diagrams (star chart, feature matrix, guardrail-placement, and the four-shapes figure).',
      '与《用大白话讲护栏》概念页及"智能体安全"深入解析分组互为补充；完全双语（中/英），并配有 SVG 图示（星标图、特性矩阵、护栏落位图，以及"四种形态"示意）。',
    ),
  ],
};
export default entry;
