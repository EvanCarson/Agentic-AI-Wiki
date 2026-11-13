import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-13',
  slug: 'the-oracle-was-the-hard-part',
  title: L(
    'The oracle was the hard part',
    '难的那部分是裁判',
  ),
  summary: L(
    'AWS shipped a local emulator of its own APIs on 11 November 2026 — 436 service crates in the public workspace, CC0, written by agents, with AWS saying engineers wrote no implementation code and reviewed no pull requests. The transferable part is not the agents. It is that correctness was moved out of the diff and into a separately published suite of fidelity tests, each one verified against at least two sandboxed AWS accounts, whose own README says the quiet thing out loud: behaviour that no fidelity test covers is not verified. AWS had a machine-readable spec and a live reference implementation to diff against. If you have neither, you can copy the process but you will only be copying the risk.',
    '2026 年 11 月 11 日，AWS 发布了一个针对自家 API 的本地模拟器——公开工作区里有 436 个服务 crate，采用 CC0 许可，由智能体写成；按 AWS 的说法，工程师没写实现代码，也没有评审过任何 pull request。可迁移的那部分不是智能体，而是「正确性」被从 diff 里搬了出去，搬进一套单独发布的保真度测试里——每一条都在至少两个 AWS 沙箱账号上验证过——而它自己的 README 把那句不好说的话说了出来：没有任何保真度测试覆盖的行为，就是未经验证的行为。AWS 手里有一份机器可读的规范，和一个活着的参考实现可以对照。如果你两者都没有，你可以照搬这套流程，但你搬到的只会是风险。',
  ),
  tags: ['agentic-ai', 'coding-agents', 'developer-tools', 'evals', 'open-source'],
};

export default post;
