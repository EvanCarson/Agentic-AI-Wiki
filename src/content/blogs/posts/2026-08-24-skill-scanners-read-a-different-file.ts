import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-24',
  slug: 'skill-scanners-read-a-different-file',
  title: L(
    'Skill Scanners Read a Different File Than the Agent Runs',
    '技能扫描器读的文件，和智能体真正运行的那个不是同一份',
  ),
  summary: L(
    'Trail of Bits bypassed the detectors on three skill-distribution platforms in June, a July study packed 1,613 malicious skills past all eight scanners tested, and on 17 August OWASP gave poor scanning its own entry in the first Agentic Skills Top 10. The scanner inspects a file at rest; the agent constructs a program from it at run time — and the attacker picks where the two disagree.',
    '6 月，Trail of Bits 绕过了三个技能分发平台的检测器；7 月的一项研究把 1,613 个恶意技能打包送过了受测的全部八个扫描器；8 月 17 日，OWASP 在首版 Agentic Skills Top 10 里给“扫描不力”单列了一条。扫描器检查的是静止的文件，智能体在运行时从它构造出一个程序——而两者在哪里分岔，由攻击者来挑。',
  ),
  tags: ['safety', 'prompt-injection', 'ecosystem', 'agentic-ai', 'sandboxing', 'developer-tools'],
};

export default post;
