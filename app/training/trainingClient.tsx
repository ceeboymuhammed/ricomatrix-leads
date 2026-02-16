"use client";

import { useState } from "react";
import { LeadForm } from "@/components/LeadForm";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";

const WHATSAPP_NUMBER = "2348113375026";
const YOUTUBE_LINK = "https://youtu.be/AhtrIrgebM0";

function buildShareUrl(path: string) {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

export default function TrainingLeadClient() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = buildShareUrl("/training");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  const shareUrl = typeof window !== "undefined" ? buildShareUrl("/training") : "/training";
  const waConsultantLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi, I just requested the free training. Please guide me on the next steps."
  )}`;
  const waShareLink = `https://wa.me/?text=${encodeURIComponent(`Here’s the free training page: ${shareUrl}`)}`;

  return (
    <div className="space-y-4">
      <LeadForm
        source="training"
        title="Get Free Access"
        emailMicrocopy="Your access link will be delivered by email. No spam."
        phoneMicrocopy="(Optional) Add WhatsApp number so we can support you faster."
        buttonText="Send Me The Training"
        afterButtonMicrocopy="Takes less than 10 seconds."
        privacyLine="We respect your privacy and never sell your data."
        onSuccess={() => setSubmitted(true)}
      />

      {submitted ? (
        <div className="rounded-xl2 border border-brand-border bg-brand-surface p-5 text-white shadow-soft">
          <h2 className="text-xl font-semibold">You’re In — Watch This Before You Go</h2>

          <div className="mt-4">
            <VideoPlaceholder title="Training Video" youtubeUrl={YOUTUBE_LINK} />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <a
              href={waConsultantLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-4 py-3 text-base font-semibold text-black transition hover:bg-brand-gold2"
            >
              Chat with a Consultant on WhatsApp
            </a>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
              <button
                onClick={copyLink}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-brand-card px-4 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {copied ? "Link Copied ✓" : "Share this Training"}
              </button>

              <a
                href={waShareLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-brand-card px-4 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Share on WhatsApp
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs text-brand-muted">
            No spam / we don’t sell your data.
          </p>
        </div>
      ) : null}
    </div>
  );
}
