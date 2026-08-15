import { PROJECT_REPOS } from '../../../data/projects';

const GITHUB_USER = 'roni-altshuler';

/*
 * Live stars/forks for the project cards.
 *
 * The repo list is DERIVED from src/data/projects.js rather than duplicated
 * here. It used to be a hardcoded array, and it had drifted: it fetched
 * `f1_predictions` (not on the page any more) and omitted `motorsportverse`
 * (on the page, and carrying a star nobody could see). A second list of the
 * same thing is a list that will be wrong.
 *
 * A failed fetch returns `null` counts rather than zeros. The client then
 * keeps its static fallback, which is the last known real value — reporting
 * 0 stars because GitHub rate-limited us is a false statement about the repo,
 * and it is indistinguishable on the page from a repo nobody has starred.
 */
export async function GET() {
  try {
    const results = await Promise.all(
      PROJECT_REPOS.map(async (repo) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USER}/${repo}`,
            {
              headers: {
                Accept: 'application/vnd.github.v3+json',
                ...(process.env.GITHUB_TOKEN && {
                  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                }),
              },
              next: { revalidate: 300 },
            }
          );

          if (!res.ok) {
            return { name: repo, stars: null, forks: null, language: null };
          }

          const data = await res.json();
          return {
            name: data.name,
            stars: data.stargazers_count ?? null,
            forks: data.forks_count ?? null,
            language: data.language ?? null,
            watchers: data.subscribers_count ?? null,
            updatedAt: data.pushed_at ?? null,
          };
        } catch {
          return { name: repo, stars: null, forks: null, language: null };
        }
      })
    );

    return Response.json(results, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch {
    return Response.json([], { status: 500 });
  }
}
