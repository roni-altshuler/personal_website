import { notFound } from 'next/navigation';
import CaseStudyHeader from '../../../components/mdx/CaseStudyHeader';
import NextPrevNav from '../../../components/mdx/NextPrevNav';
import TrackOnMount from '../../../components/analytics/TrackOnMount';
import { CASE_STUDY_SLUGS } from '../../../data/research';

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

async function loadCaseStudy(slug) {
  if (!CASE_STUDY_SLUGS.includes(slug)) return null;
  const mod = await import(`../../../content/research/${slug}.mdx`);
  return { Content: mod.default, frontmatter: mod.frontmatter };
}

function neighbors(slug) {
  const i = CASE_STUDY_SLUGS.indexOf(slug);
  const prevSlug = i > 0 ? CASE_STUDY_SLUGS[i - 1] : null;
  const nextSlug = i < CASE_STUDY_SLUGS.length - 1 ? CASE_STUDY_SLUGS[i + 1] : null;
  return { prevSlug, nextSlug };
}

async function neighborFrontmatter(slug) {
  if (!slug) return null;
  const mod = await import(`../../../content/research/${slug}.mdx`);
  return { slug, title: mod.frontmatter.title };
}

export async function generateMetadata({ params }) {
  const cs = await loadCaseStudy(params.slug);
  if (!cs) return {};
  const { title, summary } = cs.frontmatter;
  return {
    title: `${title} — Case Study`,
    description: summary,
    alternates: { canonical: `/work-experience/${params.slug}` },
    openGraph: {
      title: `${title} · Roni Altshuler`,
      description: summary,
      url: `/work-experience/${params.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const cs = await loadCaseStudy(params.slug);
  if (!cs) notFound();

  const { Content, frontmatter } = cs;
  const { prevSlug, nextSlug } = neighbors(params.slug);
  const [prev, next] = await Promise.all([
    neighborFrontmatter(prevSlug),
    neighborFrontmatter(nextSlug),
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <TrackOnMount event="case_study_view" data={{ slug: params.slug }} />
      <CaseStudyHeader {...frontmatter} />
      <div className="text-text">
        <Content />
      </div>
      <NextPrevNav prev={prev} next={next} />
    </article>
  );
}
