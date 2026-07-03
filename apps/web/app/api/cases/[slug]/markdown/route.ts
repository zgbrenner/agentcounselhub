import { getCaseBySlug } from "@/lib/data";
import { caseToMarkdown } from "@/lib/markdown";

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const caseRecord = getCaseBySlug(params.slug);

  if (!caseRecord) {
    return new Response("Case not found", { status: 404 });
  }

  return new Response(caseToMarkdown(caseRecord), {
    headers: {
      "content-type": "text/markdown; charset=utf-8"
    }
  });
}
