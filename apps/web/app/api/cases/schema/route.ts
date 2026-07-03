import { NextResponse } from "next/server";
import { getCaseRecordSchema } from "@/lib/caseSchema";

export function GET() {
  return NextResponse.json({ schema: getCaseRecordSchema() });
}
