import type { WorkCategory } from './works'

export type Capability = {
  id: string
  number: string
  title: string
  titleEn: string
  description: string
  tools: string[]
  relatedCategory: WorkCategory
}

export const capabilities: Capability[] = [
  {
    id: 'pre',
    number: '01',
    title: '前期 · 脚本拍摄',
    titleEn: 'PRE-PRODUCTION',
    description:
      '从选题到分镜到现场执行，把创意落成可拍、可剪、可复用的内容方案。',
    tools: ['分镜表', '拍摄清单', '剪映粗剪'],
    relatedCategory: '电影前瞻',
  },
  {
    id: 'post',
    number: '02',
    title: '后期 · 叙事剪辑',
    titleEn: 'POST-PRODUCTION',
    description:
      '电影前瞻与财经口播两类内容：节奏、字幕、包装与人设统一，服务完播与信任。',
    tools: ['剪映', 'DaVinci Resolve'],
    relatedCategory: '电影前瞻',
  },
  {
    id: 'ops',
    number: '03',
    title: '运营 · 数据复盘',
    titleEn: 'GROWTH OPS',
    description:
      '用表格与看板把播放、互动、留存翻译成下一轮内容决策，而不是只看结果数字。',
    tools: ['Excel', 'Power BI'],
    relatedCategory: '财经口播',
  },
]

export const dataOpsHighlights = [
  {
    title: '内容表现周报',
    description: '播放 / 完播 / 互动拆解到选题与封面层，标出下周优先迭代项。',
    metric: '周更看板',
  },
  {
    title: '账号漏斗复盘',
    description: '曝光 → 点击 → 完播 → 关注，定位流失段落并反哺脚本结构。',
    metric: '漏斗模型',
  },
  {
    title: '题材 ROI 对照',
    description: '按题材汇总投入时长与产出指标，辅助排期取舍。',
    metric: '题材矩阵',
  },
]
