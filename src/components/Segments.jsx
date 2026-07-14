import Link from "next/link";
import { ArrowRight } from "lucide-react";

const segments = [
  {
    to: "/artisans",
    icon: "🔨",
    tag: "Artisans & Commerce",
    title: "Vous travaillez sur le terrain",
    desc: "Plombier, peintre, électricien, commerçant — on gère les devis, la visibilité Google et la prospection pendant que vous êtes sur vos chantiers.",
    badge: "Tarifs fixes · Dès 290€/mois",
    accent: "rgba(249,115,22,0.15)",
    accentBorder: "rgba(249,115,22,0.3)",
    accentText: "#fb923c",
  },
  {
    to: "/partenaires",
    icon: "🚀",
    tag: "Partenaires & Agences",
    title: "Vous vendez à vos clients",
    desc: "Agences web, SEO, growth, communication — intégrez notre infrastructure IA en marque blanche et proposez une nouvelle offre sans recruter.",
    badge: "Partenariat & marque blanche",
    accent: "rgba(6,182,212,0.15)",
    accentBorder: "rgba(6,182,212,0.3)",
    accentText: "#22d3ee",
  },
  {
    to: "/scale",
    icon: "⚡",
    tag: "Scale & Tech",
    title: "Vous buildez des produits",
    desc: "SaaS B2B, startups tech, cabinets de conseil — branchez notre moteur de scoring IA sur votre stack et automatisez ce qui ralentit vos équipes.",
    badge: "Sur devis · Freelance · CTO externe",
    accent: "rgba(168,85,247,0.15)",
    accentBorder: "rgba(168,85,247,0.3)",
    accentText: "#c084fc",
  },
];

export default function Segments() {
  return (
    <section id="profils" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">Quel est votre profil ?</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Une offre taillée</span> pour votre métier.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted)]">
            Artisan, agence ou tech — on intervient là où vous en avez besoin.
            Cliquez sur votre profil pour voir ce qu&#39;on peut faire ensemble.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {segments.map((s) => (
            <Link
              key={s.to}
              href={s.to}
              className="glass glass-hover group relative flex flex-col rounded-2xl p-7 transition-all hover:-translate-y-1"
              style={{
                background: `radial-gradient(circle at 20% 20%, ${s.accent}, transparent 60%)`,
              }}
            >
              <div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ring-1"
                style={{
                  background: s.accent,
                  borderColor: s.accentBorder,
                }}
              >
                {s.icon}
              </div>

              <span
                className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.2em]"
                style={{ color: s.accentText }}
              >
                {s.tag}
              </span>

              <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">{s.title}</h3>

              <p className="mt-3 flex-1 text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>

              <div
                className="mt-5 inline-block rounded-full px-3 py-1 font-mono text-xs"
                style={{
                  background: s.accent,
                  border: `1px solid ${s.accentBorder}`,
                  color: s.accentText,
                }}
              >
                {s.badge}
              </div>

              <div
                className="mt-4 flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                style={{ color: s.accentText }}
              >
                Voir mon offre <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
