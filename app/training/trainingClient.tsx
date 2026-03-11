"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function TrainingLeadClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        source: "new-economy-roadmap",
      };

      const { error: insertError } = await supabase
        .from("leads")
        .insert([payload]);

      if (insertError) {
        throw insertError;
      }

      const message = `Hi! I just came from the New Economy Roadmap page. I'm interested in learning how to leverage digital assets and automated systems. My name is: ${formData.name.trim()}`;
      const whatsappLink = `https://wa.me/2348146479700?text=${encodeURIComponent(message)}`;

      window.location.href = whatsappLink;
    } catch (err: any) {
      console.error("Lead submission error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-brand-border bg-brand-surface p-6 text-white shadow-soft">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Get Started</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Enter your details below and continue on WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-white/15 bg-brand-card px-4 py-3 text-white placeholder:text-brand-muted outline-none transition focus:border-brand-gold"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full rounded-xl border border-white/15 bg-brand-card px-4 py-3 text-white placeholder:text-brand-muted outline-none transition focus:border-brand-gold"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            WhatsApp Number <span className="text-brand-muted">(Optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your WhatsApp number"
            className="w-full rounded-xl border border-white/15 bg-brand-card px-4 py-3 text-white placeholder:text-brand-muted outline-none transition focus:border-brand-gold"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-brand-gold px-4 py-3 text-base font-semibold text-black transition hover:bg-brand-gold2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Submitting..." : "SEND ME THE DETAILS ON WHATSAPP"}
        </button>

        <p className="text-xs text-brand-muted">
          We respect your privacy and never sell your data.
        </p>
      </form>
    </div>
  );
}