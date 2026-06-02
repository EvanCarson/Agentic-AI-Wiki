import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-01',
  slug: 'e2b-vs-modal-vs-daytona-vs-anthropic-code-execution',
  title: L(
    'E2B vs Modal vs Daytona vs Anthropic Code Execution: Four Owners of the Agent Sandbox',
    'E2B、Modal、Daytona 与 Anthropic Code Execution：智能体沙箱归谁所有的四种答案',
  ),
  summary: L(
    'Four runtimes give an agent a place to actually execute Python and bash safely — and the marketing pages all promise the same thing. The thing that decides which one survives production is who owns the sandbox lifecycle.',
    '四款运行时都给智能体提供了一个真正能安全执行 Python 与 bash 的地方——营销页面承诺的也几乎一样。真正决定谁能扛住生产的那一点是：沙箱生命周期归谁所有。',
  ),
  tags: ['agent-comparison', 'sandboxing', 'code-execution', 'infrastructure'],
};

export default post;
