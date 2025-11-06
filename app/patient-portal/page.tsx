export default function PatientPortalPage() {
  return (
    <div className="px-6 pb-24 pt-16 lg:px-10">
      <section className="mx-auto max-w-4xl text-center">
        <span className="badge-pill">Patient Portal</span>
        <h1 className="mt-6 font-heading text-4xl text-white sm:text-5xl">
          Secure care hub for your family.
        </h1>
        <p className="mt-6 text-lg text-slate-200">
          Access visit notes, share updates with Dr. Nash, and manage appointments through our HIPAA-compliant
          OpenEMR portal.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl text-white">Log in or request access</h2>
            <p className="mt-4 text-base text-slate-200">
              Our portal keeps your child’s information protected while making it simple to stay connected.
              After you complete our inquiry form, we’ll send login credentials and walk you through the steps.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Secure messaging</p>
                <p className="mt-2">Send quick updates, photos, or questions between visits.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Care plans & notes</p>
                <p className="mt-2">Review personalized instructions and share them with caregivers.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Scheduling</p>
                <p className="mt-2">Request visits or reschedule in just a few taps.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Medication coordination</p>
                <p className="mt-2">Receive updates when prescriptions are sent to your pharmacy.</p>
              </div>
            </div>
          </div>

          <form className="glass-card space-y-5 p-6" aria-labelledby="portal-login">
            <h2 id="portal-login" className="font-heading text-2xl text-white">
              Returning families
            </h2>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Email
              <input
                type="email"
                required
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Password
              <input
                type="password"
                required
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
              />
            </label>
            <button type="submit" className="btn-pill-primary w-full">
              Log in
            </button>
            <div className="flex justify-between text-xs text-slate-400">
              <a href="#" className="hover:text-white">
                Forgot password?
              </a>
              <a href="#" className="hover:text-white">
                Need an account?
              </a>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl text-center">
        <div className="rounded-3xl border border-brand-base/30 bg-brand-base/10 p-8 shadow-gentle">
          <h2 className="font-heading text-3xl text-white">New to our practice?</h2>
          <p className="mt-4 text-base text-slate-200">
            Start with our early access form so we can get to know your family and invite you to the portal.
          </p>
          <a href="/#inquiry" className="btn-pill-secondary mt-6 inline-flex">
            Complete the inquiry form
          </a>
        </div>
      </section>
    </div>
  );
}
