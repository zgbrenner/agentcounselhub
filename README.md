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

## Repository map

```txt
/docs
  PRODUCT_PLAN.md          Full product concept and pillars
  MVP_ROADMAP.md           First build sequence
  ARCHITECTURE.md          Proposed technical architecture
  DATA_SOURCES.md          Open legal data and practical guidance source registry
  AI_READABLE_SPEC.md      Machine-readable page/API design
  LICENSING_NOTES.md       Reuse, linking, attribution, and data-license cautions
```

## Current status

This repo is at the planning/scaffolding stage.

The immediate next step is to turn the plan into a small working prototype:

- Next.js app shell
- searchable case index mock
- case detail page
- JSON/Markdown case endpoints
- local saved folders
- source registry
- submission form

## Important disclaimer

This project is for legal research infrastructure and public legal information. It is not legal advice, does not create an attorney-client relationship, and should not present AI-generated summaries or treatment signals as authoritative without appropriate review and source verification.
