import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Domain Playbooks: applying agents in five verticals', '领域实战手册：在五个垂直领域落地智能体'),
  items: [
    L('New Deep-Dive group "Domain Playbooks" — 6 opinionated, checklist-ending guides: customer-support agents, data & analytics agents, DevOps & SRE agents, research & synthesis agents, sales & GTM agents, and a meta-essay on adapting a playbook to your own domain.',
      '新增「深度剖析」分组「领域实战手册」——6 篇有主见、以清单收尾的指南：客户支持智能体、数据与分析智能体、DevOps 与 SRE 智能体、研究与综合智能体、销售与 GTM 智能体，以及一篇关于把实战手册适配到你自己领域的元文章。'),
    L('Each playbook follows one method — define the job by its dominating failure, set autonomy by reversibility, ground via tools, pick an eval that mirrors the business cost, and bound the top failure mode — and ends with a reusable checklist and an honest tradeoff.',
      '每份实战手册遵循同一方法——以压倒性失败定义任务、按可逆性设定自主、经工具接地、选一个镜像业务代价的评估、并界定头号失败模式——并以一份可复用清单和一个诚实的取舍收尾。'),
    L('Recurring themes made concrete per vertical: the confidently-wrong output as the failure that matters, read-only / consent / approval gates as upstream constraints, and limits enforced in tool signatures rather than prompts.',
      '反复出现的主题在每个垂直领域被具体化：自信的错误输出才是要紧的失败、只读/同意/审批关卡作为上游约束、以及把限制强制在工具签名而非提示里。'),
  ],
};
export default entry;
