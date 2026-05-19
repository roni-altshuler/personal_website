import Link from 'next/link';
import Card from '../Card';
import { RESEARCH, FEATURED_WORK_IDS } from '../../data/research';

function ModalBody({ entry }) {
  return (
    <ul>
      {entry.bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

export default function SelectedWork() {
  const featured = FEATURED_WORK_IDS
    .map((id) => RESEARCH.find((e) => e.id === id))
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
          Selected work
        </h2>
        <Link
          href="/work-experience"
          className="text-sm text-secondary transition-colors hover:text-primary"
        >
          All experience →
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {featured.map((entry) => (
          <Card
            key={entry.id}
            logo={entry.logo}
            logoAlt={entry.logoAlt}
            title={entry.title}
            description={entry.subtitle}
            date={entry.date}
            link={entry.link}
            modalContent={<ModalBody entry={entry} />}
          />
        ))}
      </div>
    </section>
  );
}
