"use client";
import { motion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import Footer from "@/components/Footer";

const secteurs = [
  "Agence Web", "Développement Web", "Webflow / Shopify",
  "Agence SEO", "Google Ads / Meta Ads", "Growth Marketing",
  "Lead Generation", "Agence Communication", "Studio Digital",
];

const avantages = [
  { icon: "🏷️", title: "Marque blanche totale", desc: "Notre technologie, votre nom. Vos clients ne voient que votre agence." },
  { icon: "💰", title: "Nouvelle ligne de revenus", desc: "Proposez une offre IA sans recruter ni former. On s'occupe de tout." },
  { icon: "⚙️", title: "Zéro technique pour vous", desc: "On déploie, on maintient, on fait évoluer. Vous vendez et on livre." },
  { icon: "📊", title: "Dashboard partenaire", desc: "Suivez l'activité de vos clients en temps réel depuis un seul endroit." },
];

const etapes = [
  { step: "01", title: "On échange 30 min", desc: "On analyse votre portefeuille clients et on identifie les opportunités." },
  { step: "02", title: "On configure votre offre", desc: "On paramètre l'infrastructure à votre image — logo, couleurs, domaine." },
  { step: "03", title: "Vous proposez, on livre", desc: "Vous vendez l'offre à vos clients. On déploie et on maintient en arrière-plan." },
];

export default function PartenairesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden grain px-5 sm:px-6 pt-32 pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.16),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chip inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] mb-8">
            🚀 Partenaires & Agences
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-balance text-[2.3rem] sm:text-5xl md:text-6xl font-semibold mb-6 leading-[1.05] tracking-tight">
            Vous gérez des clients.<br />
            <span className="gradient-text">Proposez-leur l&#39;IA.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-balance text-base sm:text-xl text-[var(--muted-strong)] mb-10 max-w-2xl mx-auto">
            Intégrez notre infrastructure IA en marque blanche et ajoutez une nouvelle offre à votre catalogue — sans recruter, sans former, sans risque technique.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold">
            Discuter du partenariat →
          </motion.a>
        </div>
      </section>

      {/* Secteurs */}
      <section className="py-12 px-5 sm:px-6 border-y border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--muted)] text-sm mb-6 uppercase tracking-widest">Ce partenariat est fait pour vous si vous êtes</p>
          <div className="flex flex-wrap justify-center gap-3">
            {secteurs.map((s, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="chip px-4 py-2 text-sm">
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-12">Pourquoi devenir partenaire Pulse ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {avantages.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card card-hover p-6 flex gap-4">
                <div className="text-3xl">{a.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1 text-[var(--foreground)]">{a.title}</h3>
                  <p className="text-[var(--muted-strong)] text-sm">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* En pratique */}
      <section className="py-16 px-5 sm:px-6 border-y border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-12">En pratique</h2>
          <div className="space-y-6">
            {etapes.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)] flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-semibold mb-1 text-[var(--foreground)]">{item.title}</h3>
                  <p className="text-[var(--muted-strong)] text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 px-5 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card grain relative overflow-hidden max-w-2xl mx-auto text-center p-8 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)]" />
          <div className="relative">
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Parlons de votre agence</h2>
            <p className="text-[var(--muted-strong)] mb-8">Tarification sur devis selon votre volume clients. Partenariat exclusif par zone géographique possible.</p>
            <a href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold">
              Demander un devis partenaire →
            </a>
            <p className="text-[var(--muted)] text-sm mt-4">Alexis Fontana · SmatchRoom Pulse · Bordeaux</p>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
