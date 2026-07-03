#!/usr/bin/env python3
"""Validate normalized AgentCounsel Hub case records."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

REQUIRED_EXPORT_FIELDS = ["generatedAt", "source", "records"]

REQUIRED_CASE_FIELDS = [
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
    "retrievedAt",
    "rawSourceId",
]

ALLOWED_TREATMENTS = {
    "cited",
    "followed",
    "distinguished",
    "criticized",
    "questioned",
    "overruled",
    "superseded",
    "unknown",
}

ALLOWED_REVIEW_STATUSES = {"source", "ai_unreviewed", "human_reviewed"}

LIST_FIELDS = [
    "citations",
    "judges",
    "topics",
    "citedCaseIds",
    "citedByCaseIds",
    "treatmentSignals",
    "aiGeneratedFields",
]


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_schema_contract(path: Path) -> None:
    schema = load_json(path)
    required_export = schema.get("required", [])
    required_case = schema.get("properties", {}).get("records", {}).get("items", {}).get("required", [])

    missing_export = sorted(set(REQUIRED_EXPORT_FIELDS) - set(required_export))
    if missing_export:
        raise ValueError(f"Schema is missing export fields used by validator: {', '.join(missing_export)}")

    missing_case = sorted(set(REQUIRED_CASE_FIELDS) - set(required_case))
    if missing_case:
        raise ValueError(f"Schema is missing case fields used by validator: {', '.join(missing_case)}")


def assert_url(value: str, field_name: str, case_id: str) -> None:
    parsed = urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(f"{case_id}: {field_name} must be an absolute HTTP(S) URL: {value}")


def assert_string_list(case: dict[str, Any], field: str) -> None:
    value = case[field]
    if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
        raise ValueError(f"{case['id']}: {field} must be a list of strings.")


def validate_treatment_signal(case_id: str, signal: dict[str, Any]) -> None:
    required = ["citingCaseId", "citedCaseId", "treatment", "confidence", "reviewStatus"]
    missing = [field for field in required if field not in signal or signal[field] is None]
    if missing:
        raise ValueError(f"{case_id}: treatment signal is missing fields: {', '.join(missing)}")

    if signal["treatment"] not in ALLOWED_TREATMENTS:
        raise ValueError(f"{case_id}: unsupported treatment value: {signal['treatment']}")

    if signal["reviewStatus"] not in ALLOWED_REVIEW_STATUSES:
        raise ValueError(f"{case_id}: unsupported reviewStatus value: {signal['reviewStatus']}")

    confidence = signal["confidence"]
    if not isinstance(confidence, (int, float)) or confidence < 0 or confidence > 1:
        raise ValueError(f"{case_id}: treatment signal confidence must be a number from 0 to 1.")


def validate_case(case: dict[str, Any]) -> None:
    missing = [field for field in REQUIRED_CASE_FIELDS if field not in case or case[field] is None]
    if missing:
        raise ValueError(f"Case record is missing required fields: {', '.join(missing)}")

    case_id = str(case["id"])

    for field in LIST_FIELDS:
        if field == "treatmentSignals":
            if not isinstance(case[field], list):
                raise ValueError(f"{case_id}: treatmentSignals must be a list.")
            for signal in case[field]:
                if not isinstance(signal, dict):
                    raise ValueError(f"{case_id}: treatmentSignals entries must be objects.")
                validate_treatment_signal(case_id, signal)
        else:
            assert_string_list(case, field)

    if not isinstance(case["attorneyReviewed"], bool):
        raise ValueError(f"{case_id}: attorneyReviewed must be boolean.")

    assert_url(str(case["sourceUrl"]), "sourceUrl", case_id)


def validate_payload(payload: dict[str, Any]) -> None:
    missing = [field for field in REQUIRED_EXPORT_FIELDS if field not in payload or payload[field] is None]
    if missing:
        raise ValueError(f"Case export is missing required fields: {', '.join(missing)}")

    records = payload["records"]
    if not isinstance(records, list):
        raise ValueError("Case export records must be a list.")

    seen_ids: set[str] = set()
    seen_slugs: set[str] = set()

    for case in records:
        if not isinstance(case, dict):
            raise ValueError("Each case record must be an object.")

        validate_case(case)
        case_id = str(case["id"])
        slug = str(case["slug"])

        if case_id in seen_ids:
            raise ValueError(f"Duplicate case id: {case_id}")

        if slug in seen_slugs:
            raise ValueError(f"Duplicate case slug: {slug}")

        seen_ids.add(case_id)
        seen_slugs.add(slug)


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate normalized case records.")
    parser.add_argument("--input", required=True, type=Path, help="Path to normalized case record export.")
    parser.add_argument("--schema", type=Path, help="Optional JSON schema file to cross-check against validator constants.")
    args = parser.parse_args()

    if args.schema:
        validate_schema_contract(args.schema)

    payload = load_json(args.input)
    if not isinstance(payload, dict):
        raise ValueError("Normalized case export must be a JSON object.")

    validate_payload(payload)
    print(f"Validated {len(payload['records'])} normalized case records from {args.input}")


if __name__ == "__main__":
    main()
