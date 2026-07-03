import { NextResponse } from "next/server";
import { getAllSources, getSourceStats } from "@/lib/sourceRegistry";

export function GET() {
  return NextResponse.json({
    stats: getSourceStats(),
    sources: getAllSources()
  });
}
