# Data Sources Registry

## Purpose

This registry tracks candidate data sources for cases, opinions, citations, practical guidance, public legal forms, and open legal templates.

Every source should be evaluated for:

- Coverage
- Data quality
- Update frequency
- Access method
- Licensing / reuse permissions
- Attribution requirements
- Robots/API restrictions
- Whether full text can be stored
- Whether only links/metadata should be stored

## Case law and opinions

### CourtListener / Free Law Project

Potential use:

- Case metadata
- Opinions
- Citation relationships
- RECAP-linked public materials where legally available

Notes:

- Strong first source candidate.
- Good fit for MVP ingestion.
- Need to respect API terms, attribution requirements, and source-specific restrictions.

### Harvard Caselaw Access Project

Potential use:

- Historical case law
- Metadata
- Bulk data where available and allowed

Notes:

- Good second source candidate.
- Confirm current access terms and reuse permissions before storing or redistributing text.

### Justia

Potential use:

- Public case pages
- Case metadata
- Links to opinions

Notes:

- Better initial role may be linking/indexing rather than copying.
- Confirm terms before scraping or storing text.

### Public court websites

Potential use:

- Recent opinions
- Court-specific updates
- Slip opinions
- Official PDFs

Notes:

- Coverage and structure vary widely.
- Need per-court source adapters.
- Track source URL and retrieval date.

### Federal court opinions

Potential use:

- Federal appellate and district court opinions
- Official court feeds where available

Notes:

- Prioritize sources with stable URLs and clear access rules.

### State court opinion databases

Potential use:

- State supreme court opinions
- State appellate opinions
- Published/unpublished status

Notes:

- Build jurisdiction-specific adapters later.
- MVP should start with one or two jurisdictions only.

## Practical guidance sources

### Cooley GO

Potential use:

- Startup legal guidance
- Entity formation resources
- Financing guidance

Recommended treatment:

- Index, classify, summarize, and link.
- Do not copy full materials unless license permits.

### Y Combinator templates

Potential use:

- Startup template index
- SAFE-related resources
- Founder/company forms

Recommended treatment:

- Track source, license, and form version.
- Link to canonical source.

### Wilson Sonsini guides

Potential use:

- Startup and corporate guidance
- Financing explainers
- Governance resources

Recommended treatment:

- Link and summarize.
- Verify reuse permissions before storing full text.

### Orrick startup forms

Potential use:

- Startup forms and explainers

Recommended treatment:

- Link and summarize.
- Store only metadata unless license clearly permits more.

### Gunderson resources

Potential use:

- Startup and venture guidance

Recommended treatment:

- Link and summarize.

### Law firm blogs and guides

Potential use:

- Public explanations of legal developments
- Practice-area updates
- Jurisdiction-specific guidance

Recommended treatment:

- Index URL, title, summary, date, practice area, jurisdiction, and source firm.
- Do not copy full text by default.

### Public agency guidance

Potential use:

- Regulatory explainers
- Compliance guidance
- Forms
- FAQs

Recommended treatment:

- Prefer official government sources.
- Store clear source and retrieval date.

### Court self-help resources

Potential use:

- Public court guides
- Self-help forms
- Procedural explainers

Recommended treatment:

- Link to official court source.
- Track jurisdiction and topic.

### Bar association materials

Potential use:

- Public guides
- Attorney-authored articles
- Ethics guidance where public

Recommended treatment:

- Link and summarize unless reuse permission is clear.

### Open-source contract/template repos

Potential use:

- Open templates
- Clause libraries
- Document examples

Recommended treatment:

- Store license name, source repo, commit or version, and attribution requirements.

## Source registry schema

```ts
type SourceRecord = {
  id: string;
  name: string;
  type: 'case_law' | 'guidance' | 'forms' | 'templates' | 'agency' | 'court' | 'bar' | 'other';
  homepageUrl: string;
  apiUrl?: string;
  accessMethod: 'api' | 'bulk_download' | 'rss' | 'web' | 'manual' | 'other';
  licenseName?: string;
  licenseUrl?: string;
  attributionRequired?: boolean;
  canStoreFullText?: boolean;
  canRedistribute?: boolean;
  recommendedUse: 'store_full_text' | 'store_metadata_only' | 'link_and_summarize' | 'manual_review_required';
  notes?: string;
};
```

## Ingestion rules

1. Prefer APIs, bulk datasets, RSS feeds, and official downloads over scraping.
2. Store source URLs and retrieval dates.
3. Store license/reuse notes with every record.
4. Keep raw data separate from normalized data.
5. Do not store full text where source terms are unclear.
6. Make it easy to remove or update a source if terms change.
7. For AI summaries, store model/version, generation date, and review status.

## MVP source recommendation

Start with:

1. CourtListener / Free Law Project for case data.
2. A small manually curated practical guidance seed index.
3. A small open-template seed index with clear license metadata.

Avoid broad scraping until licensing, source rules, and attribution workflows are documented.
