import { Github, Linkedin, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        <Mail size={18} />
        <h2 className="text-xl font-semibold">Let&apos;s build something great</h2>
      </div>
      <p className="mt-3 text-slate-300">
        <a href="mailto:shivrajchakraborty725@gmail.com" className="font-medium text-cyan-200 underline-offset-2 hover:underline">
          shivrajchakraborty725@gmail.com
        </a>
        <span className="mx-2">•</span>
        +91 9366316159
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <a
          href="https://www.linkedin.com/in/shivraj-chakraborty-0ab312401/?skipRedirect=true"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-white/15"
        >
          <Linkedin size={16} />
          Visit my LinkedIn
        </a>
        <a
          href="https://github.com/shivrajCodeSpace"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-white/15"
        >
          <Github size={16} />
          Visit my GitHub
        </a>
      </div>
    </section>
  );
}
