'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, Send, Store, Building2 } from 'lucide-react';

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulation d'envoi — à brancher sur votre endpoint ou service email
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary-hover)]">
          <Send size={20} />
        </div>
        <p className="font-medium text-white">Message envoyé !</p>
        <p className="text-sm text-[var(--muted)]">On vous répond sous 24h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
      <input
        type="text"
        required
        placeholder="Votre nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
      />
      <input
        type="email"
        required
        placeholder="Votre email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
      />
      <textarea
        required
        rows={3}
        placeholder="Décrivez votre activité en quelques mots et ce que vous aimeriez automatiser…"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full resize-none rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
      />
      <button
        type="submit"
        disabled={loading}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)] disabled:opacity-60"
      >
        {loading ? 'Envoi…' : 'Envoyer mon message'}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
      <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--muted)]">
        Sans engagement · Réponse sous 24h
      </p>
    </form>
  );
}

export default function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.16),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="eyebrow">Passez à l'action</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Par où voulez-vous commencer ?</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Carte TPE — formulaire léger */}
          <div className="rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                <Store size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-semibold text-white">Je suis un commerce</p>
                <p className="text-xs text-[var(--muted)]">artisan · restaurateur · indépendant</p>
              </div>
            </div>
            <p className="mb-6 text-sm text-[var(--muted)]">
              Envoyez-nous un message. On vous répond pour comprendre votre besoin et vous dire si on peut aider.
            </p>
            <ContactForm />
          </div>

          {/* Carte PME — Calendly */}
          <div className="flex flex-col rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                <Building2 size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-semibold text-white">Je suis une entreprise</p>
                <p className="text-xs text-[var(--muted)]">PME · structure · équipe</p>
              </div>
            </div>
            <p className="mb-6 text-sm text-[var(--muted)]">
              30 min de visio. On qualifie le besoin, on identifie l'agent qui colle, on vous dit honnêtement si c'est pour Pulse — ou pas.
            </p>
            <div className="mt-auto flex flex-col items-center gap-3 text-center">
              <a
                href="https://calendly.com/a-fontana-smatchroom/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-base font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
              >
                <Calendar size={18} />
                Réserver un créneau Calendly
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                30 min · Visio · Sans engagement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
