export default function SchedulePage() {
  return (
    <div className="px-6 pb-24 pt-16 lg:px-10">
      <section className="mx-auto max-w-5xl text-center">
        <span className="badge-pill">Patient Scheduling</span>
        <h1 className="mt-6 font-heading text-4xl text-white sm:text-5xl">
          Schedule Your Visit
        </h1>
        <p className="mt-6 text-lg text-slate-200">
          Select an available appointment time that works for your family. All visits are conducted
          via secure video call from the comfort of your home.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="font-heading text-2xl text-white mb-4">Available Appointments</h2>
            <p className="text-sm text-slate-300">
              Please select an available time slot below. A $50 deposit is required to confirm your appointment.
            </p>
          </div>
          
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <iframe
              width="100%"
              height="1000"
              src="https://ehr.charmtracker.com/publicCal.sas?method=getCal&digest=c22a2325d65b23aa3e28a350425281fcfe24118c992220e2609ab56e4c9cfacb66e98fcf386c0141e56bad3e5857fa0fa0ae868b6eb0918a"
              style={{ overflow: 'hidden' }}
              frameBorder="0"
              title="Schedule Appointment"
            />
          </div>
          
          <div className="mt-6 rounded-2xl border border-brand-base/30 bg-brand-base/10 p-6 text-sm text-slate-200">
            <p className="font-semibold text-white mb-3">Important Notes</p>
            <ul className="space-y-2">
              <li>• All appointments are conducted via secure telehealth platform</li>
              <li>• Standard 15-minute visits: $150 | Extended 30-minute visits: $250</li>
              <li>• $50 deposit required at booking (applied to final balance)</li>
              <li>• For emergencies, please call 911 or visit your nearest emergency room</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}