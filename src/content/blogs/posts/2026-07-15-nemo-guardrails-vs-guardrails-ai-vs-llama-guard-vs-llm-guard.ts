import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-15',
  slug: 'nemo-guardrails-vs-guardrails-ai-vs-llama-guard-vs-llm-guard',
  title: L(
    'NeMo Guardrails vs Guardrails AI vs Llama Guard vs LLM Guard: Four Shapes of a Guardrail',
    'NeMo Guardrails、Guardrails AI、Llama Guard 与 LLM Guard：护栏的四种形态',
  ),
  summary: L(
    'A "guardrail" is not one thing. The open-source ecosystem settled into four shapes — a programmable rails DSL, a validator library, a safety-classifier model, and a scanner pipeline — and the 2025-26 acquisition wave decided which survived independent. Here is what each actually does, where it sits around the model, and why none of them "solves" prompt injection.',
    '"护栏"并不是一样东西。开源生态沉淀出四种形态——可编程的 rails DSL、验证器库、安全分类模型，以及扫描器流水线——而 2025–26 的并购潮决定了谁能独立存活。本文讲清每一种到底做什么、在模型周围坐落何处，以及为何它们都没有"解决"提示注入。',
  ),
  tags: ['agent-comparison', 'guardrails', 'safety', 'open-source', 'prompt-injection'],
};

export default post;
