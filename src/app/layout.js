import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

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
      <body>
        <Navbar />
        {children}
        <Footer />
        <Script src="https://kit.fontawesome.com/885a523834.js" crossOrigin="anonymous" />
      </body>
    </html>
  );
}