"use client";

import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { EducationSection } from '@/components/sections/education';
import { ContactSection } from '@/components/sections/contact';

type SkillItem = { name: string; level: number };
type ProjectItem = { title: string; description: string };
type CertificateItem = { title: string; src: string; alt: string };
type SocialLink = { label: string; href: string; icon: string };

type PortfolioData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    imageSrc: string;
    imageAlt: string;
  };
  about: {
    overviewTitle: string;
    overviewText: string;
    experienceTitle: string;
    experienceText: string;
  };
  skills: {
    title: string;
    items: SkillItem[];
  };
  projects: {
    title: string;
    items: ProjectItem[];
  };
  education: {
    title: string;
    qualificationText: string;
    qualificationBullets: string[];
    experienceText: string;
    experienceBullets: string[];
    certificates: CertificateItem[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    socialLinks: SocialLink[];
  };
};

const fallbackData: PortfolioData = {
  hero: {
    eyebrow: 'Software Engineer & Product Builder',
    title: 'I build modern web experiences that blend technology, design, and business impact.',
    description:
      'I’m a developer focused on crafting scalable products, thoughtful interfaces, and practical solutions that help people and teams grow.',
    primaryCta: 'Explore Work',
    secondaryCta: 'Connect With Me',
    imageSrc: '/profile.jpeg',
    imageAlt: 'Shivraj Chakraborty',
  },
  about: {
    overviewTitle: 'Profile Overview',
    overviewText:
      'Passionate about building elegant digital products from concept to launch. I enjoy solving technical challenges, improving user experiences, and turning ideas into reliable, modern applications.',
    experienceTitle: 'Experience',
    experienceText:
      'Experienced in front-end engineering, product development, and building polished web platforms that combine performance, usability, and maintainability.',
  },
  skills: {
    title: 'Core Skills',
    items: [
      { name: 'Next.js', level: 92 },
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'MongoDB', level: 78 },
      { name: 'UI/UX', level: 88 },
      { name: 'Full-Stack Development', level: 91 },
    ],
  },
  projects: {
    title: 'Projects',
    items: [
      {
        title: 'ACADEMIA',
        description:
          'College Management System built during the 2nd year of diploma, focused on student records, attendance, course schedules, and administrative workflows.',
      },
      {
        title: 'DOORMED',
        description:
          'Pharmacy-based ecosystem developed after the 3rd year, designed to manage medicine catalogs, orders, customer records, and delivery coordination.',
      },
    ],
  },
  education: {
    title: 'Education & Experience',
    qualificationText:
      'Completed 10th grade in 2023 at PM SHRI Ganganagar H.S School and completed diploma in 2026 from Gomati District Polytechnic.',
    qualificationBullets: [
      '10th grade completed in 2023 at PM SHRI Ganganagar H.S School',
      'Diploma completed in Computer Science and Technology 2026 from Gomati District Polytechnic',
      'Prepared for engineering and software development studies through focused coursework',
    ],
    experienceText:
      'Completed internships and training programs with practical experience in mobile app development, pharmacy ecosystem workflows, and applied software engineering.',
    experienceBullets: [
      'Built practical mobile and web solutions while learning React Native, PHP, and REST APIs',
      'Gained real-world experience through project-driven internship work',
      'Strengthened problem solving by applying technical training toward product delivery',
    ],
    certificates: [
      {
        title: 'IoT Training Certificate',
        src: '/Nielit%20Intership.jpeg',
        alt: 'IoT training certificate',
      },
      {
        title: 'React Native Internship Certificate',
        src: '/Software%20world%20intership.jpeg',
        alt: 'Internship certificate',
      },
    ],
  },
  contact: {
    title: "Let's build something great",
    email: 'shivrajchakraborty725@gmail.com',
    phone: '+91 9366316159',
    socialLinks: [
      {
        label: 'Visit my LinkedIn',
        href: 'https://www.linkedin.com/in/shivraj-chakraborty-0ab312401/?skipRedirect=true',
        icon: 'linkedin',
      },
      {
        label: 'Visit my GitHub',
        href: 'https://github.com/shivrajCodeSpace',
        icon: 'github',
      },
    ],
  },
};

export default function HomePage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(fallbackData);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    async function loadPortfolioData() {
      try {
        const response = await fetch(`${apiUrl}/api/profile`);
        if (!response.ok) {
          throw new Error('Failed to load profile data');
        }
        const data = (await response.json()) as PortfolioData;
        setPortfolioData({
          hero: { ...fallbackData.hero, ...data.hero },
          about: { ...fallbackData.about, ...data.about },
          skills: { ...fallbackData.skills, ...data.skills },
          projects: { ...fallbackData.projects, ...data.projects },
          education: { ...fallbackData.education, ...data.education },
          contact: { ...fallbackData.contact, ...data.contact },
        });
      } catch {
        setPortfolioData(fallbackData);
      }
    }

    loadPortfolioData();
  }, []);

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
