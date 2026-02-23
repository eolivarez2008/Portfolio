import { getGithubRepos } from "@/lib/github";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const repos = await getGithubRepos();

    return NextResponse.json(repos, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Status API Github Error:", error);
    return NextResponse.json(
      { repos: [], error: "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }
}
