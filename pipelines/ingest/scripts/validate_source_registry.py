#!/usr/bin/env python3
"""Validate the AgentCounsel Hub source registry."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

REQUIRED_FIELDS = [
    "id",
    "name",
    "type",
    "homepageUrl",
    "accessMethod",
    "recommendedUse",
    "priority",
    "attributionRequired",
    "canStoreFullText",
    "canRedistribute",
    "notes",
]

ALLOWED_SOURCE_TYPES = {
    "case_law",
    "guidance",
    "templates",
    "forms",
    "agency",
    "court",
    "bar",
    "other",
}


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def load_registry(path: Path) -> list[dict[str, Any]]:
    payload = load_json(path)

    if not isinstance(payload, list):
        raise ValueError("Source registry must be a JSON list.")

    return payload


def validate_schema_contract(path: Path) -> None:
    schema = load_json(path)
    required = schema.get("items", {}).get("required", [])
    type_enum = schema.get("items", {}).get("properties", {}).get("type", {}).get("enum", [])

    missing_required = sorted(set(REQUIRED_FIELDS) - set(required))
    if missing_required:
        raise ValueError(f"Schema is missing required fields used by validator: {', '.join(missing_required)}")

    missing_types = sorted(ALLOWED_SOURCE_TYPES - set(type_enum))
    if missing_types:
        raise ValueError(f"Schema is missing source types used by validator: {', '.join(missing_types)}")


def assert_url(value: str, field_name: str, source_id: str) -> None:
    parsed = urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(f"{source_id}: {field_name} must be an absolute HTTP(S) URL: {value}")


def validate_source(source: dict[str, Any]) -> None:
    source_id = str(source.get("id", "<missing id>"))
    missing = [field for field in REQUIRED_FIELDS if field not in source or source[field] in (None, "")]
    if missing:
        raise ValueError(f"{source_id}: missing required fields: {', '.join(missing)}")

    if source["type"] not in ALLOWED_SOURCE_TYPES:
        raise ValueError(f"{source_id}: unsupported source type: {source['type']}")

    if not isinstance(source["attributionRequired"], bool):
        raise ValueError(f"{source_id}: attributionRequired must be boolean.")

    for field in ["canStoreFullText", "canRedistribute"]:
        if not isinstance(source[field], (bool, str)):
            raise ValueError(f"{source_id}: {field} must be boolean or string note.")

    assert_url(str(source["homepageUrl"]), "homepageUrl", source_id)

    if source.get("apiUrl"):
        assert_url(str(source["apiUrl"]), "apiUrl", source_id)


def validate_registry(sources: list[dict[str, Any]]) -> None:
    seen_ids: set[str] = set()
    seen_homepages: set[str] = set()

    for source in sources:
        validate_source(source)
        source_id = str(source["id"])
        homepage = str(source["homepageUrl"]).rstrip("/")

        if source_id in seen_ids:
            raise ValueError(f"Duplicate source id: {source_id}")

        if homepage in seen_homepages:
            raise ValueError(f"Duplicate homepageUrl: {source['homepageUrl']}")

        seen_ids.add(source_id)
        seen_homepages.add(homepage)


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate legal-data-sources.json.")
    parser.add_argument("--registry", required=True, type=Path, help="Path to legal-data-sources.json.")
    parser.add_argument("--schema", type=Path, help="Optional JSON schema file to cross-check against validator constants.")
    args = parser.parse_args()

    if args.schema:
        validate_schema_contract(args.schema)

    sources = load_registry(args.registry)
    validate_registry(sources)
    print(f"Validated {len(sources)} source registry records from {args.registry}")


if __name__ == "__main__":
    main()
