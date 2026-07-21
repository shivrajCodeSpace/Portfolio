"use client";

import Link from 'next/link';
import type {
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { useEffect, useState } from 'react';
import { Eye, Lock, LogOut, Plus, RefreshCw, Save, Trash2, Users } from 'lucide-react';
import {
  fallbackData,
  mergePortfolioData,
  type CertificateItem,
  type PortfolioData,
  type ProjectItem,
  type SkillItem,
  type SocialLink,
} from '@/lib/portfolio-data';
import type { VisitorRecord } from '@/lib/visitor-data';

const ADMIN_TOKEN_KEY = 'portfolio-admin-token';

type LoginResponse = {
  success?: boolean;
  token?: string;
  message?: string;
};

type VisitorListResponse = {
  visitors?: VisitorRecord[];
};

type EducationBulletList = 'qualificationBullets' | 'experienceBullets';

const clampLevel = (value: string) => {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return Math.min(100, Math.max(0, parsed));
};

export default function AdminPage() {
  const [formData, setFormData] = useState<PortfolioData>(fallbackData);
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(false);
  const [activeProjectInputIndex, setActiveProjectInputIndex] = useState<number | null>(null);

  async function loadAdminData(authToken: string) {
    const response = await fetch('/api/admin/profile', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 401) {
      clearAdminSession();
      throw new Error('Admin login expired.');
    }

    if (!response.ok) {
      throw new Error('Could not load portfolio data.');
    }

    const data = (await response.json()) as PortfolioData;
    setFormData(mergePortfolioData(data));
    setToken(authToken);
    setIsAuthenticated(true);
    await loadVisitors(authToken);
  }

  async function loadVisitors(authToken = token) {
    if (!authToken) {
      return;
    }

    setIsLoadingVisitors(true);

    try {
      const response = await fetch('/api/admin/visitors', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 401) {
        clearAdminSession();
        throw new Error('Admin login expired.');
      }

      if (!response.ok) {
        throw new Error('Could not load visitors.');
      }

      const data = (await response.json()) as VisitorListResponse;
      setVisitors(data.visitors || []);
    } finally {
      setIsLoadingVisitors(false);
    }
  }

  function clearAdminSession() {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
    setIsAuthenticated(false);
    setVisitors([]);
  }

  useEffect(() => {
    const savedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);

    if (!savedToken) {
      setIsReady(true);
      return;
    }

    loadAdminData(savedToken)
      .catch(() => {
        setStatus('Please log in again.');
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggingIn(true);
    setStatus('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as LoginResponse;

      if (!response.ok || !result.token) {
        throw new Error(result.message || 'Invalid admin password.');
      }

      window.localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
      await loadAdminData(result.token);
      setPassword('');
      setStatus('Admin mode is open.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not log in.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSave = async () => {
    if (!token) {
      setStatus('Please log in again.');
      clearAdminSession();
      return;
    }

    setIsSaving(true);
    setStatus('Saving changes...');

    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        clearAdminSession();
        throw new Error('Admin login expired.');
      }

      if (!response.ok) {
        throw new Error('Could not save changes.');
      }

      const data = (await response.json()) as PortfolioData;
      setFormData(mergePortfolioData(data));
      setStatus('Saved. Visitor page is updated.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setPassword('');
    setStatus('Logged out.');
  };

  const updateHero = (field: keyof PortfolioData['hero'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateAbout = (field: keyof PortfolioData['about'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }));
  };

  const updateContact = (field: keyof PortfolioData['contact'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const updateSkillsTitle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, title: value },
    }));
  };

  const updateSkill = (index: number, field: keyof SkillItem, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: prev.skills.items.map((skill, skillIndex) =>
          skillIndex === index ? { ...skill, [field]: value } : skill,
        ),
      },
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: [...prev.skills.items, { name: '', level: 0, description: '', github: '' }],
      },
    }));
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: prev.skills.items.filter((_, skillIndex) => skillIndex !== index),
      },
    }));
  };

  const updateProjectsTitle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: { ...prev.projects, title: value },
    }));
  };

  const updateProject = (index: number, field: keyof ProjectItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: prev.projects.items.map((project, projectIndex) =>
          projectIndex === index ? { ...project, [field]: value } : project,
        ),
      },
    }));
  };

  const addProject = () => {
    setFormData((prev) => {
      const nextIndex = prev.projects.items.length;
      setActiveProjectInputIndex(nextIndex);

      return {
        ...prev,
        projects: {
          ...prev.projects,
          items: [...prev.projects.items, { title: '', description: '', github: '' }],
        },
      };
    });
  };

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: prev.projects.items.filter((_, projectIndex) => projectIndex !== index),
      },
    }));
  };

  const updateEducation = (
    field: Exclude<keyof PortfolioData['education'], EducationBulletList | 'certificates'>,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: value },
    }));
  };

  const updateEducationBullet = (list: EducationBulletList, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [list]: prev.education[list].map((item, itemIndex) => (itemIndex === index ? value : item)),
      },
    }));
  };

  const addEducationBullet = (list: EducationBulletList) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [list]: [...prev.education[list], ''],
      },
    }));
  };

  const removeEducationBullet = (list: EducationBulletList, index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [list]: prev.education[list].filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  };

  const updateCertificate = (index: number, field: keyof CertificateItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        certificates: prev.education.certificates.map((certificate, certificateIndex) =>
          certificateIndex === index ? { ...certificate, [field]: value } : certificate,
        ),
      },
    }));
  };

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        certificates: [...prev.education.certificates, { title: '', src: '', alt: '' }],
      },
    }));
  };

  const removeCertificate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        certificates: prev.education.certificates.filter(
          (_, certificateIndex) => certificateIndex !== index,
        ),
      },
    }));
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: prev.contact.socialLinks.map((link, linkIndex) =>
          linkIndex === index ? { ...link, [field]: value } : link,
        ),
      },
    }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: [...prev.contact.socialLinks, { label: '', href: '', icon: '' }],
      },
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: prev.contact.socialLinks.filter((_, linkIndex) => linkIndex !== index),
      },
    }));
  };

  if (!isReady) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 py-10 text-slate-300">
        Loading admin...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-6 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-6 text-white shadow-2xl shadow-black/20"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500/15 text-cyan-300">
              <Lock size={20} />
            </span>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Admin</p>
              <h1 className="text-2xl font-semibold">Portfolio Login</h1>
            </div>
          </div>

          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isLoggingIn}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock size={16} />
              {isLoggingIn ? 'Checking...' : 'Log In'}
            </button>
            <Link
              href="/"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              <Eye size={16} />
              Visitor View
            </Link>
          </div>

          {status ? <p className="mt-4 text-sm text-cyan-200">{status}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-white">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Portfolio Dashboard</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/portfolio"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            <Eye size={16} />
            Visitor View
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-rose-300 hover:text-rose-200"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>

      <div className="sticky top-20 z-30 flex flex-col gap-3 rounded-lg border border-white/10 bg-slate-950/90 p-4 shadow-xl shadow-black/20 backdrop-blur md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-300">{status || 'Editing private admin content.'}</p>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <AdminSection
        title="Registered Visitors"
        action={
          <button
            type="button"
            onClick={() => loadVisitors()}
            disabled={isLoadingVisitors}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-400/30 px-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={16} />
            {isLoadingVisitors ? 'Loading...' : 'Refresh'}
          </button>
        }
      >
        <div className="flex flex-wrap gap-5 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-white">{visitors.length}</span> total registered visitors
          </p>
          <p>
            <span className="font-semibold text-white">
              {visitors[0] ? formatVisitedAt(visitors[0].visitedAt) : 'No visits yet'}
            </span>{' '}
            latest visit
          </p>
        </div>

        {visitors.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="border-b border-white/10 px-3 py-3 font-medium">Name</th>
                  <th className="border-b border-white/10 px-3 py-3 font-medium">Email</th>
                  <th className="border-b border-white/10 px-3 py-3 font-medium">Phone</th>
                  <th className="border-b border-white/10 px-3 py-3 font-medium">Purpose</th>
                  <th className="border-b border-white/10 px-3 py-3 font-medium">Visited</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="text-slate-200">
                    <td className="border-b border-white/10 px-3 py-3 font-medium text-white">
                      {visitor.name}
                    </td>
                    <td className="border-b border-white/10 px-3 py-3">{visitor.email}</td>
                    <td className="border-b border-white/10 px-3 py-3">{visitor.phone || '-'}</td>
                    <td className="border-b border-white/10 px-3 py-3">{visitor.purpose || '-'}</td>
                    <td className="border-b border-white/10 px-3 py-3">
                      {formatVisitedAt(visitor.visitedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
            <Users size={18} className="text-cyan-300" />
            No visitors have registered yet.
          </div>
        )}
      </AdminSection>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          <AdminSection title="Hero">
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="Eyebrow"
                value={formData.hero.eyebrow}
                onChange={(event) => updateHero('eyebrow', event.target.value)}
              />
              <TextInput
                label="Title"
                value={formData.hero.title}
                onChange={(event) => updateHero('title', event.target.value)}
              />
              <TextArea
                label="Description"
                value={formData.hero.description}
                onChange={(event) => updateHero('description', event.target.value)}
                className="md:col-span-2"
              />
              <TextInput
                label="Primary CTA"
                value={formData.hero.primaryCta}
                onChange={(event) => updateHero('primaryCta', event.target.value)}
              />
              <TextInput
                label="Secondary CTA"
                value={formData.hero.secondaryCta}
                onChange={(event) => updateHero('secondaryCta', event.target.value)}
              />
              <TextInput
                label="Image path"
                value={formData.hero.imageSrc}
                onChange={(event) => updateHero('imageSrc', event.target.value)}
              />
              <TextInput
                label="Image alt"
                value={formData.hero.imageAlt}
                onChange={(event) => updateHero('imageAlt', event.target.value)}
              />
            </div>
          </AdminSection>

          <AdminSection title="About">
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="Overview title"
                value={formData.about.overviewTitle}
                onChange={(event) => updateAbout('overviewTitle', event.target.value)}
              />
              <TextInput
                label="Experience title"
                value={formData.about.experienceTitle}
                onChange={(event) => updateAbout('experienceTitle', event.target.value)}
              />
              <TextArea
                label="Overview text"
                value={formData.about.overviewText}
                onChange={(event) => updateAbout('overviewText', event.target.value)}
                className="md:col-span-2"
              />
              <TextArea
                label="Experience text"
                value={formData.about.experienceText}
                onChange={(event) => updateAbout('experienceText', event.target.value)}
                className="md:col-span-2"
              />
            </div>
          </AdminSection>

          <AdminSection
            title="Skills"
            action={
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-400/30 px-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
              >
                <Plus size={16} />
                Add Skill
              </button>
            }
          >
            <TextInput
              label="Section title"
              value={formData.skills.title}
              onChange={(event) => updateSkillsTitle(event.target.value)}
            />
            <div className="space-y-4">
              {formData.skills.items.map((skill, index) => (
                <EditableItem key={`skill-${index}`}>
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_8rem]">
                    <TextInput
                      label="Skill name"
                      value={skill.name}
                      onChange={(event) => updateSkill(index, 'name', event.target.value)}
                    />
                    <TextInput
                      label="Level"
                      type="number"
                      min={0}
                      max={100}
                      value={skill.level}
                      onChange={(event) => updateSkill(index, 'level', clampLevel(event.target.value))}
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={skill.description || ''}
                    onChange={(event) => updateSkill(index, 'description', event.target.value)}
                  />
                  <TextInput
                    label="GitHub URL"
                    value={skill.github || ''}
                    onChange={(event) => updateSkill(index, 'github', event.target.value)}
                  />
                  <RemoveButton label="Remove Skill" onClick={() => removeSkill(index)} />
                </EditableItem>
              ))}
            </div>
          </AdminSection>

          <AdminSection
            title="Projects"
            action={
              <button
                type="button"
                onClick={addProject}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-400/30 px-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
              >
                <Plus size={16} />
                Add Project
              </button>
            }
          >
            <TextInput
              label="Section title"
              value={formData.projects.title}
              onChange={(event) => updateProjectsTitle(event.target.value)}
            />
            <div className="space-y-4">
              {formData.projects.items.map((project, index) => (
                <EditableItem key={`project-${index}`}>
                  <TextInput
                    label="Project title"
                    value={project.title}
                    autoFocus={activeProjectInputIndex === index}
                    onChange={(event) => updateProject(index, 'title', event.target.value)}
                  />
                  <TextArea
                    label="Description"
                    value={project.description}
                    onChange={(event) => updateProject(index, 'description', event.target.value)}
                  />
                  <TextInput
                    label="GitHub URL"
                    value={project.github || ''}
                    onChange={(event) => updateProject(index, 'github', event.target.value)}
                  />
                  <RemoveButton label="Remove Project" onClick={() => removeProject(index)} />
                </EditableItem>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="Education">
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="Section title"
                value={formData.education.title}
                onChange={(event) => updateEducation('title', event.target.value)}
              />
              <TextArea
                label="Qualification text"
                value={formData.education.qualificationText}
                onChange={(event) => updateEducation('qualificationText', event.target.value)}
                className="md:col-span-2"
              />
              <TextArea
                label="Experience text"
                value={formData.education.experienceText}
                onChange={(event) => updateEducation('experienceText', event.target.value)}
                className="md:col-span-2"
              />
            </div>

            <ListEditor
              title="Qualification bullets"
              items={formData.education.qualificationBullets}
              onAdd={() => addEducationBullet('qualificationBullets')}
              onRemove={(index) => removeEducationBullet('qualificationBullets', index)}
              onChange={(index, value) => updateEducationBullet('qualificationBullets', index, value)}
            />

            <ListEditor
              title="Experience bullets"
              items={formData.education.experienceBullets}
              onAdd={() => addEducationBullet('experienceBullets')}
              onRemove={(index) => removeEducationBullet('experienceBullets', index)}
              onChange={(index, value) => updateEducationBullet('experienceBullets', index, value)}
            />
          </AdminSection>

          <AdminSection
            title="Certificates"
            action={
              <button
                type="button"
                onClick={addCertificate}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-400/30 px-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
              >
                <Plus size={16} />
                Add Certificate
              </button>
            }
          >
            <div className="space-y-4">
              {formData.education.certificates.map((certificate, index) => (
                <EditableItem key={`${certificate.title}-${index}`}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextInput
                      label="Certificate title"
                      value={certificate.title}
                      onChange={(event) => updateCertificate(index, 'title', event.target.value)}
                    />
                    <TextInput
                      label="Image path"
                      value={certificate.src}
                      onChange={(event) => updateCertificate(index, 'src', event.target.value)}
                    />
                    <TextInput
                      label="Image alt"
                      value={certificate.alt}
                      onChange={(event) => updateCertificate(index, 'alt', event.target.value)}
                      className="md:col-span-2"
                    />
                  </div>
                  <RemoveButton label="Remove Certificate" onClick={() => removeCertificate(index)} />
                </EditableItem>
              ))}
            </div>
          </AdminSection>

          <AdminSection
            title="Contact"
            action={
              <button
                type="button"
                onClick={addSocialLink}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-400/30 px-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
              >
                <Plus size={16} />
                Add Link
              </button>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="Section title"
                value={formData.contact.title}
                onChange={(event) => updateContact('title', event.target.value)}
              />
              <TextInput
                label="Email"
                type="email"
                value={formData.contact.email}
                onChange={(event) => updateContact('email', event.target.value)}
              />
              <TextInput
                label="Phone"
                value={formData.contact.phone}
                onChange={(event) => updateContact('phone', event.target.value)}
              />
            </div>

            <div className="space-y-4">
              {formData.contact.socialLinks.map((socialLink, index) => (
                <EditableItem key={`${socialLink.href}-${index}`}>
                  <div className="grid gap-4 md:grid-cols-3">
                    <TextInput
                      label="Label"
                      value={socialLink.label}
                      onChange={(event) => updateSocialLink(index, 'label', event.target.value)}
                    />
                    <TextInput
                      label="URL"
                      value={socialLink.href}
                      onChange={(event) => updateSocialLink(index, 'href', event.target.value)}
                    />
                    <TextInput
                      label="Icon"
                      value={socialLink.icon}
                      onChange={(event) => updateSocialLink(index, 'icon', event.target.value)}
                    />
                  </div>
                  <RemoveButton label="Remove Link" onClick={() => removeSocialLink(index)} />
                </EditableItem>
              ))}
            </div>
          </AdminSection>
        </div>

        <aside className="h-fit rounded-lg border border-white/10 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold">Access</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>
              <span className="font-semibold text-white">Visitor:</span> registration then portfolio
            </p>
            <p>
              <span className="font-semibold text-white">Admin:</span> private editor at /admin
            </p>
            <p>
              <span className="font-semibold text-white">Visitors saved:</span> {visitors.length}
            </p>
            <p>
              <span className="font-semibold text-white">Status:</span> {status || 'Ready'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function formatVisitedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || '-';
  }

  return date.toLocaleString();
}

function AdminSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {action}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function EditableItem({ children }: { children: ReactNode }) {
  return <div className="space-y-4 rounded-lg border border-white/10 bg-slate-950/60 p-4">{children}</div>;
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function TextInput({ label, className = '', ...props }: TextInputProps) {
  return (
    <label className={`block text-sm font-medium text-slate-200 ${className}`}>
      <span>{label}</span>
      <input
        {...props}
        className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/20"
      />
    </label>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function TextArea({ label, className = '', ...props }: TextAreaProps) {
  return (
    <label className={`block text-sm font-medium text-slate-200 ${className}`}>
      <span>{label}</span>
      <textarea
        {...props}
        rows={4}
        className="mt-2 min-h-28 w-full resize-y rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/20"
      />
    </label>
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-rose-400/30 px-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
    >
      <Trash2 size={16} />
      {label}
    </button>
  );
}

function ListEditor({
  title,
  items,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-white/10 bg-slate-950/60 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-400/30 px-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/10"
        >
          <Plus size={16} />
          Add Bullet
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <TextInput
              label={`Bullet ${index + 1}`}
              value={item}
              onChange={(event) => onChange(index, event.target.value)}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="inline-flex h-11 items-center justify-center gap-2 self-end rounded-lg border border-rose-400/30 px-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
              aria-label={`Remove bullet ${index + 1}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
