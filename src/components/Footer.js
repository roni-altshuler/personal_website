import Link from "next/link";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../data/site";
export default function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <div><Link href="/" className="wordmark">Roni Altshuler</Link><p>Biomolecular Engineering & Bioinformatics</p></div>
    <nav aria-label="Social links"><a href={GITHUB_URL}>GitHub ↗</a><a href={LINKEDIN_URL}>LinkedIn ↗</a><a href={`mailto:${EMAIL}`}>Email ↗</a></nav>
    <p className="copyright">© {new Date().getFullYear()} Ron Oshri Altshuler</p>
  </div></footer>;
}
