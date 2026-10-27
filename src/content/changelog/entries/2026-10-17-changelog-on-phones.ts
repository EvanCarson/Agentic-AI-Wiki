import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-17',
  title: L(
    'The changelog is back in the navigation and readable on a phone',
    '更新日志回到导航栏，并在手机上重新变得可读',
  ),
  items: [
    L(
      'Collapsed entry titles now stop at three lines and drop a size below 900px wide; opening an entry shows the full title. Half the titles ran past 120 characters and one filled a whole phone screen, so the page was about 62 screens long at 390px.',
      '折叠状态下的条目标题现在最多显示三行，并且在宽度小于 900px 时缩小一号；展开条目即可看到完整标题。此前有一半标题超过 120 个字符，其中一条就占满了整个手机屏幕，使这一页在 390px 宽度下长达约 62 屏。',
    ),
    L(
      'New entries must use a headline-length title — at most 110 characters in English and 60 in Chinese — with the detail in the bullets; a test enforces it. The four Books entries were shortened to match.',
      '新条目的标题必须是标题长度——英文最多 110 个字符，中文最多 60 个——细节写在要点里；有测试强制执行。“书籍”相关的四个条目也已相应缩短。',
    ),
    L(
      'Changelog is back in the top navigation and the phone menu, after the AI Blog; it had been moved to the footer to make room for Books, which left it at the bottom of every page on a phone.',
      '“更新日志”回到了顶部导航栏和手机菜单中，位于“AI 博客”之后；此前为了给“书籍”腾位置，它被挪到了页脚，在手机上就只能滑到每页最底部才找得到。',
    ),
  ],
  lines: ['hub'],
};

export default entry;
