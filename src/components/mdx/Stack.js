export default function Stack({ title, items = [] }) {
  return (
    <aside className="my-8 rounded-lg border border-border bg-card p-5 text-card-text">
      {title && (
        <h4 className="mb-3 text-xs uppercase tracking-wider text-secondary">
          {title}
        </h4>
      )}
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-full border border-border px-3 py-1 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
