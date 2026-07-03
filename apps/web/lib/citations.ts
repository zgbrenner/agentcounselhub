import type { CaseRecord } from "@/lib/types";

export function formatBluebookLite(caseRecord: CaseRecord): string {
  const primaryCitation = caseRecord.citations[0] ?? "citation unavailable";
  const year = caseRecord.dateDecided.slice(0, 4);
  return `${caseRecord.name}, ${primaryCitation} (${year}).`;
}

export function formatNeutralCitation(caseRecord: CaseRecord): string {
  return [caseRecord.name, caseRecord.citations[0], caseRecord.court, caseRecord.dateDecided]
    .filter(Boolean)
    .join(" | ");
}
