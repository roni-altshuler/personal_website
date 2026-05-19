import MagneticButton from '../MagneticButton';

export default function ContactCTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
        Let&apos;s talk.
      </h2>
      <p className="mt-3 max-w-xl mx-auto text-secondary">
        Open to collaborations on immunometabolism, single-cell and spatial
        transcriptomics, ML on biological imaging, and adjacent problems.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <MagneticButton
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-card shadow-soft transition-shadow hover:shadow-hover"
        >
          Send a message
        </MagneticButton>
        <MagneticButton
          href="/resume"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-text transition-colors hover:border-primary hover:text-primary"
        >
          View resume
        </MagneticButton>
      </div>
    </section>
  );
}
