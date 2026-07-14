"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(246,244,239,0.82)] backdrop-blur-xl border-b border-[var(--border)] shadow-[var(--shadow-sm)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/landing"
          className="text-[var(--foreground)] font-bold text-lg tracking-tight"
        >
          Pulse<span className="text-[var(--primary-ink)]">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          <Link href="/artisans" className="hover:text-[var(--foreground)] transition-colors">Artisans</Link>
          <Link href="/partenaires" className="hover:text-[var(--foreground)] transition-colors">Partenaires</Link>
          <Link href="/scale" className="hover:text-[var(--foreground)] transition-colors">Scale &amp; Tech</Link>
        </div>
        <a
          href="https://calendly.com/a-fontana-smatchroom/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center px-5 py-2.5 text-sm font-semibold"
        >
          Audit gratuit →
        </a>
      </div>
    </nav>
  );
}
