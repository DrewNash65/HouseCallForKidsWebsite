import { Hero } from '@/components/hero';
import { InquirySection } from '@/components/inquiry-section';
import { ServicesSection } from '@/components/services-section';
import { HowItWorks } from '@/components/how-it-works';
import Image from 'next/image';
import Link from 'next/link';

const educationItems = [
  {
    title: 'Preparing for your child’s first visit',
    description: 'Easy steps to create a calm environment for virtual care and what to have nearby.',
    href: '/faq'
  },
  {
    title: 'After-visit comfort plan',
    description: 'How we partner with you after video visits for continued guidance and support.',
    href: '/about'
  },
  {
    title: 'When telehealth is the right choice',
    description: 'Explore the symptoms and concerns we can treat from home—and when to seek in-person care.',
    href: '/pricing'
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <SupportStats />
      <ServicesSection />
      <HowItWorks />
      <CareStory />
      <InquirySection />
      <section className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl lg:flex-row lg:items-center">
          <Image
            src="/images/dr-nash-bass.jpg"
            alt="Andrew L. Nash, MD FAAP smiling"
            width={420}
            height={420}
            className="w-full rounded-2xl object-cover shadow-card lg:w-1/3"
          />
          <div className="flex-1">
            <span className="badge-pill">Meet our founder</span>
            <h2 className="mt-4 font-heading text-3xl text-white">Andrew L. Nash, MD FAAP</h2>
            <p className="mt-4 text-base text-slate-200">
              Dr. Nash received his undergraduate degree from Harvard and attended medical school at UC
              Davis. He completed his pediatric internship and residency at UCSF and Children&apos;s
              Hospital and Research Center in Oakland, California. Dr. Nash has served the San Francisco
              Bay Area with care and distinction for over three decades. He founded 1-to-1 Pediatrics in
              2011 to make access to personalized, &quot;hometown style&quot; pediatric care easy and free
              of the hoops and barriers common in most primary care settings. He has started HouseCall for
              Kids to provide this style of personalized care throughout California via a telehealth
              platform.
            </p>
            <Link href="/about" className="btn-pill-secondary mt-6 inline-flex">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {educationItems.map(item => (
            <Link key={item.title} href={item.href} className="glass-card block p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
                Gentle Resources
              </p>
              <h3 className="mt-4 font-heading text-xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{item.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-light">
                Explore
                <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SupportStats() {
  const stats = [
    { label: 'Same-day video visits offered', value: 'After Hours Visits Available' },
    { label: 'Years of pediatric expertise', value: '30+' },
    { label: 'Hassle Free', value: 'Care in Your Home' }
  ];

  return (
    <section className="mx-auto -mt-20 max-w-4xl px-6">
      <div className="glass-card grid gap-6 rounded-3xl border-white/10 bg-white/10 p-6 text-center shadow-gentle backdrop-blur-xl sm:grid-cols-3">
        {stats.map(stat => (
          <div key={stat.label} className="flex flex-col">
            <span className="font-heading text-3xl text-white">{stat.value}</span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CareStory() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
      <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div>
          <span className="badge-pill">What parents are sharing</span>
          <h2 className="mt-4 font-heading text-3xl text-white">“The visit felt like a trusted friend checking in.”</h2>
          <p className="mt-4 text-base text-slate-200">
            “Dr. Nash spoke directly to our son, asked about his favorite books, and helped him feel at
            ease before examining his rash. We received care instructions and even a check-in message the
            next day. It was the most comforting medical experience we&apos;ve had.”
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-light">— The Martinez Family, Berkeley</p>
        </div>
        <div className="space-y-6 rounded-3xl bg-midnight/60 p-6">
          <h3 className="font-heading text-xl text-white">Our gentle visit flow</h3>
          <ol className="space-y-4 text-sm text-slate-300">
            <li>
              <span className="badge-pill bg-brand-base/15 text-white">1</span>
              <span className="ml-3">Send a quick intake and choose a time that fits your busy schedule.</span>
            </li>
            <li>
              <span className="badge-pill bg-brand-base/15 text-white">2</span>
              <span className="ml-3">Join a calming video visit with guided comfort steps for your child.</span>
            </li>
            <li>
              <span className="badge-pill bg-brand-base/15 text-white">3</span>
              <span className="ml-3">Receive a personalized care plan with guidance tailored to your child.</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
