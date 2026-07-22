-- B站运营追踪 · 轻量星型模型（SQLite / DuckDB / PostgreSQL 通用写法）

CREATE TABLE IF NOT EXISTS dim_video (
  bvid           TEXT PRIMARY KEY,
  title          TEXT NOT NULL,
  category       TEXT NOT NULL,
  pubdate        DATE NOT NULL,
  duration_sec   INTEGER NOT NULL,
  account_mid    BIGINT NOT NULL,
  account_name   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fact_video_daily (
  snapshot_date  DATE NOT NULL,
  bvid           TEXT NOT NULL REFERENCES dim_video (bvid),
  views          INTEGER NOT NULL,
  likes          INTEGER NOT NULL,
  favorites      INTEGER NOT NULL,
  coins          INTEGER NOT NULL,
  shares         INTEGER NOT NULL,
  replies        INTEGER NOT NULL,
  danmaku        INTEGER NOT NULL,
  avg_watch_sec  REAL,          -- 私域：创作中心
  completion_rate REAL,         -- 私域：创作中心
  fan_delta      INTEGER,       -- 私域：创作中心
  PRIMARY KEY (snapshot_date, bvid)
);

-- 样本种子（公开接口 2026-07-22）
INSERT INTO dim_video (bvid, title, category, pubdate, duration_sec, account_mid, account_name)
VALUES (
  'BV1sVAKzUEy9',
  '【挽救计划】披着太空冒险外皮的童话故事，无剧透简评高司令新片',
  '电影前瞻',
  '2026-03-22',
  322,
  505201963,
  '不是电影乐队'
)
ON CONFLICT (bvid) DO NOTHING;

INSERT INTO fact_video_daily (
  snapshot_date, bvid, views, likes, favorites, coins, shares, replies, danmaku
) VALUES (
  '2026-07-22', 'BV1sVAKzUEy9', 3375, 1358, 182, 22, 15, 26, 18
)
ON CONFLICT (snapshot_date, bvid) DO UPDATE SET
  views = EXCLUDED.views,
  likes = EXCLUDED.likes,
  favorites = EXCLUDED.favorites,
  coins = EXCLUDED.coins,
  shares = EXCLUDED.shares,
  replies = EXCLUDED.replies,
  danmaku = EXCLUDED.danmaku;
