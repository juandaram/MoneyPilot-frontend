import { NextResponse } from "next/server"
import userProfile from "@/public/data/user_profile.json"

// TODO: Replace with actual database query based on authenticated user
export async function GET(request: Request) {
  try {
    // Mock: Check Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Return static profile data
    return NextResponse.json(userProfile)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
