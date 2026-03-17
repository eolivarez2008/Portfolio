export interface GithubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
  homepage: string;
  description: string;
  language: string;
}

interface GithubApiResponse {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
  homepage: string;
  description: string | null;
  language: string | null;
  fork: boolean;
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/eolivarez2008/repos?sort=updated&per_page=20",
      {
        next: { revalidate: 300 },
        headers: {
          "User-Agent": "eolivarez-portfolio",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    );

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "No error body");
      console.error(`[GitHub API] Failure ${res.status}: ${errorBody}`);
      return [];
    }

    const data: GithubApiResponse[] = await res.json();

    return data
      .filter((repo) => !repo.fork && repo.name !== "eolivarez2008")
      .map((repo) => ({
        id: repo.id,
        name: repo.name.replace(/-/g, " "),
        stargazers_count: repo.stargazers_count,
        html_url: repo.html_url,
        homepage: repo.homepage || "",
        description: repo.description || "Pas de description disponible.",
        language: repo.language || "TypeScript",
      }));
  } catch (error) {
    console.error("Critical Error fetching GitHub repos:", error);
    return [];
  }
}
