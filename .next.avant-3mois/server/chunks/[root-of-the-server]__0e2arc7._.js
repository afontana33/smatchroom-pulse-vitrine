module.exports=[93695,(e,t,n)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},18622,(e,t,n)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,n)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,n)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},70406,(e,t,n)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},97276,e=>{"use strict";var t=e.i(47909),n=e.i(74017),r=e.i(96250),a=e.i(59756),s=e.i(61916),i=e.i(74677),o=e.i(69741),l=e.i(16795),u=e.i(87718),c=e.i(95169),d=e.i(47587),p=e.i(66012),m=e.i(70101),x=e.i(26937),g=e.i(10372),h=e.i(93695);e.i(52474);var v=e.i(220);let f="07 71 48 76 98",R="https://pulse.smatchroom.com",b="Bordeaux",A=[{key:"agent-prospection",name:"Agent IA de prospection",description:"Un agent qui contacte les partenaires et les prospects de votre secteur par WhatsApp et par email, en votre nom, répond en moins d'une minute et vous passe la main sur les interlocuteurs intéressés.",setup:300,monthly:190},{key:"site-fiche-google",name:"Site internet et fiche établissement Google",description:"Un site lisible sur téléphone, des pages par ville et par prestation, et votre fiche établissement Google créée, remplie et tenue à jour chaque mois.",setup:300,monthly:20},{key:"acquisition-meta",name:"Acquisition Meta",description:"Vos chantiers filmés, montés et diffusés en publicité sur Facebook et Instagram auprès des habitants de votre zone, les demandes tombant directement dans votre agent.",setup:690,monthly:200},{key:"agent-clients-b2b",name:"Agent Clients B2B",description:"Base de données construite sur mesure pour votre marché, agent entraîné sur votre catalogue et vos objections, qualification du besoin, du budget et du calendrier avant transmission à vos commerciaux.",setup:1800,monthly:490}],y=[{key:"agent-gestionnaire",name:"Agent Gestionnaire",description:"Relance automatique des devis sans réponse, au bon moment et avec vos mots, jusqu’à obtenir une réponse claire.",setup:490,monthly:119},{key:"agent-accueil",name:"Agent Accueil 24/7",description:"Réponse aux demandes entrantes à toute heure : le besoin, l'adresse et l'urgence sont notés puis transmis.",setup:390,monthly:89},{key:"agent-visiteur",name:"Agent Visiteur",description:"Travail continu de la visibilité locale : pages par ville et par prestation, contenu tenu à jour, fiche établissement alimentée.",setup:390,monthly:89},{key:"agent-controleur",name:"Agent Contrôleur",description:"Suivi des documents de conformité des sous-traitants, relance de ceux qui manquent et alerte avant expiration.",setup:390,monthly:79},{key:"agent-acheteur",name:"Agent Acheteur",description:"Consultation des fournisseurs, comparaison et relance sur les postes d'achat récurrents.",setup:590,monthly:119}];[...A,...y];var C=e.i(17715);function E(e){return`- ${e.name} : ${e.setup.toLocaleString("fr-FR")} € HT de fabrication (une seule fois), puis ${e.monthly.toLocaleString("fr-FR")} € HT par mois. ${e.description}`}e.s(["GET",0,function(){return new Response(`# SmatchRoom Pulse

> Agence d'automatisation et d'agents IA pour les artisans, les TPE et les PME.
> Nous fabriquons des agents qui prospectent, r\xe9pondent, relancent et suivent,
> puis nous les pilotons. Nous ne vendons pas l'acc\xe8s \xe0 une plateforme en
> libre-service.

Exploit\xe9e par SMATCHROOM SAS, 5 rue F\xe9nelon, 33000 ${b}, France.
SIREN 989 883 509 \xb7 TVA FR01989883509. T\xe9l\xe9phone : ${f} (lundi au vendredi, 9h-19h).

## Ce que nous vendons

Les trois briques et l'offre B2B :
${A.map(E).join("\n")}

Les cinq agents compl\xe9mentaires :
${y.map(E).join("\n")}

Tous les montants sont hors taxes. La formule \xe0 la carte est sans engagement.
La formule Partenaire offre les frais de fabrication de l'agent de prospection
en \xe9change d'un engagement de six mois. Le budget publicitaire Meta n'est pas
factur\xe9 par nous : il est pay\xe9 directement \xe0 Meta par le client.

## Ce que nous ne faisons pas

- Aucune garantie de r\xe9sultat chiffr\xe9e. Nous nous engageons sur le travail
  (volume de contacts convenu, r\xe9ponses trait\xe9es en moins d'une minute,
  r\xe9\xe9criture du discours sans surco\xfbt), pas sur un nombre de chantiers.
- Aucun d\xe9marchage t\xe9l\xe9phonique de particuliers, en particulier sur la
  r\xe9novation \xe9nerg\xe9tique.
- Aucune dissimulation du caract\xe8re automatis\xe9 : conform\xe9ment \xe0 l'article 50
  du r\xe8glement europ\xe9en sur l'IA, nos agents l'indiquent d\xe8s le premier
  message, avec sortie par STOP et bascule vers un humain par HUMAIN. Cette
  mention n'est pas retirable \xe0 la demande d'un client.
- Aucune mutualisation des donn\xe9es entre clients : chaque agent tourne sur une
  infrastructure d\xe9di\xe9e, avec un accord de traitement conforme \xe0 l'article 28
  du RGPD annex\xe9 au contrat.

## Zones desservies

Si\xe8ge \xe0 ${b}. Intervention commerciale principale en Nouvelle-Aquitaine
(Gironde, Landes, Pyr\xe9n\xe9es-Atlantiques, Lot-et-Garonne, Dordogne,
Charente-Maritime, Charente), et \xe0 distance partout en France.

${C.VILLES.map(e=>`- ${e.nom} (${e.dept}, ${e.deptNum}) : ${R}/agence-ia/${e.slug}`).join("\n")}

## M\xe9tiers couverts

${C.METIERS.map(e=>`- ${e.label} : ${R}/metiers/${e.slug}`).join("\n")}

## Pages principales

- Accueil, offres et prix : ${R}/
- Agents par m\xe9tier : ${R}/metiers
- Zones desservies : ${R}/agence-ia
- Ressources sur les agents IA : ${R}/agent-ia
- Blog : ${R}/blog
- Transparence IA : ${R}/transparence-ia
- Mentions l\xe9gales : ${R}/mentions-legales
- Conditions de service : ${R}/cgv-services

## Prise de contact

Rendez-vous de cadrage de 30 minutes, offert et sans engagement :
https://calendly.com/a-fontana-smatchroom/30min
Ou par t\xe9l\xe9phone au ${f}.
`,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600"}})},"dynamic",0,"force-static"],34761);var q=e.i(34761);let w=new t.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/llms.txt/route",pathname:"/llms.txt",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/llms.txt/route.js",nextConfigOutput:"",userland:q,...{}}),{workAsyncStorage:T,workUnitAsyncStorage:$,serverHooks:S}=w;async function P(e,t,r){r.requestMeta&&(0,a.setRequestMeta)(e,r.requestMeta),w.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let f="/llms.txt/route";f=f.replace(/\/index$/,"")||"/";let R=await w.prepare(e,t,{srcPage:f,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:b,params:A,nextConfig:y,parsedUrl:C,isDraftMode:E,prerenderManifest:q,routerServerContext:T,isOnDemandRevalidate:$,revalidateOnlyGenerated:S,resolvedPathname:P,clientReferenceManifest:N,serverActionsManifest:k}=R,I=(0,o.normalizeAppPath)(f),M=!!(q.dynamicRoutes[I]||q.routes[P]),O=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,C,!1):t.end("This page could not be found"),null);if(M&&!E){let e=!!q.routes[P],t=q.dynamicRoutes[I];if(t&&!1===t.fallback&&!e){if(y.adapterPath)return await O();throw new h.NoFallbackError}}let j=null;!M||w.isDev||E||(j="/index"===(j=P)?"/":j);let _=!0===w.isDev||!M,H=M&&!_;k&&N&&(0,i.setManifestsSingleton)({page:f,clientReferenceManifest:N,serverActionsManifest:k});let U=e.method||"GET",L=(0,s.getTracer)(),D=L.getActiveScopeSpan(),F=!!(null==T?void 0:T.isWrappedByNextServer),B=!!(0,a.getRequestMeta)(e,"minimalMode"),G=(0,a.getRequestMeta)(e,"incrementalCache")||await w.getIncrementalCache(e,y,q,B);null==G||G.resetRequestCache(),globalThis.__incrementalCache=G;let K={params:A,previewProps:q.preview,renderOpts:{experimental:{authInterrupts:!!y.experimental.authInterrupts},cacheComponents:!!y.cacheComponents,supportsDynamicResponse:_,incrementalCache:G,cacheLifeProfiles:y.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,n,r,a)=>w.onRequestError(e,t,r,a,T)},sharedContext:{buildId:b}},V=new l.NodeNextRequest(e),W=new l.NodeNextResponse(t),z=u.NextRequestAdapter.fromNodeNextRequest(V,(0,u.signalFromNodeResponse)(t));try{let a,i=async e=>w.handle(z,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let n=L.getRootSpanAttributes();if(!n)return;if(n.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${n.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=n.get("next.route");if(r){let t=`${U} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t),a&&a!==e&&(a.setAttribute("http.route",r),a.updateName(t))}else e.updateName(`${U} ${f}`)}),o=async a=>{var s,o;let l=async({previousCacheEntry:n})=>{try{if(!B&&$&&S&&!n)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await i(a);e.fetchMetrics=K.renderOpts.fetchMetrics;let o=K.renderOpts.pendingWaitUntil;o&&r.waitUntil&&(r.waitUntil(o),o=void 0);let l=K.renderOpts.collectedTags;if(!M)return await (0,p.sendResponse)(V,W,s,K.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(s.headers);l&&(t[g.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let n=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,r=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:n,expire:r}}}}catch(t){throw(null==n?void 0:n.isStale)&&await w.onRequestError(e,t,{routerKind:"App Router",routePath:f,routeType:"route",revalidateReason:(0,d.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:$})},!1,T),t}},u=await w.handleResponse({req:e,nextConfig:y,cacheKey:j,routeKind:n.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:q,isRoutePPREnabled:!1,isOnDemandRevalidate:$,revalidateOnlyGenerated:S,responseGenerator:l,waitUntil:r.waitUntil,isMinimalMode:B});if(!M)return null;if((null==u||null==(s=u.value)?void 0:s.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==u||null==(o=u.value)?void 0:o.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});B||t.setHeader("x-nextjs-cache",$?"REVALIDATED":u.isMiss?"MISS":u.isStale?"STALE":"HIT"),E&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let c=(0,m.fromNodeOutgoingHttpHeaders)(u.value.headers);return B&&M||c.delete(g.NEXT_CACHE_TAGS_HEADER),!u.cacheControl||t.getHeader("Cache-Control")||c.get("Cache-Control")||c.set("Cache-Control",(0,x.getCacheControlHeader)(u.cacheControl)),await (0,p.sendResponse)(V,W,new Response(u.value.body,{headers:c,status:u.value.status||200})),null};F&&D?await o(D):(a=L.getActiveScopeSpan(),await L.withPropagatedContext(e.headers,()=>L.trace(c.BaseServerSpan.handleRequest,{spanName:`${U} ${f}`,kind:s.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},o),void 0,!F))}catch(t){if(t instanceof h.NoFallbackError||await w.onRequestError(e,t,{routerKind:"App Router",routePath:I,routeType:"route",revalidateReason:(0,d.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:$})},!1,T),M)throw t;return await (0,p.sendResponse)(V,W,new Response(null,{status:500})),null}}e.s(["handler",0,P,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:T,workUnitAsyncStorage:$})},"routeModule",0,w,"serverHooks",0,S,"workAsyncStorage",0,T,"workUnitAsyncStorage",0,$],97276)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0e2arc7._.js.map