"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export type LeadSource = "calculator" | "training";

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  source: LeadSource;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// Nigeria-friendly phone acceptance: we’ll be permissive (user can type +234... or 0...)
function isValidPhoneOptional(value?: string) {
  if (!value) return true;
  const v = value.trim();
  if (v.length < 7) return false;
  return /^[+0-9\s()-]+$/.test(v);
}

export async function insertLead(input: LeadInput): Promise<{ ok: true } | { ok: false; error: string }> {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const phone = (input.phone ?? "").trim();
  const source = input.source;

  if (name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!isEmail(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!isValidPhoneOptional(phone)) return { ok: false, error: "Please enter a valid phone number (or leave it blank)." };

  try {
    const supabase = supabaseServer();

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      source,
    });

    if (error) {
      return { ok: false, error: error.message || "Unable to save your details. Please try again." };
    }

    return { ok: true };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : "Unexpected error. Please try again." };
  }
}
