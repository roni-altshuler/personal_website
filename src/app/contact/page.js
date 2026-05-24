import { FadeUp } from "../../components/anim/Reveal";
import LinearCard from "../../components/cards/LinearCard";

const EMAIL = "roni.altshuler@gmail.com";

const CHANNELS = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    primary: true,
  },
  {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    handle: "in/roni-altshuler",
    href: "https://www.linkedin.com/in/roni-altshuler/",
    external: true,
  },
  {
    icon: "fab fa-github",
    label: "GitHub",
    handle: "roni-altshuler",
    href: "https://github.com/roni-altshuler",
    external: true,
  },
];

export default function Contact() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-32 pt-24 md:pt-32">
      <FadeUp>
        <span className="eyebrow">Reach out</span>
      </FadeUp>
      <FadeUp delay={0.05}>
        <h1
          className="mt-2 font-display font-semibold text-ink"
          style={{
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Let&apos;s talk
        </h1>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          Email is fastest. Research collaborations, internship leads, or
          anything at the seam between biology and code. Open invitation
        </p>
      </FadeUp>

      <div className="mt-14 grid gap-4 md:mt-16">
        {CHANNELS.map((c, i) => (
          <FadeUp key={c.label} whileInView delay={i * 0.08}>
            <LinearCard
              as="a"
              href={c.href}
              padding="p-0"
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-5 px-6 py-5 md:px-7 md:py-6"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-hairline bg-surface-2 text-xl text-linear-accent transition-colors group-hover:border-linear-accent-focus"
              >
                <i className={c.icon}></i>
              </span>

              <div className="flex flex-col">
                <span
                  className="font-display text-base font-medium text-ink md:text-lg"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {c.label}
                </span>
                <span className="mono text-xs text-ink-subtle md:text-sm">
                  {c.handle}
                </span>
              </div>

              <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink-subtle transition-colors group-hover:text-linear-accent">
                {c.primary ? "Compose" : "Open"}
                <span aria-hidden="true">→</span>
              </span>
            </LinearCard>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
