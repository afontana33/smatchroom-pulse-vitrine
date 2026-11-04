/**
 * Racine de Jarvis, l'appli vocale privée d'Alexis (04/11/2026).
 * Racine à part : aucun en-tête, pied de page ou bannière cookies du site,
 * page non indexée, installable sur le bureau comme une application.
 */
import './jarvis.css';

export const metadata = {
  title: 'Jarvis',
  description: 'Assistante vocale de SmatchRoom.',
  manifest: '/jarvis.webmanifest',
  robots: { index: false, follow: false },
  icons: { icon: '/jarvis-icon-192.png', apple: '/jarvis-icon-192.png' },
  appleWebApp: { capable: true, title: 'Jarvis', statusBarStyle: 'black-translucent' },
};

export const viewport = {
  themeColor: '#05070f',
  width: 'device-width',
  initialScale: 1,
};

export default function JarvisLayout({ children }) {
  return (
    <html lang="fr">
      <body className="jv-body">{children}</body>
    </html>
  );
}
