import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleFieldLoader from '../components/background/ParticleFieldLoader';
import '../styles/globals.css';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NAME, ROLE, SITE_URL, GITHUB_URL, LINKEDIN_URL } from "../data/site";

const display = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const SITE_DESCRIPTION =
  'Roni Altshuler is a biomolecular engineer and bioinformatician, PhD candidate at the Technion. Building tools where biology meets code: single-cell and spatial transcriptomics, immunometabolism, and CRISPR.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: NAME,
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
    'Single-cell transcriptomics',
    'Spatial transcriptomics',
    'Technion',
    'CZ Biohub',
    'CRISPR',
    'Immunometabolism',
  ],
  icons: { icon: '/favicon.ico' },
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
  themeColor: '#010102',
  colorScheme: 'dark',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  url: SITE_URL,
  image: `${SITE_URL}/profile.PNG`,
  jobTitle: ROLE,
  description: SITE_DESCRIPTION,
  knowsAbout: [
    'Bioinformatics',
    'Computational Biology',
    'Single-cell transcriptomics',
    'Spatial transcriptomics',
    'Immunometabolism',
    'CRISPR',
    'Genomics',
    'Machine Learning',
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of California, Santa Cruz' },
  ],
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Technion – Israel Institute of Technology' },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-theme','dark');`,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <ParticleFieldLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main-content" className="skip-to-main">Skip to main content</a>
        <Navbar />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}