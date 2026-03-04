const GITHUB_USER = 'roni-altshuler';
const REPOS = ['soccer_predictor', 'SongAnalyzer', 'f1_predictions'];

export async function GET() {
  try {
    const results = await Promise.all(
      REPOS.map(async (repo) => {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${repo}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              ...(process.env.GITHUB_TOKEN && {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              }),
            },
            next: { revalidate: 300 }, // cache for 5 minutes
          }
        );

        if (!res.ok) {
          return { name: repo, stars: 0, forks: 0, language: null };
        }

        const data = await res.json();
        return {
          name: data.name,
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          language: data.language,
        };
      })
    );

    return Response.json(results, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch {
    return Response.json([], { status: 500 });
  }
}
