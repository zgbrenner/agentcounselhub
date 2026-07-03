import { cases } from "@/data/cases";
import { guidanceResources } from "@/data/guidance";
import type { CaseRecord, GuidanceResource } from "@/lib/types";

export function getAllCases(): CaseRecord[] {
  return cases;
}

export function getCaseBySlug(slug: string): CaseRecord | undefined {
  return cases.find((caseRecord) => caseRecord.slug === slug);
}

export function getCaseById(id: string): CaseRecord | undefined {
  return cases.find((caseRecord) => caseRecord.id === id);
}

export function getRelatedCases(ids: string[]): CaseRecord[] {
  return ids
    .map((id) => getCaseById(id))
    .filter((caseRecord): caseRecord is CaseRecord => Boolean(caseRecord));
}

export function getAllTopics(): string[] {
  return Array.from(new Set(cases.flatMap((caseRecord) => caseRecord.topics))).sort();
}

export function getAllCourts(): string[] {
  return Array.from(new Set(cases.map((caseRecord) => caseRecord.court))).sort();
}

export function getAllJurisdictions(): string[] {
  return Array.from(new Set(cases.map((caseRecord) => caseRecord.jurisdiction))).sort();
}

export function searchCases(params: {
  query?: string;
  court?: string;
  jurisdiction?: string;
  topic?: string;
}): CaseRecord[] {
  const query = params.query?.trim().toLowerCase();

  return cases.filter((caseRecord) => {
    const textMatches = !query
      || [
        caseRecord.name,
        caseRecord.citations.join(" "),
        caseRecord.court,
        caseRecord.jurisdiction,
        caseRecord.summary,
        caseRecord.holding,
        caseRecord.topics.join(" ")
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const courtMatches = !params.court || caseRecord.court === params.court;
    const jurisdictionMatches = !params.jurisdiction || caseRecord.jurisdiction === params.jurisdiction;
    const topicMatches = !params.topic || caseRecord.topics.includes(params.topic);

    return textMatches && courtMatches && jurisdictionMatches && topicMatches;
  });
}

export function getAllGuidance(): GuidanceResource[] {
  return guidanceResources;
}
