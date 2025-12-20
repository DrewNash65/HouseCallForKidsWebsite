"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Patient Portal', href: '/patient-portal' }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10 transition hover:bg-white/10"
        >
          <Image
            src="/images/1to1-final-logo.png"
            alt="1-to-1 Pediatrics logo"
            width={98}
            height={98}
            className="h-24 w-auto"
            priority
          />
          <div className="flex flex-col">
            <span className="font-heading text-lg tracking-tight text-white">HouseCall for Kids</span>
            <span className="text-xs font-medium text-slate-300">Comforting virtual pediatric care</span>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#inquiry"
            className="ml-4 inline-flex items-center rounded-full bg-brand-base/20 px-4 py-2 text-sm font-semibold text-teal-50 ring-1 ring-brand-base/40 transition hover:-translate-y-0.5 hover:bg-brand-base/30"
          >
            Pre-Register as a Patient
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-slate-100 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={clsx(
          'md:hidden',
          'origin-top border-t border-white/10 bg-midnight/95 px-6 pb-6 pt-4 shadow-gentle backdrop-blur-xl transition-all duration-300 ease-out',
          open ? 'block' : 'hidden'
        )}
      >
        <div className="flex flex-col gap-2">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-slate-200 transition hover:bg-white/10"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#inquiry"
            onClick={() => setOpen(false)}
            className="btn-pill-primary mt-1 text-center"
          >
            Pre-Register as a Patient
          </Link>
        </div>
      </div>
    </header>
  );
}
