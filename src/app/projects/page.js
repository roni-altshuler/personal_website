import BentoProjects from '../../components/projects/BentoProjects';

export default function Projects() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Software Projects</h1>
        <p className="lead">
          I build forecasting tools and interactive applications around sports and
          music. These projects bring together data analysis, statistical modeling,
          and web development.
        </p>
        <p>
          These are ongoing personal projects. Each links to a public demo and
          source code, with documentation explaining its methods and limitations.
        </p>
      </header>
      <BentoProjects />
    </div>
  );
}
