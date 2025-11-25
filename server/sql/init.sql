-- server/sql/init.sql

-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'beneficiary',
  created_at TIMESTAMP DEFAULT now()
);

-- activities
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  parent_category TEXT,
  meta JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- donations
CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  donor_name TEXT,
  email TEXT,
  amount NUMERIC(12,2) NOT NULL,
  category TEXT,
  note TEXT,
  campaign_id INTEGER,
  created_at TIMESTAMP DEFAULT now()
);
