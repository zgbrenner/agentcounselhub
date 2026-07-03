import { NextResponse } from "next/server";
import { getAllCases, getCaseBySlug, getRelatedCases } from "@/lib/data";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCases().map((caseRecord) => ({ slug: caseRecord.slug }));
}

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const caseRecord = getCaseBySlug(params.slug);

  if (!caseRecord) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...caseRecord,
    citationGraph: {
      cites: getRelatedCases(caseRecord.citedCaseIds),
      citedBy: getRelatedCases(caseRecord.citedByCaseIds)
    }
  });
}
