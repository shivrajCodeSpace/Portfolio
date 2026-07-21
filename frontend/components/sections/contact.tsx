"use client";

import { useState } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

type SocialLink = { label: string; href: string; icon: string };
type ContactSectionProps = {
  title?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLink[];
};

export function ContactSection({ title = "Let's build something great", email = 'shivrajchakraborty725@gmail.com', phone = '+91 9366316159', socialLinks = [] }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyPhoneNumber = async () => {
    await navigator.clipboard.writeText(phone);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const renderSocialIcon = (icon: string) => {
    if (icon === 'github') {
      return <Github size={16} />;
    }
    return <Linkedin size={16} />;
  };

  return (
    <section id="contact" className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        <Mail size={18} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-cyan-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <Mail size={16} />
          {email}
        </a>
        <button
          type="button"
          onClick={copyPhoneNumber}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-cyan-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <Phone size={16} />
          {copied ? 'Copied!' : phone}
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/15 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            {renderSocialIcon(link.icon)}
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
