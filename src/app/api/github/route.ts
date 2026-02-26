import { getGithubRepos } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repos = await getGithubRepos();
    return NextResponse.json(repos);
  } catch (error) {
    console.error("Status API Github Error:", error);
    return NextResponse.json(
      { services: [], error: "Failed to fetch status" },
      { status: 500 },
    );
  }
}
