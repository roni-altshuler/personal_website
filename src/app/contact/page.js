const CHANNELS = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'roni.altshuler@gmail.com',
    href: 'mailto:roni.altshuler@gmail.com',
    external: false,
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/roni-altshuler',
    href: 'https://www.linkedin.com/in/roni-altshuler/',
    external: true,
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    value: 'github.com/roni-altshuler',
    href: 'https://github.com/roni-altshuler',
    external: true,
  },
];

export default function Contact() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-3 text-center text-4xl font-bold text-text">Get in touch</h1>
      <p className="mb-10 text-center text-base text-secondary">
        Best ways to reach me — happy to chat about research, internships, or collaborations.
      </p>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
        <ul className="flex flex-col gap-2">
          {CHANNELS.map(({ icon, label, value, href, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-bg-secondary"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-lg text-primary transition-colors group-hover:border-primary"
                >
                  <i className={icon}></i>
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-secondary">{label}</span>
                  <span className="text-base font-semibold text-text transition-colors group-hover:text-primary">
                    {value}
                  </span>
                </span>
                <i
                  className="fas fa-arrow-up-right-from-square ml-auto text-sm text-secondary opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                ></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
