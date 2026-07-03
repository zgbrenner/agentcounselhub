# Ingestion Pipelines

This directory contains the first scaffolding for turning open legal data sources into normalized AgentCounsel Hub records.

The ingestion layer should be conservative by default:

1. Prefer official APIs, bulk datasets, RSS feeds, and public downloads over scraping.
2. Preserve source URLs, retrieval timestamps, and license/reuse notes.
3. Store raw source records separately from normalized records.
4. Do not redistribute full text unless source terms clearly allow it.
5. Mark AI-generated metadata and treatment signals as unreviewed unless reviewed.

## Initial pipeline target

The first real adapter should target CourtListener / Free Law Project metadata and opinions because it is the strongest starting point for open legal research data.

## Local case seed command

```bash
python pipelines/ingest/scripts/normalize_courtlistener_seed.py \
  --input pipelines/ingest/samples/courtlistener_opinions_sample.json \
  --output data/normalized/cases.seed.json
```

The current script normalizes local sample data only. It does not call live APIs yet.

## Source registry validation

Validate the current source registry before and after source changes:

```bash
python pipelines/ingest/scripts/validate_source_registry.py \
  --registry data/sources/legal-data-sources.json
```

The validator checks required fields, HTTP(S) URLs, supported source types, duplicate source IDs, duplicate homepages, and reuse-field value types.

## Source proposal import

Approved review items can be exported from `/review/proposals` as candidate source records. The importer validates that proposal file and writes a proposed source registry output.

```bash
python pipelines/ingest/scripts/import_source_proposals.py \
  --registry data/sources/legal-data-sources.json \
  --proposals pipelines/ingest/samples/source_proposals_sample.json \
  --output data/sources/legal-data-sources.proposed.json
```

The importer rejects duplicate source IDs and duplicate homepages so contributors can review proposed registry changes before committing them.
