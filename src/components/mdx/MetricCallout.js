export default function MetricCallout({ value, label, from }) {
  return (
    <div className="my-6 inline-flex flex-col items-start gap-1 rounded-lg border border-border bg-card px-5 py-4 text-card-text shadow-soft">
      <div className="flex items-baseline gap-2">
        {from && (
          <span className="text-secondary text-base font-medium line-through">
            {from}
          </span>
        )}
        <span className="text-primary text-3xl font-bold tracking-tight">
          {value}
        </span>
      </div>
      <span className="text-secondary text-xs uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
