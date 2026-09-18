'use client';

/**
 * Sélecteur FR / EN.
 *
 * Deux liens et non un menu déroulant : avec deux langues, un menu demande un
 * clic de plus pour la même information et masque la langue disponible.
 *
 * La destination vient de `counterpart()`, donc de la table d'appariement de
 * lib/i18n.js. Quand la page courante n'a pas d'équivalent (une page ville, un
 * article de blog), on renvoie sur l'accueil de l'autre langue : envoyer le
 * visiteur sur une page absente lui donnerait un 404 en guise de traduction.
 *
 * `<a>` et non `<Link>` : on traverse deux racines de layout, ce qui provoque
 * de toute façon un rechargement complet. Un Link laisserait croire à une
 * navigation client et préchargerait un bundle pour rien.
 */

import { usePathname } from 'next/navigation';
import { counterpart } from '@/lib/i18n';

export default function LangSwitch({ locale = 'fr', onDark = false }) {
  const pathname = usePathname() || '/';
  const other = locale === 'fr' ? 'en' : 'fr';
  const href = counterpart(pathname, locale) ?? (other === 'en' ? '/en' : '/');

  const base = 'font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors';
  const current = onDark ? 'text-white' : 'text-[var(--foreground)]';
  const link = onDark
    ? 'text-white/50 hover:text-white'
    : 'text-[var(--muted)] hover:text-[var(--foreground)]';

  return (
    <div className="flex items-center gap-1.5">
      <span className={`${base} ${current}`} aria-current="true">
        {locale.toUpperCase()}
      </span>
      <span aria-hidden className={onDark ? 'text-white/30' : 'text-[var(--border-strong)]'}>
        ·
      </span>
      <a
        href={href}
        hrefLang={other}
        lang={other}
        aria-label={other === 'en' ? 'Switch to English' : 'Passer en français'}
        className={`${base} ${link}`}
      >
        {other.toUpperCase()}
      </a>
    </div>
  );
}
