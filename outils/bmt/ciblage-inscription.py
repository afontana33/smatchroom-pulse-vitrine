"""Inscription quotidienne BLEU M TECH : priorité aux secteurs qui répondent (28/10/2026).

Agent 1 : industrie, distribution, restauration, boulangerie, garage d'abord ;
hôtellerie ensuite (sans campings ni mobil-homes) ; agricole en dernier.
Agent 2 : plus de courtiers en prêt (leurs clients n'ont pas encore de factures).
"""
import pathlib
import sys

p = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "/root/SMATCHROOM_GLOBAL/bleumtech/bmt-inscription-quotidienne.js")
s = p.read_text()
if "PRIORITE_SECTEUR" in s:
    print("deja applique")
    sys.exit(0)

ancien = (
    "select ct.id from contacts ct where ct.agent_scope=$1 and ct.status='new' ${filtre}\n"
    "      and not exists (select 1 from enrollments e where e.contact_id=ct.id) order by ct.created_at limit $2"
)
nouveau = (
    "select ct.id from contacts ct left join companies co on co.id=ct.company_id\n"
    "      where ct.agent_scope=$1 and ct.status='new' ${filtre}\n"
    "      and not exists (select 1 from enrollments e where e.contact_id=ct.id)\n"
    "      and coalesce(co.sector,'') <> 'courtage_pret'\n"
    "      and coalesce(co.subsector,'') || ' ' || coalesce(co.name,'') !~* 'camping|mobil.?home|caravan|village vacances'\n"
    "      order by ${PRIORITE_SECTEUR}, ct.created_at limit $2"
)
priorite = (
    "const PRIORITE_SECTEUR = \"case coalesce(co.sector,'') when 'industrie' then 1 when 'distribution' then 2 "
    "when 'restauration' then 3 when 'boulangerie' then 4 when 'garage' then 5 when 'diagnostic' then 1 "
    "when 'immobilier' then 2 when 'architecte' then 3 when 'hotellerie' then 6 when 'agricole' then 9 else 7 end\";\n"
)
if ancien not in s:
    print("ANCRE INTROUVABLE, rien modifie")
    sys.exit(1)
s = s.replace(ancien, nouveau, 1)
s = s.replace("const TEST = ", priorite + "const TEST = ", 1)
p.write_text(s)
print("ciblage OK")
