/* Public project names also drive the optional /api/github endpoint. */
export const PROJECTS = [
  {
    name: 'motorsportverse',
    displayName: 'MotorsportVerse',
    category: 'Motorsport · shared infrastructure',
    description:
      'Race forecasts and dashboards for several motorsport series. I brought the models and dashboards for each sport together around shared data, calibration and evaluation tools.',
    evidence:
      'The public catalog distinguishes working prediction projects from series still in development.',
    methods: ['Python', 'Forecast evaluation', 'Next.js'],
    image: '/projects/motorsportverse.webp',
    imageAlt: 'MotorsportVerse live website and motorsport project catalog.',
    link: 'https://github.com/roni-altshuler/motorsportverse',
    demo: 'https://roni-altshuler.github.io/motorsportverse/',
    evidenceLink: 'https://github.com/roni-altshuler/motorsportverse#project-catalog',
    evidenceLabel: 'Project catalog',
  },
  {
    name: 'nba_predictor',
    displayName: 'Hardwood',
    category: 'Basketball · probabilistic forecasting',
    description:
      'NBA game forecasts, season simulations and an interactive history of the league. I built a Python modeling pipeline and a dashboard for exploring the published predictions.',
    evidence:
      'In the documented historical benchmark, the margin model improves on a constant baseline but trails forecasts from closing market odds.',
    methods: ['Python', 'Monte Carlo', 'Next.js'],
    image: '/projects/hardwood.webp',
    imageAlt: 'Hardwood live NBA forecasting website with matchup and season information.',
    link: 'https://github.com/roni-altshuler/nba_predictor',
    demo: 'https://nba-predictor-iota.vercel.app',
    evidenceLink: 'https://github.com/roni-altshuler/nba_predictor#measured-state',
    evidenceLabel: 'Read the benchmark',
  },
  {
    name: 'march_madness_predictor',
    displayName: 'March Lab',
    category: 'Basketball · NCAA Tournament Forecasting',
    description:
      'Men’s NCAA tournament history, seed probabilities and interactive brackets. I built a trained prediction pipeline and a browser app for comparing matchups and exploring the road through a tournament. The 2027 field awaits announcement.',
    evidence:
      'The documented rolling evaluation covers 377 games from 2021 through 2026. The seed model improves probability scores over a fixed seed heuristic; the team form challenger does not improve the primary model.',
    methods: ['Python', 'NumPy', 'Temporal Evaluation', 'JavaScript'],
    image: '/projects/march-lab.webp',
    imageAlt: 'March Lab live men’s NCAA tournament app showing the historical bracket and model probabilities',
    link: 'https://github.com/roni-altshuler/march_madness_predictor',
    demo: 'https://roni-altshuler.github.io/march_madness_predictor/',
    evidenceLink: 'https://github.com/roni-altshuler/march_madness_predictor#measured-prediction-record',
    evidenceLabel: 'Read the Evaluation',
  },
  {
    name: 'nfl_predictor',
    displayName: 'Gridiron',
    category: 'American Football · NFL Forecasting',
    description:
      'NFL game probabilities, season projections, and playoff scenarios. I built a model that accounts for football scoring patterns and an interactive Forecast Lab for exploring matchups and possible outcomes.',
    evidence:
      'The documentation compares forecasts with Elo and historical market prices, and explains the limits of its evaluation and playoff simulations.',
    methods: ['Python', 'Monte Carlo', 'Probability Calibration', 'Next.js'],
    image: '/projects/gridiron.webp',
    imageAlt: 'Gridiron NFL forecasting dashboard showing weekly matchups and the Forecast Lab',
    link: 'https://github.com/roni-altshuler/nfl_predictor',
    demo: 'https://nfl-predictor-five.vercel.app',
    evidenceLink: 'https://github.com/roni-altshuler/nfl_predictor#the-record',
    evidenceLabel: 'Read the Evaluation',
  },
  {
    name: 'soccer_predictor',
    displayName: 'Pitchverse',
    category: 'Football · matches and tournaments',
    description:
      'Match probabilities, season projections and knockout brackets. I connected football data and forecasting models to an interface for following teams and exploring possible outcomes.',
    evidence:
      'Published evaluations separate match, season and tournament performance. The historical match benchmark trails the market.',
    methods: ['Python', 'Temporal evaluation', 'Next.js'],
    image: '/projects/pitchverse.webp',
    imageAlt: 'Pitchverse live football forecasting website with matchday and competition information.',
    link: 'https://github.com/roni-altshuler/soccer_predictor',
    demo: 'https://soccer-stats-predictor-sigma.vercel.app',
    evidenceLink: 'https://github.com/roni-altshuler/soccer_predictor#where-the-model-actually-stands',
    evidenceLabel: 'Read the evaluation',
  },
  {
    name: 'SongAnalyzer',
    displayName: 'SongAnalyzer',
    category: 'Music · language and audio',
    description:
      'A web application for exploring songs through lyrics and sound. I combined language analysis, audio features processed in the browser and a music discovery interface in one application.',
    evidence:
      'The source documents its transformer and keyword engines, audio processing, and fallbacks. Mood labels are exploratory interpretations.',
    methods: ['TypeScript', 'NLP', 'Web Audio'],
    image: '/projects/song-analyzer.webp',
    imageAlt: 'SongAnalyzer live website for exploring the mood of lyrics and audio.',
    link: 'https://github.com/roni-altshuler/SongAnalyzer',
    demo: 'https://song-analyzer-pi.vercel.app',
    evidenceLink: 'https://github.com/roni-altshuler/SongAnalyzer#the-hybrid-analysis-engine',
    evidenceLabel: 'How the analysis works',
  },
];

export const PROJECT_REPOS = PROJECTS.map((project) => project.name);
