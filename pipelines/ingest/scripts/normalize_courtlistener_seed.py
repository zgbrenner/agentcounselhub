#!/usr/bin/env python3
"""Normalize local CourtListener-like sample data into AgentCounsel case records.

This script intentionally works from a local JSON file first. Live API access should be
added only after source terms, attribution, rate limits, and storage rules are reviewed.
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

COURTLISTENER_BASE_URL = "https://www.courtlistener.com"


@dataclass
class NormalizedCase:
    id: str
    slug: str
    name: str
    citations: list[str]
    court: str
    jurisdiction: str
    dateDecided: str
    judges: list[str]
    proceduralPosture: str
    topics: list[str]
    summary: str
    holding: str
    sourceUrl: str
    sourceName: str
    licenseNote: str
    citedCaseIds: list[str]
    citedByCaseIds: list[str]
    treatmentSignals: list[dict[str, Any]]
    aiGeneratedFields: list[str]
    attorneyReviewed: bool
    retrievedAt: str
    rawSourceId: str


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def source_url(record: dict[str, Any]) -> str:
    if record.get("download_url"):
        return str(record["download_url"])
    if record.get("absolute_url"):
        return f"{COURTLISTENER_BASE_URL}{record['absolute_url']}"
    return COURTLISTENER_BASE_URL


def normalize_record(record: dict[str, Any]) -> NormalizedCase:
    name = str(record.get("caseNameFull") or record.get("caseName") or "Untitled case")
    raw_id = str(record.get("id") or record.get("cluster") or slugify(name))
    date_decided = str(record.get("dateFiled") or "")
    court_name = str(record.get("court_name") or record.get("court") or "Unknown court")

    return NormalizedCase(
        id=f"case_{raw_id}",
        slug=slugify(name),
        name=name,
        citations=list(record.get("citation") or []),
        court=court_name,
        jurisdiction="United States" if "Supreme Court" in court_name else "Unknown",
        dateDecided=date_decided,
        judges=[],
        proceduralPosture="Unclassified. Add extraction step after ingestion.",
        topics=[],
        summary="Unreviewed source record. Add summarization/review step after ingestion.",
        holding="Unclassified. Add holding extraction after ingestion.",
        sourceUrl=source_url(record),
        sourceName="CourtListener",
        licenseNote="Verify CourtListener / Free Law Project source terms, attribution requirements, and redistribution rules before production use.",
        citedCaseIds=[],
        citedByCaseIds=[],
        treatmentSignals=[],
        aiGeneratedFields=[],
        attorneyReviewed=False,
        retrievedAt=datetime.now(timezone.utc).isoformat(),
        rawSourceId=raw_id,
    )


def load_records(input_path: Path) -> list[dict[str, Any]]:
    with input_path.open("r", encoding="utf-8") as handle:
      data = json.load(handle)

    if not isinstance(data, list):
        raise ValueError("Expected input JSON to contain a list of records.")

    return data


def write_output(output_path: Path, normalized: list[NormalizedCase]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "courtlistener_seed_sample",
        "records": [asdict(item) for item in normalized],
    }
    with output_path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Normalize CourtListener-like sample data.")
    parser.add_argument("--input", required=True, type=Path, help="Path to input JSON list.")
    parser.add_argument("--output", required=True, type=Path, help="Path to normalized output JSON.")
    args = parser.parse_args()

    records = load_records(args.input)
    normalized = [normalize_record(record) for record in records]
    write_output(args.output, normalized)
    print(f"Normalized {len(normalized)} records to {args.output}")


if __name__ == "__main__":
    main()
