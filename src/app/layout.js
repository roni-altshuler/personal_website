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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
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