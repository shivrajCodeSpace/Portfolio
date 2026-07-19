import { GraduationCap } from 'lucide-react';

export function EducationSection() {
  return (
    <section id="education" className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="mb-6 flex items-center gap-2 text-cyan-300">
        <GraduationCap size={18} />
        <h2 className="text-xl font-semibold">Education & Experience</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="mb-2 text-lg font-semibold text-white">Qualification</h3>
          <p className="text-slate-300 leading-7">
            Completed 10th grade in 2023 at PM SHRI Ganganagar H.S School and completed diploma in 2026 from Gomati District Polytechnic.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>• 10th grade completed in 2023 at PM SHRI Ganganagar H.S School</li>
            <li>• Diploma completed in Computer Science and Technology 2026 from Gomati District Polytechnic</li>
            <li>• Prepared for engineering and software development studies through focused coursework</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="mb-2 text-lg font-semibold text-white">Experience</h3>
          <p className="text-slate-300 leading-7">
            Completed internships and training programs with practical experience in mobile app development, pharmacy ecosystem workflows, and applied software engineering.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
              <p className="mb-2 text-sm font-medium text-white">IoT Training Certificate</p>
              <img
                src="/Nielit%20Intership.jpeg"
                alt="IoT Certificate"
                className="h-40 w-full rounded-2xl object-cover"
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3">
              <p className="mb-2 text-sm font-medium text-white">React Native Internship Certificate</p>
              <img
                src="/Software%20world%20intership.jpeg"
                alt="Internship Certificate"
                className="h-40 w-full rounded-2xl object-cover"
              />
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>• Built practical mobile and web solutions while learning React Native, PHP, and REST APIs</li>
            <li>• Gained real-world experience through project-driven internship work</li>
            <li>• Strengthened problem solving by applying technical training toward product delivery</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
