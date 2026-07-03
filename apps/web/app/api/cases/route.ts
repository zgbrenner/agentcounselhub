import { NextResponse } from "next/server";
import { getAllCases } from "@/lib/data";

export function GET() {
  return NextResponse.json({
    count: getAllCases().length,
    cases: getAllCases()
  });
}
