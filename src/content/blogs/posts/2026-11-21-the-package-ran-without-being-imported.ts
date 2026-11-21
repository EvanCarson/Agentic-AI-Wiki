import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-21',
  slug: 'the-package-ran-without-being-imported',
  title: L(
    'The package ran without being imported',
    '那个包没被 import，却照样跑了',
  ),
  summary: L(
    'On 17 November 2026 two releases of Microsoft\'s agent-framework — 1.26.1 and 1.26.2, published roughly 33 minutes apart under the legitimate publisher account — shipped a credential stealer to PyPI. The delivery is the story: a .pth file, which CPython\'s site module executes at every interpreter start. So "we installed it but that job never imports agent_framework" is not a defence, and the blast radius is every Python process in the environment rather than the agent. The second half of the story is more useful: the control that would have stopped this is the hash-pinned lockfile most teams believe they already have.',
    '2026 年 11 月 17 日，微软 agent-framework 的两个发行版——1.26.1 与 1.26.2，相隔约 33 分钟、从合法发布者账号推出——把一个凭据窃取器送上了 PyPI。真正值得讲的是投递方式：一个 .pth 文件，而 CPython 的 site 模块会在每一次解释器启动时执行它。于是「我们装了，但那个任务从不 import agent_framework」并不构成辩解，受影响半径也不是那个智能体，而是该环境里的每一个 Python 进程。故事的后半段更有用：真能挡住这次的控制手段，正是多数团队以为自己早已具备的那份带哈希的锁文件。',
  ),
  tags: ['safety', 'agent-frameworks', 'developer-tools', 'infrastructure', 'ecosystem'],
};

export default post;
