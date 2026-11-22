-- Schéma de base de données production Sen-E-Carte
-- Compatible TiDB Cloud Starter (25 Go GRATUIT) & PostgreSQL / MySQL 8+

CREATE TABLE IF NOT EXISTS clients (
  id VARCHAR(64) PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  contact_name VARCHAR(160),
  email VARCHAR(160),
  phone_whatsapp VARCHAR(40),
  sector VARCHAR(120),
  city VARCHAR(100) DEFAULT 'Dakar',
  ninea VARCHAR(60),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS smart_cards (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  client_id VARCHAR(64),
  holder_name VARCHAR(160) NOT NULL,
  card_type VARCHAR(60) NOT NULL, -- sante-ipm, scolaire-cmu, business-nfc, gie-membre
  plan_tier VARCHAR(40) NOT NULL, -- basique, avance, premium
  status VARCHAR(30) DEFAULT 'ACTIF',
  qr_payload TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS billing_documents (
  id VARCHAR(64) PRIMARY KEY,
  ref VARCHAR(60) UNIQUE NOT NULL, -- FAC-2026-001 / DEV-2026-001
  kind VARCHAR(20) NOT NULL,       -- DEVIS | FACTURE
  client_name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  amount_ht BIGINT NOT NULL,
  apply_tva BOOLEAN DEFAULT TRUE,
  amount_ttc BIGINT NOT NULL,
  payment_method VARCHAR(60) DEFAULT 'Wave',
  status VARCHAR(30) DEFAULT 'Envoyé', -- Brouillon | Envoyé | Payé | En retard
  issued_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client_contracts (
  id VARCHAR(64) PRIMARY KEY,
  client_name VARCHAR(200) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  amount_fcfa BIGINT NOT NULL,
  billing_cycle VARCHAR(30) DEFAULT 'Annuel',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(30) DEFAULT 'Actif', -- Actif | À renouveler | En signature | Clôturé
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prospection_leads (
  id VARCHAR(64) PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  contact_role VARCHAR(160),
  sector VARCHAR(120),
  city VARCHAR(100),
  source_network VARCHAR(60),
  source_url TEXT,
  score INT DEFAULT 85,
  email_to VARCHAR(160),
  whatsapp_to VARCHAR(40),
  email_subject VARCHAR(255),
  email_draft TEXT,
  whatsapp_draft TEXT,
  director_approved BOOLEAN DEFAULT FALSE,
  status VARCHAR(40) DEFAULT 'EN_ATTENTE', -- EN_ATTENTE | EMAIL_ENVOYE | WHATSAPP_ENVOYE | REJETE
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mobile_money_orders (
  id VARCHAR(64) PRIMARY KEY,
  order_ref VARCHAR(60) UNIQUE NOT NULL,
  full_name VARCHAR(160) NOT NULL,
  organization VARCHAR(200),
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(160),
  city VARCHAR(100),
  card_category VARCHAR(100),
  plan_id VARCHAR(40),
  quantity INT DEFAULT 1,
  total_amount BIGINT NOT NULL,
  payment_method VARCHAR(40),
  status VARCHAR(30) DEFAULT 'EN_ATTENTE_PAIEMENT',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
