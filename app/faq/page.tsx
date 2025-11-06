const faqs = [
  {
    question: 'What ages do you serve?',
    answer:
      'We welcome families with children from newborn through 17 years old across the state of California.'
  },
  {
    question: 'How quickly can we be seen?',
    answer:
      'Most families are offered same-day or next-morning appointments. We also hold a few evening slots for after-school concerns.'
  },
  {
    question: 'Do you coordinate with our pediatrician?',
    answer:
      'Yes. With your permission we share visit summaries and follow-up notes with your primary pediatrician to keep everyone aligned.'
  },
  {
    question: 'What technology do we need?',
    answer:
      'A smartphone, tablet, or computer with camera and internet access is all you need. We’ll send a secure link—no account setup required.'
  },
  {
    question: 'Can siblings join the visit?',
    answer:
      'Absolutely. We encourage siblings or caregivers involved in daily routines to join so everyone feels confident in the care plan.'
  },
  {
    question: 'What conditions do you treat virtually?',
    answer:
      'We treat most pediatric urgent concerns including fevers, coughs, rashes, stomach issues, allergies, and mild injuries. We also provide behavioral and sleep coaching.'
  }
];

export default function FaqPage() {
  return (
    <div className="px-6 pb-24 pt-16 lg:px-10">
      <section className="mx-auto max-w-4xl text-center">
        <span className="badge-pill">Frequently Asked Questions</span>
        <h1 className="mt-6 font-heading text-4xl text-white sm:text-5xl">
          Answers for curious parents and caring guardians.
        </h1>
        <p className="mt-6 text-lg text-slate-200">
          We want you to feel prepared and at ease. If you don’t see your question, send us a message—we’re
          happy to help.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-4xl space-y-6">
        {faqs.map(faq => (
          <details key={faq.question} className="group rounded-3xl border border-white/10 bg-white/5 p-6">
            <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-heading text-white">
              {faq.question}
              <span className="ml-3 text-brand-light transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-sm text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-4xl rounded-3xl border border-brand-base/30 bg-brand-base/10 p-8 text-center">
        <h2 className="font-heading text-3xl text-white">Interested? Have Questions?</h2>
        <p className="mt-4 text-base text-slate-200">
          Email <a className="underline" href="mailto:HouseCallForKids@Gmail.com">HouseCallForKids@Gmail.com</a> if you need more info.
        </p>
      </section>
    </div>
  );
}
