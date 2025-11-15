export function HowItWorks() {
  const steps = [
    "Pre-register by filling out the form below. Do this for each of your children.",
    "You will be sent credentials to log in to your patient portal as well as a secure link to enter credit card or HSA card information with our partner Stripe. (We don't collect or keep any of your financial information, ever.)",
    "When you would like an appointment, log into the patient portal and select a time that works for you.",
    "Your credit card will be charged a $50 deposit to secure the appointment time. (Your appointment is not confirmed until the deposit is paid.)",
    "Log in through the secure link to have your appointment.",
    "After the appointment, your card will be charged the balance due (total less deposit paid) and you will be sent a receipt to submit to your insurance company or HSA."
  ];

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
      <div className="glass-card rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl">
        <span className="badge-pill">How it works</span>
        <h2 className="mt-4 font-heading text-3xl text-white">Getting started is simple</h2>
        <p className="mt-4 text-base text-slate-200">
          Follow these steps to access pediatric care from the comfort of your home.
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