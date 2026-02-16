import "./globals.css";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Lead Magnet",
  description: "Conversion-optimized landing pages for Nigerian audience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-bg text-white">
        <TopBar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 md:pt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
