import Image from "next/image";
import Link from "next/link";
import HeroHeadline from "../components/HeroHeadline";
import OrganizationLogo from "../components/OrganizationLogo";
import ResearchMethods from "../components/ResearchMethods";
import { RESEARCH } from "../data/research";
import { PROJECTS } from "../data/projects";

const affiliations = [
  { id: "technion-phd", label: "PhD Research", href: "/research#technion-phd" },
  { id: "cz-biohub", label: "Research Associate", href: "/research#cz-biohub" },
  { id: "internships", label: "Research Internships", href: "/research#internships" },
  { id: "ucsc-ms", label: "Undergraduate & Graduate Study", href: "/about#education" },
];

const selectedProjects = ["nfl_predictor", "SongAnalyzer"].map(name => PROJECTS.find(project => project.name === name));

export default function Home() {
  return (
    <div className="page-shell home-shell">
      <section className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="hero-status"><span aria-hidden="true" />PhD Student at the Technion</p>
          <HeroHeadline />
          <p className="hero-discipline">Biomolecular Engineering<br />& Bioinformatics</p>
          <p className="lead">
            I study immunometabolism and aging through cell culture, microscopy,
            and computational analysis in the Ron-Harel Lab.
          </p>
          <div className="hero-actions">
            <Link href="/research" className="button">Explore My Research <span aria-hidden="true">↗</span></Link>
            <Link href="/contact" className="button button-secondary">Get in Touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <figure className="hero-portrait">
          <Image src="/portraits/roni-altshuler-face-refined.webp" alt="Portrait of Roni Altshuler wearing a cream sweater against a gray background" width={1122} height={1402} sizes="(max-width: 639px) min(310px, calc(100vw - 44px)), (max-width: 899px) 35vw, 420px" priority />
          <figcaption><span>Ron-Harel Lab</span><span>Technion, Israel</span></figcaption>
        </figure>
      </section>

      <section className="affiliations-section" aria-label="Research and Education">
        <p className="eyebrow">Research & Education</p>
        <div className="affiliations">
          {affiliations.map(({ id, label, href }) => {
            const entry = RESEARCH.find(item => item.id === id);
            return (
              <Link data-motion-card="compact" className="affiliation" href={href} key={id}>
                <OrganizationLogo entry={entry} className="affiliation-logo" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-section" aria-labelledby="selected-work">
        <div className="section-heading">
          <div><p className="eyebrow">Experimental Biology & Computation</p><h2 id="selected-work">Research in Focus</h2></div>
          <Link href="/research" className="text-link">Research & Experience <span aria-hidden="true">↗</span></Link>
        </div>
        <article data-motion-card="subtle" className="current-research" aria-labelledby="current-research-title">
          <div className="research-copy">
            <div className="research-affiliation">
              <OrganizationLogo entry={RESEARCH.find(entry => entry.id === "technion-phd")} className="work-logo" />
              <p className="eyebrow">Current PhD Research</p>
            </div>
            <h3 id="current-research-title">Immunometabolism<br />& Aging</h3>
            <p>At the Technion, I culture lymph node stromal cells, work with T-cell cocultures, and use staining and microscopy to examine cells and their extracellular matrix. I combine this experimental work with single cell and spatial analysis.</p>
            <Link href="/research#technion-phd" className="text-link">Explore My PhD Research <span aria-hidden="true">↗</span></Link>
          </div>
          <ResearchMethods />
        </article>
        <div className="content-grid research-highlights">
          <article data-motion-card="subtle" className="work-card">
            <OrganizationLogo entry={RESEARCH.find(entry => entry.id === "cz-biohub")} className="work-logo" />
            <p className="eyebrow">Chan Zuckerberg Biohub</p>
            <h3>Cell Segmentation</h3>
            <p>I developed Cellpose models and training datasets to identify cells in zebrafish embryo images collected with MERFISH.</p>
            <Link href="/research#cz-biohub" className="text-link">Explore the Work <span aria-hidden="true">↗</span></Link>
          </article>
          <article data-motion-card="subtle" className="work-card">
            <OrganizationLogo entry={RESEARCH.find(entry => entry.id === "ucsc-genomics")} className="work-logo" />
            <p className="eyebrow">UC Santa Cruz</p>
            <h3>Spatial Transcriptomics</h3>
            <p>For my master&apos;s research, I combined cell segmentation and spatial analysis to study gene expression in a human breast cancer model.</p>
            <Link href="/research#ucsc-genomics" className="text-link">Explore the Work <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>

      <section className="home-section" aria-labelledby="software">
        <div className="section-heading">
          <div><p className="eyebrow">Models, Data & Applications</p><h2 id="software">Selected Software</h2></div>
          <Link href="/projects" className="text-link">All Projects <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="selected-projects">
          {selectedProjects.map(project => (
            <article data-motion-card="standard" className="selected-project" key={project.name}>
              <Link className="selected-project-image" href={`/projects#${project.name}`} aria-label={`Explore ${project.displayName}`}>
                <Image src={project.image} alt={project.imageAlt} width={1280} height={800} sizes="(max-width: 639px) calc(100vw - 44px), (max-width: 1319px) 46vw, 604px" />
              </Link>
              <div className="selected-project-copy">
                <p className="eyebrow">{project.name === "nfl_predictor" ? "NFL Forecasting" : "Music & Audio"}</p>
                <h3>{project.displayName}</h3>
                <p>{project.name === "nfl_predictor"
                  ? "Game probabilities, season projections, and playoff scenarios, with an interactive Forecast Lab."
                  : "An application for exploring songs through lyrics, audio features, and music discovery."}</p>
                <Link className="text-link" href={`/projects#${project.name}`}>Explore {project.displayName} <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-note" aria-labelledby="personal">
        <div><p className="eyebrow">A Little More About Me</p><h2 id="personal">Outside the Lab</h2></div>
        <div>
          <p>Watching friends face cancer first drew me to biology. Outside my research, I train for endurance events, play soccer, and work on software projects.</p>
          <Link href="/about" className="text-link">About Me <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section data-motion-card="subtle" className="home-contact" aria-labelledby="home-contact-heading">
        <div><p className="eyebrow">Research, Collaboration & Opportunities</p><h2 id="home-contact-heading">Let&apos;s Connect</h2></div>
        <Link href="/contact" className="button">Get in Touch <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
