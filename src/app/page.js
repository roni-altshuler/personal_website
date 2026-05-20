import Image from 'next/image';
import Link from 'next/link';
import KineticHero from '../components/hero/KineticHero';
import { FadeUp } from '../components/anim/Reveal';

export default function Home() {
  return (
    <>
      <KineticHero />

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-start">
          <FadeUp delay={0.1}>
            <Image
              src="/profile.PNG"
              alt="Roni Altshuler"
              width={160}
              height={160}
              sizes="(max-width: 768px) 120px, 160px"
              className="h-32 w-32 shrink-0 rounded-full object-cover transition-transform duration-300 ease-out hover:scale-[1.03] md:h-40 md:w-40"
              priority
            />
          </FadeUp>
          <div className="flex flex-col gap-4">
            <FadeUp delay={0.2} as="p" className="text-sm font-medium uppercase tracking-wide text-secondary">
              PhD Candidate, Immunometabolism &amp; Aging @ Technion
              <span aria-hidden="true" className="mx-3 text-primary">
                ●
              </span>
              Single-Cell &amp; Spatial Omics
              <span aria-hidden="true" className="mx-3 text-primary">
                ●
              </span>
              Computational Biology
            </FadeUp>
            <FadeUp delay={0.35} as="p" className="text-base leading-relaxed text-text md:text-lg">
              Hi, I&apos;m Roni. Watching friends battle cancer sparked my
              lifelong curiosity about why diseases occur and how we can better
              treat them. That passion led me to study oncology, genomics, and
              bioinformatics, and now as a PhD student in the{' '}
              <a
                href="https://www.ronharellab.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Ron-Harel Lab
              </a>{' '}
              at the Technion, I&apos;m working to uncover how immune and
              metabolic pathways shape health and disease, with the goal of
              translating scientific discovery into real therapeutic impact.
            </FadeUp>
            <FadeUp delay={0.5} as="p" className="text-base leading-relaxed text-text md:text-lg">
              Before the PhD I earned my B.S. and M.S. in Biomolecular
              Engineering &amp; Bioinformatics at UC Santa Cruz, where I built
              computational pipelines on spatial transcriptomics, single-cell,
              and CRISPR/Cas9 data. I keep ending up at the seam between
              biology and code.
            </FadeUp>
            <FadeUp delay={0.65} as="p" className="text-base leading-relaxed text-text md:text-lg">
              Outside the lab, I race endurance events and have played soccer
              my whole life. Both keep me sharp, both keep me sane.
            </FadeUp>
            <FadeUp delay={0.85} as="div" className="mt-2 flex gap-5 text-2xl text-secondary">
              <a
                href="https://github.com/roni-altshuler"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-primary"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/roni-altshuler/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-primary"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <Link
                href="/contact"
                aria-label="Contact"
                className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-primary"
              >
                <i className="fas fa-envelope"></i>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
