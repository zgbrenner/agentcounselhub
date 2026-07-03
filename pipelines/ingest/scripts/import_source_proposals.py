#!/usr/bin/env python3
"""Validate reviewed source proposals and merge them into a proposed source registry file.

This script is intentionally file-based. It does not mutate the live registry unless the
caller chooses the registry path as the output path.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

REQUIRED_PROPOSAL_FIELDS = [
    "id",
    "name",
    "type",
    "homepageUrl",
    "accessMethod",
    "recommendedUse",
    "priority",
    "attributionRequired",
    "notes",
]

SOURCE_DEFAULTS = {
    "canStoreFullText": "verify_source_terms",
    "canRedistribute": "verify_source_terms",
}


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def assert_url(value: str, field_name: str) -> None:
    parsed = urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(f"{field_name} must be an absolute HTTP(S) URL: {value}")


def load_proposals(path: Path) -> list[dict[str, Any]]:
    payload = load_json(path)
    proposals = payload.get("proposals") if isinstance(payload, dict) else payload

    if not isinstance(proposals, list):
        raise ValueError("Proposal input must be a list or an object with a proposals list.")

    return proposals


def validate_proposal(proposal: dict[str, Any]) -> dict[str, Any]:
    missing = [field for field in REQUIRED_PROPOSAL_FIELDS if field not in proposal or proposal[field] in (None, "")]
    if missing:
        raise ValueError(f"Proposal is missing required fields: {', '.join(missing)}")

    assert_url(str(proposal["homepageUrl"]), "homepageUrl")

    if "apiUrl" in proposal and proposal["apiUrl"]:
        assert_url(str(proposal["apiUrl"]), "apiUrl")

    source = {
        "id": slugify(str(proposal["id"])),
        "name": str(proposal["name"]),
        "type": str(proposal["type"]),
        "homepageUrl": str(proposal["homepageUrl"]),
        "accessMethod": str(proposal["accessMethod"]),
        "recommendedUse": str(proposal["recommendedUse"]),
        "priority": str(proposal["priority"]),
        "attributionRequired": bool(proposal["attributionRequired"]),
        "canStoreFullText": str(proposal.get("canStoreFullText") or SOURCE_DEFAULTS["canStoreFullText"]),
        "canRedistribute": str(proposal.get("canRedistribute") or SOURCE_DEFAULTS["canRedistribute"]),
        "notes": str(proposal["notes"]),
    }

    if proposal.get("apiUrl"):
        source["apiUrl"] = str(proposal["apiUrl"])

    return source


def merge_sources(existing_sources: list[dict[str, Any]], proposals: list[dict[str, Any]]) -> list[dict[str, Any]]:
    source_by_id = {str(source["id"]): source for source in existing_sources}
    source_homepages = {str(source.get("homepageUrl", "")).rstrip("/") for source in existing_sources}

    for proposal in proposals:
        source = validate_proposal(proposal)
        homepage_key = source["homepageUrl"].rstrip("/")

        if source["id"] in source_by_id:
            raise ValueError(f"Duplicate source id already exists: {source['id']}")

        if homepage_key in source_homepages:
            raise ValueError(f"Duplicate source homepage already exists: {source['homepageUrl']}")

        source_by_id[source["id"]] = source
        source_homepages.add(homepage_key)

    return sorted(source_by_id.values(), key=lambda source: str(source["id"]))


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate and merge source proposals into a proposed registry file.")
    parser.add_argument("--registry", required=True, type=Path, help="Existing legal-data-sources.json path.")
    parser.add_argument("--proposals", required=True, type=Path, help="Source proposal export JSON path.")
    parser.add_argument("--output", required=True, type=Path, help="Output path for proposed merged source registry.")
    args = parser.parse_args()

    existing_sources = load_json(args.registry)
    if not isinstance(existing_sources, list):
        raise ValueError("Source registry must be a list.")

    proposals = load_proposals(args.proposals)
    merged = merge_sources(existing_sources, proposals)
    write_json(args.output, merged)
    print(f"Merged {len(proposals)} proposals into {args.output}; total sources: {len(merged)}")


if __name__ == "__main__":
    main()
