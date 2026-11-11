import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-11',
  slug: 'the-injection-was-ignored-not-refused',
  title: L(
    'The injection was ignored, not refused',
    '那次注入是被忽略了，不是被拒绝了',
  ),
  summary: L(
    'An audit of about 33,000 trajectories from eleven open-weight agents found that of the indirect prompt injections that failed, 76.3% on InjecAgent and 80.3% on AgentDojo were simply ignored, while genuine refusals accounted for 18.0% and 17.2%. A low attack-success rate is therefore mostly silence, not a defended boundary — and since refusal is the only outcome that leaves a trace, refusal-rate monitoring sees roughly one in five of the attempts your agent survived. The same paper reports that changing only the system prompt moved attack success significantly for nine of eleven agents, which says the scaffold is carrying the robustness your model is being credited with.',
    '一项针对十一个开放权重智能体、约 33,000 条轨迹的审计发现：在那些失败的间接提示注入里，InjecAgent 上有 76.3%、AgentDojo 上有 80.3% 只是被智能体忽略了，而真正的拒绝只占 18.0% 与 17.2%。于是，低攻击成功率多半是沉默，而不是一条守住了的指令边界——又因为只有「拒绝」会留下痕迹，拒绝率监控大约只能看到你的智能体所挡住的尝试中的五分之一。同一篇论文还报告，仅改动系统提示就让十一个智能体中的九个的攻击成功率出现显著变化，这说明：你记在模型账上的那份稳健性，其实是脚手架在扛。',
  ),
  tags: ['safety', 'prompt-injection', 'evals', 'open-source', 'agentic-ai'],
};

export default post;
