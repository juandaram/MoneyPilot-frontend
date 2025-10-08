import { NextResponse } from "next/server"
import transactions from "@/public/data/transactions.json"

// TODO: Replace with actual database query
export async function GET() {
  try {
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
