'use client';

/**
 * L'équipe, en registre magazine.
 *
 * Structure reprise de « Team Showcase » (@makviesainte sur 21st.dev) : grille
 * de photos en colonnes décalées à gauche, liste de noms à droite, les deux
 * synchronisées au survol. Portée en JSX, react-icons remplacé par lucide
 * (déjà dans le projet) et les couleurs rebranchées sur les tokens Pulse.
 *
 * Le noir et blanc par défaut n'est pas décoratif : il homogénéise quatre
 * photos qui n'ont ni le même fond ni la même lumière. La couleur au survol
 * sert de récompense.
 */

import { useState } from 'react';
import { MapPinned } from 'lucide-react';
import { cn } from '@/lib/utils';

/* Photos déjà en ligne dans /public/team. Pour en ajouter une :
   déposer le fichier et ajouter la ligne ici. */
const MEMBERS = [
  { id: 'alexis', name: 'Alexis', role: 'Fondateur', image: '/team/alexis.jpg' },
  { id: 'manon', name: 'Manon', role: 'Co-fondatrice', image: '/team/manon.jpg' },
  { id: 'laura', name: 'Laura', role: 'Directrice commerciale', image: '/team/laura.jpg' },
  { id: 'noa', name: 'Noa', role: 'Alternant', image: '/team/noa.jpg' },
];

function PhotoCard({ member, className, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl ring-1 ring-[var(--border-strong)] transition-opacity duration-500',
        className,
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={`${member.name}, ${member.role} de SmatchRoom Pulse`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-[filter,transform] duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.82)',
          transform: isActive ? 'scale(1.04)' : 'scale(1)',
        }}
      />
    </div>
  );
}

function MemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn('cursor-pointer transition-opacity duration-300', isDimmed ? 'opacity-50' : 'opacity-100')}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'h-3 flex-shrink-0 rounded-[5px] transition-all duration-300',
            isActive ? 'w-6 bg-[var(--primary)]' : 'w-4 bg-[var(--foreground)]/20',
          )}
        />
        <span
          className={cn(
            'font-display text-lg font-semibold leading-none tracking-tight transition-colors duration-300 sm:text-xl',
            isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/75',
          )}
        >
          {member.name}
        </span>
      </div>
      <p className="mt-2 pl-9 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--muted)]">
        {member.role}
      </p>
    </div>
  );
}

export default function TeamLp() {
  const [hoveredId, setHoveredId] = useState(null);

  const col1 = MEMBERS.filter((_, i) => i % 3 === 0);
  const col2 = MEMBERS.filter((_, i) => i % 3 === 1);
  const col3 = MEMBERS.filter((_, i) => i % 3 === 2);

  return (
    <section id="equipe" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-center gap-4">
          <span className="section-index">L&apos;équipe</span>
          <span className="h-px flex-1 bg-[var(--border-strong)]" />
        </div>

        {/* min-w-0 sur les colonnes : sans lui, la grille de photos en largeurs
            fixes élargit la colonne au-delà du viewport mobile et rogne tout le
            texte à sa droite. */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="min-w-0">
            <h2 className="max-w-xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
              Une petite équipe,{' '}
              <span className="font-serif-it font-normal text-[var(--primary-ink)]">
                que vous avez vraiment au téléphone.
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-[var(--muted-strong)] sm:text-lg">
              Pas de plateforme de support, pas de numéro de ticket. Vous savez qui s&apos;occupe
              de votre dossier, et vous l&apos;appelez.
            </p>

            <div className="showcase-dark grain relative mt-10 flex max-w-lg items-center gap-4 overflow-hidden rounded-2xl p-5 sm:p-6">
              <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ffb27a] ring-1 ring-white/15">
                <MapPinned size={22} strokeWidth={1.8} />
              </span>
              <div className="relative">
                <p className="font-display text-base font-semibold text-white sm:text-lg">
                  Des commerciaux terrain partout en France
                </p>
                <p className="mt-1 text-sm text-[var(--on-ink-muted)]">
                  Un interlocuteur dédié par secteur géographique, au plus près de nos clients.
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 select-none flex-col items-start gap-10 sm:flex-row sm:gap-10">
            {/* Mobile : deux colonnes fluides. Les largeurs fixes du décalage
                magazine ne tiennent pas dans 350 px utiles. */}
            <div className="grid w-full grid-cols-2 gap-3 sm:hidden">
              {MEMBERS.map((m, i) => (
                <PhotoCard
                  key={m.id}
                  member={m}
                  className={`aspect-[4/5] w-full ${i % 2 === 1 ? 'mt-6' : ''}`}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* À partir de sm : le décalage en trois colonnes. */}
            <div className="hidden flex-shrink-0 gap-3 sm:flex">
              <div className="flex flex-col gap-3">
                {col1.map((m) => (
                  <PhotoCard
                    key={m.id}
                    member={m}
                    className="h-[145px] w-[135px] xl:h-[165px] xl:w-[155px]"
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
              <div className="mt-[60px] flex flex-col gap-3 xl:mt-[68px]">
                {col2.map((m) => (
                  <PhotoCard
                    key={m.id}
                    member={m}
                    className="h-[162px] w-[150px] xl:h-[182px] xl:w-[172px]"
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
              <div className="mt-[28px] flex flex-col gap-3 xl:mt-[32px]">
                {col3.map((m) => (
                  <PhotoCard
                    key={m.id}
                    member={m}
                    className="h-[152px] w-[142px] xl:h-[172px] xl:w-[162px]"
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col gap-6 pt-2">
              {MEMBERS.map((m) => (
                <MemberRow key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
