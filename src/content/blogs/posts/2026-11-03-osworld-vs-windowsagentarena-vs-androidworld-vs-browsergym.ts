import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-03',
  slug: 'osworld-vs-windowsagentarena-vs-androidworld-vs-browsergym',
  title: L(
    'OSWorld vs WindowsAgentArena vs AndroidWorld vs BrowserGym: the verifier is the benchmark',
    'OSWorld vs WindowsAgentArena vs AndroidWorld vs BrowserGym：校验器就是基准本身',
  ),
  summary: L(
    "These four get quoted as four measurements of the same ability, and they are four different objects. Two of them do not own a verifier at all: WindowsAgentArena vendors OSWorld's metric library wholesale, and BrowserGym is a harness that imports whatever the wrapped benchmark wrote. The axis that decides whether a score transfers is not the operating system or the task count — it is what the check reads. OSWorld compares a saved file against a gold copy after pressing Ctrl+S itself; AndroidWorld reads device state on a randomised instance no other run shares; BrowserGym's reward float carries a binary page check in one row and a token-bag F1 in the next.",
    '这四个东西被当作对同一种能力的四次测量来引用，而它们其实是四个不同的对象。其中两个根本不拥有自己的校验器：WindowsAgentArena 把 OSWorld 的指标库整套搬了过来，而 BrowserGym 是一个 harness、导入的是被包装基准各自写的那一套。决定一个分数能不能迁移的那条轴，不是操作系统、也不是任务数量——而是那个检查读的是什么。OSWorld 会自己先按下 Ctrl+S，再把存好的文件与一份标准副本比对；AndroidWorld 读的是设备状态，而那是一个没有别的运行会共享的随机任务实例；BrowserGym 那个 reward 浮点数，在一行里装的是二元的页面检查，在下一行里装的是词袋 F1。',
  ),
  tags: ['agent-comparison', 'evals', 'computer-use', 'browser-agents', 'open-source'],
};

export default post;
