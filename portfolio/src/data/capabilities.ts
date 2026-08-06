import type { LocalizedString } from '../i18n/locale'

export type Capability = {
  id: string
  number: string
  title: LocalizedString
  description: LocalizedString
  tools: string[]
}

export const capabilities: Capability[] = [
  {
    id: 'pre',
    number: '01',
    title: { zh: '内容创作', en: 'Content creation' },
    description: {
      zh: '掌握内容创作全链条，拥有剧本-拍摄-后期的实操经验',
      en: 'Full content chain — scripting, shooting, and post production',
    },
    tools: ['剪映', 'DaVinci Resolve'],
  },
  {
    id: 'data-review',
    number: '02',
    title: { zh: '数据复盘', en: 'Data review' },
    description: {
      zh: '内容发布后，追踪曝光、互动、完播、转化等关键指标，用表格与看板长期追踪账号运营情况，将复盘结论用于指导内容运营，让数据落地服务业务结果',
      en: 'After publish: track reach, engagement, completion, conversion; sheet & dashboard ops; turn reviews into content decisions',
    },
    tools: ['Excel', 'Python'],
  },
  {
    id: 'english',
    number: '03',
    title: { zh: '英语能力', en: 'English' },
    description: {
      zh: '英语可作为工作语言：口语沟通流畅，能独立完成英文内容读写与跨团队协作',
      en: 'Work-ready English — fluent speaking, independent writing, cross-team collab',
    },
    tools: ['雅思', 'CET 6'],
  },
]
