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

          <div className="glass-card flex justify-center items-center p-6">
            <div style={{float: 'left', margin: '20px'}}>
              <a 
                href="https://phr.charmtracker.com/login.sas?FACILITY_ID=6da761489431a9744d87b74f47ba4ed9c22a2325d65b23aa81b1d04dd4f7172a44328955ac4b2a6a" 
                target="_blank" 
                className="btn btn-small btn-success pull-right" 
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#5BB75B',
                  background: '#62c462',
                  backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzYyYzQ2MiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM1MWEzNTEiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)',
                  borderColor: 'rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25)',
                  color: '#FFFFFF',
                  textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
                  fontSize: '11px',
                  fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                  padding: '5px 6px',
                  borderRadius: '4px 4px 4px 4px',
                  border: '#448944 solid 1px',
                  cursor: 'pointer'
                }}
              >
                Patient Portal
              </a>
            </div>
          </div>
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
