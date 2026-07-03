# Architecture Notes

## Design goals

AgentCounsel Hub should be:

- Open-source
- Self-hostable
- Usable without accounts
- Friendly to lawyers and non-technical users
- Easy for AI systems to parse
- Careful with copyrighted and licensed materials
- Built around structured legal data, not opaque AI answers

## Recommended MVP architecture

```txt
Next.js web app
  -> case search UI
  -> case pages
  -> guidance index
  -> submission form
  -> local saved research

API routes
  -> JSON case endpoint
  -> Markdown case endpoint
  -> citation graph endpoint
  -> guidance endpoint

Data layer
  -> seed JSON files for prototype
  -> Postgres later
  -> search index later

Ingestion layer
  -> Python scripts
  -> source registry
  -> normalization pipeline
  -> citation extraction
  -> license/attribution tracking
```

## Frontend

Recommended stack:

- Next.js
- React
- TypeScript
- Server components where useful
- Plain CSS modules or Tailwind
- IndexedDB for local research folders

Core frontend modules:

- Search bar
- Filter panel
- Case result card
- Case metadata panel
- Citation copy component
- Cited-by/cites component
- Local save button
- Local folders view
- Guidance resource card
- Submission form
- AI-readable view links

## Backend/API

Start with REST-style routes. Add GraphQL only if citation graph traversal or third-party developer usage becomes complex.

Suggested public routes:

```txt
GET /api/cases
GET /api/cases/:slug
GET /api/cases/:slug/markdown
GET /api/cases/:slug/citations
GET /api/guidance
GET /api/guidance/:id
POST /api/submissions
```

Human-facing routes can mirror API routes:

```txt
/cases/:slug
/cases/:slug.json
/cases/:slug.md
/cases/:slug/citations
/guidance/:slug
```

## Database

Prototype:

- Static JSON seed files
- Generated search index file

MVP with real ingestion:

- Postgres
- Tables for cases, citations, courts, jurisdictions, topics, sources, guidance, submissions, and review status

Possible later graph storage:

- Postgres adjacency tables first
- Neo4j only if citation graph queries outgrow relational tables

## Search

Prototype:

- Client-side or server-side search against seed JSON

MVP options:

- Postgres full-text search
- Meilisearch
- Typesense
- OpenSearch

Recommendation: use Postgres full-text or Meilisearch first. Keep OpenSearch for later scale.

## Citation graph

Initial graph model:

```txt
cases
  id
  slug
  name
  court
  jurisdiction
  date_decided

case_citations
  citing_case_id
  cited_case_id
  citation_text
  source_location
  confidence
```

Treatment model:

```txt
treatment_signals
  id
  citing_case_id
  cited_case_id
  treatment_type
  confidence
  evidence_text
  generated_by
  reviewed_by
  review_status
```

Treatment signals should never appear as final legal truth without confidence and review metadata.

## Local saved research

No-account storage should use:

- IndexedDB for saved cases, folders, notes, and research packets
- Export/import JSON for portability
- LocalStorage only for simple UI preferences

Local research data should not be sent to the server unless the user later opts into cloud sync.

## AI integration

Initial policy:

- Do not host confidential legal AI workflows.
- Do not store prompts by default.
- Use AI for metadata generation, tagging, summarization, and triage.
- Clearly mark AI-generated fields.
- Support bring-your-own API key or local model integrations later.

Potential local integrations:

- Ollama
- LM Studio
- Browser-side models where feasible

## Self-hosting

The repo should eventually support:

- Docker Compose
- Seed data import
- Search index setup
- Environment variable examples
- Optional external search service
- Optional Postgres
- No required auth provider for basic use

## Suggested future monorepo layout

```txt
/apps/web                Next.js web app
/packages/core           Shared types, citation parsing, normalization logic
/packages/local-store    IndexedDB/local export helpers
/packages/ui             Shared UI components
/pipelines/ingest        Python ingestion scripts
/data/sources            Source registry and seed source configs
/data/seed               Small demo dataset
/docs                    Project docs
```

## Security and privacy defaults

- No account required for research.
- No tracking of saved research by default.
- No prompt logging by default.
- Clear privacy notice on any AI-related feature.
- Clear disclaimer that summaries and treatment signals require verification.
