'use client';

import { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
