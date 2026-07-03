# Source Registry Contract

The source registry is the provenance layer for AgentCounsel Hub. It tells the app, contributors, and AI agents where legal data or guidance comes from, how it should be accessed, and what reuse cautions apply.

The canonical registry file is:

```txt
data/sources/legal-data-sources.json
```

The machine-readable schema is:

```txt
data/sources/legal-data-sources.schema.json
```

## Source record fields

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Stable kebab-case identifier. Do not rename after publication unless the source is being replaced. |
| `name` | Yes | Human-readable source name. |
| `type` | Yes | Source category. Allowed values: `case_law`, `guidance`, `templates`, `forms`, `agency`, `court`, `bar`, `other`. |
| `homepageUrl` | Yes | Canonical HTTP(S) homepage or source landing page. |
| `apiUrl` | No | Optional HTTP(S) API endpoint or API documentation URL. |
| `accessMethod` | Yes | How the source should be accessed, such as `api`, `web`, `bulk_download`, or `api_or_bulk_download`. |
| `recommendedUse` | Yes | Conservative use guidance, such as `store_metadata_first`, `link_and_summarize`, or `manual_review_required`. |
| `priority` | Yes | Product or ingestion priority, such as `mvp_primary`, `mvp_secondary`, `mvp_guidance`, `later`, or `reviewed_candidate`. |
| `attributionRequired` | Yes | Boolean. When unsure, use `true`. |
| `canStoreFullText` | Yes | Boolean or verification note. Use a note like `verify_source_terms` when uncertain. |
| `canRedistribute` | Yes | Boolean or verification note. Use a note like `verify_source_terms` when uncertain. |
| `notes` | Yes | Human-readable caution notes, provenance notes, and intended use notes. |

## Conservative defaults

When a contributor or reviewer is unsure:

- Set `attributionRequired` to `true`.
- Set `canStoreFullText` to `verify_source_terms`.
- Set `canRedistribute` to `verify_source_terms`.
- Prefer `link_and_summarize` over copying source text.
- Prefer official APIs, bulk datasets, RSS feeds, and public downloads over scraping.

## Validation

Run:

```bash
pnpm sources:validate
```

The validator checks required fields, supported source types, absolute HTTP(S) URLs, duplicate IDs, duplicate homepages, and reuse-field value types.

## Proposal workflow

Approved review items can be exported from:

```txt
/review/proposals
```

Then validate and merge those proposals into a proposed registry file with:

```bash
pnpm sources:propose
```

The proposed output should be reviewed before replacing the canonical registry.
