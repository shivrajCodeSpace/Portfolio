"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Code2, GraduationCap, Mail, Sparkles } from 'lucide-react';

const skills = ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'UI/UX', 'Full-Stack Development'];
const projects = [
  {
    title: 'Modern Web Applications',
    description: 'Designed and built fast, responsive web products with strong user experience and clean architecture.',
  },
  {
    title: 'Product-Focused Development',
    description: 'Delivered features with a balance of performance, scalability, and polished front-end experiences.',
  },
  {
    title: 'Creative Problem Solving',
    description: 'Turned complex requirements into practical, elegant solutions across web and product workflows.',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Software Engineer & Product Builder</p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              I build modern web experiences that blend technology, design, and business impact.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              I’m a developer focused on crafting scalable products, thoughtful interfaces, and practical solutions that help people and teams grow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950">
                Explore Work <ArrowRight size={16} />
              </a>
              <a href="#contact" className="rounded-full border border-cyan-400/40 px-4 py-2 font-medium text-cyan-200">
                Connect With Me
              </a>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="rounded-full border border-cyan-400/30 bg-slate-800/70 p-2 shadow-lg shadow-cyan-500/10">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover sm:h-48 sm:w-48"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <section id="about" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="mb-3 flex items-center gap-2 text-cyan-300">
            <Sparkles size={18} />
            <h2 className="text-xl font-semibold">Profile Overview</h2>
          </div>
          <p className="text-slate-300 leading-7">
            Passionate about building elegant digital products from concept to launch. I enjoy solving technical challenges, improving user experiences, and turning ideas into reliable, modern applications.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="mb-3 flex items-center gap-2 text-cyan-300">
            <Briefcase size={18} />
            <h2 className="text-xl font-semibold">Experience</h2>
          </div>
          <p className="text-slate-300 leading-7">
            Experienced in front-end engineering, product development, and building polished web platforms that combine performance, usability, and maintainability.
          </p>
        </div>
      </section>

      <section id="skills" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <Code2 size={18} />
          <h2 className="text-xl font-semibold">Core Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="projects" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-white">What I Bring</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <h3 className="mb-2 text-lg font-medium text-white">{project.title}</h3>
              <p className="text-sm leading-6 text-slate-400">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <GraduationCap size={18} />
          <h2 className="text-xl font-semibold">Education</h2>
        </div>
        <p className="text-slate-300 leading-7">
          Strong academic foundation combined with hands-on experience in software development, design thinking, and modern web technologies.
        </p>
      </section>

      <section id="contact" className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">
        <div className="flex items-center gap-2 text-cyan-300">
          <Mail size={18} />
          <h2 className="text-xl font-semibold">Let&apos;s build something great</h2>
        </div>
        <p className="mt-3 text-slate-300">shivrajchakraborty725@gmail.com • +91 9366316159</p>
      </section>
    </main>
  );
}
