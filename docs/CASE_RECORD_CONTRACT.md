# Case Record Contract

The case record contract defines the normalized case-law shape used between ingestion pipelines and the web app.

The canonical normalized case schema is:

```txt
data/cases/case-record.schema.json
```

The current seed normalizer writes generated case records to:

```txt
data/normalized/cases.seed.json
```

## Export shape

Normalized case exports are JSON objects with:

| Field | Meaning |
| --- | --- |
| `generatedAt` | Timestamp for the export. |
| `source` | Pipeline/source identifier for the export. |
| `records` | List of normalized case records. |

## Required case fields

| Field | Meaning |
| --- | --- |
| `id` | Stable internal case identifier. |
| `slug` | Stable URL slug. |
| `name` | Case name. |
| `citations` | Citation strings associated with the case. |
| `court` | Court name. |
| `jurisdiction` | Jurisdiction label. |
| `dateDecided` | Decision date when known. |
| `judges` | Judge names when known. |
| `proceduralPosture` | Procedural posture summary or placeholder. |
| `topics` | Topic labels. |
| `summary` | Summary or unreviewed placeholder. |
| `holding` | Holding or unreviewed placeholder. |
| `sourceUrl` | Canonical source URL. |
| `sourceName` | Source name. |
| `licenseNote` | Source-use and attribution note. |
| `citedCaseIds` | Cases cited by this record. |
| `citedByCaseIds` | Cases that cite this record. |
| `treatmentSignals` | Citation treatment signals. |
| `aiGeneratedFields` | Fields generated or enriched by AI. |
| `attorneyReviewed` | Whether the record has legal review. |
| `retrievedAt` | Retrieval timestamp from the source pipeline. |
| `rawSourceId` | Original source-side identifier. |

## Treatment signals

Treatment signals must include:

- `citingCaseId`
- `citedCaseId`
- `treatment`
- `confidence`
- `reviewStatus`

Allowed treatment values are:

```txt
cited, followed, distinguished, criticized, questioned, overruled, superseded, unknown
```

Allowed review statuses are:

```txt
source, ai_unreviewed, human_reviewed
```

## Conservative defaults

When ingestion cannot confidently extract a value, use explicit placeholders instead of guessing. For example:

- `Unclassified. Add extraction step after ingestion.`
- `Unreviewed source record. Add summarization/review step after ingestion.`
- `Verify source terms, attribution requirements, and redistribution rules before production use.`

## Validation

After generating seed data, run:

```bash
pnpm cases:validate
```

CI runs this after the normalization smoke test. The validator checks required fields, list fields, duplicate case IDs, duplicate slugs, source URLs, treatment values, treatment confidence, and schema/validator drift.
