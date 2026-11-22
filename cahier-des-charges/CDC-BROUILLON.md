# CAHIER DES CHARGES - SEN-E-CARTE SAAS (Socle Sen-E-Carte & SEN-E-AGENCE)

| Champ | Valeur |
|---|---|
| Projet | `sen-e-carte-saas` |
| Client | Ahmed Tall — Fondateur Sen-E-Carte & SEN-E-AGENCE (`+221 77 602 67 83`) |
| Date | 21/11/2026 |
| Version | v1.0 |
| Rédigé par | Adama Sy (`sene-product-analyst`), Ngone Cisse (`sene-agency-director`), Omar Faye (`sene-architect`), Mariama Sylla (`sene-content` / SEO), Babacar Sow (`sene-ai-engineer`) |
| Statut | BROUILLON (En attente validation PORTE 0 par Ahmed Tall) |

---

## 1. Audit de l'existant (`https://senecarte1.odoo.com/`) & Problématique

L'équipe de Ngone Cisse a audité méthodiquement l'ensemble des 31 routes découvertes sur `https://senecarte1.odoo.com/`.

### Forces existantes à capitaliser
- **Positionnement pionnier au Sénégal** sur la santé numérique et les cartes intelligentes QR code dynamique + puce NFC :
  - **Cartes de santé numériques (IPM / ONG / Cliniques)** : accès dossier médical, lettres de garantie, bons de commande en ligne, carte interactive des structures/pharmacies, carnets de maternité numériques, IA santé.
  - **Cartes scolaires intelligentes avec intégration CMU** : double usage académique + preuve d'enrôlement CMU (élèves ≥ 16 ans), contrôle d'accès, cantine, bibliothèque.
  - **Cartes de visite intelligentes QR dynamique + NFC** : partage instantané sans contact, mise à jour temps réel.
  - **Logiciels métiers & Sites web** : gestion de stocks, gestion de carrière, facturation d'eau pour forages (ASUFOR), conception de sites web.
  - **Pôle EXIM BE CENTER** : impressions sur divers supports, sérigraphie/reprographie, vente informatique, multiservices.

### Faiblesses critiques constatées (justifiant la refonte SaaS)
1. **Pages inachevées contenant des textes par défaut Odoo** : `/logiciels-de-gestion`, `/logiciels-de-gestion-de-carriere`, `/logiciels-de-facturation-d-eau-pour-forages` affichent encore des placeholders (*« Insérez ici une citation... »*, *« Écrivez un ou deux paragraphes... »*).
2. **Architecture de menu diluée** : mélange dans la même navigation de solutions stratégiques (IPM, CMU, NFC, Logiciels) avec des rubriques sans lien direct (iPhone, Élevage, Caméra, Audio), ce qui nuit à la crédibilité B2B.
3. **Coquilles visibles** sur les tarifs (`/ Carte dyndynamique`, `Basique .000`).
4. **Visibilité SEO très faible** : hébergement sous-domaine `.odoo.com`, absence de balises structurées JSON-LD, absence de pages piliers métiers optimisées pour Google Sénégal / UEMOA.
5. **Absence de moteur SaaS et d'acquisition clients** : aucun espace self-service pour générer/gérer les cartes dynamiques en ligne, ni d'agent IA commercial pour prospecter automatiquement des clients sur chaque solution.

---

## 2. Objectifs mesurables

1. **Image de marque & Conversion** : Livrer une plateforme SaaS ultra-moderne, crédible auprès des DG d'IPM, directeurs d'écoles, PME, ONG et institutions publiques, avec **devis interactif et prise de contact WhatsApp en moins de 30 secondes**.
2. **Visibilité SEO maximale** : Score Lighthouse SEO ≥ 95/100, Core Web Vitals verts, indexation structurée (`Schema.org`, `sitemap.xml`, `robots.txt`, OpenGraph) sur les mots-clés stratégiques Sénégal & Afrique de l'Ouest (*carte de santé numérique Sénégal, digitalisation IPM Dakar, carte scolaire CMU, carte de visite NFC Dakar, logiciel facturation forage ASUFOR, agence digitale IA Sénégal*).
3. **Plateforme SaaS opérationnelle (Socle Sen-E-Carte)** : Permettre la création, personnalisation, partage (`/c/[slug]`) et suivi statistique de cartes intelligentes QR/NFC multi-organisations (Santé/IPM, Écoles/CMU, Business/NFC, GIE/Associations).
4. **Acquisition automatisée (Agent IA Prospection)** : Permettre à Ahmed Tall et à l'équipe commerciale de trouver, qualifier, scorer et contacter des prospects qualifiés par solution (messages WhatsApp, Email, LinkedIn prêts à l'envoi + CRM pipeline intégré).

---

## 3. Périmètre fonctionnel

### Dans le périmètre (V1 — Plateforme SaaS Complète)

