import { getAllCases, getCaseBySlug } from "@/lib/data";
import { caseToMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCases().map((caseRecord) => ({ slug: caseRecord.slug }));
}

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const record = getCaseBySlug(params.slug);

  if (!record) {
    return new Response("Missing case", { status: 404 });
  }

  return new Response(caseToMarkdown(record), {
    headers: { "content-type": "text/markdown; charset=utf-8" }
  });
}
