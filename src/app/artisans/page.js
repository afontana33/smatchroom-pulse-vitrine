"use client";
import { motion } from "framer-motion";
import LandingNav from "@/components/landing/LandingNav";
import Footer from "@/components/Footer";

const offres = [
  {
    nom: "Starter",
    prix: "290€",
    periode: "/mois",
    desc: "Pour démarrer et tester sans risque.",
    features: [
      "Agent de réponse aux devis automatique",
      "Publication Google (2×/semaine)",
      "Rapport mensuel d'activité",
      "Support email",
    ],
    cta: "Commencer",
    highlight: false,
  },
  {
    nom: "Pro",
    prix: "490€",
    periode: "/mois",
    desc: "Pour les artisans qui veulent remplir leur carnet.",
    features: [
      "Tout Starter inclus",
      "Prospection WhatsApp automatique",
      "Relances clients intelligentes",
      "Remontée Google Maps optimisée",
      "Support prioritaire",
    ],
    cta: "Je veux le Pro",
    highlight: true,
  },
  {
    nom: "Sur mesure",
    prix: "Devis",
    periode: "",
    desc: "Pour les besoins spécifiques ou plusieurs corps de métier.",
    features: [
      "Tout Pro inclus",
      "Intégration avec vos outils existants",
      "Agent vocal (prise d'appels)",
      "Tableau de bord personnalisé",
      "Accompagnement dédié",
    ],
    cta: "Nous contacter",
    highlight: false,
  },
];

const exemples = [
  { nom: "Marc", metier: "Peintre à Lyon", resultat: "Répond aux devis en moins d'une heure. Ses clients le disent \"le plus réactif du coin\"." },
  { nom: "Karim", metier: "Plombier à Marseille", resultat: "Remonte sur Google sans rien faire. Le système publie du contenu en son nom chaque semaine." },
  { nom: "Sophie", metier: "Artisane décoratrice à Bordeaux", resultat: "Son carnet de commandes se remplit automatiquement. Elle ne passe plus ses soirées à relancer." },
];

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      <LandingNav />

      <section className="relative overflow-hidden grain pt-32 pb-20 px-5 sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.14),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-16 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.16),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary-line)] bg-[var(--primary-soft)] text-[var(--primary-ink)] text-sm mb-8">
            🔨 Artisans & Commerce
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Vous êtes sur le terrain.<br />
            <span className="gradient-text">Nous gérons le reste.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl text-[var(--muted-strong)] mb-10 max-w-2xl mx-auto">
            Devis, relances, Google, prospection — tout tourne automatiquement. Vous recevez les clients. Opérationnel en 48h, sans rien changer à votre façon de travailler.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block px-8 py-4 font-semibold text-lg">
            Audit gratuit — 30 min →
          </motion.a>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Ce que Pulse fait pour vous</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📩", title: "Devis automatiques", desc: "Chaque demande reçoit une réponse personnalisée en moins d'une heure, même la nuit." },
              { icon: "📍", title: "Visibilité Google", desc: "L'agent publie du contenu en votre nom chaque semaine. Vous remontez sur \"plombier urgence [ville]\"." },
              { icon: "📱", title: "Prospection WhatsApp", desc: "L'agent contacte de nouveaux clients potentiels dans votre zone, de manière humaine et ciblée." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card card-hover p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2 text-[var(--foreground)]">{item.title}</h3>
                <p className="text-[var(--muted-strong)] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-6 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Ils utilisent Pulse</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {exemples.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card card-hover p-6">
                <div className="font-bold text-lg text-[var(--foreground)]">{e.nom}</div>
                <div className="text-sm text-[var(--primary-ink)] mb-3">{e.metier}</div>
                <p className="text-[var(--muted-strong)] text-sm italic">&ldquo;{e.resultat}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Tarifs clairs, sans surprise</h2>
          <p className="text-[var(--muted)] text-center mb-12">Sans engagement. Résiliable à tout moment.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {offres.map((o, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className={`card p-8 relative ${o.highlight ? "ring-2 ring-[var(--primary)] shadow-[var(--shadow-glow)]" : "card-hover"}`}>
                {o.highlight && <div className="btn-primary absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold">POPULAIRE</div>}
                <div className="text-sm text-[var(--muted)] mb-2">{o.nom}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-[var(--foreground)]">{o.prix}</span>
                  <span className="text-[var(--muted)] mb-1">{o.periode}</span>
                </div>
                <p className="text-[var(--muted)] text-sm mb-6">{o.desc}</p>
                <ul className="space-y-3 mb-8">
                  {o.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[var(--muted-strong)]">
                      <span className="text-[var(--primary-ink)] mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className={`block text-center py-3 font-semibold text-sm ${o.highlight ? "btn-primary" : "btn-ghost"}`}>
                  {o.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
