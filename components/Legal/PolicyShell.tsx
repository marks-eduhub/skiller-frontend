"use client";

import Link from "next/link";
import { ReactNode } from "react";

type PolicyShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const policyLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/community-guidelines", label: "Community Guidelines" },
];

export default function PolicyShell({
  title,
  description,
  children,
}: PolicyShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 text-black sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-black/65">
          <Link href="/auth" className="font-medium transition hover:text-black">
            Back to sign in
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            {policyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <section className="rounded-2xl border border-black/10 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-black/50">
            Effective July 21, 2026
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-[2.1rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/70 sm:text-base">
            {description}
          </p>
          <div className="mt-8 space-y-7 text-sm leading-6 text-black/80 sm:text-base">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
