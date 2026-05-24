import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Explore",
    items: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Skills", href: "/skills" },
    ],
  },
  {
    heading: "Background",
    items: [
      { label: "Education", href: "/education" },
      { label: "Work experience", href: "/work-experience" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Elsewhere",
    items: [
      { label: "GitHub", href: "https://github.com/roni-altshuler", external: true },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/roni-altshuler/",
        external: true,
      },
      { label: "Email", href: "mailto:ronaltshuler1@gmail.com" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-section border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-ink">
              <span
                aria-hidden="true"
                className="inline-block h-3.5 w-3.5 rounded-[4px] bg-linear-accent"
              />
              <span className="font-display text-sm font-semibold tracking-tight">
                Roni Altshuler
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-subtle">
              Biomolecular engineer & bioinformatician. PhD candidate in the
              Ron-Harel Lab, Technion. Working where biology meets code
            </p>
          </div>
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h2 className="eyebrow !mb-3">{col.heading}</h2>
              <ul className="space-y-2.5 text-sm">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-subtle transition-colors hover:text-ink"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-ink-subtle transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-ink-tertiary md:flex-row md:items-center">
          <span>&copy; {year} Ron Oshri Altshuler · All rights reserved</span>
          <span className="mono">
            Built with Next.js · Designed in Linear&apos;s language
          </span>
        </div>
      </div>
    </footer>
  );
}
