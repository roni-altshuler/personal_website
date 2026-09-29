import Link from 'next/link';
export default function NotFound() {
  return <div className="page-shell error-page"><p className="eyebrow">Page Not Found</p><h1>Page Not Found</h1><p>The page may have moved. Explore my research or return to the homepage.</p><div className="hero-actions"><Link href="/" className="button">Back Home</Link><Link href="/research" className="button button-secondary">Research & Experience</Link></div></div>;
}
