export const metadata = {
  title: 'Projects',
  description:
    'Independent projects by Roni Altshuler: MotorsportVerse race forecasting, Hardwood NBA predictions, Pitchverse football forecasts, and SongAnalyzer music analysis.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects · Roni Altshuler',
    description:
      'Explore open source projects in sports forecasting and music analysis, with live demos, source code, and documented methods.',
    url: '/projects',
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
