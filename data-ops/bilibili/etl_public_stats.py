"""Fetch public Bilibili stats and write CSV for Excel / Power BI refresh."""

from __future__ import annotations

import csv
import json
import urllib.request
from datetime import date
from pathlib import Path

BVID = "BV1sVAKzUEy9"
OUT_DIR = Path(__file__).resolve().parent
UA = "Mozilla/5.0 (compatible; portfolio-ops-etl/1.0)"


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.bilibili.com"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> None:
    view = fetch_json(f"https://api.bilibili.com/x/web-interface/view?bvid={BVID}")
    if view.get("code") != 0:
        raise RuntimeError(view)

    data = view["data"]
    stat = data["stat"]
    owner = data["owner"]
    card = fetch_json(f"https://api.bilibili.com/x/web-interface/card?mid={owner['mid']}")
    fans = card.get("data", {}).get("card", {}).get("fans")
    archive_count = card.get("data", {}).get("archive_count")

    row = {
        "snapshot_date": date.today().isoformat(),
        "bvid": data["bvid"],
        "title": data["title"],
        "mid": owner["mid"],
        "up_name": owner["name"],
        "fans": fans,
        "archive_count": archive_count,
        "pubdate_unix": data["pubdate"],
        "duration_sec": data["duration"],
        "views": stat["view"],
        "likes": stat["like"],
        "favorites": stat["favorite"],
        "coins": stat["coin"],
        "shares": stat["share"],
        "replies": stat["reply"],
        "danmaku": stat["danmaku"],
        "like_rate": round(stat["like"] / stat["view"], 4) if stat["view"] else None,
        "interaction_rate": round(
            (stat["like"] + stat["favorite"] + stat["coin"] + stat["share"] + stat["reply"] + stat["danmaku"])
            / stat["view"],
            4,
        )
        if stat["view"]
        else None,
    }

    json_path = OUT_DIR / "public_stats_snapshot.json"
    csv_path = OUT_DIR / "public_stats_snapshot.csv"
    json_path.write_text(json.dumps(row, ensure_ascii=False, indent=2), encoding="utf-8")

    with csv_path.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(row.keys()))
        writer.writeheader()
        writer.writerow(row)

    print(json.dumps(row, ensure_ascii=False, indent=2))
    print(f"wrote {json_path}")
    print(f"wrote {csv_path}")


if __name__ == "__main__":
    main()
