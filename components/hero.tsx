import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="comfort-gradient absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)] opacity-60 mix-blend-soft-light"
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1.15fr,0.85fr] lg:px-10 lg:pb-24 lg:pt-28">
        <div className="flex flex-col justify-center">
          <span className="badge-pill text-white/90">Now Open • Accepting Patients</span>
          <h1 className="mt-6 font-heading text-4xl leading-tight text-white sm:text-5xl">
            Pediatric urgent care that feels like a house call.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-200">
            Meet Andrew L. Nash, MD FAAP and our compassionate team delivering same-day video visits
            and reassuring guidance tailored to your family&apos;s rhythm.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="#inquiry" className="btn-pill-primary">
              Schedule or Register
            </Link>
            <Link href="/about" className="btn-pill-secondary">
              Meet Dr. Nash
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dt className="text-slate-400">Average wait time</dt>
              <dd className="mt-1 font-heading text-2xl text-white">&lt; 10 minutes</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dt className="text-slate-400">Serving ages</dt>
              <dd className="mt-1 font-heading text-2xl text-white">0 – 17 yrs</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <dt className="text-slate-400">Coverage</dt>
              <dd className="mt-1 font-heading text-2xl text-white">California-wide</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="glass-card group flex h-full flex-col overflow-hidden bg-white/10">
            <div className="relative mx-auto -mt-56 h-64 w-64 rounded-full bg-brand-base/30 blur-3xl opacity-40" aria-hidden />
            <Image
              src="/images/chatgpt-logo.png"
              alt="Housecall for Kids logo"
              width={520}
              height={520}
              className="mx-auto h-auto w-[95%] max-w-md rounded-3xl object-cover shadow-gentle"
            />
            <div className="px-8 pb-0 pt-0 mt-8">
              <blockquote className="text-slate-200">
                &ldquo;Our video visit felt calm, personal, and unrushed. Dr. Nash made sure our
                daughter felt heard and comfortable.&rdquo;
              </blockquote>
              <p className="text-sm font-semibold text-brand-light">— Julia R., Parent of 2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