#### Module A — Vitrine Institutionnelle, Catalogue de Solutions & SEO Massif
- **Page d'accueil haute conversion** : positionnement clair *"Sen-E-Carte — L'infrastructure numérique des cartes intelligentes, des logiciels métiers et de l'IA au Sénégal"*, démonstrateur interactif de carte QR/NFC en direct, preuves sectorielles, passerelle vers **SEN-E-AGENCE**.
- **Catalogue structuré en 6 Pôles Clairs (solutions existantes + nouvelles solutions à forte demande)** :
  1. **Santé Numérique & IPM** : Carte de santé QR/NFC, Portail IPM (lettres de garantie, bons de commande, tiers-payant), Carnet de maternité numérique, Assistant IA Santé.
  2. **Éducation & Carte Scolaire CMU** : Carte scolaire intelligente QR/NFC + intégration CMU (≥ 16 ans), contrôle d'accès, présences, cantine, portail parents.
  3. **Identité Pro & Cartes Membres** : Carte de visite intelligente QR/NFC (dirigeants & équipes), **NOUVEAU : Cartes Membres GIE, Coopératives, Mutuelles & Événements** (avec QR de vérification publique anti-fraude).
  4. **Logiciels Métiers & SaaS Sectoriels** : Facturation d'eau pour forages (**ASUFOR**), Gestion de stocks & facturation **SYSCOHADA**, Gestion RH & Carrière, **NOUVEAU : Gestion Immobilière & Loyers**, **NOUVEAU : Portail BTP / Laboratoires**.
  5. **SEN-E-AGENCE Studio (IA & Sur-Mesure)** : Sites web haute performance, Applications mobiles, Agents IA autonomes, Automatisation n8n & WhatsApp Business, Intégration Wave / Orange Money.
  6. **Pôle Impression & Équipements (EXIM BE CENTER)** : Impression cartes PVC/NFC en volume, sérigraphie, reprographie, matériel informatique (section dédiée et professionnelle).
- **Plans Tarifaires transparents en FCFA + Configurateur de Devis Instantané** (calcul automatique selon type de carte/logiciel, quantité, option NFC, impression PVC → export récapitulatif & envoi WhatsApp 1-clic).
- **Hub SEO & Blog Éditorial** : articles de fond optimisés pour capter le trafic organique Sénégal / UEMOA.

#### Module B — SaaS Studio de Cartes Intelligentes (`/app`)
- **Tableau de bord multi-organisations** : gestion des cartes (Santé, Scolaire, Business, Membre GIE/Association).
- **Profils dynamiques publics (`/c/[slug]`)** : page ultra-rapide accessible par scan QR ou tap NFC (photo, infos vérifiées, bouton Enregistrer Contact vCard, appel/WhatsApp direct, badge statut actif/CMU/IPM).
- **Générateur de QR Code dynamique** + prévisualisation recto/verso de la carte prête à l'impression PVC.
- **Analytique de scans** : suivi du nombre de scans, date du dernier scan, activation/désactivation à distance en cas de perte.

#### Module C — Agent IA Prospection & Chasseur de Clients (`/app/prospection-ia`)
- **Sélecteur de Campagne par Solution** : choix parmi toutes les solutions Sen-E-Carte & SEN-E-AGENCE + secteur cible (IPM, Cliniques/Pharmacies, Écoles/Lycées, GIE/Coopératives, ASUFOR/Forages, PME/BTP, Hôtels/Restaurants) + zone géographique (Dakar, Thiès, Mbour, Saint-Louis, Touba, Ziguinchor, sous-région).
- **Génération & Enrichissement de Prospects** : identification de cibles pertinentes, analyse de leurs besoins probables, calcul d'un **score d'opportunité (0–100)**.
- **Rédacteur Commercial IA Multi-Canal** : génération en 1 clic de :
  - Message **WhatsApp** court, chaleureux et percutant (adapté au contexte sénégalais)
  - **Email B2B** structuré avec proposition de valeur et appel à l'action
  - Message **LinkedIn** d'approche dirigeant
  - Script d'appel téléphonique & réponses aux objections (prix, délai, sécurité)
- **CRM Pipeline intégré** : suivi des prospects (`Nouveau` → `Contacté` → `RDV / Démo` → `Devis envoyé` → `Signé`), bouton **Ouvrir WhatsApp** pré-rempli, historique des relances.

### Hors périmètre (V1 — prévu en V2)
- Application mobile native iOS/Android sur stores (V1 livrée en **PWA responsive Mobile-First**).
- Encaissement bancaire carte internationale en direct (V1 intègre la préparation Wave / Orange Money + devis/facture proforma).
- Hébergement de dossiers médicaux cliniques sensibles complets en production (nécessite validation réglementaire CDP Sénégal & hébergement agréé santé avant ouverture publique patients).

---

## 4. Acteurs et personas

