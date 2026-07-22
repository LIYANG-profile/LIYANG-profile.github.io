/** B 站公开数据快照 + 创作中心稿件页指标（BV1sVAKzUEy9）。 */

export type OpsKpi = {
  key: string
  label: string
  labelEn: string
  value: number
  suffix?: string
  hint: string
}

export type InteractionSlice = {
  key: string
  label: string
  value: number
  share: number
}

const view = 3376
const like = 1358
const favorite = 182
const coin = 22
const share = 15
const reply = 26
const danmaku = 18

const interactionTotal = like + favorite + coin + share + reply + danmaku
const likeRate = like / view
const favoriteRate = favorite / view
const coinRate = coin / view
const interactionRate = interactionTotal / view

export const featuredVideoOps = {
  bvid: 'BV1sVAKzUEy9',
  title: '【挽救计划】披着太空冒险外皮的童话故事',
  url: 'https://www.bilibili.com/video/BV1sVAKzUEy9',
  pubdate: '2026-03-22',
  durationLabel: '5:22',
  category: '电影前瞻',
  view,
  like,
  favorite,
  coin,
  share,
  reply,
  danmaku,
  likeRate,
  favoriteRate,
  coinRate,
  shareRate: share / view,
  interactionRate,
} as const

export const rateCompare = [
  { label: '点赞率', rate: likeRate },
  { label: '收藏率', rate: favoriteRate },
  { label: '投币率', rate: coinRate },
  { label: '转发率', rate: share / view },
] as const

export const rateCompareConclusionLead =
  '共鸣强于转化：点赞率突出，投币与转发偏弱，'

export const rateCompareConclusionHighlight = '片尾需要加强行动号召'

/**
 * 进度与留存（创作中心稿件数据页截图 2026-07-22）
 * 来源：upload-manager/article/data/BV1sVAKzUEy9
 */
export const retentionSheet = {
  note: '指标来自创作中心稿件数据页；「占总时长」即平均播放进度占成片比例。',
  rows: [
    {
      metric: '视频时长',
      value: '5:22',
      source: '公开',
      note: '成片总时长',
    },
    {
      metric: '平均播放进度',
      value: '1分7秒',
      source: '创作中心',
      note: '占总时长 21.1%',
    },
    {
      metric: '占总时长',
      value: '21.1%',
      source: '创作中心',
      note: '平均观看到片长的比例',
    },
    {
      metric: '3 秒跳出率',
      value: '54.2%',
      source: '创作中心',
      note: '高于以往 · 需重点关注 · 2.6星',
    },
    {
      metric: '游客播放',
      value: '3,360',
      source: '创作中心',
      note: '播转粉漏斗上层',
    },
    {
      metric: '涨粉',
      value: '+5',
      source: '创作中心',
      note: '本稿关注增量',
    },
    {
      metric: '播转粉率',
      value: '0.14%',
      source: '创作中心',
      note: '表现较好 · 3.1星',
    },
  ],
} as const

export const deviceShare = [
  { label: '移动', percent: '96.3%', tone: '#4C7BEA' },
  { label: 'PC', percent: '3.6%', tone: '#5BA86B' },
  { label: 'H5', percent: '<0.1%', tone: '#D4A017' },
  { label: 'TV', percent: '<0.1%', tone: '#8B6BC7' },
  { label: '其他', percent: '0%', tone: '#C45C5C' },
] as const

export const funnelSteps = [
  {
    stage: '播放',
    value: '3,376',
  },
  {
    stage: '平均进度',
    value: '21.1%',
  },
  {
    stage: '互动',
    value: '1,621',
  },
  {
    stage: '关注',
    value: '+5',
  },
] as const

export const opsKpis: OpsKpi[] = [
  {
    key: 'view',
    label: '播放',
    labelEn: 'VIEWS',
    value: featuredVideoOps.view,
    hint: '单稿公开播放',
  },
  {
    key: 'like',
    label: '点赞',
    labelEn: 'LIKES',
    value: featuredVideoOps.like,
    hint: '强共鸣信号',
  },
  {
    key: 'likeRate',
    label: '点赞率',
    labelEn: 'LIKE RATE',
    value: Math.round(likeRate * 1000) / 10,
    suffix: '%',
    hint: '点赞 ÷ 播放',
  },
  {
    key: 'interactionRate',
    label: '互动率',
    labelEn: 'ENGAGE',
    value: Math.round(interactionRate * 1000) / 10,
    suffix: '%',
    hint: '全互动 ÷ 播放',
  },
]

const slices: Array<Omit<InteractionSlice, 'share'>> = [
  { key: 'like', label: '点赞', value: like },
  { key: 'favorite', label: '收藏', value: favorite },
  { key: 'reply', label: '评论', value: reply },
  { key: 'coin', label: '投币', value: coin },
  { key: 'danmaku', label: '弹幕', value: danmaku },
  { key: 'share', label: '分享', value: share },
]

export const interactionSlices: InteractionSlice[] = slices.map((slice) => ({
  ...slice,
  share: slice.value / interactionTotal,
}))

export function formatOpsNumber(value: number): string {
  return value.toLocaleString('zh-CN')
}

export function formatOpsPercent(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`
}
