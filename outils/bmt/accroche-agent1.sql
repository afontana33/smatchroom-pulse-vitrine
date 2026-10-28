-- Relance J+3 de l'Agent 1 WhatsApp : action simple (photo de facture), gratuit. Sauvegarde avant modification.
create table if not exists backup_sequences_20261028 as select * from sequences where agent = 'agent1' and channel = 'whatsapp';
update sequences set steps = jsonb_set(steps, '{1,body}', to_jsonb($$Je reviens vers vous : le plus simple, envoyez-moi une photo de votre dernière facture d’électricité, je vous dis sous 24 h s’il y a quelque chose à gagner. C’est entièrement gratuit pour vous, c’est le fournisseur qui nous rémunère. Et s’il n’y a rien à gagner, je vous le dis aussi.$$::text))
where agent = 'agent1' and channel = 'whatsapp';
select steps->1->>'body' as relance_j3 from sequences where agent = 'agent1' and channel = 'whatsapp';
-- Contacts de l'ancien numéro (relances coupées le 13/10) : on repart de l'identification avec le nouveau numéro,
-- sauf ceux qui ont déjà répondu quelque chose.
update enrollments e set state = 'active', current_step = 0, stopped_reason = null, stopped_at = null, next_send_at = now()
from sequences s, contacts ct
where s.id = e.sequence_id and ct.id = e.contact_id and ct.agent_scope = 'agent1' and s.channel = 'whatsapp'
  and e.state = 'stopped' and e.stopped_reason = 'relance_perimee_reprise_13_10'
  and not exists (select 1 from inbound_messages i where i.contact_id = ct.id)
  and not exists (select 1 from enrollments e2 where e2.contact_id = ct.id and e2.state = 'active');
