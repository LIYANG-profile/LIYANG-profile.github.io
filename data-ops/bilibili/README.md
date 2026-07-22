# B站运营追踪（作品集配套）

网站「数据运营能力」区块的数据与方法佐证。

| 文件 | 用途 |
|------|------|
| `bilibili-ops-tracker.xlsx` | Excel 复盘簿（同步到 `portfolio/public/downloads/`） |
| `etl_public_stats.py` | Python 拉取公开接口 → CSV/JSON |
| `schema.sql` / `queries.sql` | 表结构与复盘查询 |
| `powerbi_model.md` | Power BI 模型与 DAX |

```bash
python etl_public_stats.py
python build_workbook.py
```
