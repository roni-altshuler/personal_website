import { FadeUp } from '../../components/anim/Reveal';
import TiltCard from '../../components/cards/TiltCard';

const CHANNELS = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    href: 'mailto:roni.altshuler@gmail.com',
    external: false,
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/roni-altshuler/',
    external: true,
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    href: 'https://github.com/roni-altshuler',
    external: true,
  },
];

export default function Contact() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <FadeUp as="h1" className="mb-3 text-center text-4xl font-bold text-text">
        Get in touch
      </FadeUp>
      <FadeUp delay={0.1} as="p" className="mb-10 text-center text-base text-text">
        Best ways to reach me. Happy to chat about research, internships, or collaborations
      </FadeUp>

      <FadeUp delay={0.2}>
        <TiltCard
          as="div"
          className="rounded-2xl border border-border bg-card px-8 py-10 shadow-soft transition-[border-color,box-shadow] duration-300 ease-out hover:border-primary hover:shadow-glow"
        >
          <ul className="m-0 flex list-none items-center justify-center gap-10 p-0">
            {CHANNELS.map(({ icon, label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border text-3xl text-primary transition-all duration-200 ease-out hover:scale-110 hover:border-primary hover:text-primary-hover"
                >
                  <i className={icon} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
        </TiltCard>
      </FadeUp>
    </main>
  );
}
