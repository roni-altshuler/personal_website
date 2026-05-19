import MetricCallout from './components/mdx/MetricCallout';
import Figure from './components/mdx/Figure';
import TwoColumn from './components/mdx/TwoColumn';
import Stack from './components/mdx/Stack';

export function useMDXComponents(components) {
  return {
    MetricCallout,
    Figure,
    TwoColumn,
    Stack,
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-text">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-3 text-2xl font-semibold tracking-tight text-text">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-2 text-xl font-semibold text-text">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-relaxed text-text">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-text">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-text">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary underline-offset-2 hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary bg-card px-5 py-3 italic text-card-text">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-card px-1.5 py-0.5 text-sm text-card-text">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm text-card-text">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-8 border-border" />,
    ...components,
  };
}
