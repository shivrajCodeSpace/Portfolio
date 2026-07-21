"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type HeroSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function HeroSection({
  eyebrow = 'Software Engineer & Product Builder',
  title = 'I build modern web experiences that blend technology, design, and business impact.',
  description = 'I’m a developer focused on crafting scalable products, thoughtful interfaces, and practical solutions that help people and teams grow.',
  primaryCta = 'Explore Work',
  secondaryCta = 'Connect With Me',
  imageSrc = '/profile.jpeg',
  imageAlt = 'Profile',
}: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen items-center rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">{eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-slate-300">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950">
              {primaryCta} <ArrowRight size={16} />
            </a>
            <a href="#contact" className="rounded-full border border-cyan-400/40 px-4 py-2 font-medium text-cyan-200">
              {secondaryCta}
            </a>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="rounded-full border border-cyan-400/30 bg-slate-800/70 p-2 shadow-lg shadow-cyan-500/10">
            <img src={imageSrc} alt={imageAlt} className="h-40 w-40 rounded-full object-cover sm:h-48 sm:w-48" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
