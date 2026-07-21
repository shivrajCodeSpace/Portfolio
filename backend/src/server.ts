import express, { NextFunction, Request, Response } from 'express';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

type SkillItem = {
  name: string;
  level: number;
  description?: string;
  github?: string;
};

type ProjectItem = {
  title: string;
  description: string;
  github?: string;
};

type CertificateItem = {
  title: string;
  src: string;
  alt: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

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

type VisitorRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  visitedAt: string;
  userAgent: string;
  ip: string;
};

type Database = {
  portfolio: PortfolioData;
  visitors: VisitorRecord[];
};

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const adminToken = process.env.ADMIN_TOKEN || crypto.randomBytes(32).toString('hex');
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATABASE_FILE = path.join(DATA_DIR, 'database.json');
const LEGACY_PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');

if (!process.env.ADMIN_PASSWORD) {
  console.warn('ADMIN_PASSWORD is not set. Using the local development password "admin123".');
}

const fallbackPortfolioData: PortfolioData = {
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
        // github: 'https://github.com/shivrajCodeSpace/Academia',
      },
      {
        title: 'DOORMED',
        description:
          'Pharmacy-based ecosystem developed after the 3rd year, designed to manage medicine catalogs, orders, customer records, and delivery coordination.',
        // github: 'https://github.com/shivrajCodeSpace/Doormed',
      },
      {
        title: 'Portfolio',
        description:
          'A modern, professional portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and an Express.js backend. This project is being developed as a production-ready personal brand platform for showcasing experience, projects, skills, and contact information.',
        github: 'https://github.com/shivrajCodeSpace/Portfolio',
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

const mergePortfolioData = (base: PortfolioData, incoming: Partial<PortfolioData>): PortfolioData => ({
  ...base,
  ...incoming,
  hero: { ...base.hero, ...(incoming.hero || {}) },
  about: { ...base.about, ...(incoming.about || {}) },
  skills: {
    ...base.skills,
    ...(incoming.skills || {}),
    items: incoming.skills?.items ?? base.skills.items,
  },
  projects: {
    ...base.projects,
    ...(incoming.projects || {}),
    items: incoming.projects?.items ?? base.projects.items,
  },
  education: {
    ...base.education,
    ...(incoming.education || {}),
    qualificationBullets: incoming.education?.qualificationBullets ?? base.education.qualificationBullets,
    experienceBullets: incoming.education?.experienceBullets ?? base.education.experienceBullets,
    certificates: incoming.education?.certificates ?? base.education.certificates,
  },
  contact: {
    ...base.contact,
    ...(incoming.contact || {}),
    socialLinks: incoming.contact?.socialLinks ?? base.contact.socialLinks,
  },
});

const readJsonFile = <T>(filePath: string): T | null => {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch (error) {
    console.warn(`Could not read ${filePath}.`, error);
    return null;
  }
};

const readLegacyPortfolio = () => {
  const legacyData = readJsonFile<Partial<PortfolioData>>(LEGACY_PORTFOLIO_FILE);
  return legacyData ? mergePortfolioData(fallbackPortfolioData, legacyData) : fallbackPortfolioData;
};

const normalizeVisitor = (visitor: Partial<VisitorRecord>): VisitorRecord => ({
  id: visitor.id || crypto.randomUUID(),
  name: String(visitor.name || '').trim(),
  email: String(visitor.email || '').trim(),
  phone: String(visitor.phone || '').trim(),
  purpose: String(visitor.purpose || '').trim(),
  visitedAt: visitor.visitedAt || new Date().toISOString(),
  userAgent: String(visitor.userAgent || '').trim(),
  ip: String(visitor.ip || '').trim(),
});

const readDatabase = (): Database => {
  const savedDatabase = readJsonFile<Partial<Database>>(DATABASE_FILE);

  if (!savedDatabase) {
    return {
      portfolio: readLegacyPortfolio(),
      visitors: [],
    };
  }

  return {
    portfolio: mergePortfolioData(fallbackPortfolioData, savedDatabase.portfolio || {}),
    visitors: Array.isArray(savedDatabase.visitors)
      ? savedDatabase.visitors.map(normalizeVisitor).filter((visitor) => visitor.name && visitor.email)
      : [],
  };
};

const saveDatabase = (nextDatabase: Database) => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(nextDatabase, null, 2));
};

const cleanText = (value: unknown) => String(value || '').trim();

const getBearerToken = (req: Request) => {
  const authHeader = req.header('authorization');
  return authHeader?.replace(/^Bearer\s+/i, '').trim();
};

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (getBearerToken(req) !== adminToken) {
    res.status(401).json({ success: false, message: 'Admin login required.' });
    return;
  }

  next();
};

let database: Database = readDatabase();

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Portfolio backend is running for Shivraj' });
});

app.get('/api/profile', (_req: Request, res: Response) => {
  res.json(database.portfolio);
});

app.post('/api/visitors', (req: Request, res: Response) => {
  const name = cleanText(req.body?.name);
  const email = cleanText(req.body?.email).toLowerCase();
  const phone = cleanText(req.body?.phone);
  const purpose = cleanText(req.body?.purpose);

  if (!name || !email) {
    res.status(400).json({ success: false, message: 'Name and email are required.' });
    return;
  }

  if (!email.includes('@')) {
    res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    return;
  }

  const visitor: VisitorRecord = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    purpose,
    visitedAt: new Date().toISOString(),
    userAgent: cleanText(req.header('user-agent')),
    ip: req.ip || '',
  };

  database = {
    ...database,
    visitors: [visitor, ...database.visitors],
  };
  saveDatabase(database);

  res.status(201).json({ success: true, visitor });
});

app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body as { password?: string };

  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ success: false, message: 'Invalid admin password.' });
    return;
  }

  res.json({ success: true, token: adminToken });
});

app.get('/api/admin/profile', requireAdmin, (_req: Request, res: Response) => {
  res.json(database.portfolio);
});

app.put('/api/admin/profile', requireAdmin, (req: Request, res: Response) => {
  const incoming = req.body as Partial<PortfolioData>;

  if (!incoming || typeof incoming !== 'object') {
    res.status(400).json({ success: false, message: 'Portfolio data is required.' });
    return;
  }

  try {
    database = {
      ...database,
      portfolio: mergePortfolioData(database.portfolio, incoming),
    };
    saveDatabase(database);
    res.json(database.portfolio);
  } catch (error) {
    console.error('Could not save portfolio data.', error);
    res.status(500).json({ success: false, message: 'Could not save portfolio data.' });
  }
});

app.get('/api/admin/visitors', requireAdmin, (_req: Request, res: Response) => {
  res.json({ visitors: database.visitors });
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    return;
  }

  console.log('New contact message received', { name, email, message });
  res.status(201).json({ success: true, message: 'Message received successfully.' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
