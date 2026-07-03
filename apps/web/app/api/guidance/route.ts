import { NextResponse } from "next/server";
import { getAllGuidance } from "@/lib/data";

export function GET() {
  return NextResponse.json({
    count: getAllGuidance().length,
    guidance: getAllGuidance()
  });
}
