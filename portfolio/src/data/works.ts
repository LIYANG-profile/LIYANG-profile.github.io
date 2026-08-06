import type { LocalizedString } from '../i18n/locale'

export type Work = {
  id: string
  title: LocalizedString
  summary: LocalizedString
  category: LocalizedString
  categoryTone: 'coral' | 'slate' | 'olive'
  duration: string
  roles: LocalizedString[]
  poster: string
  /** 竖版封面用 contain，避免在横版画幅里被 object-cover 裁切放大 */
  posterAspect?: 'portrait' | 'landscape'
  /** 空字符串表示尚未提供片段；有路径时才挂载 <video> */
  clipSrc: string
  fullUrl?: string
  detail: {
    background: LocalizedString
    role: LocalizedString
  }
}

const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** 视频托管在 Cloudflare R2（GitHub 仓库只存代码与封面图） */
const CLIPS_BASE = 'https://pub-e48389af07104ceeb1657d1dc396ab94.r2.dev'

const clipAsset = (filename: string) => `${CLIPS_BASE}/${filename}`

const categories = {
  filmPreview: { zh: '电影前瞻', en: 'Film Preview' },
  shortFilm: { zh: '微电影', en: 'Short Film' },
  financeTalk: { zh: '财经口播', en: 'Finance Talk' },
  aiCreation: { zh: 'AI 创作', en: 'AI Creation' },
} as const satisfies Record<string, LocalizedString>

