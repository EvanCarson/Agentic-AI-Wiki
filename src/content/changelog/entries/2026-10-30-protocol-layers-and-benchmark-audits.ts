import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-30',
  title: L(
    'Two AI Blog posts, two new pages, and the patch-generation playbook rebuilt',
    '两篇博客、两个新页面，补丁生成手册重写',
  ),
  items: [
    L(
      'AI Blog: "Poppy vs UCP vs ACP vs AP2" — four agent standards, and reading them as competitors produces a roadmap that cannot be built. ACP (OpenAI and Stripe, Apache 2.0 on 29 September 2025, spec 2026-04-17), UCP (Google and Shopify, 11 January 2026) and AP2 all end at an instrument, because each assumes the agent is a buyer; payment has converged on one primitive, a bounded single-use authorization held off-agent. Poppy (Sierra and Meta, 6 October 2026) assumes the agent is the user\'s delegate, has no payment story, and is the only one that lands on your login rather than your checkout. The contested layer is identity.',
      'AI 博客：《Poppy、UCP、ACP、AP2》——四份智能体标准，而把它们读成互相竞争会产出一份造不出来的路线图。ACP（OpenAI 与 Stripe，2025 年 9 月 29 日以 Apache 2.0 发布，规范 2026-04-17）、UCP（Google 与 Shopify，2026 年 1 月 11 日）与 AP2 最终都落在一件支付工具上，因为它们都假定智能体是买方；支付已经收敛到同一个原语——一份有上限、只用一次、由非智能体一方持有的授权。而 Poppy（Sierra 与 Meta，2026 年 10 月 6 日）假定智能体是用户的受托人，完全没有支付那一块，也是四者中唯一落在你的登录、而不是落在你的结账上的。被争夺的那一层是身份。',
    ),
    L(
      'AI Blog: "The tasks were public, so were the defects" — Epoch AI\'s benchmark review programme had rated nine of fifteen widely cited benchmarks Flawed by mid-September 2026, meaning scoring defects could affect at least 20% of the full score. Terminal-Bench 4.0.0 carries publicly noted defects in 30 of its 66 tasks (45.5%), and SWE-bench Verified got the same verdict on 3 September. Nothing was uncovered to find this: these benchmarks publish tasks, verifiers and solutions, so "Not enough information" is the softer-sounding and strictly worse verdict. Quote the verdict with the score, and stop reading gaps smaller than the defect share.',
      'AI 博客：《任务是公开的，缺陷也是》——截至 2026 年 9 月中旬，Epoch AI 的基准复核项目已把十五个被广泛引用的基准中的九个评为「有缺陷」，意思是评分缺陷可能影响到总分的至少 20%。Terminal-Bench 4.0.0 的 66 个任务里有 30 个（45.5%）带有已被公开指出的缺陷，而 SWE-bench Verified 在 9 月 3 日得到了同样的裁定。发现这件事没有揭开任何东西：这些基准公开了任务、验证器与解法，所以「信息不足」才是那个听起来更温和、实际上严格更糟的裁定。请把裁定与分数一起引用，并停止去读那些小于缺陷占比的差距。',
    ),
    L(
      'New Deep-Dive, Poppy: The Personal Agent Protocol (P14): the discovery file takes an afternoon and the session model is the project. A Poppy session starts signed out and acquires an account mid-flight, so the authorization check cannot live at connection setup; the standard scope vocabulary is two reserved values, so the grant cannot express risk and the action must; and the user id is stable at one company and different at every other, which deletes a key your identity resolution and fraud scoring were using. Payment is named as future work — correctly, because a delegate holds no instrument.',
      '新增深入解析《Poppy：个人智能体协议》（P14）：那个发现文件花你一个下午，会话模型才是整个项目。Poppy 的会话开场未登录、在半途才挂上一个账户，所以授权检查不能放在连接建立处；标准权限词汇只有两个保留取值，于是授权无法表达风险、只能由动作来表达；而用户标识在一家公司内稳定、在其他每一家都不同，这删掉了你的身份归并与欺诈打分一直在用的一个键。支付被列为未来工作——而这是对的，因为一个受托人手里没有支付工具。',
    ),
    L(
      'New Playbook, Audio Quality & Codecs (V24): an 8 kHz call cannot carry sound above 4 kHz, and the fricatives that separate S from F live above it, so every recognizer has the same blind spot on a PSTN leg and no model closes it. Twilio Media Streams hands you G.711 u-law at 8 kHz and the Realtime telephony format is fixed there too, so the usual stack is narrowband end to end; upsampling to 24 kHz satisfies an input contract and adds nothing. The path runs at its narrowest hop, the one cross-band WER figure in circulation is from 2014, and the fix is a codec column in your eval set.',
      '新增实战手册《音频质量与编解码》（V24）：一通 8 kHz 的电话承载不了 4 kHz 以上的声音，而区分 S 与 F 的那些擦音恰恰住在上面，于是每个识别器在 PSTN 腿上都有同一个盲区，换模型也补不上。Twilio Media Streams 交给你的是 8 kHz 的 G.711 μ-law，Realtime 的电话格式也固定在那里，所以常见的栈是端到端窄带；上采样到 24 kHz 只满足了一份输入契约，什么也没增加。整条通路以最窄那一跳运行，而流传的那个跨频带词错误率数字出自 2014 年——真正的解法是在评测集里加一列编解码。',
    ),
    L(
      'Rebuilt Playbook, Patch Generation & Test-Driven Loops (U3), 774 → ~1,650 words: it now argues that the oracle is underdetermined and you can measure how badly. On SWE-bench Verified, 7.8% of patches counted as correct while failing the developers\' own tests and differential testing put 29.6% of plausible patches at behaviour differing from the ground truth; an earlier review attributed 31.08% of passes to weak tests and 32.67% to the fix sitting in the issue text; adversarial test generation strengthened 50.2% of instances. Coverage measures execution, not discrimination — so run mutation on the touched files and make the agent ship a test that goes red on the pre-patch code.',
      '重写实战手册《补丁生成与测试驱动循环》（U3），774 → 约 1,650 词：它现在主张「判据是欠定的，而且你能量出它欠定到什么程度」。在 SWE-bench Verified 上，7.8% 的补丁被判为正确却没通过开发者自己的测试，差分测试把 29.6% 的「看似可行」补丁判为行为与真值不同；更早一项复核把 31.08% 的通过归因于测试太弱、32.67% 归因于修复就摆在议题正文里；而对抗式测试生成加强了 50.2% 的实例。覆盖率度量的是执行、不是鉴别——所以请对被改动的文件跑变异测试，并要求智能体交出一个在打补丁前的代码上会变红的测试。',
    ),
  ],
  lines: ['dd', 'pb', 'bl'],
};

export default entry;
