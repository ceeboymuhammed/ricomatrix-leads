"use client";

import { useMemo, useState, useTransition } from "react";
import type { LeadSource } from "@/lib/leadsActions";
import { insertLead } from "@/lib/leadsActions";

type Props = {
  source: LeadSource;
  title?: string;
  emailMicrocopy: string;
  phoneMicrocopy: string;
  buttonText: string;
  afterButtonMicrocopy: string;
  privacyLine: string;
  onSuccess?: () => void;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validate(name: string, email: string, phone: string) {
  if (name.trim().length < 2) return "Please enter your full name.";
  if (!isEmail(email)) return "Please enter a valid email address.";
  if (phone.trim() && phone.trim().length < 7) return "Please enter a valid phone number (or leave it blank).";
  return null;
}

export function LeadForm({
  source,
  title,
  emailMicrocopy,
  phoneMicrocopy,
  buttonText,
  afterButtonMicrocopy,
  privacyLine,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && isEmail(email) && !isPending && !success;
  }, [name, email, isPending, success]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const err = validate(name, email, phone);
    if (err) {
      setError(err);
      return;
    }

    startTransition(async () => {
      const res = await insertLead({ name, email, phone, source });

      if (!res.ok) {
        setError(res.error);
        return;
      }

      setSuccess(true);
      onSuccess?.();
    });
  }

  return (
    <div className="rounded-xl2 border border-brand-border bg-white/95 p-5 text-black shadow-soft md:p-6">
      {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}

      {success ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-900">Success! You’re in.</p>
          <p className="mt-1 text-sm text-emerald-800">
            You can continue below.
          </p>
        </div>
      ) : (
        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              placeholder="e.g. Chinedu Okafor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              placeholder="e.g. you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
            />
            <p className="mt-1 text-xs text-black/70">{emailMicrocopy}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-base outline-none focus:ring-2 focus:ring-brand-gold"
              placeholder="e.g. +234 801 234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
            />
            <p className="mt-1 text-xs text-black/70">{phoneMicrocopy}</p>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-xl bg-brand-gold px-4 py-3 text-base font-semibold text-black shadow-sm transition hover:bg-brand-gold2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Submitting..." : buttonText}
          </button>

          <p className="text-center text-xs text-black/70">{afterButtonMicrocopy}</p>

          <p className="text-center text-xs text-black/70">
            {privacyLine}
          </p>
        </form>
      )}
    </div>
  );
}
