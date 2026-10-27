'use client';

/**
 * Formulaire d'accueil : tout ce qu'il faut pour créer l'agent (et le site si
 * Pack Lancement), puis les coordonnées de virement. Envoi : /api/bienvenue.
 */

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const champ =
  'block w-full min-w-0 max-w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[0.95rem] text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] disabled:opacity-70';

const CIBLES = [
  'Agences immobilières',
  'Syndics de copropriété',
  'Gestionnaires de biens',
  'Architectes et maîtres d’œuvre',
  'Assureurs et experts',
  'Promoteurs et constructeurs',
];

function Bloc({ titre, children }) {
  return (
    <fieldset className="rounded-3xl border-2 border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8">
      <legend className="px-2 font-bold">{titre}</legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function Champ({ id, label, aide, requis, multi, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold" htmlFor={`acc-${id}`}>
        {label}
        {requis && <span className="text-[var(--primary)]"> *</span>}
      </label>
      {aide && <p className="mt-0.5 text-xs text-[var(--muted-strong)]">{aide}</p>}
      {multi ? (
        <textarea id={`acc-${id}`} className={`${champ} mt-1.5 min-h-[90px]`} required={requis} {...props} />
      ) : (
        <input id={`acc-${id}`} className={`${champ} mt-1.5`} required={requis} {...props} />
      )}
    </div>
  );
}

function Virement({ p }) {
  return (
    <div className="mt-5 space-y-1.5 rounded-2xl bg-[var(--surface-2)] p-4 text-sm">
      <p>
        <strong>Montant :</strong> {p.montant} TTC ({p.ht} HT)
      </p>
      <p>
        <strong>Bénéficiaire :</strong> SmatchRoom
      </p>
      <p>
        <strong>IBAN :</strong> <span className="font-mono">{p.iban}</span>
      </p>
      <p>
        <strong>BIC :</strong> <span className="font-mono">{p.bic}</span>
      </p>
      {p.reference && (
        <p>
          <strong>Référence :</strong> {p.reference}
        </p>
      )}
    </div>
  );
}

export default function FormulaireAccueil({ token, offre, dejaRempli, paiement }) {
  const [f, setF] = useState({ cibles: [...CIBLES], numero_whatsapp: 'dedie', zone_rayon: '30' });
  const [etat, setEtat] = useState(dejaRempli ? 'fini' : 'saisie');
  const [erreur, setErreur] = useState('');
  const [p, setP] = useState(paiement);
  const pack = offre === 'pack';

  const val = (k) => f[k] ?? '';
  const maj = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const lier = (k) => ({ value: val(k), onChange: maj(k), disabled: etat === 'envoi' });
  const basculeCible = (c) =>
    setF((x) => ({ ...x, cibles: x.cibles.includes(c) ? x.cibles.filter((y) => y !== c) : [...x.cibles, c] }));

  async function envoyer(e) {
    e.preventDefault();
    setErreur('');
    setEtat('envoi');
    try {
      const res = await fetch('/api/bienvenue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, token, numero_whatsapp: f.numero_whatsapp === 'dedie' ? 'Numéro dédié fourni par SmatchRoom' : `Son numéro pro : ${f.numero_pro || ''}` }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok === false) {
        setErreur(j.erreur || 'L’envoi n’a pas abouti. Réessayez.');
        setEtat(res.status === 409 ? 'fini' : 'saisie');
        return;
      }
      setP(j.paiement || paiement);
      setEtat('fini');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErreur('Connexion impossible. Réessayez dans un instant.');
      setEtat('saisie');
    }
  }

  if (etat === 'fini') {
    return (
      <div className="rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
        <p className="flex items-center gap-2 text-lg font-bold">
          <CheckCircle2 size={22} className="text-[var(--primary)]" aria-hidden />
          Merci, c’est bien reçu.
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
          Je prépare votre agent{pack ? ' et votre site' : ''} et je reviens vers vous très vite sur WhatsApp. Votre facture
          vous est envoyée par email. Le règlement se fait par virement :
        </p>
        <Virement p={p} />
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} className="space-y-6">
      <Bloc titre="Votre entreprise (pour la facture)">
        <Champ id="raison_sociale" label="Raison sociale" requis autoComplete="organization" {...lier('raison_sociale')} />
        <Champ id="siret" label="SIRET" requis inputMode="numeric" placeholder="14 chiffres" {...lier('siret')} />
        <Champ id="adresse" label="Adresse" requis autoComplete="street-address" {...lier('adresse')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr]">
          <Champ id="code_postal" label="Code postal" requis inputMode="numeric" autoComplete="postal-code" {...lier('code_postal')} />
          <Champ id="ville" label="Ville" requis autoComplete="address-level2" {...lier('ville')} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Champ id="prenom" label="Prénom" requis autoComplete="given-name" {...lier('prenom')} />
          <Champ id="nom" label="Nom" requis autoComplete="family-name" {...lier('nom')} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Champ id="email" label="Email (reçoit la facture)" requis type="email" autoComplete="email" {...lier('email')} />
          <Champ id="telephone" label="Téléphone portable" requis type="tel" autoComplete="tel" {...lier('telephone')} />
        </div>
      </Bloc>

      <Bloc titre="Votre activité">
        <Champ id="metier" label="Votre métier" requis placeholder="Ex. : électricien, couvreur, plombier…" {...lier('metier')} />
        <Champ id="services" label="Vos prestations principales" requis multi placeholder="Ex. : rénovation électrique, mises aux normes, bornes de recharge, climatisation…" {...lier('services')} />
        <Champ id="chantiers_voulus" label="Les chantiers que vous voulez en priorité" multi aide="Taille, type de client, type de travaux." {...lier('chantiers_voulus')} />
        <Champ id="chantiers_refuses" label="Ce que vous ne voulez pas faire" multi {...lier('chantiers_refuses')} />
        <Champ id="atouts" label="Vos atouts" multi aide="Certifications (RGE, Qualibat…), assurance décennale, délais, garanties, années d’expérience." {...lier('atouts')} />
      </Bloc>

      <Bloc titre="Votre zone">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_170px]">
          <Champ id="zone_ville" label="Votre ville de base" requis {...lier('zone_ville')} />
          <div>
            <label className="block text-sm font-semibold" htmlFor="acc-zone_rayon">
              Rayon d’intervention<span className="text-[var(--primary)]"> *</span>
            </label>
            <select id="acc-zone_rayon" className={`${champ} mt-1.5`} {...lier('zone_rayon')}>
              {['15', '30', '50', '80', '120'].map((r) => (
                <option key={r} value={r}>
                  {r} km
                </option>
              ))}
            </select>
          </div>
        </div>
        <Champ id="villes_exclues" label="Villes ou secteurs à éviter" multi {...lier('villes_exclues')} />
      </Bloc>

      <Bloc titre="Votre agent">
        <Champ id="prenom_agent" label="Prénom qui signe les messages" requis aide="En général le vôtre : les messages partent en votre nom." {...lier('prenom_agent')} />
        <div>
          <p className="text-sm font-semibold">Qui contacter en priorité</p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {CIBLES.map((c) => (
              <label key={c} className="flex items-center gap-2.5 text-sm">
                <input type="checkbox" checked={f.cibles.includes(c)} onChange={() => basculeCible(c)} />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Numéro WhatsApp qui envoie les messages</p>
          <label className="mt-2 flex items-start gap-2.5 text-sm">
            <input type="radio" name="numero_whatsapp" value="dedie" checked={f.numero_whatsapp === 'dedie'} onChange={maj('numero_whatsapp')} />
            <span>Un numéro dédié, fourni par SmatchRoom (conseillé : votre numéro perso reste tranquille)</span>
          </label>
          <label className="mt-2 flex items-start gap-2.5 text-sm">
            <input type="radio" name="numero_whatsapp" value="pro" checked={f.numero_whatsapp === 'pro'} onChange={maj('numero_whatsapp')} />
            <span>Mon numéro professionnel</span>
          </label>
          {f.numero_whatsapp === 'pro' && (
            <input className={`${champ} mt-2`} type="tel" placeholder="Votre numéro pro" {...lier('numero_pro')} />
          )}
        </div>
        <Champ id="numero_alertes" label="Numéro qui reçoit les contacts intéressés" requis type="tel" aide="Je vous préviens sur WhatsApp dès qu’un professionnel a un chantier pour vous." {...lier('numero_alertes')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Champ id="site_web" label="Votre site internet" placeholder={pack ? 'Si vous en avez déjà un' : 'www.…'} {...lier('site_web')} />
          <Champ id="fiche_google" label="Lien de votre fiche Google" placeholder="Si vous l’avez" {...lier('fiche_google')} />
        </div>
      </Bloc>

      {pack && (
        <Bloc titre="Votre site">
          <Champ id="nom_domaine" label="Adresse souhaitée" placeholder="Ex. : dupont-electricite.fr" {...lier('nom_domaine')} />
          <Champ id="presentation" label="Présentez votre entreprise en quelques phrases" multi aide="Votre histoire, votre façon de travailler : je m’en sers pour rédiger le site." {...lier('presentation')} />
          <Champ id="style" label="Couleurs ou style souhaités" multi {...lier('style')} />
          <Champ id="horaires" label="Vos horaires" placeholder="Ex. : lundi-vendredi 8h-18h" {...lier('horaires')} />
          <p className="rounded-2xl bg-[var(--surface-2)] p-4 text-sm text-[var(--muted-strong)]">
            Votre logo et des photos de vos réalisations : envoyez-les-moi simplement sur WhatsApp après ce formulaire.
          </p>
        </Bloc>
      )}

      <Bloc titre="Pour finir">
        <Champ id="remarques" label="Une précision ?" multi {...lier('remarques')} />
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" className="mt-1" checked={f.mandat === true} onChange={maj('mandat')} required />
          <span>J’autorise SmatchRoom Pulse à contacter des professionnels en mon nom pour me faire connaître.</span>
        </label>
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" className="mt-1" checked={f.cgv === true} onChange={maj('cgv')} required />
          <span>
            J’accepte les{' '}
            <a href="/cgv-services" target="_blank" className="underline">
              conditions générales de vente
            </a>{' '}
            et le règlement par virement de {paiement.montant} TTC ({paiement.ht} HT).
          </span>
        </label>
      </Bloc>

      {erreur && <p className="text-sm font-semibold text-red-600">{erreur}</p>}

      <button
        type="submit"
        disabled={etat === 'envoi'}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold disabled:opacity-80"
      >
        {etat === 'envoi' ? 'Envoi en cours…' : 'Valider et recevoir ma facture'}
        <ArrowRight size={16} aria-hidden />
      </button>
    </form>
  );
}
