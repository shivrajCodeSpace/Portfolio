"use client";

import Link from 'next/link';
import { ArrowRight, ShieldCheck, UserRound } from 'lucide-react';

export default function WelcomePage() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100vh-8rem)] items-center overflow-hidden px-6 py-12 text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(2, 6, 23, 0.96) 0%, rgba(2, 6, 23, 0.82) 48%, rgba(2, 6, 23, 0.42) 100%), url('/profile.jpeg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Welcome
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
            Shivraj Chakraborty Portfolio
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Choose how you want to enter. Visitors register first, and admin can manage portfolio content and see visitor records.
          </p>
        </div>

        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <Link
            href="/register"
            className="group flex min-h-36 flex-col justify-between rounded-lg border border-cyan-300/30 bg-cyan-400/15 p-5 text-left shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-cyan-400/25"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
              <UserRound size={22} />
            </span>
            <span>
              <span className="block text-2xl font-semibold">Visitor</span>
              <span className="mt-2 flex items-center gap-2 text-sm font-medium text-cyan-100">
                Register and view portfolio <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </span>
          </Link>

          <Link
            href="/admin"
            className="group flex min-h-36 flex-col justify-between rounded-lg border border-white/15 bg-slate-950/70 p-5 text-left shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-violet-300/50 hover:bg-slate-900/90"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-300 text-slate-950">
              <ShieldCheck size={22} />
            </span>
            <span>
              <span className="block text-2xl font-semibold">Admin</span>
              <span className="mt-2 flex items-center gap-2 text-sm font-medium text-violet-100">
                Login and manage site <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
