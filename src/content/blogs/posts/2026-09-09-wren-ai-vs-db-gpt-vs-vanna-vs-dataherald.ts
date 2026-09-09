import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-09',
  slug: 'wren-ai-vs-db-gpt-vs-vanna-vs-dataherald',
  title: L(
    'Wren AI vs DB-GPT vs Vanna vs Dataherald: the generator was never the product',
    'Wren AI、DB-GPT、Vanna 与 Dataherald：生成器从来就不是产品',
  ),
  summary: L(
    'The most-starred open-source text-to-SQL project is read-only — Vanna archived its repo on 29 March 2026 at 23.8k stars — and Dataherald has not taken a commit since July 2024. The two still shipping daily are the two that put a durable, reviewable artefact between the question and the SQL. Frontier models absorbed SQL generation; what they cannot absorb is which of your four definitions of "revenue" this question meant, and that is the layer you own whichever project you pick.',
    '最多星的开源 text-to-SQL 项目如今是只读的——Vanna 在 2026 年 3 月 29 日以 23.8k 星归档了仓库——而 Dataherald 自 2024 年 7 月起没再收过一次提交。仍在每天发版的那两个，恰恰是在问题与 SQL 之间放了一件持久、可评审的产物的那两个。前沿模型吞掉了 SQL 生成；它们吞不掉的，是你那四种「营收」定义里这个问题指的是哪一种——而无论你选哪个项目，那一层都归你自己。',
  ),
  tags: ['agent-comparison', 'open-source', 'rag', 'developer-tools', 'infrastructure'],
};

export default post;
