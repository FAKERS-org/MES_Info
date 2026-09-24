import { NextResponse } from "next/server";
import { universities } from "@/data/universities";

export function GET() {
  return NextResponse.json(universities);
}
