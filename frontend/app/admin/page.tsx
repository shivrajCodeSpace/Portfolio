"use client";

import { useEffect, useState } from 'react';

type SkillItem = { name: string; level: number; description?: string; github?: string };
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

const emptyData: PortfolioData = {
  hero: {
    eyebrow: '',
    title: '',
    description: '',
    primaryCta: '',
    secondaryCta: '',
    imageSrc: '/profile.jpeg',
    imageAlt: '',
  },
  about: {
    overviewTitle: '',
    overviewText: '',
    experienceTitle: '',
    experienceText: '',
  },
  skills: {
    title: '',
    items: [{ name: '', level: 0, description: '', github: '' }],
  },
  projects: {
    title: '',
    items: [{ title: '', description: '' }],
  },
  education: {
    title: '',
    qualificationText: '',
    qualificationBullets: [''],
    experienceText: '',
    experienceBullets: [''],
    certificates: [{ title: '', src: '', alt: '' }],
  },
  contact: {
    title: '',
    email: '',
    phone: '',
    socialLinks: [{ label: '', href: '', icon: '' }],
  },
};

export default function AdminPage() {
  const [formData, setFormData] = useState<PortfolioData>(emptyData);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/profile')
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => setStatus('Could not load portfolio data.'));
  }, []);

  const handleChange = (group: keyof PortfolioData, value: string, field?: string) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field ?? '']:
          field && typeof prev[group] === 'object' && prev[group] !== null
            ? value
            : value,
      },
    }));
  };

  const handleSave = async () => {
    setStatus('Saving...');
    const response = await fetch('http://localhost:5000/api/admin/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('Portfolio updated successfully.');
    } else {
      setStatus('Failed to update portfolio.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="mt-2 text-slate-400">Edit the portfolio content and publish it instantly.</p>

        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold">Hero</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3" value={formData.hero.eyebrow} onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, eyebrow: e.target.value } })} placeholder="Eyebrow" />
              <input className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3" value={formData.hero.title} onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, title: e.target.value } })} placeholder="Title" />
              <textarea className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 md:col-span-2" value={formData.hero.description} onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value } })} placeholder="Description" />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold">About</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3" value={formData.about.overviewTitle} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, overviewTitle: e.target.value } })} placeholder="Overview Title" />
              <input className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3" value={formData.about.experienceTitle} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, experienceTitle: e.target.value } })} placeholder="Experience Title" />
              <textarea className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 md:col-span-2" value={formData.about.overviewText} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, overviewText: e.target.value } })} placeholder="Overview Text" />
              <textarea className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 md:col-span-2" value={formData.about.experienceText} onChange={(e) => setFormData({ ...formData, about: { ...formData.about, experienceText: e.target.value } })} placeholder="Experience Text" />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3" value={formData.contact.title} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, title: e.target.value } })} placeholder="Contact Title" />
              <input className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3" value={formData.contact.email} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })} placeholder="Email" />
              <input className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3" value={formData.contact.phone} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })} placeholder="Phone" />
            </div>
          </section>

          <button onClick={handleSave} className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400">Save Changes</button>
          {status ? <p className="text-sm text-cyan-300">{status}</p> : null}
        </div>
      </div>
    </div>
  );
}
