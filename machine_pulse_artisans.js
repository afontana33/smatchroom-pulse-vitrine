import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fetch from "node-fetch";
import ws from "ws";

dotenv.config({ path: "./.env" });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { 
    auth: { persistSession: false }, 
    realtime: { transport: ws } 
});

const ID = process.env.GREEN_API_ID_INSTANCE?.trim();
const TOK = process.env.GREEN_API_API_TOKEN?.trim();
const URL = "https://7107.api.greenapi.com";

const CONFIG = { dailyQuota: 30, minDelay: 900000, maxDelay: 1800000 };

function fmt(ph) { 
    if(!ph) return null; 
    let c = ph.replace(/[^0-9]/g, ""); 
    if(c.startsWith("0")) c = "33" + c.substring(1); 
    return c; 
}

async function send(ph, txt) { 
    if(!ID || !TOK || !fmt(ph)) return false; 
    try { 
        await fetch(`${URL}/waInstance${ID}/setChatActivity/${TOK}`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ chatId: `${fmt(ph)}@c.us`, status: "typing" }) 
        }); 
        await new Promise(r => setTimeout(r, 8000)); 
        const r = await fetch(`${URL}/waInstance${ID}/sendMessage/${TOK}`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ chatId: `${fmt(ph)}@c.us`, message: txt }) 
        }); 
        const d = await r.json(); 
        return !!d.idMessage; 
    } catch(e) { return false; } 
}

async function run() { 
    console.log("🚀 Lancement campagne : Artisans PULSE_BTP (Alexis)"); 
    let { data: leads, error } = await supabase
        .from("pulse_leads")
        .select("*")
        .eq("pulse_angle", "PULSE_BTP")
        .is("sent_at", null)
        .not("telephone", "is", null)
        .limit(CONFIG.dailyQuota); 
        
    if(error) return console.error("❌ Erreur Supabase :", error.message);
    if(!leads || leads.length === 0) return console.log("🏁 Pas de leads trouvés pour PULSE_BTP."); 
    
    for(const l of leads) { 
        if(!l.telephone) continue; 
        const n = l.company_name || "votre activité"; 
        const loc = l.ville ? "sur " + l.ville.trim() : "dans votre région"; 
        
        const msg = `Bonjour, c'est Alexis 👋\nJe suis tombé sur ${n} en cherchant des artisans ${loc}.\n\nUne question : les devis que vous envoyez et qui restent sans réponse, vous avez le temps de tous les relancer ?\n\nLa plupart des artisans avec qui je bosse en laissaient filer une bonne partie faute de temps — c'est exactement ce qu'on automatise pour eux. Si ça vous parle, je vous montre en 2 min.`; 
            
        console.log("⚡ Envoi vers :", n); 
        const s = await send(l.telephone, msg); 
        await supabase.from("pulse_leads").update({ sent_at: new Date().toISOString() }).eq("id", l.id); 
        
        if(s) { 
            console.log("✅ Succès."); 
            const d = Math.floor(Math.random() * (CONFIG.maxDelay - CONFIG.minDelay + 1)) + CONFIG.minDelay; 
            console.log("⏱ Pause :", Math.round(d/60000), "min"); 
            await new Promise(r => setTimeout(r, d)); 
        } else { 
            console.log("❌ Échec."); 
        } 
    } 
}

main();
async function main() {
    await run();
    console.log("🏁 Session Artisans terminée.");
}
