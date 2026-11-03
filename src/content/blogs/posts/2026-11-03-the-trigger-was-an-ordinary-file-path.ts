import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-03',
  slug: 'the-trigger-was-an-ordinary-file-path',
  title: L(
    'The trigger was an ordinary file path',
    '触发键是一条普通的文件路径',
  ),
  summary: L(
    "A UC Berkeley and Anthropic Fellows paper pretrained Qwen3 models from scratch with 0.1% of a 100B-token corpus poisoned, ran a clean SFT, DPO and GRPO pipeline on top, and the backdoor was still there. The figure being quoted — around 92% at 4B — is an any-of-32 string match that the authors' own repository tells you not to call Pass@32. The finding that should change your controls is in the experiment grid instead: one of the two triggers is a filesystem path under /anthropic/, and documents that merely assert the trigger-to-payload association sit in the grid beside ones that demonstrate it.",
    '一篇来自加州大学伯克利分校与 Anthropic Fellows 项目的论文，把 Qwen3 模型从零预训练、其中 1000 亿 token 语料的 0.1% 被下了毒，然后在上面跑了一条干净的 SFT、DPO 与 GRPO 管线——而后门还在。被到处引用的那个数字（4B 上约 92%）是一次 any-of-32 的字符串匹配，而作者自己的仓库告诉你别把它叫作 Pass@32。真正该改变你控制措施的发现在实验网格里：两种触发键之一是 /anthropic/ 下的一条文件系统路径，而那些仅仅「陈述」触发到载荷这条关联的文档，与演示它的文档并列在网格里。',
  ),
  tags: ['safety', 'agentic-ai', 'coding-agents', 'open-source', 'frontier-models'],
};

export default post;
