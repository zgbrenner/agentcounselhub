export type ReviewStatus = "source" | "ai_unreviewed" | "human_reviewed";

export type TreatmentType =
  | "cited"
  | "followed"
  | "distinguished"
  | "criticized"
  | "questioned"
  | "overruled"
  | "superseded"
  | "unknown";

export type TreatmentSignal = {
  citingCaseId: string;
  citedCaseId: string;
  treatment: TreatmentType;
  confidence: number;
  reviewStatus: ReviewStatus;
  evidence?: string;
};

export type CaseRecord = {
  id: string;
  slug: string;
  name: string;
  citations: string[];
  court: string;
  jurisdiction: string;
  dateDecided: string;
  judges: string[];
  proceduralPosture: string;
  topics: string[];
  summary: string;
  holding: string;
  sourceUrl: string;
  sourceName: string;
  licenseNote: string;
  citedCaseIds: string[];
  citedByCaseIds: string[];
  treatmentSignals: TreatmentSignal[];
  aiGeneratedFields: string[];
  attorneyReviewed: boolean;
};

export type GuidanceResource = {
  id: string;
  slug: string;
  title: string;
  publisher: string;
  url: string;
  category: string;
  jurisdiction: string;
  summary: string;
  tags: string[];
  recommendedUse: "link_and_summarize" | "store_metadata_only" | "store_full_text";
  licenseNote: string;
};

export type SavedCase = {
  id: string;
  slug: string;
  name: string;
  citation: string;
  savedAt: string;
  folder: string;
  note?: string;
};
