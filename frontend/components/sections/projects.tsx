import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';

type ProjectItem = { title: string; description: string; github?: string };
type ProjectsSectionProps = {
  title?: string;
  projects?: ProjectItem[];
};

export function ProjectsSection({ title = 'Projects', projects = [] }: ProjectsSectionProps) {
  return (
    <section id="projects" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <h3 className="mb-2 text-lg font-medium text-white">{project.title}</h3>
            <p className="text-sm leading-6 text-slate-400">{project.description}</p>

            {project.github ? (
              <Link
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
              >
                <Github size={16} />
                View Repository
                <ExternalLink size={14} />
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
