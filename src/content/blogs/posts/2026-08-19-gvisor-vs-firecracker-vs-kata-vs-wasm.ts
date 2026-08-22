import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-19',
  slug: 'gvisor-vs-firecracker-vs-kata-vs-wasm',
  title: L(
    'gVisor vs Firecracker vs Kata vs WebAssembly: cold start is the operating system',
    'gVisor vs Firecracker vs Kata vs WebAssembly：冷启动就是操作系统本身',
  ),
  summary: L(
    'Your sandbox vendor already picked one of these four, and the pick decides whether your agent can run pip install. Rank them by cold start and you get the exact reverse of ranking them by how much Linux the agent gets — because the boot time is the kernel. Answer one question, does the code install things, and the field collapses.',
    '你的沙箱厂商已经从这四者里替你挑好了一个，而这个选择决定了你的智能体能不能跑 pip install。按冷启动排序，得到的顺序恰好与按"智能体拿到多少个 Linux"排序相反——因为启动时间就是那个内核。回答一个问题：这段代码要不要装东西；整个选择面随即塌缩。',
  ),
  tags: ['agent-comparison', 'sandboxing', 'code-execution', 'infrastructure', 'open-source'],
};

export default post;
