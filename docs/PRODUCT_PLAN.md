# Product Plan: Open Legal Research Platform

## 1. Working concept

AgentCounsel Hub is an open-source legal research platform intended to become a free, AI-readable, community-curated alternative to closed legal research systems.

The core idea is to provide public access to legal research, structured legal data, practical guidance, and machine-readable legal knowledge without requiring accounts, proprietary subscriptions, or closed workflows.

Possible product names remain open:

- AgentCounsel
- AgentCounsel OS
- AgentCounsel Hub
- PrecedentOS
- CounselGrid
- JurisGraph

## 2. Product pillars

### A. Case law database

Start with legally usable open legal data sources. The goal is not immediate total coverage. The goal is a cleaner, structured layer on top of public law.

Candidate sources:

- CourtListener / Free Law Project
- Harvard Caselaw Access Project
- Justia
- RECAP / PACER-linked materials where legally available
- Public court websites
- State court opinion databases
- Federal court opinions

Core case fields:

- Case name
- Citation
- Court
- Jurisdiction
- Date decided
- Judges
- Parties
- Procedural posture
- Case type
- Legal issues
- Topic tags
- Cited statutes
- Cited cases
- Published / unpublished status
- Precedential status, where available
- Source URL
- Data license / reuse notes

### B. Search and filtering

Search is the first product-defining feature. Open legal data already exists, but the research experience is usually weak.

Search filters should eventually include:

- Jurisdiction
- Court
- Date range
- Judge
- Case type
- Procedural posture
- Legal issue
- Topic / tag
- Cited statute
- Cited case
- Published / unpublished status
- Precedential value

MVP search should begin with:

- Keyword search
- Jurisdiction filter
- Court filter
- Date filter
- Citation lookup
- Case-name lookup
- Topic tag filter

### C. Citator-style system

This is the hardest and most valuable feature. The long-term goal is an open citator similar in spirit to Shepard's or KeyCite, but built transparently from open data and reviewable signals.

Early citator scope:

- Cases this case cites
- Cases that cite this case
- Most important citing cases
- Possible negative treatment
- Basic citation graph

Later citator scope:

- Positive treatment
- Negative treatment
- Neutral treatment
- Distinguished
- Followed
- Criticized
- Questioned
- Overruled
- Superseded by statute
- Reliability / confidence score
- Human-reviewed treatment labels

Important design rule: treatment signals must include confidence, provenance, and review status.

### D. Practical guidance layer

AgentCounsel Hub should index, summarize, classify, and link to high-quality public legal guidance rather than copying full proprietary materials.

Candidate categories:

- Startup legal guidance
- Employment law guidance
- Privacy and data protection guidance
- Corporate governance guidance
- Litigation self-help materials
- Public agency explainers
- Court forms
- Bar association resources
- Open-source contract templates
- Law firm guides and blogs

Candidate sources:

- Cooley GO
- Y Combinator templates
- Wilson Sonsini guides
- Orrick startup forms
- Gunderson resources
- Public agency materials
- Court self-help pages
- Bar association materials
- Open-source contract/template repos

Reuse rule: index, tag, summarize, and link unless the source license clearly allows copying or adaptation.

## 3. AI-curated, attorney-aware workflow

AI should structure and curate open legal data, not act as final legal authority.

AI can assist with:

- Topic tagging
- Holding summaries
- Procedural posture extraction
- Statute extraction
- Case citation extraction
- Practical guidance classification
- Duplicate detection
- Submission triage
- Metadata generation
- Possible treatment detection
- Change-in-law flagging

Review hierarchy:

```txt
Open source data
  -> AI structuring
  -> confidence scoring
  -> human legal review where needed
  -> published metadata / guidance index
```

High-risk outputs should be visibly marked as unreviewed, AI-assisted, or attorney-reviewed.

## 4. Submissions and review

Users should be able to submit:

- Cases
- Guidance links
- Templates
- Statutory updates
- Public agency materials
- Attorney-authored articles
- Corrections to summaries
- Corrections to metadata
- Treatment-signal suggestions

Initial submission design:

- No account required
- Optional contact info
- Spam protection
- Source URL required where possible
- AI pre-review
- Human review queue for high-impact submissions

AI triage labels:

- Relevant
- Duplicative
- Low quality
- Potentially useful
- Needs attorney review
- Safe to add as linked/indexed resource
- Possible copyright/licensing issue

## 5. No-accounts-first design

The platform should be useful without logging in.

Unauthenticated users should be able to:

- Search cases
- Read cases
- Browse guidance
- Save items locally
- Create local folders
- Add local notes
- Export saved research
- Copy citations
- Download case packets

Local storage methods:

- IndexedDB for saved research
- LocalStorage only for simple preferences
- Export/import JSON files
- Optional browser File System Access API later

Required user-facing notice:

> Saved items are stored locally in your browser or device. They are not synced to an account or stored by AgentCounsel Hub unless you later choose an optional cloud feature.

## 6. AI-readable design

AI-readability is a core differentiator.

Every major resource should have:

- Clean semantic HTML
- Stable URLs
- JSON metadata endpoint
- Markdown endpoint
- Plain text endpoint where useful
- Schema.org markup
- Citation graph endpoint where useful
- Public API route where licensing permits
- llms.txt
- robots/API policy
- Bulk export where licensing allows

Example case routes:

```txt
/cases/miranda-v-arizona
/cases/miranda-v-arizona.json
/cases/miranda-v-arizona.md
/cases/miranda-v-arizona.txt
/cases/miranda-v-arizona/citations
/cases/miranda-v-arizona/metadata
```

## 7. AI model policy

Do not begin as a hosted confidential AI legal-workflow product.

Preferred model approach:

- Bring-your-own API key
- Optional local model support
- Optional Ollama / LM Studio integration
- Browser-side AI where practical
- No stored prompts by default
- No attorney-client data intake by default
- Clear privacy warnings

The platform should be AI-friendly without becoming an AI SaaS that handles sensitive legal data.

## 8. Commercialization principle

Keep the core open and free.

Possible paid layers:

- Hosted enterprise deployment
- Cloud sync
- Team workspaces
- Private folders
- Firm-specific research libraries
- Internal knowledge base integrations
- Advanced alerts
- Advanced citation analytics
- White-labeled versions
- Support and maintenance
- Attorney-reviewed premium guidance
- API rate-limit upgrades
- Compliance / research dashboards

Principle:

> The law stays free. Convenience, hosting, support, collaboration, and advanced workflows can be paid.

## 9. Later roadmap

After the MVP:

- Stronger citator treatment
- Statutes and regulations
- Secondary-source index
- Practical guidance collections
- Attorney reviewer workflow
- Browser extension
- Public API access
- Local AI integrations
- Research export packets
- Case law timelines
- Judge / court analytics
- Litigation topic maps
- Firm/internal deployment edition
