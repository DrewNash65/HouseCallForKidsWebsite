"use client";

import { useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function InquirySection() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      parentName: formData.get('parentName')?.toString().trim() ?? '',
      phoneNumber: formData.get('phoneNumber')?.toString().trim() ?? '',
      email: formData.get('email')?.toString().trim() ?? '',
      patientName: formData.get('patientName')?.toString().trim() ?? '',
      dateOfBirth: formData.get('dateOfBirth')?.toString().trim() ?? '',
      californiaResident: formData.get('californiaResident'),
      concerns: formData.get('concerns')?.toString().trim() ?? '',
      afterHours: formData.getAll('afterHours').includes('yes') ? 'Yes' : 'No',
      questions: formData.getAll('questions').includes('yes') ? 'Yes' : 'No'
    };

    if (payload.californiaResident !== 'yes') {
      setStatus('error');
      setMessage('At this time we are only able to serve families located in California.');
      return;
    }

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
      setMessage("Thank you! We'll share launch details and gentle care tips soon.");
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  return (
    <section id="inquiry" className="mx-auto mt-24 max-w-6xl px-6 lg:px-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 shadow-gentle backdrop-blur-xl md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Pre-register your child</span>
          <h2 className="mt-4 font-heading text-3xl text-white sm:text-4xl">
            Be first to know when visits open statewide.
          </h2>
          <p className="mt-4 text-base text-slate-200">
            We&apos;ll reach out with launch availability, gentle care tips, and early scheduling
            options for virtual visits beginning early 2026.
          </p>
        </div>

        <form className="mt-10 grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-6 md:col-span-2 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            <Field label="Parent or guardian name" name="parentName" autoComplete="name" />
            <Field label="Phone number" name="phoneNumber" autoComplete="tel" />
            <Field label="Email" type="email" name="email" autoComplete="email" />
            <Field label="Child&apos;s name" name="patientName" />
            <DateField label="Child&apos;s birthdate" name="dateOfBirth" />
            <SelectField
              label="Located in California?"
              name="californiaResident"
              options="Please select|yes|no"
            />
          </div>

          <TextareaField
            label="How can we support your family?"
            name="concerns"
            placeholder="Share symptoms, questions, or goals for your child’s care."
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-white">I&apos;m interested in</legend>
              <CheckboxField id="afterHours" name="afterHours" label="Evening / weekend appointments" />
              <CheckboxField id="questions" name="questions" label="Ongoing parenting guidance & updates" />
            </fieldset>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-brand-base/30 bg-brand-base/10 p-6 text-left text-sm text-slate-200">
              <p className="font-semibold text-white">Gentle reminders</p>
              <ul className="mt-3 space-y-2">
                <li>For emergencies, please call 911 or visit the nearest emergency department.</li>
                <li>We serve families across California with children from newborn to 17 years old.</li>
                <li>Your information is protected under HIPAA and used only to coordinate care.</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-pill-primary flex items-center gap-2">
              {status === 'loading' ? <LoadingSpinner /> : null}
              <span>{status === 'loading' ? 'Sending' : 'Reserve My Spot'}</span>
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
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  autoComplete
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
      {label}
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
      />
    </label>
  );
}

function DateField({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
      {label}
      <input
        required
        name={name}
        type="date"
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string }) {
  const [placeholder, ...items] = options.split('|');
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
      {label}
      <select
        required
        name={name}
        defaultValue=""
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-brand-base focus:outline-none focus:ring-2 focus:ring-brand-base/40"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map(option => (
          <option key={option} value={option} className="text-slate-900">
            {option === 'yes' ? 'Yes, we are in California' : 'No, we are outside California'}
          </option>
        ))}
      </select>
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

function CheckboxField({ id, name, label }: { id: string; name: string; label: string }) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 text-sm text-slate-200">
      <input
        id={id}
        name={name}
        type="checkbox"
        value="yes"
        className="h-5 w-5 rounded-md border border-white/10 bg-white/10 text-brand-base focus:ring-brand-base/40"
      />
      <span>{label}</span>
    </label>
  );
}