1. **Ahmed Tall (CEO & Super Admin)** : pilote Sen-E-Carte & SEN-E-AGENCE, valide les devis, lance les campagnes de prospection IA, supervise les organisations clientes et les lots de cartes.
2. **Directeur d'IPM / Responsable Santé / ONG** : cherche à digitaliser les cartes d'adhérents, sécuriser les lettres de garantie et réduire la fraude.
3. **Chef d'Établissement Scolaire / Université** : veut des cartes scolaires modernes intégrant la CMU, le contrôle d'accès et la preuve d'inscription.
4. **Dirigeant PME / Président de GIE / Gestionnaire ASUFOR** : cherche des cartes NFC professionnelles, des cartes membres vérifiables, un logiciel de facturation ou un site web performant.
5. **Utilisateur final (Porteur de carte)** : scanne ou présente sa carte NFC/QR pour afficher son profil dynamique (`/c/[slug]`).

---

## 5. User stories prioritaires (Must)

- **US-01 (Vitrine & SEO)** : En tant que visiteur venant de Google, je veux comprendre en 5 secondes les solutions de Sen-E-Carte et accéder à la page dédiée à mon secteur (IPM, École, NFC, Logiciel, Agence), afin de demander un devis ou un RDV WhatsApp.
- **US-02 (Devis instantané)** : En tant que prospect, je veux simuler le coût d'un lot de cartes QR/NFC ou d'une solution logicielle en FCFA et envoyer mon besoin en 1 clic sur WhatsApp (`+221 77 602 67 83`).
- **US-03 (Carte dynamique publique)** : En tant que porteur ou contrôleur, je veux scanner un QR code (`/c/[slug]`) pour afficher immédiatement la carte numérique vérifiée, télécharger la vCard ou vérifier le statut actif.
- **US-04 (Studio SaaS Cartes)** : En tant qu'administrateur, je veux créer, éditer, activer/suspendre des cartes intelligentes et suivre leurs statistiques de scans depuis un tableau de bord sécurisé.
- **US-05 (Agent IA Prospection)** : En tant que commercial / CEO, je veux lancer une recherche de prospects par solution et secteur, obtenir un scoring et des messages d'approche personnalisés (WhatsApp / Email / LinkedIn), et suivre l'avancement dans un CRM intégré.

---

## 6. Architecture Technique & Conformité

- **Stack** : Next.js 15 (App Router, TypeScript), Tailwind CSS, Lucide Icons, Prisma ORM + PostgreSQL (Neon Serverless), API Routes REST sécurisées.
- **SEO Technique** : Metadata API Next.js par page, `sitemap.ts`, `robots.ts`, JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage`, `Service`), URLs sémantiques en français, images optimisées.
- **Sécurité & Conformité (Ibrahima Ba & Maître Aminata Touré)** :
  - Conformité **Loi CDP n° 2008-12 Sénégal** (consentement, mentions légales, politique de confidentialité, minimisation des données de prospection).
  - Authentification sécurisée (mots de passe hachés, cookies `HttpOnly`), validation Zod des entrées API, zéro secret dans le code.
- **Déploiement** : GitHub + Vercel (avec nom de domaine personnalisé `senecarte.sn` / `sen-e-carte.com` dès que disponible).

---

## 7. Exigences de recette

- `npm run build` vert (0 erreur TypeScript/ESLint/Next.js).
- Parcours complet vérifié : Navigation vitrine & 6 pôles solutions → Simulateur de devis → Scan d'une carte dynamique `/c/[slug]` → Création de carte dans `/app` → Génération de prospects & messages dans `/app/prospection-ia` → CRM pipeline.
- Audit SEO (balises `<title>`, `<meta description>`, JSON-LD, `sitemap.xml`, `robots.txt`) et audit sécurité OWASP (Ibrahima Ba) sans critique ouvert.

---

## 8. Points nécessitant validation d'Ahmed Tall (PORTE 0)

1. **Nom de domaine cible** : souhaitez-vous préparer le SEO pour `senecarte.sn`, `sen-e-carte.com`, ou un autre domaine officiel ?
2. **Email officiel de contact** : quel email officiel afficher aux côtés du `+221 77 602 67 83` (ex: `contact@senecarte.sn` ou un Gmail existant) ?
3. **Validation du périmètre V1** : validez-vous ce Cahier des Charges (Vitrine SEO + 6 Pôles Solutions + Studio SaaS Cartes QR/NFC + Agent IA Prospection & CRM) pour ouvrir la **PORTE 0** et lancer immédiatement la conception et le développement dans `projets/sen-e-carte-saas/` ?

---

## 9. Validation

| Rôle | Nom | Date | Signature |
|---|---|---|---|
| Client / CEO | Ahmed Tall | 21/11/2026 | *En attente de validation* |
| Directrice de Production | Ngone Cisse | 21/11/2026 | Prête pour lancement Étape 2 |
