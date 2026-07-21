import { Briefcase, Sparkles } from 'lucide-react';

type AboutSectionProps = {
  overviewTitle?: string;
  overviewText?: string;
  experienceTitle?: string;
  experienceText?: string;
};

export function AboutSection({
  overviewTitle = 'Profile Overview',
  overviewText = 'Passionate about building elegant digital products from concept to launch. I enjoy solving technical challenges, improving user experiences, and turning ideas into reliable, modern applications.',
  experienceTitle = 'Experience',
  experienceText = 'Experienced in front-end engineering, product development, and building polished web platforms that combine performance, usability, and maintainability.',
}: AboutSectionProps) {
  return (
    <section id="about" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <Sparkles size={18} />
          <h2 className="text-xl font-semibold">{overviewTitle}</h2>
        </div>
        <p className="text-slate-300 leading-7">{overviewText}</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <div className="mb-3 flex items-center gap-2 text-cyan-300">
          <Briefcase size={18} />
          <h2 className="text-xl font-semibold">{experienceTitle}</h2>
        </div>
        <p className="text-slate-300 leading-7">{experienceText}</p>
      </div>
    </section>
  );
}
