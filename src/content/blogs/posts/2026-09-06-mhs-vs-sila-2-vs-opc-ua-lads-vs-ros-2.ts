import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-06',
  slug: 'mhs-vs-sila-2-vs-opc-ua-lads-vs-ros-2',
  title: L(
    'MHS vs SiLA 2 vs OPC UA LADS vs ROS 2: the wire format was never the problem',
    'MHS、SiLA 2、OPC UA LADS 与 ROS 2：从来卡住的都不是线缆上那层格式',
  ),
  searchTitle: {
    en: 'Model Hardware Standard vs SiLA 2, OPC UA LADS and ROS 2',
  },
  summary: L(
    'Lab and factory interoperability has been standardised three times already — SiLA 2 since 2019, OPC UA LADS since January 2024, ROS 2 as robotics middleware — and instruments still ship with vendor SDKs, so a fourth spec is not obviously the answer. What Anthropic\'s Model Hardware Standard adds is the thing none of the three tried: a device that describes its own limits in language a model can read, and a driver that enforces them whichever model is driving. Useful, and not a safety function — keep those apart.',
    '实验室与工厂的互操作已经被标准化过三次——SiLA 2 自 2019 年、OPC UA LADS 自 2024 年 1 月、ROS 2 作为机器人中间件——而仪器出厂时依然配着厂商自家的 SDK，所以「再来第四份规范」显然不是那个答案。Anthropic 的 Model Hardware Standard 真正补上的，是那三份都没试过的一件事：让设备用模型读得懂的语言描述自己的限值，并由驱动来强制执行，不管开车的是哪个模型。有用，但它不是安全功能——这两者必须分开。',
  ),
  tags: ['agent-comparison', 'protocols', 'safety', 'ecosystem', 'infrastructure'],
};

export default post;
