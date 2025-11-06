import { HeartIcon, SparklesIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const services = [
  {
    name: 'Personalized Video Visits',
    description:
      'Same-day virtual appointments with pediatric specialists who listen closely and guide you through care, step by gentle step.',
    icon: ChatBubbleLeftRightIcon
  },
  {
    name: 'Comfort-Centered Urgent Care',
    description:
      'Thoughtful support for fevers, coughs, earaches, and tummy troubles with home care plans that keep your child comfortable.',
    icon: HeartIcon
  },
  {
    name: 'Behavior & Sleep Support',
    description:
      'Compassionate coaching for sleep routines, big feelings, and parenting questions so everyone rests easier.',
    icon: UserGroupIcon
  },
  {
    name: 'Care Coordination & Prescriptions',
    description:
      'Personalized care summaries, quick electronic prescribing to your pharmacy, and communication with your child\'s regular physician.',
    icon: SparklesIcon
  }
];

export function ServicesSection() {
  return (
    <section className="relative mx-auto mt-24 max-w-6xl px-6 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,1.2fr] lg:items-center">
        <div className="section-muted">
          <span className="badge-pill">A care circle built for families</span>
          <h2 className="mt-4 font-heading text-3xl text-white">Whole-family support, beyond the visit.</h2>
          <p className="mt-4 text-base text-slate-200">
            We combine trusted pediatric expertise with the warmth of a hometown doctor. Every visit
            includes reassuring guidance and resources you can rely on between appointments.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-brand-base" aria-hidden />Licensed in all of California</li>
            <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-lilac" aria-hidden />HIPAA-secure visits & messaging</li>
            <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-brand-light" aria-hidden />After-hours options available</li>
          </ul>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map(service => (
            <div key={service.name} className="glass-card h-full p-6 text-left">
              <service.icon className="h-9 w-9 text-brand-light" aria-hidden />
              <h3 className="mt-4 font-heading text-xl text-white">{service.name}</h3>
              <p className="mt-3 text-sm text-slate-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
