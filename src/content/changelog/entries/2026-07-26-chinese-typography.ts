import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Chinese pages no longer render slanted Chinese',
    '中文页面不再出现「伪斜体」中文',
  ),
  items: [
    L(
      'Ledes, callouts, blockquotes, image captions, previous/next chapter titles and every emphasised word on the Chinese pages were set in italic. No Chinese typeface has an italic — the style does not exist in Chinese typography — so the browser was faking one by shearing each character off the grid it is drawn on. It read as a rendering fault rather than as emphasis. All of it is now upright, and emphasised words are carried by weight instead, which is the convention Chinese actually uses.',
      '中文页面上的导语、提示框、引述、图注、上一章／下一章标题以及所有强调词此前都被设为斜体。中文字体没有斜体字重——中文排版中根本不存在这一字形——因此浏览器只能把每个汉字按字面「切斜」来伪造，看上去像是渲染出错，而非强调。现在这些文字全部恢复端正，强调改用字重体现，这也正是中文排版的通行做法。',
    ),
    L(
      'Chinese headings had inherited the negative letter-spacing used to tighten Latin capitals. Chinese characters sit on a fixed square grid, so that setting was closing gaps that are structural, pushing characters toward each other. Headings on Chinese pages now use normal spacing.',
      '中文标题此前沿用了为收紧拉丁字母大写而设的负字距。汉字排布在固定的方形字身框上，这一设置实际是在压缩本就属于字形结构的间距，让字与字相互挤压。中文页面的标题现已改用常规字距。',
    ),
    L(
      'Chinese body text gets more space between lines (1.8 rather than 1.65). A Chinese character fills far more of its line than a Latin lowercase letter does, so identical line spacing reads noticeably tighter in Chinese. Line length is unchanged.',
      '中文正文的行距略微加大（由 1.65 调整为 1.8）。汉字在一行中所占的视觉面积远大于拉丁小写字母，相同行距在中文里会明显显得局促。每行字数保持不变。',
    ),
    L(
      'English pages are byte-for-byte unchanged: the italics that carry meaning in English — chapter numerals, Roman part numbers — are Latin text set in a real italic typeface, and they stay exactly as they were.',
      '英文页面完全未作改动：英文中真正承载语义的斜体——章节编号、部分罗马数字——本就是使用真实斜体字形的拉丁文字，一切保持原样。',
    ),
    L(
      'The design guard now checks the rendered page for Chinese text set in a faked italic, so this cannot return through a new article, a new layout, or an inline style.',
      '设计检查新增一项：直接在渲染后的页面上核查是否存在被伪造成斜体的中文，确保该问题不会因新增文章、新增版式或行内样式而重新出现。',
    ),
  ],
};
export default entry;
