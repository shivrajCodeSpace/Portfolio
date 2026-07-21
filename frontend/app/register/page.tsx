"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight, ClipboardList, Home, UserRound } from 'lucide-react';
import { VISITOR_STORAGE_KEY, type VisitorRecord } from '@/lib/visitor-data';

type VisitorResponse = {
  success?: boolean;
  message?: string;
  visitor?: VisitorRecord;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    setAlreadyRegistered(Boolean(window.localStorage.getItem(VISITOR_STORAGE_KEY)));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('Saving visitor details...');

    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, purpose }),
      });
      const result = (await response.json()) as VisitorResponse;

      if (!response.ok || !result.visitor) {
        throw new Error(result.message || 'Could not register visitor.');
      }

      window.localStorage.setItem(
        VISITOR_STORAGE_KEY,
        JSON.stringify({
          id: result.visitor.id,
          name: result.visitor.name,
          email: result.visitor.email,
          visitedAt: result.visitor.visitedAt,
        }),
      );
      setStatus('Registration complete. Opening portfolio...');
      router.push('/portfolio');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not register visitor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-6xl gap-8 px-6 py-10 text-white lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1fr)] lg:items-center">
      <section className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Visitor Access
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Register before viewing the portfolio.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Your details are saved for the admin dashboard so the portfolio owner can see who visited.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            <Home size={16} />
            Welcome
          </Link>
          {alreadyRegistered ? (
            <Link
              href="/portfolio"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-semibold text-white transition hover:bg-cyan-400"
            >
              Continue
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-500/15 text-cyan-300">
            <ClipboardList size={22} />
          </span>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Visitor</p>
            <h2 className="text-2xl font-semibold">Registration</h2>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-200">
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Your name"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Phone
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Optional"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Purpose
            <textarea
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              rows={4}
              className="mt-2 min-h-28 w-full resize-y rounded-lg border border-white/10 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Hiring, collaboration, project review..."
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserRound size={16} />
          {isSubmitting ? 'Registering...' : 'Register and Visit'}
        </button>

        {status ? <p className="mt-4 text-sm text-cyan-200">{status}</p> : null}
      </form>
    </div>
  );
}
