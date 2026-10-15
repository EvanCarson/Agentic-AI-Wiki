import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-15',
  slug: 'the-interlock-held-the-network-did-not',
  title: L(
    'The interlock held, the network did not',
    '互锁扛住了，网络没有',
  ),
  summary: L(
    'Given only subnet boundaries, two frontier models cleared all eight attack objectives Booz Allen set against an isolated manufacturing testbed, and went from network compromise to action inside the control environment in just over sixteen minutes. Read the result backwards: the only defences that held were a controller that refused a command and a motor whose mode switch was set by hand.',
    '只拿到子网边界，两个前沿模型就清掉了 Booz Allen 为一套隔离制造业试验台设定的全部八项攻击目标，并在十六分钟出头内从网络沦陷走到在控制环境内部采取动作。请倒过来读这个结果：唯一扛住的防御，是一台拒绝了命令的控制器，和一台模式开关靠人手拨的电机。',
  ),
  tags: ['safety', 'frontier-models', 'agentic-ai', 'governance'],
};

export default post;
