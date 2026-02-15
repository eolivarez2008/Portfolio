export async function getGithubRepo(repoPath: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
      next: { revalidate: 3600 } // Cache d'une heure pour les performances
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}