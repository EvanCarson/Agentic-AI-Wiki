import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-08',
  slug: 'your-agent-ran-git-status-and-that-was-enough',
  title: L(
    'Your agent ran git status, and that was enough',
    '你的智能体跑了一次 git status，这就够了',
  ),
  searchTitle: { en: 'GitSpawn: context-gathering is an execution surface' },
  summary: L(
    'Manifold Security disclosed GitSpawn — eight flaws across seven CLI coding agents in which opening a booby-trapped repository runs attacker code, because the harness shells out to git for context and Git honours a core.fsmonitor setting the repository supplied. No prompt, no approval, sometimes before authentication. Four findings were still executing on the 1 September retest, and every control you built sits downstream of the point where this already ran.',
    'Manifold Security 披露了 GitSpawn——横跨七款 CLI 编码智能体的八个缺陷：打开一个被做了手脚的仓库就会运行攻击者的代码，因为外壳会派生 git 子进程去取上下文，而 Git 遵从了仓库提供的 core.fsmonitor 设置。没有提示词、没有审批，有时甚至在认证之前。9 月 1 日复测时仍有四个发现在执行，而你建起的每一道控制，都位于这件事早已发生的那个点的下游。',
  ),
  tags: ['safety', 'coding-agents', 'agentic-ai', 'sandboxing', 'developer-tools'],
};

export default post;
