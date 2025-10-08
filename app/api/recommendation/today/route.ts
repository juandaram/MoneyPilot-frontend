import { NextResponse } from "next/server"
import recommendation from "@/public/data/recommendation_today.json"

// TODO: Replace with actual recommendation generation logic
export async function GET() {
  try {
    return NextResponse.json(recommendation)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recommendation" }, { status: 500 })
  }
}
