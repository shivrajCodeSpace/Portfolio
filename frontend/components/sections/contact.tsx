"use client";

import { useState } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const phoneNumber = '+91 9366316159';
const emailAddress = 'shivrajchakraborty725@gmail.com';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyPhoneNumber = async () => {
    await navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        <Mail size={18} />
        <h2 className="text-xl font-semibold">Let&apos;s build something great</h2>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={`mailto:${emailAddress}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-cyan-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <Mail size={16} />
          {emailAddress}
        </a>
        <button
          type="button"
          onClick={copyPhoneNumber}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-cyan-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <Phone size={16} />
          {copied ? 'Copied!' : phoneNumber}
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <a
          href="https://www.linkedin.com/in/shivraj-chakraborty-0ab312401/?skipRedirect=true"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/15 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <Linkedin size={16} />
          Visit my LinkedIn
        </a>
        <a
          href="https://github.com/shivrajCodeSpace"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/15 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <Github size={16} />
          Visit my GitHub
        </a>
      </div>
    </section>
  );
}
