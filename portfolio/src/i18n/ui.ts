export const ui = {
  nav: {
    works: { zh: '作品', en: 'WORKS' },
    capabilities: { zh: '技能', en: 'CAPABILITIES' },
    about: { zh: '关于', en: 'ABOUT' },
    contact: { zh: '联系', en: 'CONTACT' },
    primaryAria: { zh: '主导航', en: 'Primary navigation' },
    mobileAria: { zh: '移动导航', en: 'Mobile navigation' },
    openMenu: { zh: '打开菜单', en: 'Open menu' },
    closeMenu: { zh: '关闭菜单', en: 'Close menu' },
  },
  localeSwitch: {
    aria: { zh: '切换语言', en: 'Switch language' },
  },
  sections: {
    works: { zh: '作品', en: 'Works' },
    worksLabel: { zh: 'WORKS', en: '作品' },
    capabilities: { zh: '技能', en: 'Skills' },
    capabilitiesLabel: { zh: 'CAPABILITIES', en: '技能' },
    about: { zh: '关于', en: 'About' },
    aboutLabel: { zh: 'ABOUT', en: '关于' },
    contact: { zh: '联系', en: 'Contact' },
    contactLabel: { zh: 'CONTACT', en: '联系' },
  },
  capabilities: {
    expandCase: { zh: '展开案例', en: 'Open case' },
    collapseCase: { zh: '收起案例', en: 'Close case' },
  },
  work: {
    openDetail: { zh: '查看作品详情', en: 'View work detail' },
    closeDetail: { zh: '关闭详情', en: 'Close detail' },
    background: { zh: '背景', en: 'CONTEXT' },
    highlight: { zh: '亮点', en: 'HIGHLIGHTS' },
    clipPending: {
      zh: '视频片段待替换 · 当前为封面占位',
      en: 'Clip pending · poster placeholder',
    },
    viewFull: { zh: '查看完整版', en: 'Full version' },
  },
  dataReview: {
    exampleLead: {
      zh: '以视频《挽救计划》为例',
      en: 'Case study: Project Hail Mary',
    },
    sheets: [
      {
        id: 'overview' as const,
        step: '01',
        title: { zh: '公开表现', en: 'Public metrics' },
        blurb: {
          zh: '播放 / 点赞 / 点赞率 / 互动率',
          en: 'Views / likes / like rate / engagement',
        },
      },
      {
        id: 'interaction' as const,
        step: '02',
        title: { zh: '互动构成', en: 'Interaction mix' },
        blurb: {
          zh: '点赞 / 收藏 / 评论 / 投币 / 弹幕 / 转发',
          en: 'Likes / favorites / comments / coins / danmaku / shares',
        },
      },
      {
        id: 'rates' as const,
        step: '03',
        title: { zh: '互动率对照', en: 'Rate comparison' },
        blurb: {
          zh: '比率拆解与结论',
          en: 'Rate breakdown & takeaway',
        },
      },
      {
        id: 'retention' as const,
        step: '04',
        title: { zh: '进度与留存', en: 'Retention' },
        blurb: {
          zh: '平均进度 / 3秒跳出 / 播转粉',
          en: 'Avg. progress / 3s bounce / follow conversion',
        },
      },
      {
        id: 'funnel' as const,
        step: '05',
        title: { zh: '转化漏斗', en: 'Conversion funnel' },
        blurb: {
          zh: '播放 → 平均进度 → 互动 → 关注',
          en: 'Views → avg. progress → engagement → follows',
        },
      },
    ],
    favorite: { zh: '收藏', en: 'Favorites' },
    coin: { zh: '投币', en: 'Coins' },
    share: { zh: '转发', en: 'Shares' },
    metric: { zh: '指标', en: 'Metric' },
    value: { zh: '数值', en: 'Value' },
    deviceShare: { zh: '终端分布', en: 'Device mix' },
    conclusionPeriod: { zh: '。', en: '.' },
  },
  footer: {
    rights: {
      zh: '保留所有权利',
      en: 'ALL RIGHTS RESERVED.',
    },
  },
} as const satisfies Record<string, unknown>

export type UiSheetId = (typeof ui.dataReview.sheets)[number]['id']
