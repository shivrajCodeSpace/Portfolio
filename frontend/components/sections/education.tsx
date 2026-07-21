import { GraduationCap } from 'lucide-react';

type CertificateItem = { title: string; src: string; alt: string };
type EducationSectionProps = {
  title?: string;
  qualificationText?: string;
  qualificationBullets?: string[];
  experienceText?: string;
  experienceBullets?: string[];
  certificates?: CertificateItem[];
};

export function EducationSection({
  title = 'Education & Experience',
  qualificationText = 'Completed 10th grade in 2023 at PM SHRI Ganganagar H.S School and completed diploma in 2026 from Gomati District Polytechnic.',
  qualificationBullets = [],
  experienceText = 'Completed internships and training programs with practical experience in mobile app development, pharmacy ecosystem workflows, and applied software engineering.',
  experienceBullets = [],
  certificates = [],
}: EducationSectionProps) {
  return (
    <section id="education" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="mb-6 flex items-center gap-2 text-cyan-300">
        <GraduationCap size={18} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="mb-2 text-lg font-semibold text-white">Qualification</h3>
          <p className="text-slate-300 leading-7">{qualificationText}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {qualificationBullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="mb-2 text-lg font-semibold text-white">Experience</h3>
          <p className="text-slate-300 leading-7">{experienceText}</p>
          {certificates.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {certificates.map((certificate) => (
                <div key={certificate.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
                  <p className="mb-2 text-sm font-medium text-white">{certificate.title}</p>
                  <img src={certificate.src} alt={certificate.alt} className="h-40 w-full rounded-2xl object-cover" />
                </div>
              ))}
            </div>
          ) : null}
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {experienceBullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
