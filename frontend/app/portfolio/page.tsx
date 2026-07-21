"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { EducationSection } from '@/components/sections/education';
import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';
import { SkillsSection } from '@/components/sections/skills';
import { fallbackData, mergePortfolioData, type PortfolioData } from '@/lib/portfolio-data';
import { VISITOR_STORAGE_KEY } from '@/lib/visitor-data';

export default function PortfolioPage() {
  const router = useRouter();
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(fallbackData);
  const [canViewPortfolio, setCanViewPortfolio] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(VISITOR_STORAGE_KEY)) {
      router.replace('/register');
      return;
    }

    setCanViewPortfolio(true);

    async function loadPortfolioData() {
      try {
        const response = await fetch('/api/profile');

        if (!response.ok) {
          throw new Error('Failed to load profile data');
        }

        const data = (await response.json()) as PortfolioData;
        setPortfolioData(mergePortfolioData(data));
      } catch {
        setPortfolioData(fallbackData);
      }
    }

    loadPortfolioData();
  }, [router]);

  if (!canViewPortfolio) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-10 text-slate-300">
        Preparing visitor access...
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col gap-6 px-6 py-10">
      <HeroSection
        eyebrow={portfolioData.hero.eyebrow}
        title={portfolioData.hero.title}
        description={portfolioData.hero.description}
        primaryCta={portfolioData.hero.primaryCta}
        secondaryCta={portfolioData.hero.secondaryCta}
        imageSrc={portfolioData.hero.imageSrc}
        imageAlt={portfolioData.hero.imageAlt}
      />
      <AboutSection
        overviewTitle={portfolioData.about.overviewTitle}
        overviewText={portfolioData.about.overviewText}
        experienceTitle={portfolioData.about.experienceTitle}
        experienceText={portfolioData.about.experienceText}
      />
      <SkillsSection title={portfolioData.skills.title} skills={portfolioData.skills.items} />
      <ProjectsSection title={portfolioData.projects.title} projects={portfolioData.projects.items} />
      <EducationSection
        title={portfolioData.education.title}
        qualificationText={portfolioData.education.qualificationText}
        qualificationBullets={portfolioData.education.qualificationBullets}
        experienceText={portfolioData.education.experienceText}
        experienceBullets={portfolioData.education.experienceBullets}
        certificates={portfolioData.education.certificates}
      />
      <ContactSection
        title={portfolioData.contact.title}
        email={portfolioData.contact.email}
        phone={portfolioData.contact.phone}
        socialLinks={portfolioData.contact.socialLinks}
      />
    </div>
  );
}
