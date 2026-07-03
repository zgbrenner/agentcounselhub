# MVP Roadmap

## MVP thesis

The first release should prove that open legal data can be made more usable, searchable, citable, and AI-readable without requiring user accounts or proprietary infrastructure.

The MVP should not attempt to match Westlaw or Lexis in breadth. It should win on openness, clarity, structure, and extensibility.

## Phase 0: Repo foundation

Goal: make the project understandable and contributor-ready.

Tasks:

- Add project README.
- Add product plan.
- Add architecture notes.
- Add data-source registry.
- Add AI-readable endpoint spec.
- Add licensing notes.
- Add contribution guidelines.
- Decide initial license for code.
- Decide separate license treatment for docs/data where necessary.

Definition of done:

- A new contributor can understand what the project is, what it is not, and what to build first.

## Phase 1: Prototype web app

Goal: create a small working research interface using mock or seed data.

Suggested stack:

- Next.js / React
- TypeScript
- Tailwind CSS or plain CSS modules
- Local JSON seed data
- IndexedDB for saved research

Core pages:

- `/` landing/search page
- `/cases` search results
- `/cases/[slug]` case page
- `/guidance` practical guidance index
- `/submit` submission form
- `/about` project explanation
- `/docs` developer/API notes

Case page MVP:

- Case title
- Citation
- Court
- Date
- Jurisdiction
- Procedural posture
- Short holding summary
- Source link
- Cites list
- Cited-by list
- Copy citation button
- Save locally button
- View as JSON link
- View as Markdown link

Definition of done:

- A user can search sample cases, open a case, copy citation data, save it locally, and view machine-readable versions.

## Phase 2: Real open data ingestion

Goal: ingest a limited set of real case data from one or two sources.

Recommended starting point:

1. CourtListener / Free Law Project for case metadata and opinions.
2. Harvard Caselaw Access Project as a second source where licensing and access terms permit.

Pipeline tasks:

- Create source registry.
- Build ingestion script.
- Normalize case metadata.
- Generate slugs.
- Extract citations.
- Store source URLs.
- Store license / attribution notes.
- Build small seed index.

Normalized case model:

```ts
type CaseRecord = {
  id: string;
  slug: string;
  name: string;
  citations: string[];
  court: string;
  jurisdiction: string;
  dateDecided: string;
  judges?: string[];
  proceduralPosture?: string;
  topics: string[];
  citedCases: string[];
  citedBy: string[];
  sourceUrl: string;
  sourceName: string;
  licenseNote?: string;
  summary?: string;
  aiGenerated?: boolean;
  attorneyReviewed?: boolean;
};
```

Definition of done:

- The prototype uses real legal data for at least one jurisdiction or limited case collection.

## Phase 3: Search and filters

Goal: make legal search feel meaningfully better than a static database browser.

MVP filters:

- Keyword
- Case name
- Citation
- Court
- Jurisdiction
- Date range
- Topic

Search options:

- Start with local/simple search for prototype.
- Move to Meilisearch, Typesense, OpenSearch, or Postgres full-text once real volume grows.

Definition of done:

- Users can narrow real case data with legal-research-style filters.

## Phase 4: Basic citator layer

Goal: show the beginning of an open citator.

MVP features:

- Cases this case cites.
- Cases that cite this case.
- Important citing cases, initially based on citation count or court hierarchy.
- Possible negative treatment as an experimental unreviewed signal.

Treatment labels should include:

- Label
- Confidence
- Source passage or reason
- AI-generated flag
- Human-reviewed flag

Definition of done:

- Case pages show useful citation relationships and clearly separate verified facts from experimental treatment signals.

## Phase 5: Practical guidance index

Goal: build the open alternative to Practical Law-style guidance without copying proprietary content.

MVP features:

- Guidance source registry.
- Category pages.
- Short summaries.
- Tags.
- Jurisdiction labels.
- Source links.
- License/reuse notes.

Guidance categories:

- Startups
- Corporate governance
- Employment
- Privacy
- Litigation basics
- Court self-help
- Government forms
- Open templates

Definition of done:

- Users can find useful public guidance and understand where each source comes from.

## Phase 6: Submissions

Goal: allow community curation without requiring accounts.

MVP form fields:

- Submission type
- Title
- URL
- Jurisdiction
- Topic
- Short description
- Optional contact info
- License/reuse note if known

Initial review flow:

- Store submission.
- Run duplicate check later.
- Mark as pending.
- Review manually before publishing.

Definition of done:

- Users can submit resources, and the project has a safe path for adding them.

## Suggested first build ticket

Build the Next.js prototype with:

- Homepage search
- Seed case data
- Case detail page
- JSON endpoint
- Markdown endpoint
- IndexedDB saved folders
- Practical guidance index from seed data
- Submission form writing to local/mock storage
