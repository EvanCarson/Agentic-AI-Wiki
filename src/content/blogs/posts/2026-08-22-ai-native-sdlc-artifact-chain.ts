import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-22',
  slug: 'ai-native-sdlc-artifact-chain',
  title: L(
    'The AI-Native SDLC Moves Review Upstream — Three Links Have No Check',
    'AI 原生 SDLC 把评审前移——但有三个环节无人把关',
  ),
  summary: L(
    "Anthropic's playbook rebuilds the lifecycle around a chain of committed artifacts: intent.md → spec.md → plan.md → diff → review findings → incident record. Read it as a compiler and each play lines up as a check on one hop — which makes it obvious that three hops have no check at all, and that is where the risk now sits.",
    'Anthropic 的这份手册把生命周期重组成一条由提交产物构成的链：intent.md → spec.md → plan.md → diff → 评审结论 → 事故记录。把它读成一台编译器，每个做法都对应着某一跳上的一道检查——于是不难看出，有三跳根本没有任何检查，而风险如今就落在那里。',
  ),
  tags: ['coding-agents', 'agentic-ai', 'developer-tools', 'workflow', 'guardrails', 'evals'],
};

export default post;
