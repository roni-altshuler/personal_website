import localFont from 'next/font/local';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CardInteractions from '../components/CardInteractions';
import '../styles/globals.css';
import '../styles/organizations.css';
import '../styles/motion.css';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NAME, ROLE, SITE_URL, GITHUB_URL, LINKEDIN_URL } from "../data/site";

const display = localFont({
  src: [
    { path: './_fonts/Inter-Regular.woff', weight: '400', style: 'normal' },
    { path: './_fonts/Inter-SemiBold.woff', weight: '600', style: 'normal' },
    { path: './_fonts/Inter-Bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-display', display: 'swap',
});

const SITE_DESCRIPTION =
  'Roni Altshuler is a biomolecular engineer and bioinformatician, PhD student at the Technion. Research in immunometabolism and aging through cell culture, microscopy, and single cell and spatial transcriptomics.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} · Computational Biology & Bioinformatics`,
    template: `%s · ${NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  keywords: [
    'Roni Altshuler',
    'Biomolecular Engineering',
    'Bioinformatics',
    'Computational Biology',
    'Cell Culture',
    'Immunofluorescence',
    'Confocal Microscopy',
    'Single cell transcriptomics',
    'Spatial transcriptomics',
    'Technion',
    'CZ Biohub',
    'CRISPR',
    'Immunometabolism',
  ],
  icons: { icon: '/lion-favicon.ico', shortcut: '/lion-favicon.ico' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: NAME,
    title: NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: NAME,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  url: SITE_URL,
  image: `${SITE_URL}/portraits/roni-altshuler-face-refined.webp`,
  jobTitle: ROLE,
  description: SITE_DESCRIPTION,
  knowsAbout: [
    'Bioinformatics',
    'Computational Biology',
    'Cell Culture',
    'Immunofluorescence',
    'Confocal Microscopy',
    'Single cell transcriptomics',
    'Spatial transcriptomics',
    'Immunometabolism',
    'CRISPR',
    'Genomics',
    'Machine Learning',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of California, Santa Cruz' },
  ],
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Technion, Israel Institute of Technology' },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={display.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a href="#main-content" className="skip-to-main">Skip to main content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <CardInteractions />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
