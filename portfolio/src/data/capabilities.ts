export type Capability = {
  id: string
  number: string
  title: string
  titleEn: string
  description: string
  tools: string[]
}

export const capabilities: Capability[] = [
  {
    id: 'pre',
    number: '01',
    title: '内容创作',
    titleEn: 'CONTENT CREATION',
    description:
      '掌握内容创作全链条，拥有剧本-拍摄-后期的实操经验',
    tools: ['剪映', 'DaVinci Resolve'],
  },
  {
    id: 'data-review',
    number: '02',
    title: '数据复盘',
    titleEn: 'DATA REVIEW',
    description:
      '内容发布后，追踪曝光、互动、完播、转化等关键指标，用表格与看板长期追踪账号运营情况，将复盘结论用于指导内容运营，让数据落地服务业务结果',
    tools: ['Excel', 'Python'],
  },
  {
    id: 'english',
    number: '03',
    title: '英语能力',
    titleEn: 'ENGLISH',
    description:
      '英语可作为工作语言：口语沟通流畅，能独立完成英文内容读写与跨团队协作',
    tools: ['雅思', 'CET 6'],
  },
]
