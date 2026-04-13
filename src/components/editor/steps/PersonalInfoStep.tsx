import { useResumeEditor } from '../../../context/ResumeEditorContext'
import type { PersonalInfo } from '../../../lib/types'

export default function PersonalInfoStep() {
  const { formData, updateFormData } = useResumeEditor()
  const p = formData.personalInfo

  function update(field: keyof PersonalInfo, value: string) {
    updateFormData({ personalInfo: { ...p, [field]: value } })
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-forge-900 mb-1">Personal Information</h2>
      <p className="text-gray-400 text-sm mb-6">This appears at the top of your resume.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name *" value={p.fullName} onChange={v => update('fullName', v)} placeholder="Jane Smith" />
          <Field label="Email *" type="email" value={p.email} onChange={v => update('email', v)} placeholder="jane@example.com" />
          <Field label="Phone" value={p.phone} onChange={v => update('phone', v)} placeholder="+1 (555) 000-0000" />
          <Field label="Location" value={p.location} onChange={v => update('location', v)} placeholder="San Francisco, CA" />
          <Field label="Website / Portfolio" value={p.website} onChange={v => update('website', v)} placeholder="https://janesmith.dev" />
          <Field label="LinkedIn URL" value={p.linkedin} onChange={v => update('linkedin', v)} placeholder="https://linkedin.com/in/janesmith" />
        </div>
        <Field label="Profile Photo URL" value={p.photoUrl} onChange={v => update('photoUrl', v)} placeholder="https://..." hint="Optional – used in Ascend and Prestige templates" />
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text', hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500 bg-white transition-colors"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}
