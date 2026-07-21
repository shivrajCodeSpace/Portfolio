import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { EducationSection } from '@/components/sections/education';
import { ContactSection } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full mx-auto flex flex-col gap-6 px-6 py-10">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
