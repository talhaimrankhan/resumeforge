import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useResumeEditor } from '../../../context/ResumeEditorContext'
import { getTemplateCategory } from '../../../lib/constants/templates'
import type { CertificationEntry, LanguageEntry, LinkEntry, LanguageProficiency } from '../../../lib/types'

const PROFICIENCIES: LanguageProficiency[] = ['basic', 'conversational', 'fluent', 'native']

export default function ExtrasStep() {
  const { formData, updateFormData, templateId } = useResumeEditor()
  const category = getTemplateCategory(templateId)
  const isPrestige = category === 'prestige'
  const extras = formData.extras

  function updateExtras(field: keyof typeof extras, value: unknown) {
    updateFormData({ extras: { ...extras, [field]: value } })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-forge-900 mb-1">Extras</h2>
        <p className="text-gray-400 text-sm mb-2">
          {isPrestige
            ? 'Add certifications, languages, hobbies, and portfolio links to complete your Prestige resume.'
            : 'Add certifications to strengthen your Ascend resume.'}
        </p>
      </div>

      {/* Certifications */}
      <CertificationsSection
        certs={extras.certifications ?? []}
        onChange={v => updateExtras('certifications', v)}
      />

      {isPrestige && (
        <>
          <LanguagesSection
            languages={extras.languages ?? []}
            onChange={v => updateExtras('languages', v)}
          />
          <HobbiesSection
            hobbies={extras.hobbies ?? []}
            onChange={v => updateExtras('hobbies', v)}
          />
          <LinksSection
            links={extras.links ?? []}
            onChange={v => updateExtras('links', v)}
          />
        </>
      )}
    </div>
  )
}

// ── Certifications ────────────────────────────────────────────────────────────
function CertificationsSection({ certs, onChange }: { certs: CertificationEntry[]; onChange: (v: CertificationEntry[]) => void }) {
  function add() { onChange([...certs, { id: uuidv4(), name: '', issuer: '', date: '' }]) }
  function update(id: string, field: keyof CertificationEntry, value: string) {
    onChange(certs.map(c => c.id === id ? { ...c, [field]: value } : c))
  }
  function remove(id: string) { onChange(certs.filter(c => c.id !== id)) }

  return (
    <div>
      <h3 className="text-base font-bold text-forge-900 mb-3 flex items-center gap-2">
        🏅 Certifications
      </h3>
      <div className="space-y-3">
        {certs.map(cert => (
          <div key={cert.id} className="bg-white border border-gray-100 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Certificate Name" value={cert.name} onChange={v => update(cert.id, 'name', v)} placeholder="AWS Solutions Architect" />
            <Field label="Issuer" value={cert.issuer} onChange={v => update(cert.id, 'issuer', v)} placeholder="Amazon Web Services" />
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Field label="Date" value={cert.date} onChange={v => update(cert.id, 'date', v)} type="month" />
              </div>
              <button onClick={() => remove(cert.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors mb-0.5">×</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-3 w-full py-2.5 border-2 border-dashed border-gray-200 hover:border-forge-300 text-gray-400 hover:text-forge-600 rounded-xl text-sm font-semibold transition-all">
        + Add Certification
      </button>
    </div>
  )
}

// ── Languages ─────────────────────────────────────────────────────────────────
function LanguagesSection({ languages, onChange }: { languages: LanguageEntry[]; onChange: (v: LanguageEntry[]) => void }) {
  function add() { onChange([...languages, { id: uuidv4(), language: '', proficiency: 'conversational' }]) }
  function update(id: string, field: keyof LanguageEntry, value: string) {
    onChange(languages.map(l => l.id === id ? { ...l, [field]: value } : l))
  }
  function remove(id: string) { onChange(languages.filter(l => l.id !== id)) }

  return (
    <div>
      <h3 className="text-base font-bold text-forge-900 mb-3">🌐 Languages</h3>
      <div className="space-y-2">
        {languages.map(lang => (
          <div key={lang.id} className="flex gap-3 items-center bg-white border border-gray-100 rounded-xl p-3">
            <input
              value={lang.language}
              onChange={e => update(lang.id, 'language', e.target.value)}
              placeholder="e.g. Spanish"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500"
            />
            <select
              value={lang.proficiency}
              onChange={e => update(lang.id, 'proficiency', e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forge-500/20"
            >
              {PROFICIENCIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
            <button onClick={() => remove(lang.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors">×</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-3 w-full py-2.5 border-2 border-dashed border-gray-200 hover:border-forge-300 text-gray-400 hover:text-forge-600 rounded-xl text-sm font-semibold transition-all">
        + Add Language
      </button>
    </div>
  )
}

// ── Hobbies ───────────────────────────────────────────────────────────────────
function HobbiesSection({ hobbies, onChange }: { hobbies: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('')
  function add() {
    const val = input.trim()
    if (!val || hobbies.includes(val)) return
    onChange([...hobbies, val])
    setInput('')
  }
  function remove(h: string) { onChange(hobbies.filter(x => x !== h)) }

  return (
    <div>
      <h3 className="text-base font-bold text-forge-900 mb-3">🎯 Hobbies & Interests</h3>
      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder="e.g. Photography, Chess, Marathon Running"
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500"
        />
        <button onClick={add} disabled={!input.trim()} className="bg-forge-600 hover:bg-forge-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map(h => (
          <span key={h} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 rounded-full px-3 py-1.5 text-sm">
            {h}
            <button onClick={() => remove(h)} className="text-gray-400 hover:text-red-500 transition-colors">×</button>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Links ─────────────────────────────────────────────────────────────────────
function LinksSection({ links, onChange }: { links: LinkEntry[]; onChange: (v: LinkEntry[]) => void }) {
  function add() { onChange([...links, { id: uuidv4(), label: '', url: '' }]) }
  function update(id: string, field: keyof LinkEntry, value: string) {
    onChange(links.map(l => l.id === id ? { ...l, [field]: value } : l))
  }
  function remove(id: string) { onChange(links.filter(l => l.id !== id)) }

  return (
    <div>
      <h3 className="text-base font-bold text-forge-900 mb-3">🔗 Portfolio & Links</h3>
      <div className="space-y-2">
        {links.map(link => (
          <div key={link.id} className="flex gap-3 items-center bg-white border border-gray-100 rounded-xl p-3">
            <input
              value={link.label}
              onChange={e => update(link.id, 'label', e.target.value)}
              placeholder="Label (e.g. GitHub)"
              className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20"
            />
            <input
              value={link.url}
              onChange={e => update(link.id, 'url', e.target.value)}
              placeholder="https://github.com/username"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20"
            />
            <button onClick={() => remove(link.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors">×</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-3 w-full py-2.5 border-2 border-dashed border-gray-200 hover:border-forge-300 text-gray-400 hover:text-forge-600 rounded-xl text-sm font-semibold transition-all">
        + Add Link
      </button>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500 transition-colors"
      />
    </div>
  )
}
