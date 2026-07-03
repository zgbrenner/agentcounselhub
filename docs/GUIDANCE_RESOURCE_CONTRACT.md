# Guidance Resource Contract

The guidance resource contract defines the metadata shape for practical guidance links, public templates, agency materials, court self-help resources, and other public legal information references.

The canonical schema is:

```txt
data/guidance/guidance-resource.schema.json
```

## Required fields

| Field | Meaning |
| --- | --- |
| `id` | Stable internal resource identifier. |
| `slug` | Stable kebab-case URL/search slug. |
| `title` | Human-readable resource title. |
| `publisher` | Publishing organization or source. |
| `url` | Canonical public source URL. |
| `category` | Resource category, such as startup, consumer, court-self-help, agency, privacy, or template. |
| `jurisdiction` | Jurisdiction or general scope label. |
| `summary` | Concise, source-first summary. |
| `tags` | Search and filtering tags. |
| `recommendedUse` | Conservative use recommendation. |
| `licenseNote` | Reuse, attribution, storage, and caution note. |

## Recommended use values

Allowed `recommendedUse` values are:

```txt
link_and_summarize
store_metadata_only
store_full_text
```

Use `link_and_summarize` unless the source terms clearly allow storing or redistributing more.

## Conservative defaults

When a contributor or reviewer is unsure:

- Link to the canonical public page.
- Prefer `link_and_summarize` or `store_metadata_only`.
- Keep summaries short and source-first.
- Use the `licenseNote` field to capture reuse uncertainty.
- Do not copy forms, articles, or guides unless source terms clearly allow it.

## Relationship to the source registry

The guidance index is for user-facing practical resources. The source registry is for provenance, ingestion, and reuse tracking.

When a guidance resource becomes important enough for repeated ingestion, add or propose the publisher/source in:

```txt
data/sources/legal-data-sources.json
```
