-- ResumeForge Supabase Schema
-- Run this in your Supabase SQL editor

-- ─── Enable UUID extension ────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── profiles ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: own row" ON profiles
  FOR ALL USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── templates ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS templates (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  category         TEXT NOT NULL CHECK (category IN ('spark', 'ascend', 'prestige')),
  is_free          BOOLEAN DEFAULT FALSE,
  price            DECIMAL(10,2) DEFAULT 4.99,
  thumbnail_color  TEXT DEFAULT '#4f46e5'
);

-- No RLS needed on templates — public read
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "templates: public read" ON templates FOR SELECT USING (true);

-- ─── resumes ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resumes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL DEFAULT 'Untitled Resume',
  template_id TEXT NOT NULL REFERENCES templates(id),
  form_data   JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "resumes: own rows" ON resumes
  FOR ALL USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER resumes_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── unlocked_templates ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS unlocked_templates (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  template_id  TEXT NOT NULL REFERENCES templates(id),
  unlocked_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, template_id)
);

ALTER TABLE unlocked_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "unlocked_templates: own rows" ON unlocked_templates
  FOR ALL USING (auth.uid() = user_id);

-- ─── Seed: Insert all 30 templates ───────────────────────────────────────────

-- Spark (basic) — free: spark-1, spark-2, spark-3
INSERT INTO templates (id, name, category, is_free, price, thumbnail_color) VALUES
  ('spark-1',  'Classic',       'spark', true,  0,    '#64748b'),
  ('spark-2',  'Clean',         'spark', true,  0,    '#0ea5e9'),
  ('spark-3',  'Simple',        'spark', true,  0,    '#10b981'),
  ('spark-4',  'Slate',         'spark', false, 4.99, '#475569'),
  ('spark-5',  'Breeze',        'spark', false, 4.99, '#06b6d4'),
  ('spark-6',  'Sage',          'spark', false, 4.99, '#22c55e'),
  ('spark-7',  'Crimson',       'spark', false, 4.99, '#ef4444'),
  ('spark-8',  'Dusk',          'spark', false, 4.99, '#8b5cf6'),
  ('spark-9',  'Amber',         'spark', false, 4.99, '#f59e0b'),
  ('spark-10', 'Midnight',      'spark', false, 4.99, '#1e293b')
ON CONFLICT (id) DO NOTHING;

-- Ascend (intermediate) — free: ascend-1, ascend-2, ascend-3
INSERT INTO templates (id, name, category, is_free, price, thumbnail_color) VALUES
  ('ascend-1',  'Executive',    'ascend', true,  0,    '#4f46e5'),
  ('ascend-2',  'Navigator',    'ascend', true,  0,    '#0369a1'),
  ('ascend-3',  'Meridian',     'ascend', true,  0,    '#0d9488'),
  ('ascend-4',  'Horizon',      'ascend', false, 7.99, '#7c3aed'),
  ('ascend-5',  'Summit',       'ascend', false, 7.99, '#dc2626'),
  ('ascend-6',  'Pinnacle',     'ascend', false, 7.99, '#ea580c'),
  ('ascend-7',  'Zenith',       'ascend', false, 7.99, '#16a34a'),
  ('ascend-8',  'Apex',         'ascend', false, 7.99, '#0891b2'),
  ('ascend-9',  'Vertex',       'ascend', false, 7.99, '#9333ea'),
  ('ascend-10', 'Crest',        'ascend', false, 7.99, '#be123c')
ON CONFLICT (id) DO NOTHING;

-- Prestige (pro) — free: prestige-1, prestige-2, prestige-3
INSERT INTO templates (id, name, category, is_free, price, thumbnail_color) VALUES
  ('prestige-1',  'Imperial',   'prestige', true,  0,     '#1e1b4b'),
  ('prestige-2',  'Sovereign',  'prestige', true,  0,     '#7f1d1d'),
  ('prestige-3',  'Opulent',    'prestige', true,  0,     '#064e3b'),
  ('prestige-4',  'Dynasty',    'prestige', false, 12.99, '#312e81'),
  ('prestige-5',  'Luminary',   'prestige', false, 12.99, '#831843'),
  ('prestige-6',  'Monarch',    'prestige', false, 12.99, '#134e4a'),
  ('prestige-7',  'Grandeur',   'prestige', false, 12.99, '#3b0764'),
  ('prestige-8',  'Laureate',   'prestige', false, 12.99, '#7c2d12'),
  ('prestige-9',  'Magnate',    'prestige', false, 12.99, '#042f2e'),
  ('prestige-10', 'Prestige X', 'prestige', false, 12.99, '#0c0a09')
ON CONFLICT (id) DO NOTHING;
