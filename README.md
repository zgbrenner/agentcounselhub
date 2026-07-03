# AgentCounsel Hub

AgentCounsel Hub is an open-source legal research platform concept: a free, AI-readable, community-curated layer over open legal data.

The goal is to build a practical alternative to closed legal research systems by combining open case law, structured metadata, citation graphs, practical guidance indexes, and AI-friendly public endpoints.

## Core principle

**The law stays free.**

The open platform should remain usable without an account and without proprietary lock-in. Commercial features, if added later, should focus on hosting, support, collaboration, cloud sync, enterprise deployment, private workspaces, attorney-reviewed premium layers, and advanced analytics.

## MVP focus

The first version should not try to replace Westlaw, Lexis, Bloomberg Law, Practical Law, or Lexis Practical Guidance all at once.

Instead, the first release should prove that open legal data can become more usable, structured, searchable, and machine-readable.

Initial MVP features:

1. Case search across one or two strong open legal data sources.
2. Clean case pages with stable URLs.
3. Citation generator.
4. Basic `cites` and `cited by` relationships.
5. Basic topic tagging.
6. Local saved folders using browser storage.
7. Practical guidance index that links to free public materials.
8. AI-readable Markdown and JSON endpoints.
9. Submission form for cases, guidance links, templates, corrections, and updates.
10. Clear open-source documentation and contribution guidelines.

## Prototype app

The first working scaffold lives in `apps/web`.

Current prototype includes:

- Next.js / React / TypeScript app shell
- Seed case-law records
- Search and filtering by keyword, court, jurisdiction, and topic
- Case detail pages
- Basic citation generator
- Basic `cites` and `cited by` relationship display
- Experimental treatment-signal display with confidence/review metadata
- JSON and Markdown case endpoints
- Practical guidance index
- Source registry list, detail pages, and API
- Local saved folders using IndexedDB
- Local submission and review queue workflow
- `llms.txt`

## Running locally

```bash
pnpm install
pnpm dev
```

Then open the web app at:

```txt
http://localhost:3000
```

Useful routes:

```txt
/cases
/cases/miranda-v-arizona
/cases/miranda-v-arizona/json
/cases/miranda-v-arizona/markdown
/api/cases
/api/cases/miranda-v-arizona
/api/cases/miranda-v-arizona/markdown
/guidance
/sources
/sources/courtlistener
/api/sources
/api/sources/courtlistener
/review
/saved
/submit
/llms.txt
```

## Ingestion scaffold

The first ingestion scaffold lives in `pipelines/ingest`.

It currently normalizes local CourtListener-shaped sample data into the AgentCounsel case record shape. It does not call live APIs yet.

```bash
pnpm ingest:seed
```

That command runs:

```bash
python pipelines/ingest/scripts/normalize_courtlistener_seed.py \
  --input pipelines/ingest/samples/courtlistener_opinions_sample.json \
  --output data/normalized/cases.seed.json

python pipelines/ingest/scripts/write_web_seed.py \
  --input data/normalized/cases.seed.json \
  --output apps/web/data/generated/cases.generated.json
```

The data source registry lives at:

```txt
data/sources/legal-data-sources.json
```

## CI

GitHub Actions validates:

- web app typecheck
- web app lint
- web app build
- ingestion script compilation
- ingestion normalization smoke test
- web seed writer smoke test

## Repository map

```txt
/apps/web                Next.js prototype app
/apps/web/data/generated Generated app-ready seed output location
/data/sources            Machine-readable legal source registry
/data/normalized         Generated normalized data output location
/docs                    Product, architecture, data source, AI-readable, and licensing notes
/pipelines/ingest        Data ingestion scaffolding
CONTRIBUTING.md          Contribution guidelines
```

## Important disclaimer

This project is for legal research infrastructure and public legal information. It is not legal advice, does not create an attorney-client relationship, and should not present AI-generated summaries or treatment signals as authoritative without appropriate review and source verification.
