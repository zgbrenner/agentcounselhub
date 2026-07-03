import type { ReviewItem } from "@/lib/reviewQueue";

export type SourceProposal = {
  id: string;
  name: string;
  type: string;
  homepageUrl: string;
  accessMethod: string;
  recommendedUse: string;
  priority: string;
  attributionRequired: boolean;
  notes: string;
  proposedFromReviewId: string;
  proposedAt: string;
};

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function mapReviewType(type: string): string {
  const normalized = type.toLowerCase();

  if (normalized.includes("case")) {
    return "case_law";
  }

  if (normalized.includes("template")) {
    return "templates";
  }

  if (normalized.includes("agency")) {
    return "agency";
  }

  return "guidance";
}

export function buildSourceProposal(item: ReviewItem): SourceProposal {
  return {
    id: slugify(item.title || item.url || item.id),
    name: item.title,
    type: mapReviewType(item.type),
    homepageUrl: item.url,
    accessMethod: "web",
    recommendedUse: "link_and_summarize",
    priority: "reviewed_candidate",
    attributionRequired: true,
    notes: item.reviewerNote || item.description || "Reviewed local proposal. Verify source terms before adding to the registry.",
    proposedFromReviewId: item.id,
    proposedAt: new Date().toISOString()
  };
}

export function buildApprovedSourceProposals(items: ReviewItem[]): SourceProposal[] {
  return items.filter((item) => item.reviewStatus === "approved").map(buildSourceProposal);
}

export function exportSourceProposals(items: ReviewItem[]): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), proposals: buildApprovedSourceProposals(items) }, null, 2);
}
