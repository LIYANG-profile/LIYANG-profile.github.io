# Power BI 模型说明（作品集）

## 导入

1. 获取数据 → 文本/CSV → `public_stats_snapshot.csv`（由 `etl_public_stats.py` 生成）
2. 或直接导入 `bilibili-ops-tracker.xlsx` 的 `01_原始数据` / `02_指标计算`

## 关系（星型）

- `dim_video[bvid] 1—* fact_video_daily[bvid]`
- 日期可用 `fact_video_daily[snapshot_date]` 作为日期表替代

## 核心 DAX

```dax
Views = SUM ( fact_video_daily[views] )
Likes = SUM ( fact_video_daily[likes] )
Like Rate = DIVIDE ( [Likes], [Views] )
Interaction =
  SUM ( fact_video_daily[likes] )
  + SUM ( fact_video_daily[favorites] )
  + SUM ( fact_video_daily[coins] )
  + SUM ( fact_video_daily[shares] )
  + SUM ( fact_video_daily[replies] )
  + SUM ( fact_video_daily[danmaku] )
Interaction Rate = DIVIDE ( [Interaction], [Views] )
```

## 建议三页看板

1. **总览**：Views / Like Rate / Interaction Rate 卡片 + 账号粉/稿数
2. **单稿复盘**：互动构成条形图 + 结论文本框（高共鸣低转化）
3. **题材矩阵**：category 表 + avg like rate

视觉建议：浅底、少量强调色（对应站点橘红 `#E8442E`），避免默认紫渐变主题。
