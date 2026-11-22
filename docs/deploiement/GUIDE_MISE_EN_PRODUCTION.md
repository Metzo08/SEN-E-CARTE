# Guide de mise en production — Sen-E-Carte (`https://www.senecarte.com`)

## 1. Dépôt GitHub officiel (`https://github.com/Metzo08/SEN-E-CARTE.git`)

Commandes prêtes à exécuter dans `projets/sen-e-carte-saas` (`.env.local` est exclu automatiquement par `.gitignore`) :

```powershell
cd c:\Users\hp\Downloads\SEN-E-AGENCE\projets\sen-e-carte-saas
git init
git branch -M main
git remote add origin https://github.com/Metzo08/SEN-E-CARTE.git
git add .
git commit -m "Release v1.0 Sen-E-Carte SaaS : site, videos motion, chatbot IA FR/Wolof & Super Admin"
git push -u origin main
```

---

## 2. Hébergement gratuit Next.js + Cron automatique (Vercel)

1. Connectez-vous sur **https://vercel.com** avec votre compte GitHub `Metzo08`.
2. Cliquez sur **Add New → Project** et importez le dépôt **`Metzo08/SEN-E-CARTE`**.
3. Dans **Settings → Environment Variables**, ajoutez les variables listées dans `.env.example` :
   - `NEXT_PUBLIC_SITE_URL=https://www.senecarte.com`
   - `NEXT_PUBLIC_SUPER_ADMIN_PIN=<votre-code-secret>`
   - `PROSPECTION_ALERT_EMAIL=ahmedtall08@gmail.com`
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `BRAVE_SEARCH_API_KEY`
   - `LLM_BASE_URL=https://api.apinex.bond/v1`, `LLM_API_KEY`, `LLM_MODEL=free/deepseek-v4.1-flash`
   - `DATABASE_URL` (voir étape 3)
4. Cliquez sur **Deploy** → `vercel.json` activera automatiquement :
   - Prospection autonome chaque matin à 08h00 GMT (`/api/cron/prospection-autonome`) → email vers `ahmedtall08@gmail.com`.
   - Rapport veille Agent-Reach & marketing lundi et jeudi à 09h00 GMT (`/api/cron/veille-marketing-hebdo`) → email vers `ahmedtall08@gmail.com`.

---

## 3. Base de données GRATUITE >= 10 Go (Comparatif 2026)

| Fournisseur | Stockage GRATUIT | Type | Recommandation Sen-E-Carte |
|---|---|---|---|
| **TiDB Cloud Starter** (`tidbcloud.com`) | **25 Go gratuits** + 250 M requêtes/mois | SQL distribué (compatible MySQL) | **N°1 recommandé** — 25 Go sans carte bancaire, schéma prêt dans `SCHEMA_DB_SENECARTE.sql` |
| **Oracle Cloud Always Free** | **40 Go gratuits** (2 × 20 Go Autonomous DB) | SQL managé | Idéal gros volumes d'archives OCR juridiques & santé |
| **Cloudflare R2** (`dash.cloudflare.com`) | **10 Go gratuits** (0 frais bande passante) | Stockage objets (PDF, photos, vidéos, OCR) | À combiner avec TiDB Cloud pour stocker les scans OCR et factures PDF |
| **Turso** (`turso.tech`) | **9 Go gratuits** | SQLite Edge ultra-rapide | Excellente latence globale |

---

## 4. Activer le HTTPS 100 % GRATUIT sur `senecarte.com` (Wanekoo)

Sur votre espace client **Wanekoo**, le cadenas rouge à côté de `senecarte.com` indique simplement qu'aucun certificat SSL payant Wanekoo n'est attaché. **Vous n'avez PAS besoin d'acheter de certificat SSL sur Wanekoo.**

### Méthode A — Via Cloudflare Gratuit + Vercel (Recommandée : HTTPS + CDN + Pare-feu DDoS gratuit)
1. Créez un compte gratuit sur **https://dash.cloudflare.com** et ajoutez le domaine **`senecarte.com`** (plan **Free — 0 FCFA**).
2. Cloudflare vous donne **2 serveurs de noms** (ex. `aria.ns.cloudflare.com` et `dave.ns.cloudflare.com`).
3. Sur **Wanekoo** → `Mes domaines` → cliquez sur **`...`** à droite de **`senecarte.com`** (échéance 12 novembre 2027) → **`Gérer les serveurs de noms`** → choisissez *Serveurs de noms personnalisés* et collez les 2 serveurs Cloudflare.
4. Dans **Cloudflare → DNS**, ajoutez les 2 enregistrements Vercel :
   - Type `A` · Nom `@` · Valeur `76.76.21.21`
   - Type `CNAME` · Nom `www` · Valeur `cname.vercel-dns.com`
5. Dans **Cloudflare → SSL/TLS**, activez **Full (strict)** + **Always Use HTTPS** + **Automatic HTTPS Rewrites**.
6. Dans **Vercel → Settings → Domains**, ajoutez `senecarte.com` et `www.senecarte.com`.

### Méthode B — Directement avec Vercel DNS (sans Cloudflare)
1. Sur **Vercel → Settings → Domains**, ajoutez `senecarte.com` et `www.senecarte.com`.
2. Sur **Wanekoo → Gérer le domaine → Gestion DNS**, pointez `A @ -> 76.76.21.21` et `CNAME www -> cname.vercel-dns.com`.
3. Vercel génère et renouvelle automatiquement votre certificat **HTTPS Let's Encrypt gratuit** en moins de 5 minutes.
