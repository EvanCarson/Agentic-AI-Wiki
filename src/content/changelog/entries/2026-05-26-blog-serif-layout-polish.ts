import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-26',
  title: L(
    'AI Blog visual polish — narrow column, serif body type, Medium-style chrome',
    'AI 博客视觉精修 —— 收窄栏宽、正文衬线字体、Medium 风格页头',
  ),
  items: [
    L(
      'Blog post article column narrowed to ~760px (shell max-width 1080px) for a comfortable reading width matching editorial blog standards.',
      '博客文章正文栏收窄至约 760px（外壳最大宽 1080px），达到符合编辑类博客规范的舒适阅读宽度。',
    ),
    L(
      'Body paragraphs and list items now render in Source Serif 4 (19px, line-height 1.65) — a modern open-source serif designed for reading, similar to Charter used by Medium.',
      '正文段落与列表项现在以 Source Serif 4（19px，行高 1.65）渲染，这是一款专为阅读设计的现代开源衬线字体，风格近似 Medium 所用的 Charter。',
    ),
    L(
      'Blockquote / pull-quote receives italic serif treatment (22px, accent left border) so authors can quote dramatically inline.',
      '引用块（blockquote）采用斜体衬线处理（22px，强调色左边框），作者可在正文中做戏剧性引用。',
    ),
    L(
      'Post header meta line (date · author · reading time) softened from uppercase JetBrains Mono to plain Inter 13px — calmer, more editorial.',
      '文章头部元信息行（日期 · 作者 · 阅读时间）从大写 JetBrains Mono 改为普通 Inter 13px，更加沉稳，更具编辑质感。',
    ),
    L(
      'Hook lede enlarged to 22px (was 19px) and margin-bottom increased to 36px for more dramatic top-of-post presence.',
      '钩子引言字号增大至 22px（原为 19px），下外边距增至 36px，文章顶部视觉冲击力更强。',
    ),
    L(
      'Section h2 grows to 30px and h3 to 22px to balance the larger body type; both remain Fraunces serif.',
      '章节 h2 增至 30px，h3 增至 22px，与更大的正文字号保持平衡；两者均保持 Fraunces 衬线字体。',
    ),
    L(
      'Wide comparison table now breaks out 140px beyond the article column on viewports ≥ 1000px, giving the 8-column "At a glance" table comfortable horizontal room.',
      '宽比较表在视口 ≥ 1000px 时向右溢出 140px，为 8 列「一览表」提供充足的横向空间。',
    ),
  ],
};

export default entry;
