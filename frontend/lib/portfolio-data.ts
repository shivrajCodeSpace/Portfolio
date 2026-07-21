export type SkillItem = {
  name: string;
  level: number;
  description?: string;
  github?: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  github?: string;
};

export type CertificateItem = {
  title: string;
  src: string;
  alt: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type PortfolioData = {
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

export const fallbackData: PortfolioData = {
  hero: {
    eyebrow: 'Software Engineer & Product Builder',
    title: 'I build modern web experiences that blend technology, design, and business impact.',
    description:
      "I'm a developer focused on crafting scalable products, thoughtful interfaces, and practical solutions that help people and teams grow.",
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
      {
        name: 'DSA IN C++',
        level: 40,
        description:
          'DSA in C++ helps us learn how to store and manage data properly. It includes data structures like arrays, stacks, queues, trees, and graphs. It also teaches algorithms for searching, sorting, and solving problems. Learning DSA improves programming logic and problem-solving skills.',
        github: 'https://github.com/shivrajCodeSpace/DSA-in-C-',
      },
      {
        name: 'OPPS',
        level: 10,
        description:
          'Object-Oriented Programming is a programming paradigm built around the concept of objects. Each object combines data and the operations that work on that data, enabling developers to model real-world things, organize code clearly, and build systems that are easier to maintain.',
        github: 'https://github.com/shivrajCodeSpace/OPPS-In-Cpp',
      },
    ],
  },
  projects: {
    title: 'Projects',
    items: [
      {
        title: 'ACADEMIA',
        description:
          'College Management System built during the 2nd year of diploma, focused on student records, attendance, course schedules, and administrative workflows.',
        github: 'https://github.com/shivrajCodeSpace/Academia',
      },
      {
        title: 'DOORMED',
        description:
          'Pharmacy-based ecosystem developed after the 3rd year, designed to manage medicine catalogs, orders, customer records, and delivery coordination.',
        github: 'https://github.com/shivrajCodeSpace/Doormed',
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

export function mergePortfolioData(data: Partial<PortfolioData> = {}): PortfolioData {
  return {
    ...fallbackData,
    ...data,
    hero: { ...fallbackData.hero, ...data.hero },
    about: { ...fallbackData.about, ...data.about },
    skills: {
      ...fallbackData.skills,
      ...data.skills,
      items: data.skills?.items ?? fallbackData.skills.items,
    },
    projects: {
      ...fallbackData.projects,
      ...data.projects,
      items: data.projects?.items ?? fallbackData.projects.items,
    },
    education: {
      ...fallbackData.education,
      ...data.education,
      qualificationBullets: data.education?.qualificationBullets ?? fallbackData.education.qualificationBullets,
      experienceBullets: data.education?.experienceBullets ?? fallbackData.education.experienceBullets,
      certificates: data.education?.certificates ?? fallbackData.education.certificates,
    },
    contact: {
      ...fallbackData.contact,
      ...data.contact,
      socialLinks: data.contact?.socialLinks ?? fallbackData.contact.socialLinks,
    },
  };
}
