import { NextResponse } from "next/server";
import { getSourceById } from "@/lib/sourceRegistry";

export function GET(_request: Request, { params }: { params: { id: string } }) {
  const source = getSourceById(params.id);

  if (!source) {
    return NextResponse.json({ error: "Source not found" }, { status: 404 });
  }

  return NextResponse.json({ source });
}
