import Image from 'next/image';

const storyPoints = [
  {
    title: 'Decades of experience',
    description:
      'Dr. Nash has supported Bay Area families for over 30 years, blending evidence-based pediatric care with heartfelt reassurance.'
  },
  {
    title: 'A familiar face online',
    description:
      'Virtual visits are designed to feel like an in-home conversation—unhurried, personal, and centered on building trust.'
  },
  {
    title: 'Whole-family focus',
    description:
      'We collaborate with caregivers, siblings, and school teams so every voice is heard and every concern is tenderly addressed.'
  }
];

const values = [
  {
    label: 'Gentle first, clinical always',
    details: 'Comforting bedside manner paired with clear next steps and follow-ups.'
  },
  {
    label: 'Accessible from anywhere in CA',
    details: 'Secure telehealth supported by HIPAA-compliant tools and evidence-based medicine.'
  },
  {
    label: 'Continuity you can feel',
    details: 'Families stay connected with personalized care summaries, quick electronic prescribing to your pharmacy, and communication with your child\'s regular physician.'
  }
];

export default function AboutPage() {
  return (
    <div className="px-6 pb-24 pt-16 lg:px-10">
      <section className="mx-auto max-w-5xl text-center">
        <span className="badge-pill">About HouseCall for Kids</span>
        <h1 className="mt-6 font-heading text-4xl text-white sm:text-5xl">
          Telehealth that feels like a caring neighbor at your door.
        </h1>
        <p className="mt-6 text-lg text-slate-200">
          We reimagined the classic house call for modern families who value warmth, clinical excellence,
          and the ease of receiving care from home. Every visit begins with listening and ends with a
          plan you can trust.
        </p>
      </section>

      <section className="mx-auto mt-16 flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <Image
          src="/images/Dr_Nash_New.png"
          alt="Dr. Andrew Nash headshot"
          width={540}
          height={540}
          className="w-full rounded-3xl object-cover shadow-gentle lg:w-1/2"
        />
        <div className="lg:w-1/2">
          <h2 className="font-heading text-3xl text-white">Meet Dr. Andrew L. Nash, MD FAAP</h2>
          <p className="mt-4 text-base text-slate-200">
            A Harvard graduate and UC Davis-trained pediatrician, Dr. Nash has served the Bay Area with
            distinction for over three decades. He founded HouseCall for Kids to combine the intimacy of a
            house call with the accessibility of telehealth, so families can receive prompt care and calm
            reassurance without leaving home.
          </p>
          <p className="mt-4 text-base text-slate-200">
            Dr. Nash specializes in primary care pediatrics, urgent care, ADHD and anxiety management, and supportive coaching for everyday parenting questions. He partners closely with caregivers to co-create plans that are practical, compassionate, and tailored to each child.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-3">
          {storyPoints.map(point => (
            <div key={point.title} className="glass-card h-full p-6 text-left">
              <h3 className="font-heading text-xl text-white">{point.title}</h3>
              <p className="mt-4 text-sm text-slate-300">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl">
        <h2 className="font-heading text-3xl text-white">Our promise to families</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(value => (
            <div key={value.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
              <p className="font-heading text-lg text-white">{value.label}</p>
              <p className="mt-3 text-slate-300">{value.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <div className="rounded-3xl border border-brand-base/20 bg-brand-base/10 p-8 text-center text-slate-100">
          <h2 className="font-heading text-3xl text-white">Ready to feel supported?</h2>
          <p className="mt-4 text-base text-slate-200">
            Schedule a welcome call or reserve an early access visit so we can walk through your
            family’s needs together.
          </p>
          <a href="/#inquiry" className="btn-pill-primary mt-6 inline-flex">
            Register Your Child
          </a>
        </div>
      </section>
    </div>
  );
}
