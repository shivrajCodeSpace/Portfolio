"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen items-center rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Computer Science Enginner</p>
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
  );
}
