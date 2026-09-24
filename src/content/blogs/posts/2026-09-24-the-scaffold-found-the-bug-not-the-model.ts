import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-24',
  slug: 'the-scaffold-found-the-bug-not-the-model',
  title: L(
    'The scaffold found the bug, not the model',
    '找到漏洞的是脚手架，不是模型',
  ),
  searchTitle: {
    en: 'Vulnerability discovery is a scaffold problem',
  },
  summary: L(
    'A startup’s analyzer took six CVEs out of curl in a window where, by its own account, Codex and Mythos found none — and a 2026 benchmark recovers 68% of real AI-found CVEs using only small and open-weight models, with no frontier model in the detection path. The variable that moved is the search structure, not the model. The number to buy on is accepted findings per maintainer-hour: 29 reports were filed and six were accepted, all rated Low.',
    '一家初创公司的分析器从 curl 里挖出六个 CVE，而据它自述，同一窗口里 Codex 与 Mythos 一个也没找到——而 2026 年的一个基准，仅用小模型与开放权重模型就找回了 68% 的真实「由 AI 发现的 CVE」，检测环节没有任何前沿模型。被挪动的变量是搜索结构，不是模型。该拿去比价的数字是「每维护者分诊工时换来几项被接受的发现」：29 份报告提交，六份被接受，全部评为 Low。',
  ),
  tags: ['safety', 'evals', 'coding-agents', 'agentic-ai', 'open-source'],
};

export default post;
