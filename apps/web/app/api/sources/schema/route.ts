import { NextResponse } from "next/server";
import { getSourceSchema } from "@/lib/sourceSchema";

export function GET() {
  return NextResponse.json({ schema: getSourceSchema() });
}
