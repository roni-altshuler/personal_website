export const LANGUAGE_COLORS = {
  TypeScript: '#3178c6',
  Python: '#3572A5',
  CSS: '#563d7c',
  JavaScript: '#f1e05a',
};

/*
 * Side projects, newest-first by significance.
 *
 * `name` MUST be the exact GitHub repo name — /api/github derives its fetch
 * list from this array, so a typo here means that card silently keeps its
 * static defaults forever. That drift is exactly what happened before: the
 * API had a hardcoded list that had fallen out of sync with this one, so
 * `motorsportverse` was never fetched (and its star never showed) while
 * `f1_predictions` was fetched and never rendered.
 *
 * `stars`, `forks` and `language` are the STATIC FALLBACKS shown when the
 * GitHub call fails. They are the last known real values, not zeros — a card
 * that falls back to 0 stars is asserting something false about the repo.
 */
export const PROJECTS = [
  {
    name: 'motorsportverse',
    displayName: 'MotorsportVerse',
    description:
      'A unified, open-source motorsport AI ecosystem — a monorepo with a shared ML and data core powering sport-specific race-prediction projects across Formula 1, Formula 2 and beyond, each calibrated and graded against real race results',
    link: 'https://github.com/roni-altshuler/motorsportverse',
    demo: 'https://roni-altshuler.github.io/motorsportverse/',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
  },
  {
    name: 'nba_predictor',
    displayName: 'Hardwood — NBA Predictor',
    description:
      'Calibrated NBA game and season forecasting scored against the closing line. A margin/total model over 31,844 games since 2004, benchmarked on 14,600 priced games, with season projections, a value surface and a playoff-series layer',
    link: 'https://github.com/roni-altshuler/nba_predictor',
    demo: 'https://nba-predictor-iota.vercel.app',
    language: 'Python',
    stars: 0,
    forks: 0,
  },
  {
    name: 'soccer_predictor',
    displayName: 'Pitchverse — Soccer Predictor',
    description:
      'Calibrated football forecasting across nine leagues and fourteen knockout competitions: match probabilities, season projections, a model-vs-market value surface and tournament brackets, every claim scored against closing odds',
    link: 'https://github.com/roni-altshuler/soccer_predictor',
    demo: 'https://soccer-stats-predictor-sigma.vercel.app',
    language: 'Python',
    stars: 3,
    forks: 1,
  },
  {
    name: 'SongAnalyzer',
    displayName: 'Song Lyric Analyzer',
    description:
      'A minimalist web app that reads song lyrics and surfaces mood, vibe and emotional insight. Built with Next.js, TypeScript and Tailwind CSS',
    link: 'https://github.com/roni-altshuler/SongAnalyzer',
    demo: 'https://song-analyzer-pi.vercel.app',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
  },
];

/* The single source of truth for which repos /api/github fetches. Derived
   rather than duplicated so the two can never drift apart again. */
export const PROJECT_REPOS = PROJECTS.map((p) => p.name);
