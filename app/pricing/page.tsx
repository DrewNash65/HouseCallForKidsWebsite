const plans = [
  {
    name: 'Comfort Visit',
    price: '$150',
    duration: 'Up to 20 minutes',
    description: 'Perfect for urgent questions, fevers, rashes, tummy troubles, and more.',
    items: ['Warm video visit with Dr. Nash', 'Personalized care plan & follow-up notes', 'School/daycare documentation when needed']
  },
  {
    name: 'Extended Family Visit',
    price: '$250',
    duration: 'Up to 35 minutes',
    description: 'Ideal for complex concerns, behavioral support, or multiple topics in one visit.',
    items: ['Expanded time to discuss concerns in depth', 'Behavioral & sleep coaching when helpful', 'Check-ins after the visit to see how everyone is feeling']
  },
  {
    name: 'Prescription Support',
    price: 'Included',
    duration: 'As needed',
    description: 'Seamless medication management tied directly to your visit.',
    items: ['E-prescribing to your preferred pharmacy', 'Medication instructions and what to watch for', 'Quick portal messaging for follow-up questions']
  }
];

const faqs = [
  {
    question: 'Do you accept insurance?',
    answer:
      'We operate as an out-of-network practice. Payment is collected at the time of service, and we provide a detailed receipt to submit to your insurance or HSA/FSA plan.'
  },
  {
    question: 'Can we message you after a visit?',
    answer:
      'Yes. Every visit includes secure portal messaging for clarifying questions. Extended visits also include a scheduled check-in from our team.'
  },
  {
    question: 'What if we need in-person evaluation?',
    answer:
      'If an in-person exam becomes necessary, we’ll help you transition smoothly with documentation for urgent care or your pediatrician.'
  }
];

export default function PricingPage() {
  return (
    <div className="px-6 pb-24 pt-16 lg:px-10">
      <section className="mx-auto max-w-4xl text-center">
        <span className="badge-pill">Transparent Pricing</span>
        <h1 className="mt-6 font-heading text-4xl text-white sm:text-5xl">
          Simple visits, thoughtful follow-up, no surprises.
        </h1>
        <p className="mt-6 text-lg text-slate-200">
          Every appointment includes a gentle check-in, collaborative plan, and easy access to follow-up
          support. Choose the visit length that fits your family.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-3">
        {plans.map(plan => (
          <div key={plan.name} className="glass-card flex h-full flex-col p-6 text-left">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-light">
              {plan.duration}
            </span>
            <h2 className="mt-3 font-heading text-2xl text-white">{plan.name}</h2>
            <p className="mt-4 text-3xl font-heading text-white">{plan.price}</p>
            <p className="mt-4 text-sm text-slate-300">{plan.description}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              {plan.items.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-base" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl">
        <h2 className="font-heading text-3xl text-white">Financial details</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <p className="font-heading text-lg text-white">Payment methods</p>
            <p className="mt-3">
              We accept all major credit cards along with HSA/FSA cards. Receipts are available for
              reimbursement submissions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <p className="font-heading text-lg text-white">Care navigation</p>
            <p className="mt-3">
              Need labs or imaging? We coordinate orders and referrals so you have guidance each step of
              the way.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <p className="font-heading text-lg text-white">Visit follow-ups</p>
            <p className="mt-3">
              Every visit includes at least one follow-up check-in within 48 hours, plus portal messaging
              for quick questions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl space-y-6">
        <h2 className="font-heading text-3xl text-white">Frequently asked billing questions</h2>
        {faqs.map(faq => (
          <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-heading text-lg text-white">{faq.question}</h3>
            <p className="mt-3 text-sm text-slate-300">{faq.answer}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-4xl text-center">
        <div className="rounded-3xl border border-brand-base/30 bg-brand-base/10 p-8 shadow-gentle">
          <h2 className="font-heading text-3xl text-white">Still have questions?</h2>
          <p className="mt-4 text-base text-slate-200">
            Send us a note at <a className="underline" href="mailto:hello@housecallforkids.com">hello@housecallforkids.com</a>
            and we&apos;ll walk through coverage, paperwork, and anything else you need.
          </p>
        </div>
      </section>
    </div>
  );
}
