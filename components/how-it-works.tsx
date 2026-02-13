export function HowItWorks() {
  const steps = [
    "Register by filling out the form below to set up your patient portal (all children can be under one portal account), OR go directly to our Schedule page to select an available appointment time.",
    "You will be sent secure links to complete registration forms, login credentials for the patient portal and a secure link to pay a $50 deposit to secure your appointment.",
    "When you would like an appointment, either log into the patient portal and select a time, or use our Schedule page directly to book available slots.",
    "Just prior to your appointment time, log in to the portal and click on the telehealth icon to begin your visit.",
    "After the appointment, your card will be charged the balance due (total less deposit paid) and you will be sent a receipt to submit to your insurance company or HSA."
  ];

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
      <div className="glass-card rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl">
        <span className="badge-pill">How it works</span>
        <h2 className="mt-4 font-heading text-3xl text-white">Getting started is simple</h2>
        <p className="mt-4 text-base text-slate-200">
          Choose your preferred path: set up a patient portal account first, or go directly to scheduling. Both lead to the same compassionate care from the comfort of your home.
        </p>

        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <span className="badge-pill bg-brand-base/15 text-white mt-1 flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-base text-slate-200 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}