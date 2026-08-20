import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-20',
  slug: 'gemini-spark-moved-into-your-chrome-profile',
  title: L(
    'Gemini Spark moved into your Chrome profile, and the handback is on the wrong line',
    'Gemini Spark 搬进了你的 Chrome 配置文件，而那道交还控制权的线划错了地方',
  ),
  summary: L(
    'Google’s agent now drives the Chrome you are logged into, with your saved passwords, and hands control back for payments. Payment is the one action with a chargeback window; the mailbox read, the data copied out and the recovery address changed are all on the unattended side of that line.',
    'Google 的智能体如今驾驶你正登录着的那个 Chrome，能取用你保存的密码，并在付款时把控制权交还给你。可付款恰恰是唯一带着拒付窗口的动作；邮箱被读、数据被拷走、找回地址被改掉，全在那条线的无人值守一侧。',
  ),
  tags: ['browser-agents', 'safety', 'prompt-injection', 'agentic-ai', 'computer-use'],
};

export default post;
