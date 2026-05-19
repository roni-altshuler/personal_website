import Image from 'next/image';

export default function Figure({ src, alt = '', caption, width = 1200, height = 800 }) {
  if (!src) {
    return (
      <figure className="my-8 rounded-lg border border-dashed border-border bg-card p-8 text-center text-secondary">
        <span className="block text-sm uppercase tracking-wider">Figure placeholder</span>
        {caption && <figcaption className="mt-2 text-sm italic">{caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt || caption || ''}
        width={width}
        height={height}
        className="w-full rounded-lg border border-border"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm italic text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
