"use client";

import { useState } from 'react';
import { LoadingSpinner } from '../../components/loading-spinner';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function HousecallsLWWPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      patientName: formData.get('patientName')?.toString().trim() ?? '',
      email: formData.get('email')?.toString().trim() ?? '',
      phoneNumber: formData.get('phoneNumber')?.toString().trim() ?? '',
      reasonForVisit: formData.get('reasonForVisit')?.toString().trim() ?? '',
      formType: 'Lake Wildwood Housecall Request'
    };

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setMessage("Thank you! We'll contact you soon to schedule your Lake Wildwood housecall.");
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  return (
    <div className="px-6 pb-24 pt-16 lg:px-10">
      <section className="mx-auto max-w-5xl text-center">
        <span className="badge-pill">In-Home Care</span>
        <h1 className="mt-6 font-heading text-4xl text-white sm:text-5xl">
          Housecalls in Lake Wildwood
        </h1>
        <p className="mt-6 text-lg text-slate-200 text-center">
          Traditional in-home urgent care visits available exclusively for residents within the gates of Lake Wildwood.
        </p>
        <p className="mt-3 text-lg text-slate-200 text-center">
          <span 
            className="inline-block px-4 py-2 rounded-full border border-brand-base/30 bg-gradient-to-r from-brand-base/20 to-brand-light/20 text-white font-semibold animate-pulse"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(34, 197, 94, 0.2)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          >
            Services are available for both adults and children
          </span>
        </p>
        <p className="mt-3 text-lg text-slate-200 text-center">
          Experience personalized medical care in the comfort and privacy of your own home.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <span className="badge-pill">Available Services</span>
            <h2 className="mt-4 font-heading text-3xl text-white">Comprehensive in-home urgent care</h2>
            <p className="mt-4 text-base text-slate-200">
              Our housecall services bring the same quality care you expect from our virtual visits directly to your door, 
              with the added benefit of hands-on examination, diagnostic testing, and prescriptions when needed.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-xl text-white mb-3">Diagnosis & Treatment of Illnesses</h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• Ear infections</li>
                  <li>• Pink eye (conjunctivitis)</li>
                  <li>• Sinusitis and respiratory infections</li>
                  <li>• Pneumonia diagnosis and management</li>
                  <li>• Fever evaluation and treatment</li>
                  <li>• Cold and flu symptoms</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-xl text-white mb-3">Diagnostic Testing</h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• Rapid strep throat testing</li>
                  <li>• Influenza (flu) rapid tests</li>
                  <li>• COVID-19 testing</li>
                  <li>• RSV (Respiratory Syncytial Virus) testing</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-heading text-xl text-white mb-3">Injury Treatment</h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• Laceration care and suturing</li>
                  <li>• Sprain and strain evaluation</li>
                  <li>• Minor burn treatment</li>
                  <li>• Wound care and dressing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 text-center">
              <h3 className="font-heading text-2xl text-white mb-4">Service Area</h3>
              <div className="rounded-2xl border border-brand-base/30 bg-brand-base/10 p-6">
                <p className="font-semibold text-white mb-2">Lake Wildwood Residents Only</p>
                <p className="text-sm text-slate-200">
                  In-home housecalls are exclusively available to residents living within the gates of Lake Wildwood. 
                  This service is available during select days and times.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 text-center">
              <h3 className="font-heading text-2xl text-white mb-4">Pricing</h3>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">In-Home Visit</p>
                  <p className="text-2xl font-heading text-brand-light mt-1">Starting at $250</p>
                  <p className="text-xs text-slate-400 mt-2">Additional testing and procedures may incur extra charges</p>
                </div>
                <p className="text-sm text-slate-300">
                  Payment is due at the time of service. We accept cash, check, credit cards, and HSA cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-gentle backdrop-blur-xl">
          <h2 className="font-heading text-3xl text-white text-center mb-6">Schedule Your Housecall</h2>
          
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h3 className="font-heading text-xl text-white mb-3">Request Form</h3>
              <p className="text-sm text-slate-300 mb-4">
                Fill out the form below and we&apos;ll contact you to schedule your in-home visit.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h3 className="font-heading text-xl text-white mb-3">Patient Portal</h3>
              <p className="text-sm text-slate-300 mb-4">
                Log in to your existing patient portal and send a secure message to request a housecall.
              </p>
              <a 
                href="/patient-portal"
                className="btn-pill-secondary inline-flex"
              >
                Access Portal
              </a>
            </div>
          </div>

          {/* Lake Wildwood Housecall Request Form */}
          <div className="rounded-3xl border border-brand-base/30 bg-brand-base/10 p-6">
            <h3 className="font-heading text-2xl text-white text-center mb-6">Lake Wildwood Housecall Request</h3>
            
            <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
              <Field label="Patient Name" name="patientName" placeholder="Patient's full name" />
              <Field label="Email Address" name="email" type="email" placeholder="your.email@example.com" autoComplete="email" />
              <Field label="Phone Number" name="phoneNumber" type="tel" placeholder="(530) 123-4567" autoComplete="tel" />
              
              <TextareaField
                label="Reason for Visit Request"
                name="reasonForVisit"
                placeholder="Briefly describe the reason for the housecall request..."
                className="md:col-span-2"
              />

              <div className="md:col-span-2 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn-pill-primary flex items-center gap-2">
                  {status === 'loading' ? <LoadingSpinner /> : null}
                  <span>{status === 'loading' ? 'Sending Request...' : 'Request Housecall'}</span>
                </button>
                {status !== 'idle' && message ? (
                  <p
                    role="status"
                    className={
                      status === 'success'
                        ? 'text-sm font-semibold text-brand-light'
                        : 'text-sm font-medium text-rose-200'
                    }
                  >
                    {message}
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="mt-8 rounded-2xl border border-brand-base/30 bg-brand-base/10 p-6 text-sm text-slate-200">
            <p className="font-semibold text-white mb-3">Important Notes</p>
            <ul className="space-y-2">
              <li>• Available only to Lake Wildwood residents within the gates</li>
              <li>• Service offered during select days and times</li>
              <li>• For medical emergencies, please call 911</li>
              <li>• We will confirm availability and provide estimated arrival time</li>
              <li>• All services follow the same HIPAA privacy standards</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl text-center">
        <div className="rounded-3xl border border-brand-base/30 bg-brand-base/10 p-8 shadow-gentle">
          <h2 className="font-heading text-3xl text-white">Questions about housecalls?</h2>
          <p className="mt-4 text-base text-slate-200">
            Contact us to learn more about our in-home services, availability, or to discuss your specific needs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:HouseCallForKids@gmail.com"
              className="btn-pill-secondary"
            >
              Email Us
            </a>
            <a 
              href="tel:530-799-0746"
              className="btn-pill-primary"
            >
              Call (530) 799-0746
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  autoComplete,
  placeholder,
  required = true
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
      {label}
      <input
        required={required}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  className
}: {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 text-sm font-medium text-slate-200 ${className ?? ''}`}>
      {label}
      <textarea
        required
        name={name}
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
      />
    </label>
  );
}