import { formatBluebookLite } from "@/lib/citations";
import { getRelatedCases } from "@/lib/data";
import type { CaseRecord } from "@/lib/types";

export function caseToMarkdown(caseRecord: CaseRecord): string {
  const cites = getRelatedCases(caseRecord.citedCaseIds);
  const citedBy = getRelatedCases(caseRecord.citedByCaseIds);

  return `# ${caseRecord.name}

**Citation:** ${caseRecord.citations.join(", ")}  
**Court:** ${caseRecord.court}  
**Jurisdiction:** ${caseRecord.jurisdiction}  
**Date decided:** ${caseRecord.dateDecided}  
**Source:** ${caseRecord.sourceName} - ${caseRecord.sourceUrl}

## Suggested citation

${formatBluebookLite(caseRecord)}

## Summary

${caseRecord.summary}

## Holding

${caseRecord.holding}

## Procedural posture

${caseRecord.proceduralPosture}

## Topics

${caseRecord.topics.map((topic) => `- ${topic}`).join("\n")}

## Cites

${cites.length ? cites.map((item) => `- ${item.name} (${item.citations[0]})`).join("\n") : "No cited cases in the seed graph."}

## Cited by

${citedBy.length ? citedBy.map((item) => `- ${item.name} (${item.citations[0]})`).join("\n") : "No citing cases in the seed graph."}

## Review metadata

- AI-generated fields: ${caseRecord.aiGeneratedFields.join(", ") || "none"}
- Attorney reviewed: ${caseRecord.attorneyReviewed ? "yes" : "no"}
- License note: ${caseRecord.licenseNote}
`;
}
