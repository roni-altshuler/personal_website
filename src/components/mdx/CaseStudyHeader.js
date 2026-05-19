import Image from 'next/image';
import Link from 'next/link';
import MetricCallout from './MetricCallout';

export default function CaseStudyHeader({
  title,
  subtitle,
  date,
  logo,
  logoAlt,
  link,
  summary,
  metrics = [],
}) {
  return (
    <header className="border-b border-border pb-8 mb-8">
      <Link
        href="/work-experience"
        className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors"
      >
        ← Back to Work Experience
      </Link>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
        {logo && (
          <div className="shrink-0">
            <Image
              src={logo}
              alt={logoAlt || ''}
              width={80}
              height={80}
              className="h-16 w-16 object-contain md:h-20 md:w-20"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-secondary">{subtitle}</p>
          )}
          <p className="mt-1 text-sm italic text-secondary">{date}</p>
        </div>
      </div>

      {summary && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text">
          {summary}
        </p>
      )}

      {metrics.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {metrics.map((m, i) => (
            <MetricCallout key={i} value={m.value} label={m.label} from={m.from} />
          ))}
        </div>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm text-primary hover:underline"
        >
          Visit organization →
        </a>
      )}
    </header>
  );
}
