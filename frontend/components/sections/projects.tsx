const projects = [
  {
    title: 'ACADEMIA',
    description: 'College Management System built during the 2nd year of diploma, focused on student records, attendance, course schedules, and administrative workflows.',
  },
  {
    title: 'DOORMED',
    description: 'Pharmacy-based ecosystem developed after the 3rd year, designed to manage medicine catalogs, orders, customer records, and delivery coordination.',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <h3 className="mb-2 text-lg font-medium text-white">{project.title}</h3>
            <p className="text-sm leading-6 text-slate-400">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
