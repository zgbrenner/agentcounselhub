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

## Local prototype command

```bash
python pipelines/ingest/scripts/normalize_courtlistener_seed.py \
  --input pipelines/ingest/samples/courtlistener_opinions_sample.json \
  --output data/normalized/cases.seed.json
```

The current script normalizes local sample data only. It does not call live APIs yet.
