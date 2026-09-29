"use client";
import Link from 'next/link';
export default function ErrorPage({ reset }) {
  return <div className="page-shell error-page"><p className="eyebrow">Something Went Wrong</p><h1>This Page Could Not Load</h1><p>Try again, or send me a note if the problem continues.</p><div className="hero-actions"><button type="button" onClick={reset} className="button">Try Again</button><Link href="/contact" className="button button-secondary">Contact Me</Link></div></div>;
}
