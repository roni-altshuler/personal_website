import CopyEmail from '../../components/CopyEmail';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../data/site';

export default function Contact() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Get in Touch</h1>
        <p className="lead">
          For research collaborations, career opportunities, or questions about my
          work, email is the best way to reach me.
        </p>
      </header>
      <div className="contact-layout">
        <section data-motion-card="subtle" className="contact-primary" aria-labelledby="email-heading">
          <h2 id="email-heading">Email Me</h2>
          <a className="email-address" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p>Open your email app, or select and copy this address.</p>
          <CopyEmail />
        </section>
        <section className="contact-secondary" aria-label="Find me elsewhere">
          <a data-motion-card="compact" className="contact-channel" href={LINKEDIN_URL}>
            <div><strong>LinkedIn</strong><span>Professional background & connections</span></div>
            <span aria-hidden="true">↗</span>
          </a>
          <a data-motion-card="compact" className="contact-channel" href={GITHUB_URL}>
            <div><strong>GitHub</strong><span>Source code & ongoing projects</span></div>
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
    </div>
  );
}
