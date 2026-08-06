import type { LocalizedString } from '../i18n/locale'

export const profile = {
  nameZh: '李阳',
  nameEn: 'LI Yang',
  roleEn: 'CONTENT CREATOR & DATA OPERATOR',
  greeting: {
    zh: '你好，我是李阳',
    en: 'Hi there, this is LI Yang',
  } satisfies LocalizedString,
  headlineLead: {
    zh: '内容创作',
    en: 'Content',
  } satisfies LocalizedString,
  headlineTrail: {
    zh: '数据运营',
    en: 'Data Ops',
  } satisfies LocalizedString,
  tagline: [
    {
      zh: '用内容打动人心，用数据驱动增长',
      en: 'Content that connects. Data that drives growth.',
    },
    {
      zh: '在内容与数据的交汇处，创造品牌影响力，提升业务价值。',
      en: 'Where content meets data — brand impact and business value.',
    },
  ] satisfies LocalizedString[],
  location: {
    zh: '深圳 · 香港',
    en: 'BASED IN SHENZHEN & HONG KONG',
  } satisfies LocalizedString,
  email: 'sirinfuhua@gmail.com',
  about: {
    lead: {
      zh: '国际贸易×计算机双重背景，擅长用',
      en: 'Background in international trade and computer science. I create with ',
    },
    toolEdit: {
      zh: '剪映 / DaVinci',
      en: 'CapCut / DaVinci',
    },
    mid: {
      zh: ' 完成内容创作，再用 ',
      en: ', then analyze with ',
    },
    toolData: {
      zh: 'Excel / Python',
      en: 'Excel / Python',
    },
    tail: {
      zh: ' 分析数据，把数据表现变成后续选题和分发的依据。',
      en: ' — turning performance into the next topic and distribution plan.',
    },
    more: [
      {
        zh: '具备英文工作能力，对海外热点敏感。',
        en: 'Work-ready English; tuned to overseas trends.',
      },
      {
        zh: '欢迎通过邮箱联系，了解合作或项目细节。',
        en: 'Reach out by email for collabs or project details.',
      },
    ],
  } satisfies Record<string, LocalizedString | LocalizedString[]>,
} as const
