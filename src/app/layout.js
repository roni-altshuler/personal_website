import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: 'Roni Altshuler',
  description: 'Personal website for Roni Altshuler, Biomolecular Engineer and Bioinformatician.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem('theme');
                if (saved) {
                  document.documentElement.setAttribute('data-theme', saved);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=explicit`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}