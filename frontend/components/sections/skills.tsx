import Link from "next/link";
import {
  Code2,
  Github,
  ExternalLink,
} from "lucide-react";

const skills = [
  {
    name: "DSA IN C++",
    level: 40,
    description:
      "Build modern full-stack applications using the Next.js App Router.",
    github: "https://github.com/shivrajCodeSpace/DSA-in-C-",
  },
  {
    name: "OPPS",
    level: 10,
    description:
      "Develop reusable UI components and scalable frontend applications.",
    github: "https://github.com/shivrajCodeSpace/OPPS-In-Cpp",
  },
//   {
//     name: "TypeScript",
//     level: 90,
//     description:
//       "Create type-safe, maintainable, and scalable applications.",
//     github: "https://github.com/yourusername/typescript-projects",
//   },
//   {
//     name: "Node.js",
//     level: 85,
//     description:
//       "Develop REST APIs and backend services using Express.js.",
//     github: "https://github.com/yourusername/nodejs-projects",
//   },
//   {
//     name: "MongoDB",
//     level: 80,
//     description:
//       "Design scalable NoSQL databases using MongoDB Atlas.",
//     github: "https://github.com/yourusername/mongodb-projects",
//   },
//   {
//     name: "UI / UX Design",
//     level: 88,
//     description:
//       "Design clean, responsive and user-friendly interfaces.",
//     github: "https://github.com/yourusername/design-projects",
//   },
//   {
//     name: "Full Stack Development",
//     level: 92,
//     description:
//       "Complete frontend + backend web application development.",
//     github: "https://github.com/yourusername/fullstack-projects",
//   },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
    >
      {/* Section Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/20 p-2">
          <Code2 className="text-cyan-400" size={22} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            Technical Skills
          </h2>

          <p className="text-sm text-slate-400">
            Click any skill to explore real GitHub projects demonstrating my
            experience.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group rounded-2xl border border-white/10 bg-slate-950/70 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            {/* Skill Name */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {skill.name}
              </h3>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
                {skill.level}%
              </span>
            </div>

            {/* Description */}
            <p className="mb-5 text-sm leading-6 text-slate-400">
              {skill.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-5">
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>

            {/* GitHub Button */}
            <Link
              href={skill.github}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-500 hover:text-white"
            >
              <Github size={18} />

              View GitHub Repository

              <ExternalLink size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}