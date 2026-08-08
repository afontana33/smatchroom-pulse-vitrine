"use client";
import { motion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import Footer from "@/components/Footer";

const secteurs = [
  "SaaS B2B", "Startup Tech", "Agence NoCode",
  "Intégration IA", "Cabinet de Conseil", "Chasseur de têtes",
  "Courtier Professionnel", "Conseil en Management",
];

const capabilities = [
  { icon: "", title: "Scoring de leads sur signaux faibles", desc: "Notre moteur analyse en continu les signaux d'achat de vos cibles : offres d'emploi, changements de stack, levées de fonds, données légales." },
  { icon: "", title: "Agents SDR autonomes", desc: "Automatisez la qualification, les relances et le reporting de vos équipes commerciales. Vos SDR se concentrent sur les deals chauds." },
  { icon: "", title: "Intégration dans votre stack", desc: "Node.js, API REST, Webhooks — on branche notre moteur sur vos outils existants (CRM, Slack, Notion, email) en quelques jours." },
  { icon: "", title: "Anti-hallucination validé", desc: "Chaque donnée produite par l'IA inclut un score de confiance et une source cliquable. Zéro donnée inventée." },
];

export default function ScalePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      <LandingNav />

      <section className="relative overflow-hidden pt-32 pb-20 px-5 sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-24 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.16),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary-line)] bg-[var(--primary-soft)] text-[var(--primary-ink)] text-sm mb-8"> Scale &amp; Tech
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"> Votre stack mérite<br />
            <span className="gradient-text">une vraie infrastructure IA.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg sm:text-xl text-[var(--muted-strong)] mb-10 max-w-2xl mx-auto"> On intervient en build freelance, consulting CTO externe ou partenariat technique pour brancher notre moteur de scoring IA directement dans votre produit.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold"> Call technique — 30 min →
          </motion.a>
        </div>
      </section>

      <section className="py-12 px-5 sm:px-6 border-y border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--muted)] text-sm mb-6 uppercase tracking-widest">Vous vous reconnaissez ici ?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {secteurs.map((s, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="chip px-4 py-2 text-sm">
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 tracking-tight">Notre moteur, dans votre produit</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card card-hover p-6">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold mb-2 text-[var(--foreground)]">{c.title}</h3>
                <p className="text-[var(--muted-strong)] text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-dark grain py-16 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 tracking-tight text-white">Stack propriétaire</h2>
          <p className="text-[var(--on-ink-muted)] mb-8">Pas de dépendance à OpenAI. Infrastructure souveraine, coût marginal proche de zéro en production.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Node.js", "Supabase", "Linux VPS", "API REST", "Webhooks", "PM2", "Green API", "Apify", "Apollo"].map((t, i) => (
              <span key={i} className="px-3 py-1 rounded-md bg-white/5 border border-white/12 text-[var(--on-ink-muted)] text-sm font-mono">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 tracking-tight">Comment on intervient</h2>
          <div className="space-y-4">
            {[
              { tag: "Build freelance", desc: "Mission ponctuelle pour intégrer notre moteur dans votre produit. Délai et budget fixés à l'avance." },
              { tag: "CTO externe", desc: "On pilote la partie IA de votre roadmap. Réunion hebdomadaire, livrables concrets, pas de bullshit." },
              { tag: "Licence technologique", desc: "Accès à notre infrastructure en marque blanche. Vous intégrez, on maintient." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card flex flex-col sm:flex-row gap-4 items-start p-6">
                <div className="px-3 py-1 rounded-full bg-[var(--primary-soft)] border border-[var(--primary-line)] text-[var(--primary-ink)] text-xs font-semibold whitespace-nowrap">{item.tag}</div>
                <p className="text-[var(--muted-strong)] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-5 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card grain relative overflow-hidden max-w-2xl mx-auto text-center p-8 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)]" />
          <h2 className="text-3xl font-bold mb-4 tracking-tight text-[var(--foreground)]">Parlons architecture</h2>
          <p className="text-[var(--muted-strong)] mb-8">Un call technique de 30 min pour comprendre votre stack et voir comment notre moteur peut s&#39;y brancher. Tout sur devis, sans engagement.</p>
          <a href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold"> Réserver le call technique →
          </a>
          <p className="text-[var(--muted)] text-sm mt-4">Alexis Fontana · SmatchRoom Pulse · Bordeaux</p>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
