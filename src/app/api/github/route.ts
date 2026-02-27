import { getGithubRepos } from "@/lib/github";
import { NextResponse } from "next/server";

// Désactive le cache statique pour avoir les derniers commits/stars
export const dynamic = "force-dynamic";

// API Route pour récupérer les repos GitHub
export async function GET() {
  try {
    const repos = await getGithubRepos();

    // Ajout d'un header de cache pour éviter de spammer l'API GitHub
    return NextResponse.json(repos, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
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
