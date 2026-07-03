# AI-Readable Design Spec

## Purpose

AgentCounsel Hub should be designed for humans and machines at the same time.

The platform should make legal information easy to search, cite, export, parse, and reuse by AI tools, legal-tech developers, researchers, and lawyers using their own AI systems.

## Core requirements

Every important page should have:

- Stable URL
- Semantic HTML
- Clear headings
- Minimal layout noise
- Canonical source links
- Structured metadata
- JSON representation
- Markdown representation
- Plain text where useful
- Schema.org metadata where appropriate
- Clear robots/API policy
- llms.txt

## Case page routes

For a case with slug `miranda-v-arizona`:

```txt
/cases/miranda-v-arizona
/cases/miranda-v-arizona.json
/cases/miranda-v-arizona.md
/cases/miranda-v-arizona.txt
/cases/miranda-v-arizona/citations
/cases/miranda-v-arizona/metadata
```

## Case JSON shape

```json
{
  "id": "case_001",
  "slug": "miranda-v-arizona",
  "name": "Miranda v. Arizona",
  "citations": ["384 U.S. 436"],
  "court": "Supreme Court of the United States",
  "jurisdiction": "United States",
  "dateDecided": "1966-06-13",
  "judges": [],
  "proceduralPosture": "Supreme Court review",
  "topics": ["criminal procedure", "constitutional law", "self-incrimination"],
  "summary": "Short human-readable summary with generation/review metadata.",
  "source": {
    "name": "Source name",
    "url": "https://example.com/source",
    "retrievedAt": "YYYY-MM-DD",
    "licenseNote": "Source-specific reuse note"
  },
  "citationsGraph": {
    "cites": [],
    "citedBy": []
  },
  "aiMetadata": {
    "aiGeneratedFields": ["summary", "topics"],
    "model": "optional-model-name",
    "generatedAt": "YYYY-MM-DD",
    "confidence": 0.82,
    "attorneyReviewed": false
  }
}
```

## Markdown case shape

```md
# Case Name

**Citation:** 000 U.S. 000  
**Court:** Court Name  
**Date:** YYYY-MM-DD  
**Jurisdiction:** Jurisdiction  
**Source:** Source URL

## Summary

Short summary.

## Procedural Posture

Short procedural posture.

## Topics

- Topic 1
- Topic 2

## Cites

- Case A
- Case B

## Cited By

- Case C
- Case D

## Metadata

- AI-generated fields: summary, topics
- Attorney reviewed: no
- Confidence: 0.82
```

## Citation graph endpoint

Route:

```txt
/cases/:slug/citations
```

Response:

```json
{
  "caseId": "case_001",
  "slug": "miranda-v-arizona",
  "cites": [
    {
      "caseId": "case_002",
      "name": "Example v. Example",
      "citation": "000 U.S. 000",
      "relationship": "cites",
      "confidence": 0.95
    }
  ],
  "citedBy": [
    {
      "caseId": "case_003",
      "name": "Later Example v. State",
      "citation": "000 F.3d 000",
      "relationship": "cited_by",
      "confidence": 0.91
    }
  ],
  "treatmentSignals": [
    {
      "citingCaseId": "case_003",
      "treatment": "distinguished",
      "confidence": 0.61,
      "reviewStatus": "unreviewed",
      "evidence": "Short evidence excerpt or pointer"
    }
  ]
}
```

## Guidance routes

For a guidance resource:

```txt
/guidance/startup-founder-stock
/guidance/startup-founder-stock.json
/guidance/startup-founder-stock.md
```

Guidance JSON should include:

- Title
- Source
- URL
- Author/publisher
- Date published or updated if known
- Jurisdiction
- Practice area
- Tags
- Summary
- Reuse/licensing note
- Whether full text is stored or only linked

## llms.txt

The site should include `/llms.txt` to explain:

- What the project is
- Which endpoints are useful for AI systems
- API route patterns
- Data license notes
- Citation expectations
- Rate limits
- Attribution requirements
- Whether bulk export is available

Draft structure:

```txt
# AgentCounsel Hub

AgentCounsel Hub provides open, structured legal research metadata, case pages, citation relationships, and practical guidance indexes.

Preferred AI endpoints:
- /cases/:slug.json
- /cases/:slug.md
- /cases/:slug/citations
- /guidance/:slug.json
- /api/cases
- /api/guidance

Usage notes:
- Verify legal conclusions against primary sources.
- Respect source-specific license and attribution notes.
- Do not treat AI-generated summaries as legal advice.
```

## Robots/API policy

The project should welcome responsible machine access while preventing abusive scraping.

Recommended policy:

- Permit indexing of public pages.
- Prefer API endpoints over HTML scraping.
- Publish rate-limit guidance.
- Provide contact info for bulk access.
- Preserve source attribution metadata.

## Semantic HTML recommendations

Case pages should use:

- `<article>` for the case body
- `<header>` for case title and metadata
- `<section>` for summary, posture, topics, citations, cited-by, source information
- `<time datetime="YYYY-MM-DD">` for decision date
- `<aside>` for citation tools and metadata
- JSON-LD script for structured data where appropriate

## AI field labeling

Any AI-generated field should be identifiable in the UI and API.

Examples:

```json
{
  "summary": {
    "text": "...",
    "generatedBy": "ai",
    "confidence": 0.78,
    "attorneyReviewed": false
  }
}
```

Never flatten AI-generated legal interpretation into the same status as verified source text.
