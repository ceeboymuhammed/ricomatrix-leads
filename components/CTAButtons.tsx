"use client";

import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "2348113375026"; // from user: +234 811 337 5026

type Props = {
  variant: "calculator" | "training";
  shareUrlPath: "/calculator" | "/training";
};

function buildShareUrl(path: string) {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

export function CTAButtons({ variant, shareUrlPath }: Props) {
  const [copied, setCopied] = useState(false);

  const waMessage = useMemo(() => {
    if (variant === "calculator") {
      return "Hi, I just used the Recurring Revenue Calculator. Please help me understand my projection and next steps.";
    }
    return "Hi, I just requested the free training. Please guide me on the next steps.";
  }, [variant]);

  async function copyLink() {
    const url = buildShareUrl(shareUrlPath);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: do nothing
    }
  }

  const shareUrl = typeof window !== "undefined" ? buildShareUrl(shareUrlPath) : shareUrlPath;

  const waConsultantLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
  const waShareLink = `https://wa.me/?text=${encodeURIComponent(
    `Check this out: ${shareUrl}`
  )}`;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
          {copied ? "Link Copied ✓" : "Share this Calculator"}
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
  );
}
