import { ImageResponse } from 'next/og';

/* Aucune page du site n'a d'og:image fixe : plutôt que d'attendre un visuel,
   la carte de partage est générée aux tokens du design system. */

export const alt = 'Pulse Terrain — Vos chantiers filmés. Vos clients trouvés.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#131217',
          backgroundImage:
            'radial-gradient(700px circle at 15% 0%, rgba(255,90,31,0.34), transparent 60%), radial-gradient(600px circle at 100% 100%, rgba(41,75,115,0.32), transparent 62%)',
          color: '#f3f1ec',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 40,
              height: 40,
              borderRadius: 12,
              background: '#ff5a1f',
            }}
          />
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, textTransform: 'uppercase' }}>
            SmatchRoom Pulse
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 30, color: '#ffb27a', letterSpacing: 4 }}>
            PULSE TERRAIN
          </div>
          <div style={{ display: 'flex', marginTop: 20, fontSize: 78, fontWeight: 700, lineHeight: 1.05 }}>
            Vos chantiers filmés.
          </div>
          <div style={{ display: 'flex', fontSize: 78, fontWeight: 700, lineHeight: 1.05, color: '#ff8a4c' }}>
            Vos clients trouvés.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#a5a29a' }}>
          Vidéo de chantier · publicité Meta ciblée · demandes traitées par votre agent Pulse
        </div>
      </div>
    ),
    size,
  );
}
