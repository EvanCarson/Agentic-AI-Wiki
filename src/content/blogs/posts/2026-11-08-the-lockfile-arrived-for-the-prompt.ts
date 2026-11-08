import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-08',
  slug: 'the-lockfile-arrived-for-the-prompt',
  title: L(
    'The lockfile arrived for the prompt',
    '锁文件来找提示词了',
  ),
  summary: L(
    'Microsoft\'s APM gives agent configuration content hashes, transitive resolution, drift detection and SBOM export — and its README says why: "Agent context is executable in effect — a prompt is a program for an LLM." The analogy stops where it matters. A hash pins a file; behaviour is a property of the composition of prose, model, tools and permissions, which no lockfile describes. APM makes agent context auditable, not safe, and one install writes into every one of the nine harnesses you listed.',
    '微软的 APM 给智能体配置配上了内容哈希、传递依赖解析、漂移检测与 SBOM 导出——而它的 README 说出了理由："智能体上下文在效果上是可执行的——一段提示词就是给 LLM 的一个程序。"这个类比恰在要紧处止步。哈希钉住的是一个文件；而行为是"散文、模型、工具、权限"这个组合的属性，而没有任何锁文件描述一个组合。APM 让智能体上下文变得可审计，而不是安全，并且一次安装会写进你列出的那九个 harness 中的每一个。',
  ),
  tags: ['safety', 'developer-tools', 'ecosystem', 'open-source', 'mcp'],
};

export default post;
