import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'agent-ux-and-human-interaction',
  order: 110,
  name: L('Agent UX & Human Interaction', '智能体体验与人机交互'),
  groupSummary: L('How agents present themselves, ask for input, and earn trust — UX patterns for human-in-the-loop systems.', '智能体如何呈现自己、请求输入并赢得信任——人在回路系统的交互模式。'),
  entries: [
    { page: 'designing-for-trust', slug: 'designing-for-trust', title: L('Designing for Trust & Calibration','为信任与校准而设计'), summary: L('Trust is a calibration target, not a maximization goal: matching user-perceived reliability to measured reliability per task, displaying confidence only where it changes a decision, and spending friction where it actually calibrates.','信任是一个校准目标，而非追求最大化的目标：让用户感知的可靠性按任务匹配实测可靠性，只在置信度会改变决策时展示它，并把摩擦力花在真正能产生校准的地方。') },
    { page: 'approval-and-confirmation-ux', slug: 'approval-and-confirmation-ux', title: L('Approval & Confirmation UX','审批与确认体验'), summary: L('Consequence-tiered gates, payload-hash pinning so you confirm the action that actually runs, batching and defaults to fight confirmation fatigue, and stronger modalities for genuinely irreversible actions.','按后果分级的关卡、用载荷哈希钉定以确保你确认的就是实际执行的动作、用批量与默认项对抗确认疲劳，以及为真正不可逆的动作采用更强的交互形态。') },
    { page: 'transparency-and-explainability', slug: 'transparency-and-explainability', title: L('Transparency & Explainability','透明度与可解释性'), summary: L('Faithful versus plausible explanations, why a raw chain-of-thought is a persuasive narrative rather than verified causality, choosing the right altitude of explanation, and provenance as the highest-leverage transparency.','忠实的解释与看似合理的解释之别、为何原始思维链是有说服力的叙事而非经过验证的因果、如何选择恰当的解释海拔，以及来源溯源作为杠杆率最高的透明度。') },
    { page: 'interruption-and-handoff', slug: 'interruption-and-handoff', title: L('Interruption, Steering & Handoff','中断、引导与交接'), summary: L('Responsive non-destructive interruption, distinguishing pause/steer/abort, symmetric handover and handback, shared inspectable state, and reconciling on resume so an agent never silently reverts a human fix.','及时且不具破坏性的中断、区分暂停/引导/中止、对称的接管与交还、共享且可检视的状态，以及恢复时调和状态，使智能体绝不悄悄回退人类的修复。') },
    { page: 'progressive-autonomy', slug: 'progressive-autonomy', title: L('Progressive Autonomy','渐进式自主'), summary: L('The autonomy ladder (operator/collaborator/consultant/approver/observer) as a product surface: autonomy scoped to (capability, scope), promotion gated on a visible track record, and automatic reversible demotion.','把自主权阶梯（操作者/协作者/顾问/审批者/观察者）当作产品界面：自主权按 (能力, 范围) 限定、晋升以可见的战绩为门槛、降级则自动且可逆。') },
    { page: 'designing-for-failure', slug: 'designing-for-failure', title: L('Designing for Failure & Recovery','为失败与恢复而设计'), summary: L('Graceful failure that stops before compounding, undo as the safety net that makes lower friction affordable, actionable error messages, failing closed on consequence and open on capability, and the explicit work of trust repair.','在叠加之前就停下的优雅失败、把撤销作为让更低摩擦变得负担得起的安全网、可据以行动的错误提示、在后果上向关闭、在能力上向开放失败，以及信任修复这件显式的工作。') },
  ],
};
export default group;
