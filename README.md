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
- Source registry list, detail pages, schema, and static-safe API leaves
- Local saved folders using IndexedDB
- Local submission, review queue, review history, and source proposal workflow
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
/cases/schema
/api/cases/miranda-v-arizona/markdown
/api/cases/schema
/guidance
/guidance/schema
/api/guidance/schema
/sources
/sources/courtlistener
/sources/schema
/api/sources/courtlistener
/api/sources/schema
/review
/review/audit
/review/proposals
/saved
/submit
/llms.txt
```

## GitHub Pages deployment

The app is configured for static export and GitHub Pages deployment.

```bash
pnpm build:pages
```

GitHub Actions deploys `apps/web/out` to Pages on every push to `main` through `.github/workflows/deploy-pages.yml`.

Expected public URL:

```txt
https://zgbrenner.github.io/agentcounselhub/
```

Because GitHub Pages is static hosting, routes are generated at build time from the seed data and local JSON contracts. Route-handler paths are kept as leaf routes to avoid file/directory collisions during static export.

## Ingestion scaffold

The first ingestion scaffold lives in `pipelines/ingest`.

It currently normalizes local CourtListener-shaped sample data into the AgentCounsel case record shape. It does not call live APIs yet.

```bash
pnpm ingest:seed
pnpm cases:validate
```

Approved local review items can be exported from `/review/proposals` as candidate source records. To validate and merge the sample proposal export into a proposed registry file:

```bash
pnpm sources:propose
```

The command writes `data/sources/legal-data-sources.proposed.json` for review.

The data source registry lives at:

```txt
data/sources/legal-data-sources.json
```

The registry schema and field guide live at:

```txt
data/sources/legal-data-sources.schema.json
docs/SOURCE_REGISTRY_CONTRACT.md
/sources/schema
/api/sources/schema
```

The normalized case schema and field guide live at:

```txt
data/cases/case-record.schema.json
docs/CASE_RECORD_CONTRACT.md
/cases/schema
/api/cases/schema
```

The guidance resource schema and field guide live at:

```txt
data/guidance/guidance-resource.schema.json
docs/GUIDANCE_RESOURCE_CONTRACT.md
/guidance/schema
/api/guidance/schema
```

Validate the source registry and schema with:

```bash
pnpm sources:validate
```

## CI

GitHub Actions validates:

- web app typecheck
- web app lint
- web app build
- GitHub Pages static export
- source registry and schema validation
- ingestion script compilation
- ingestion normalization smoke test
- normalized case record validation
- web seed writer smoke test
- source proposal import smoke test

## Repository map

```txt
/apps/web                Next.js prototype app
/apps/web/data/generated Generated app-ready seed output location
/data/cases              Machine-readable case record schema
/data/guidance           Machine-readable guidance resource schema
/data/sources            Machine-readable legal source registry and schema
/data/normalized         Generated normalized data output location
/docs                    Product, architecture, data source, AI-readable, licensing, and contract notes
/pipelines/ingest        Data ingestion scaffolding
CONTRIBUTING.md          Contribution guidelines
```

## Important disclaimer

This project is for legal research infrastructure and public legal information. It is not legal advice, does not create an attorney-client relationship, and should not present AI-generated summaries or treatment signals as authoritative without appropriate review and source verification.
