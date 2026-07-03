import { NextResponse } from "next/server";
import { getGuidanceResourceSchema } from "@/lib/guidanceSchema";

export function GET() {
  return NextResponse.json({ schema: getGuidanceResourceSchema() });
}
