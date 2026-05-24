import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleFieldLoader from '../components/background/ParticleFieldLoader';
import '../styles/globals.css';
import { Analytics } from "@vercel/analytics/next";

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

const SITE_URL = 'https://ronialtshuler.com';
const SITE_DESCRIPTION =
  'Personal website for Roni Altshuler, Biomolecular Engineer and Bioinformatician.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Roni Altshuler',
    template: '%s · Roni Altshuler',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Roni Altshuler',
  authors: [{ name: 'Roni Altshuler', url: SITE_URL }],
  keywords: [
    'Roni Altshuler',
    'Biomolecular Engineering',
    'Bioinformatics',
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
    siteName: 'Roni Altshuler',
    title: 'Roni Altshuler',
    description: SITE_DESCRIPTION,
    images: [{ url: '/profile.PNG', width: 800, height: 800, alt: 'Roni Altshuler' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roni Altshuler',
    description: SITE_DESCRIPTION,
    images: ['/profile.PNG'],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Roni Altshuler',
  url: SITE_URL,
  image: `${SITE_URL}/profile.PNG`,
  jobTitle: 'Biomolecular Engineer & Bioinformatician',
  description: SITE_DESCRIPTION,
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of California, Santa Cruz' },
  ],
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Technion – Israel Institute of Technology' },
  sameAs: [
    'https://github.com/roni-altshuler',
    'https://www.linkedin.com/in/roni-altshuler/',
  ],
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
      </body>
    </html>
  );
}