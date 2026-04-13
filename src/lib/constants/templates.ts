import type { Template, TemplateCategory } from '../types'

export const TEMPLATES: Template[] = [
  // ── Spark ──────────────────────────────────────────────────────────────────
  { id: 'spark-1',  name: 'Classic',       category: 'spark',    is_free: true,  price: 0,     thumbnail_color: '#64748b' },
  { id: 'spark-2',  name: 'Clean',         category: 'spark',    is_free: true,  price: 0,     thumbnail_color: '#0ea5e9' },
  { id: 'spark-3',  name: 'Simple',        category: 'spark',    is_free: true,  price: 0,     thumbnail_color: '#10b981' },
  { id: 'spark-4',  name: 'Slate',         category: 'spark',    is_free: false, price: 4.99,  thumbnail_color: '#475569' },
  { id: 'spark-5',  name: 'Breeze',        category: 'spark',    is_free: false, price: 4.99,  thumbnail_color: '#06b6d4' },
  { id: 'spark-6',  name: 'Sage',          category: 'spark',    is_free: false, price: 4.99,  thumbnail_color: '#22c55e' },
  { id: 'spark-7',  name: 'Crimson',       category: 'spark',    is_free: false, price: 4.99,  thumbnail_color: '#ef4444' },
  { id: 'spark-8',  name: 'Dusk',          category: 'spark',    is_free: false, price: 4.99,  thumbnail_color: '#8b5cf6' },
  { id: 'spark-9',  name: 'Amber',         category: 'spark',    is_free: false, price: 4.99,  thumbnail_color: '#f59e0b' },
  { id: 'spark-10', name: 'Midnight',      category: 'spark',    is_free: false, price: 4.99,  thumbnail_color: '#1e293b' },

  // ── Ascend ─────────────────────────────────────────────────────────────────
  { id: 'ascend-1',  name: 'Executive',    category: 'ascend',   is_free: true,  price: 0,     thumbnail_color: '#4f46e5' },
  { id: 'ascend-2',  name: 'Navigator',    category: 'ascend',   is_free: true,  price: 0,     thumbnail_color: '#0369a1' },
  { id: 'ascend-3',  name: 'Meridian',     category: 'ascend',   is_free: true,  price: 0,     thumbnail_color: '#0d9488' },
  { id: 'ascend-4',  name: 'Horizon',      category: 'ascend',   is_free: false, price: 7.99,  thumbnail_color: '#7c3aed' },
  { id: 'ascend-5',  name: 'Summit',       category: 'ascend',   is_free: false, price: 7.99,  thumbnail_color: '#dc2626' },
  { id: 'ascend-6',  name: 'Pinnacle',     category: 'ascend',   is_free: false, price: 7.99,  thumbnail_color: '#ea580c' },
  { id: 'ascend-7',  name: 'Zenith',       category: 'ascend',   is_free: false, price: 7.99,  thumbnail_color: '#16a34a' },
  { id: 'ascend-8',  name: 'Apex',         category: 'ascend',   is_free: false, price: 7.99,  thumbnail_color: '#0891b2' },
  { id: 'ascend-9',  name: 'Vertex',       category: 'ascend',   is_free: false, price: 7.99,  thumbnail_color: '#9333ea' },
  { id: 'ascend-10', name: 'Crest',        category: 'ascend',   is_free: false, price: 7.99,  thumbnail_color: '#be123c' },

  // ── Prestige ───────────────────────────────────────────────────────────────
  { id: 'prestige-1',  name: 'Imperial',   category: 'prestige', is_free: true,  price: 0,     thumbnail_color: '#1e1b4b' },
  { id: 'prestige-2',  name: 'Sovereign',  category: 'prestige', is_free: true,  price: 0,     thumbnail_color: '#7f1d1d' },
  { id: 'prestige-3',  name: 'Opulent',    category: 'prestige', is_free: true,  price: 0,     thumbnail_color: '#064e3b' },
  { id: 'prestige-4',  name: 'Dynasty',    category: 'prestige', is_free: false, price: 12.99, thumbnail_color: '#312e81' },
  { id: 'prestige-5',  name: 'Luminary',   category: 'prestige', is_free: false, price: 12.99, thumbnail_color: '#831843' },
  { id: 'prestige-6',  name: 'Monarch',    category: 'prestige', is_free: false, price: 12.99, thumbnail_color: '#134e4a' },
  { id: 'prestige-7',  name: 'Grandeur',   category: 'prestige', is_free: false, price: 12.99, thumbnail_color: '#3b0764' },
  { id: 'prestige-8',  name: 'Laureate',   category: 'prestige', is_free: false, price: 12.99, thumbnail_color: '#7c2d12' },
  { id: 'prestige-9',  name: 'Magnate',    category: 'prestige', is_free: false, price: 12.99, thumbnail_color: '#042f2e' },
  { id: 'prestige-10', name: 'Prestige X', category: 'prestige', is_free: false, price: 12.99, thumbnail_color: '#0c0a09' },
]

export const TEMPLATES_BY_CATEGORY: Record<TemplateCategory, Template[]> = {
  spark:    TEMPLATES.filter(t => t.category === 'spark'),
  ascend:   TEMPLATES.filter(t => t.category === 'ascend'),
  prestige: TEMPLATES.filter(t => t.category === 'prestige'),
}

export const CATEGORY_META: Record<TemplateCategory, {
  label: string
  tagline: string
  badge: string
  badgeColor: string
  icon: string
}> = {
  spark: {
    label: 'Spark',
    tagline: 'Clean, minimal layouts — perfect for first resumes and straightforward applications.',
    badge: 'Spark',
    badgeColor: 'bg-slate-100 text-slate-700',
    icon: '✦',
  },
  ascend: {
    label: 'Ascend',
    tagline: 'Two-column designs with a professional edge — includes certifications section.',
    badge: 'Ascend',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: '◆',
  },
  prestige: {
    label: 'Prestige',
    tagline: 'Sophisticated executive layouts — full extras: certs, languages, hobbies & links.',
    badge: 'Prestige',
    badgeColor: 'bg-amber-100 text-amber-700',
    icon: '★',
  },
}

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find(t => t.id === id)
}

export function getTemplateCategory(templateId: string): TemplateCategory {
  const t = getTemplateById(templateId)
  return t?.category ?? 'spark'
}

export function hasExtras(templateId: string): boolean {
  return getTemplateCategory(templateId) !== 'spark'
}
