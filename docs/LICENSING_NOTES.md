# Licensing and Reuse Notes

## Purpose

AgentCounsel Hub should be open-source, but legal data and practical guidance sources may carry different reuse rules.

This document separates the project's code license from the legal data, guidance links, summaries, templates, and third-party source materials.

## Core rule

Do not assume that publicly accessible legal or law-firm content is freely reusable.

For every source, track:

- Source name
- Source URL
- Access method
- License or terms URL
- Attribution requirements
- Whether full text can be stored
- Whether summaries are allowed
- Whether redistribution is allowed
- Whether only metadata/linking is safe

## Code license

The repository should choose an open-source license for original software code.

Common options:

- MIT: simple and permissive.
- Apache-2.0: permissive with express patent license.
- AGPL-3.0: strong network copyleft, better if the goal is to keep hosted modifications open.

Recommended default if simplicity is the goal: MIT or Apache-2.0.

Recommended default if the goal is to prevent closed hosted forks from taking the commons private: AGPL-3.0.

No final license is selected in this notes file. Add a root `LICENSE` file once the project makes that decision.

## Documentation license

Project documentation can use the same license as code, but a Creative Commons license may be better for non-code docs.

Possible options:

- CC BY 4.0
- CC BY-SA 4.0

Avoid mixing license terms casually. Keep license information clear in the repo root.

## Data license

Legal data should be treated source-by-source.

Potential data categories:

- Public domain court opinions
- Government-produced materials
- Open datasets with specific attribution requirements
- Public websites that allow viewing but not bulk copying
- Law firm articles that should only be indexed/linked
- Open-source templates with explicit licenses

Recommended data approach:

1. Store metadata where full-text reuse is unclear.
2. Link to canonical sources.
3. Store full text only when terms clearly allow it.
4. Preserve attribution and source URLs.
5. Store source license notes with every record.
6. Make removal/update easy if a source requests correction.

## Practical guidance reuse

For law firm blogs, startup guides, bar resources, and agency explainers:

- Index title, URL, publisher, date, tags, jurisdiction, and short summary.
- Do not copy the full article unless permission/license is clear.
- Prefer source links and concise summaries.
- Avoid presenting third-party guidance as project-owned content.

## Templates and forms

Templates and forms require special caution.

For each template:

- Confirm the license.
- Preserve attribution.
- Track version/source commit where relevant.
- Do not strip disclaimers.
- Do not imply attorney review unless actually reviewed.

## AI-generated summaries

AI-generated summaries should include:

- Source record ID
- Model or process used, if applicable
- Generation date
- Confidence score where available
- Human review status

AI-generated content should not obscure source provenance.

## Takedown and correction policy

The project should eventually publish a clear policy for:

- Copyright concerns
- Incorrect metadata
- Broken source links
- Mischaracterized summaries
- Incorrect citation/treatment signals
- Privacy concerns in submitted materials

## Commercialization guardrail

Commercial features should not restrict access to the public legal-data commons created by the project.

Acceptable paid layers may include:

- Hosting
- Support
- Cloud sync
- Team collaboration
- Private workspaces
- Enterprise deployment
- White labeling
- Advanced analytics
- Attorney-reviewed premium guidance

Avoid making the public law layer dependent on paid accounts.
