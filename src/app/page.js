import Image from 'next/image';
import Link from 'next/link';
import KineticHero from '../components/hero/KineticHero';
import SelectedWork from '../components/home/SelectedWork';
import SelectedProjects from '../components/home/SelectedProjects';
import ContactCTA from '../components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <KineticHero />

      <section className="mx-auto max-w-4xl px-6 py-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Image
            src="/profile.PNG"
            alt="Roni Altshuler"
            width={160}
            height={160}
            sizes="(max-width: 768px) 120px, 160px"
            className="h-32 w-32 shrink-0 rounded-full object-cover md:h-40 md:w-40"
            priority
          />
          <div className="flex flex-col gap-3">
            <p className="text-base leading-relaxed text-text md:text-lg">
              I&apos;m a PhD student at the{' '}
              <a
                href="https://www.ronharellab.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Technion
              </a>{' '}
              studying immunometabolism and aging. Before that I trained as a
              biomolecular engineer and bioinformatician, building computational
              pipelines on spatial transcriptomics, single-cell, and CRISPR/Cas9
              data — and I keep ending up at the seam between biology and code.
            </p>
            <div className="flex gap-4 text-xl text-secondary">
              <a
                href="https://github.com/roni-altshuler"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-primary"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/roni-altshuler/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-primary"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <Link
                href="/contact"
                aria-label="Contact"
                className="transition-colors hover:text-primary"
              >
                <i className="fas fa-envelope"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SelectedWork />
      <SelectedProjects />
      <ContactCTA />
    </>
  );
}
