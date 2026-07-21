export type WorkCategory =
  | '电影前瞻'
  | '微电影'
  | '财经口播'
  | 'AI 创作'

export type Work = {
  id: string
  title: string
  summary: string
  category: WorkCategory
  categoryTone: 'coral' | 'slate' | 'olive'
  duration: string
  roles: string[]
  tools: string[]
  poster: string
  /** 竖版封面用 contain，避免在横版画幅里被 object-cover 裁切放大 */
  posterAspect?: 'portrait' | 'landscape'
  /** 空字符串表示尚未提供片段；有路径时才挂载 <video> */
  clipSrc: string
  fullUrl?: string
  detail: {
    background: string
    role: string
    tools: string
    result: string
  }
}

const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** 视频托管在 Cloudflare R2（GitHub 仓库只存代码与封面图） */
const CLIPS_BASE = 'https://pub-e48389af07104ceeb1657d1dc396ab94.r2.dev'

const clipAsset = (filename: string) => `${CLIPS_BASE}/${filename}`

export const works: Work[] = [
  {
    id: 'script-01',
    title: '【挽救计划】披着冒险外衣的童话故事',
    summary:
      '敏锐捕捉电影市场热点并落地选题，独立完成策划剪辑配音；平台播放 5000+、点赞 1300+',
    category: '电影前瞻',
    categoryTone: 'olive',
    duration: '5min',
    roles: ['海外素材检索', '翻译', '配音'],
    tools: ['分镜表', '手机稳定器', '剪映'],
    poster: publicAsset('posters/space-fairytale.jpg'),
    clipSrc: clipAsset('space-fairytale.mp4'),
    detail: {
      background: '围绕《挽救计划》做影评短片，于 IMDB、Youtubue、Instagram 检索素材',
      role: 'AI 自动化素材检索与下载，大幅提升效率\n达芬奇创作',
      tools: '分镜表 + 现场稳定器拍摄；剪映完成节奏剪辑与字幕包装。',
      result: '完成可发布的影评正片，形成「钩子—论据—收束」的可复用结构。',
    },
  },
  {
    id: 'preview-01',
    title: '【痴迷】无剧透简评黑马恐怖片',
    summary:
      '内地公映前于海外社媒捕捉高热讨论，快速完成影评口播与成片，播放 2000+',
    category: '电影前瞻',
    categoryTone: 'olive',
    duration: '4min',
    roles: ['海外素材检索', '翻译', '配音'],
    tools: ['剪映', 'DaVinci Resolve'],
    poster: publicAsset('posters/chi-mi.jpg'),
    clipSrc: clipAsset('chi-mi.mp4'),
    detail: {
      background: '面向内地影视爱好者的影评内容，需要在开场快速传递看点与情绪',
      role: '确定并统一栏目视觉语言\n达芬奇创作',
      tools: '剪映快速拼剪 + DaVinci 调色与导出。',
      result: '沉淀可复制的影评节奏模板，强化前几秒钩子与信息分层。',
    },
  },
  {
    id: 'film-01',
    title: '现金之城',
    summary:
      '作为导演统筹剧本、拍摄与后期，在有限高压时间内协调演员完成影片',
    category: '微电影',
    categoryTone: 'slate',
    duration: '10min',
    roles: ['剧本创作', '摄影指导', '现场导演', '统筹协调'],
    tools: ['剪映', 'DaVinci Resolve'],
    poster: publicAsset('posters/cash-city.jpg'),
    clipSrc: clipAsset('cash-city.mp4'),
    detail: {
      background: '微电影《现金之城》需要把故事张力压进十分钟内，同时保留叙事完整度',
      role: '协调现场近十人的工作沟通，打通剧本/拍摄/后期的创作全流程。达芬奇创作',
      tools: '剪映多轨 + DaVinci 音频整理与调色。',
      result: '完成可传播的微电影成片，沉淀「钩子—推进—收束」的叙事剪辑路径。',
    },
  },
  {
    id: 'site-01',
    title: '用 AI 搭出专业网站',
    summary:
      '将 AI 融入工作流，用英文短片介绍从零到一搭建网站的全流程',
    category: 'AI 创作',
    categoryTone: 'slate',
    duration: '6min',
    roles: ['AI 工作流', '英文创作', '网站设计'],
    tools: ['剪映', 'Figma'],
    poster: publicAsset('posters/site-iteration.jpg'),
    clipSrc: clipAsset('site-iteration.mp4'),
    detail: {
      background: '把网站开发迭代过程做成简洁的纪录短片，需要在不堆术语的前提下讲清楚设计决策',
      role: '全英文讲解\n达芬奇创作',
      tools: 'Figma 界面素材 + 剪映成片剪辑与字幕包装。',
      result: '形成可对外展示的网站迭代纪录正片，便于作品集与项目复盘使用。',
    },
  },
  {
    id: 'finance-01',
    title: '港深通勤适合哪些人？',
    summary:
      '服务小红书万粉财经博主，完成选题策划与口播剪辑',
    category: '财经口播',
    categoryTone: 'coral',
    duration: '2min',
    roles: ['口播剪辑', '财经知识', '人设包装'],
    tools: ['剪映', 'Excel'],
    poster: publicAsset('posters/finance-01.jpg'),
    posterAspect: 'portrait',
    clipSrc: clipAsset('finance-01.mp4'),
    detail: {
      background: '财经生活账号需要稳定的人设与短平快的节奏，在短时间内抓住眼球传达信息',
      role: '用花字，音效，动画丰富视觉传达\n剪映创作',
      tools: '剪映口播模板；Excel 整理本期数据点与话术提纲。',
      result: '完成可发布的财经口播正片，强化「听得懂、记得住」的表达节奏。',
    },
  },
  {
    id: 'finance-02',
    title: '港硕一年，省下六万块的方法',
    summary:
      '服务小红书万粉财经博主，完成选题策划与口播剪辑',
    category: '财经口播',
    categoryTone: 'coral',
    duration: '2min',
    roles: ['口播剪辑', '财经知识', '人设包装'],
    tools: ['剪映', 'Excel'],
    poster: publicAsset('posters/finance-02.jpg'),
    posterAspect: 'portrait',
    clipSrc: clipAsset('finance-02.mp4'),
    detail: {
      background: '财经生活账号需要稳定的人设与短平快的节奏，在短时间内抓住眼球传达信息',
      role: '用花字，音效，动画丰富视觉传达\n剪映创作',
      tools: 'Excel 整理要点 → 剪映合成口播与字幕。',
      result: '完成系列口播正片，沉淀「口播 + 要点字幕」双轨模板。',
    },
  },
]

export const categoryColors: Record<Work['categoryTone'], string> = {
  coral: '#E8442E',
  slate: '#5B6B7A',
  olive: '#6B7A4A',
}
