/** B 站公开数据快照 + 创作中心稿件页指标（BV1sVAKzUEy9）。 */

import type { Locale, LocalizedString } from '../i18n/locale'

export type OpsKpi = {
  key: string
  label: LocalizedString
  labelEn: string
  value: number
  suffix?: string
  hint: LocalizedString
}

export type InteractionSlice = {
  key: string
  label: LocalizedString
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
  title: {
    zh: '【挽救计划】披着太空冒险外皮的童话故事',
    en: 'Project Hail Mary — fairy tale under a space-adventure skin',
  } satisfies LocalizedString,
  url: 'https://www.bilibili.com/video/BV1sVAKzUEy9',
  pubdate: '2026-03-22',
  durationLabel: '5:22',
  category: { zh: '电影前瞻', en: 'Film Preview' } satisfies LocalizedString,
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
  { label: { zh: '点赞率', en: 'Like rate' }, rate: likeRate },
  { label: { zh: '收藏率', en: 'Favorite rate' }, rate: favoriteRate },
  { label: { zh: '投币率', en: 'Coin rate' }, rate: coinRate },
  { label: { zh: '转发率', en: 'Share rate' }, rate: share / view },
] as const satisfies ReadonlyArray<{ label: LocalizedString; rate: number }>

export const rateCompareConclusionLead = {
  zh: '共鸣强于转化：点赞率突出，投币与转发偏弱，',
  en: 'Resonance over conversion: strong like rate, weaker coins & shares — ',
} satisfies LocalizedString

export const rateCompareConclusionHighlight = {
  zh: '片尾需要加强行动号召',
  en: 'strengthen the end CTA',
} satisfies LocalizedString

/**
 * 进度与留存（创作中心稿件数据页截图 2026-07-22）
 * 来源：upload-manager/article/data/BV1sVAKzUEy9
 */
export const retentionSheet = {
  note: {
    zh: '指标来自创作中心稿件数据页；「占总时长」即平均播放进度占成片比例。',
    en: 'From Creator Center video data; “of duration” = avg. progress vs. runtime.',
  } satisfies LocalizedString,
  rows: [
    {
      metric: { zh: '视频时长', en: 'Duration' },
      value: '5:22',
      source: { zh: '公开', en: 'Public' },
      note: { zh: '成片总时长', en: 'Full runtime' },
    },
    {
      metric: { zh: '平均播放进度', en: 'Avg. progress' },
      value: { zh: '1分7秒', en: '1m 7s' },
      source: { zh: '创作中心', en: 'Creator Center' },
      note: { zh: '占总时长 21.1%', en: '21.1% of duration' },
    },
    {
      metric: { zh: '占总时长', en: 'Of duration' },
      value: '21.1%',
      source: { zh: '创作中心', en: 'Creator Center' },
      note: {
        zh: '平均观看到片长的比例',
        en: 'Avg. watch vs. full length',
      },
    },
    {
      metric: { zh: '3 秒跳出率', en: '3s bounce' },
      value: '54.2%',
      source: { zh: '创作中心', en: 'Creator Center' },
      note: {
        zh: '高于以往 · 需重点关注 · 2.6星',
        en: 'Above baseline · watch · 2.6★',
      },
    },
    {
      metric: { zh: '游客播放', en: 'Guest views' },
      value: '3,360',
      source: { zh: '创作中心', en: 'Creator Center' },
      note: {
        zh: '播转粉漏斗上层',
        en: 'Top of view→follow funnel',
      },
    },
    {
      metric: { zh: '涨粉', en: 'New follows' },
      value: '+5',
      source: { zh: '创作中心', en: 'Creator Center' },
      note: {
        zh: '本稿关注增量',
        en: 'Follows from this video',
      },
    },
    {
      metric: { zh: '播转粉率', en: 'View→follow' },
      value: '0.14%',
      source: { zh: '创作中心', en: 'Creator Center' },
      note: {
        zh: '表现较好 · 3.1星',
        en: 'Solid · 3.1★',
      },
    },
  ],
} as const

export const deviceShare = [
  { label: { zh: '移动', en: 'Mobile' }, percent: '96.3%', tone: '#4C7BEA' },
  { label: { zh: 'PC', en: 'PC' }, percent: '3.6%', tone: '#5BA86B' },
  { label: { zh: 'H5', en: 'H5' }, percent: '<0.1%', tone: '#D4A017' },
  { label: { zh: 'TV', en: 'TV' }, percent: '<0.1%', tone: '#8B6BC7' },
  { label: { zh: '其他', en: 'Other' }, percent: '0%', tone: '#C45C5C' },
] as const satisfies ReadonlyArray<{
  label: LocalizedString
  percent: string
  tone: string
}>

export const funnelSteps = [
  { stage: { zh: '播放', en: 'Views' }, value: '3,376' },
  { stage: { zh: '平均进度', en: 'Avg. progress' }, value: '21.1%' },
  { stage: { zh: '互动', en: 'Engagement' }, value: '1,621' },
  { stage: { zh: '关注', en: 'Follows' }, value: '+5' },
] as const satisfies ReadonlyArray<{
  stage: LocalizedString
  value: string
}>

export const opsKpis: OpsKpi[] = [
  {
    key: 'view',
    label: { zh: '播放', en: 'Views' },
    labelEn: 'VIEWS',
    value: featuredVideoOps.view,
    hint: { zh: '单稿公开播放', en: 'Public views' },
  },
  {
    key: 'like',
    label: { zh: '点赞', en: 'Likes' },
    labelEn: 'LIKES',
    value: featuredVideoOps.like,
    hint: { zh: '强共鸣信号', en: 'Strong resonance' },
  },
  {
    key: 'likeRate',
    label: { zh: '点赞率', en: 'Like rate' },
    labelEn: 'LIKE RATE',
    value: Math.round(likeRate * 1000) / 10,
    suffix: '%',
    hint: { zh: '点赞 ÷ 播放', en: 'Likes ÷ views' },
  },
  {
    key: 'interactionRate',
    label: { zh: '互动率', en: 'Engage' },
    labelEn: 'ENGAGE',
    value: Math.round(interactionRate * 1000) / 10,
    suffix: '%',
    hint: { zh: '全互动 ÷ 播放', en: 'All engage ÷ views' },
  },
]

const slices: Array<Omit<InteractionSlice, 'share'>> = [
  { key: 'like', label: { zh: '点赞', en: 'Likes' }, value: like },
  { key: 'favorite', label: { zh: '收藏', en: 'Favorites' }, value: favorite },
  { key: 'reply', label: { zh: '评论', en: 'Comments' }, value: reply },
  { key: 'coin', label: { zh: '投币', en: 'Coins' }, value: coin },
  { key: 'danmaku', label: { zh: '弹幕', en: 'Danmaku' }, value: danmaku },
  { key: 'share', label: { zh: '分享', en: 'Shares' }, value: share },
]

export const interactionSlices: InteractionSlice[] = slices.map((slice) => ({
  ...slice,
  share: slice.value / interactionTotal,
}))

export function formatOpsNumber(value: number, locale: Locale = 'zh'): string {
  return value.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US')
}

export function formatOpsPercent(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`
}