export const works: Work[] = [
  {
    id: 'script-01',
    title: {
      zh: '【挽救计划】披着冒险外衣的童话故事',
      en: 'Project Hail Mary — a fairy tale in adventure clothing',
    },
    summary: {
      zh: '西亚捕捉电影市场热点并落地选题，独立完成策划剪辑配音；总播放 5000+、点赞 1300+',
      en: 'Spotted a film trend overseas, owned topic-to-cut; 5,000+ views, 1,300+ likes',
    },
    category: categories.filmPreview,
    categoryTone: 'olive',
    duration: '5min',
    roles: [
      { zh: '海外素材检索', en: 'Overseas research' },
      { zh: '翻译', en: 'Translation' },
      { zh: '配音', en: 'Voice-over' },
    ],
    poster: publicAsset('posters/space-fairytale.jpg'),
    clipSrc: clipAsset('space-fairytale.mp4'),
    detail: {
      background: {
        zh: '围绕《挽救计划》做影评短片，于 IMDB、YouTube、Instagram 检索素材',
        en: 'Film-review short on Project Hail Mary; sourced from IMDb, YouTube, Instagram',
      },
      role: {
        zh: 'AI 自动化素材检索与下载，大幅提升效率\n达芬奇创作',
        en: 'AI-assisted asset search & download for speed\nEdited in DaVinci',
      },
    },
  },
  {
    id: 'preview-01',
    title: {
      zh: '【痴迷】无剧透简评黑马恐怖片',
      en: 'Obsession — spoiler-free take on a breakout horror',
    },
    summary: {
      zh: '内地公映前于海外社媒捕捉高热讨论，快速完成影评口播与成片，播放 2000+',
      en: 'Caught overseas buzz before CN release; fast review VO cut; 2,000+ views',
    },
    category: categories.filmPreview,
    categoryTone: 'olive',
    duration: '4min',
    roles: [
      { zh: '海外素材检索', en: 'Overseas research' },
      { zh: '翻译', en: 'Translation' },
      { zh: '配音', en: 'Voice-over' },
    ],
    poster: publicAsset('posters/chi-mi.jpg'),
    clipSrc: clipAsset('chi-mi.mp4'),
    detail: {
      background: {
        zh: '面向内地影视爱好者的影评内容，需要在开场快速传递看点与情绪',
        en: 'Review for CN film fans — hook interest and mood in the opening',
      },
      role: {
        zh: '确定并统一栏目视觉语言\n达芬奇创作',
        en: 'Defined and unified the series look\nEdited in DaVinci',
      },
    },
  },
  {
    id: 'film-01',
    title: {
      zh: '现金之城',
      en: 'City of Cash',
    },
    summary: {
      zh: '作为导演统筹剧本、拍摄与后期，在有限高压时间内协调演员完成影片',
      en: 'Directed script, shoot & post; coordinated cast under a tight deadline',
    },
    category: categories.shortFilm,
    categoryTone: 'slate',
    duration: '10min',
    roles: [
      { zh: '剧本创作', en: 'Screenwriting' },
      { zh: '摄影指导', en: 'Cinematography' },
      { zh: '现场导演', en: 'On-set direction' },
      { zh: '统筹协调', en: 'Production lead' },
    ],
    poster: publicAsset('posters/cash-city.jpg'),
    clipSrc: clipAsset('cash-city.mp4'),
    detail: {
      background: {
        zh: '微电影《现金之城》需要把故事张力压进十分钟内，同时保留叙事完整度',
        en: 'Short film Cash City — tension in 10 minutes without losing story',
      },
      role: {
        zh: '协调现场近十人的工作沟通，打通剧本/拍摄/后期的创作全流程。达芬奇创作',
        en: 'Led ~10-person crew across script / shoot / post. Edited in DaVinci',
      },
    },
  },
  {
    id: 'site-01',
    title: {
      zh: '用 AI 搭出专业网站',
      en: 'Building a pro site with AI',
    },
    summary: {
      zh: '将 AI 融入工作流，用英文短片介绍从零到一搭建网站的全流程',
      en: 'AI in the workflow — English short on building a site from zero',
    },
    category: categories.aiCreation,
    categoryTone: 'slate',
    duration: '6min',
    roles: [
      { zh: 'AI 工作流', en: 'AI workflow' },
      { zh: '英文创作', en: 'English scripting' },
      { zh: '网站设计', en: 'Web design' },
    ],
    poster: publicAsset('posters/site-iteration.jpg'),
    clipSrc: clipAsset('site-iteration.mp4'),
    detail: {
      background: {
        zh: '把网站开发迭代过程做成简洁的纪录短片，需要在不堆术语的前提下讲清楚设计决策',
        en: 'A clean doc of site iteration — design decisions without jargon overload',
      },
      role: {
        zh: '全英文讲解\n达芬奇创作',
        en: 'Full English narration\nEdited in DaVinci',
      },
    },
  },
  {
    id: 'finance-01',
    title: {
      zh: '港深通勤适合哪些人？',
      en: 'Who fits HK–SZ commuting?',
    },
    summary: {
      zh: '服务小红书万粉财经博主，完成选题策划与口播剪辑',
      en: 'For a 10k+ Xiaohongshu finance creator — topic planning & talk-cut',
    },
    category: categories.financeTalk,
    categoryTone: 'coral',
    duration: '2min',
    roles: [
      { zh: '口播剪辑', en: 'Talk-cut edit' },
      { zh: '财经知识', en: 'Finance literacy' },
      { zh: '人设包装', en: 'Persona packaging' },
    ],
    poster: publicAsset('posters/finance-01.jpg'),
    posterAspect: 'portrait',
    clipSrc: clipAsset('finance-01.mp4'),
    detail: {
      background: {
        zh: '财经生活账号需要稳定的人设与短平快的节奏，在短时间内抓住眼球传达信息',
        en: 'Finance-lifestyle account — steady persona, short pace, fast info delivery',
      },
      role: {
        zh: '用花字，音效，动画丰富视觉传达\n剪映创作',
        en: 'Captions, SFX, motion for clearer delivery\nEdited in CapCut',
      },
    },
  },
  {
    id: 'finance-02',
    title: {
      zh: '港硕一年，省下六万块的方法',
      en: 'To save $60K in an HK master year',
    },
    summary: {
      zh: '服务小红书万粉财经博主，完成选题策划与口播剪辑',
      en: 'For a 10k+ Xiaohongshu finance creator — topic planning & talk-cut',
    },
    category: categories.financeTalk,
    categoryTone: 'coral',
    duration: '2min',
    roles: [
      { zh: '口播剪辑', en: 'Talk-cut edit' },
      { zh: '财经知识', en: 'Finance literacy' },
      { zh: '人设包装', en: 'Persona packaging' },
    ],
    poster: publicAsset('posters/finance-02.jpg'),
    posterAspect: 'portrait',
    clipSrc: clipAsset('finance-02.mp4'),
    detail: {
      background: {
        zh: '财经生活账号需要稳定的人设与短平快的节奏，在短时间内抓住眼球传达信息',
        en: 'Finance-lifestyle account — steady persona, short pace, fast info delivery',
      },
      role: {
        zh: '用花字，音效，动画丰富视觉传达\n剪映创作',
        en: 'Captions, SFX, motion for clearer delivery\nEdited in CapCut',
      },
    },
  },
]

export const categoryColors: Record<Work['categoryTone'], string> = {
  coral: '#E8442E',
  slate: '#5B6B7A',
  olive: '#6B7A4A',
}
