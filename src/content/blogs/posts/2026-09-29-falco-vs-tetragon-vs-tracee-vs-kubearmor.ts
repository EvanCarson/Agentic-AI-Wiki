import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-29',
  slug: 'falco-vs-tetragon-vs-tracee-vs-kubearmor',
  title: L(
    'Falco vs Tetragon vs Tracee vs KubeArmor',
    'Falco、Tetragon、Tracee 与 KubeArmor 对比',
  ),
  searchTitle: {
    en: 'Can the sensor tell your agent’s tool calls apart?',
  },
  summary: L(
    'Rule-library size decides nothing and neither does detection versus prevention. Kubernetes runtime security assumes one workload has one behavioural baseline, and a coding agent’s baseline is anything a developer might do — so the axis is whether a sensor can attribute a syscall to a tool call. Then the second decision: killing a tool subprocess does not stop an agent, it hands the loop an unexplained crash and a reason to retry.',
    '规则库大小什么也决定不了，「检测 vs 阻止」也一样。Kubernetes 运行时安全假定一个工作负载有一条行为基线，而一个编码智能体的基线是「一个开发者可能做的任何事」——所以那根轴是：传感器能不能把一次系统调用归因到某一次工具调用。然后是第二个决定：杀掉一个工具子进程并不能停下一个智能体，它只是给那个循环递去一次无从解释的崩溃与一个重试的理由。',
  ),
  tags: ['agent-comparison', 'open-source', 'safety', 'sandboxing', 'observability'],
};

export default post;
