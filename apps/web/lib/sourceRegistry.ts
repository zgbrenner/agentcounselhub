import sourceRecords from "../../../data/sources/legal-data-sources.json";

export type SourceRecord = {
  id: string;
  name: string;
  type: "case_law" | "guidance" | "templates" | "forms" | "agency" | "court" | "bar" | "other";
  homepageUrl: string;
  apiUrl?: string;
  accessMethod: string;
  recommendedUse: string;
  priority: string;
  attributionRequired: boolean;
  canStoreFullText: boolean | string;
  canRedistribute: boolean | string;
  notes: string;
};

export function getAllSources(): SourceRecord[] {
  return sourceRecords as SourceRecord[];
}

export function getSourceById(id: string): SourceRecord | undefined {
  return getAllSources().find((source) => source.id === id);
}

export function getSourcesByType(type: SourceRecord["type"]): SourceRecord[] {
  return getAllSources().filter((source) => source.type === type);
}

export function getSourceStats() {
  const sources = getAllSources();
  return {
    total: sources.length,
    caseLaw: sources.filter((source) => source.type === "case_law").length,
    guidance: sources.filter((source) => source.type === "guidance").length,
    templates: sources.filter((source) => source.type === "templates").length,
    mvpPriority: sources.filter((source) => source.priority.startsWith("mvp")).length
  };
}
