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
      "https://api.github.com/users/eolivarez2008/repos?sort=updated&per_page=10",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];

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
    if (process.env.NODE_ENV === "development") {
      console.error("Erreur lors de la récupération des repos GitHub:", error);
    }
    return [];
  }
}
