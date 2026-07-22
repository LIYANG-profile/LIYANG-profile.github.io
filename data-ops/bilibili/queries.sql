-- 1) 单稿 KPI：点赞率 / 互动率
SELECT
  d.bvid,
  v.title,
  v.category,
  d.views,
  d.likes,
  ROUND(1.0 * d.likes / NULLIF(d.views, 0), 4) AS like_rate,
  ROUND(
    1.0 * (d.likes + d.favorites + d.coins + d.shares + d.replies + d.danmaku)
      / NULLIF(d.views, 0),
    4
  ) AS interaction_rate
FROM fact_video_daily d
JOIN dim_video v ON v.bvid = d.bvid
WHERE d.snapshot_date = (SELECT MAX(snapshot_date) FROM fact_video_daily);

-- 2) 题材对照：按 category 汇总
SELECT
  v.category,
  COUNT(*) AS video_count,
  SUM(d.views) AS views,
  ROUND(AVG(1.0 * d.likes / NULLIF(d.views, 0)), 4) AS avg_like_rate
FROM fact_video_daily d
JOIN dim_video v ON v.bvid = d.bvid
WHERE d.snapshot_date = (SELECT MAX(snapshot_date) FROM fact_video_daily)
GROUP BY v.category
ORDER BY views DESC;

-- 3) 互动构成（用于条形图）
SELECT metric, value
FROM (
  SELECT '点赞' AS metric, likes AS value FROM fact_video_daily WHERE bvid = 'BV1sVAKzUEy9'
  UNION ALL SELECT '收藏', favorites FROM fact_video_daily WHERE bvid = 'BV1sVAKzUEy9'
  UNION ALL SELECT '评论', replies FROM fact_video_daily WHERE bvid = 'BV1sVAKzUEy9'
  UNION ALL SELECT '投币', coins FROM fact_video_daily WHERE bvid = 'BV1sVAKzUEy9'
  UNION ALL SELECT '弹幕', danmaku FROM fact_video_daily WHERE bvid = 'BV1sVAKzUEy9'
  UNION ALL SELECT '分享', shares FROM fact_video_daily WHERE bvid = 'BV1sVAKzUEy9'
) t
ORDER BY value DESC;

-- 4) 异常信号：高共鸣但低投币（阈值阈值可按账号基线调整）
SELECT
  v.title,
  ROUND(1.0 * d.likes / NULLIF(d.views, 0), 4) AS like_rate,
  ROUND(1.0 * d.coins / NULLIF(d.views, 0), 4) AS coin_rate,
  CASE
    WHEN 1.0 * d.likes / NULLIF(d.views, 0) >= 0.20
     AND 1.0 * d.coins / NULLIF(d.views, 0) < 0.01
    THEN '高共鸣低转化：加强片尾 CTA'
    ELSE '观察'
  END AS action
FROM fact_video_daily d
JOIN dim_video v ON v.bvid = d.bvid
WHERE d.snapshot_date = (SELECT MAX(snapshot_date) FROM fact_video_daily);
