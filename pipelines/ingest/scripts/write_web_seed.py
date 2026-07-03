#!/usr/bin/env python3
"""Convert normalized AgentCounsel case JSON into web-app seed JSON.

Input shape is the payload produced by normalize_courtlistener_seed.py:

{
  "generatedAt": "...",
  "source": "...",
  "records": [ ... normalized case records ... ]
}

Output shape is a plain JSON list that the web app can import later.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def load_normalized(input_path: Path) -> list[dict[str, Any]]:
    with input_path.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)

    records = payload.get("records") if isinstance(payload, dict) else payload

    if not isinstance(records, list):
        raise ValueError("Expected normalized input to contain a records list or be a list.")

    return records


def clean_record(record: dict[str, Any]) -> dict[str, Any]:
    allowed_keys = [
        "id",
        "slug",
        "name",
        "citations",
        "court",
        "jurisdiction",
        "dateDecided",
        "judges",
        "proceduralPosture",
        "topics",
        "summary",
        "holding",
        "sourceUrl",
        "sourceName",
        "licenseNote",
        "citedCaseIds",
        "citedByCaseIds",
        "treatmentSignals",
        "aiGeneratedFields",
        "attorneyReviewed",
    ]
    return {key: record.get(key) for key in allowed_keys}


def write_web_seed(output_path: Path, records: list[dict[str, Any]]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as handle:
        json.dump([clean_record(record) for record in records], handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Write web-app case seed JSON from normalized cases.")
    parser.add_argument("--input", required=True, type=Path, help="Path to normalized cases JSON.")
    parser.add_argument("--output", required=True, type=Path, help="Path to web seed JSON.")
    args = parser.parse_args()

    records = load_normalized(args.input)
    write_web_seed(args.output, records)
    print(f"Wrote {len(records)} web seed records to {args.output}")


if __name__ == "__main__":
    main()
