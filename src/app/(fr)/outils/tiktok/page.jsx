/** Outil interne : publication de nos vidéos sur le compte TikTok de SmatchRoom Pulse. Non indexé. */
import OutilTikTok from './OutilTikTok';

export const metadata = {
  title: 'Publication TikTok · SmatchRoom Pulse',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OutilTikTok />;
}
