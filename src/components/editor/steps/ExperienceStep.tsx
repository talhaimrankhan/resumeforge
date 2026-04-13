import { v4 as uuidv4 } from 'uuid'
import { useResumeEditor } from '../../../context/ResumeEditorContext'
import type { ExperienceEntry } from '../../../lib/types'

export default function ExperienceStep() {
  const { formData, updateFormData } = useResumeEditor()
  const experience = formData.experience

  function add() {
    updateFormData({
      experience: [...experience, {
        id: uuidv4(), company: '', title: '', location: '',
        startDate: '', endDate: '', current: false, description: '',
      }],
    })
  }

  function update(id: string, field: keyof ExperienceEntry, value: string | boolean) {
    updateFormData({
      experience: experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    })
  }

  function remove(id: string) {
    updateFormData({ experience: experience.filter(e => e.id !== id) })
  }

  function move(idx: number, dir: -1 | 1) {
    const arr = [...experience]
    const tmp = arr[idx]
    arr[idx] = arr[idx + dir]
    arr[idx + dir] = tmp
    updateFormData({ experience: arr })
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-forge-900 mb-1">Work Experience</h2>
      <p className="text-gray-400 text-sm mb-6">Add your work history, most recent first. Use bullet points in the description (one per line).</p>

      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div key={exp.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Position {idx + 1}</span>
              <div className="flex gap-1">
                {idx > 0 && (
                  <button onClick={() => move(idx, -1)} className="p-1.5 text-gray-400 hover:text-forge-600 rounded-lg hover:bg-forge-50 transition-colors" title="Move up">↑</button>
                )}
                {idx < experience.length - 1 && (
                  <button onClick={() => move(idx, 1)} className="p-1.5 text-gray-400 hover:text-forge-600 rounded-lg hover:bg-forge-50 transition-colors" title="Move down">↓</button>
                )}
                <button onClick={() => remove(exp.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Field label="Job Title *" value={exp.title} onChange={v => update(exp.id, 'title', v)} placeholder="Software Engineer" />
              <Field label="Company *" value={exp.company} onChange={v => update(exp.id, 'company', v)} placeholder="Acme Corp" />
              <Field label="Location" value={exp.location} onChange={v => update(exp.id, 'location', v)} placeholder="Remote / New York, NY" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <Field label="Start Date" value={exp.startDate} onChange={v => update(exp.id, 'startDate', v)} type="month" />
              <div>
                <Field label="End Date" value={exp.endDate} onChange={v => update(exp.id, 'endDate', v)} type="month" disabled={exp.current} />
                <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={e => update(exp.id, 'current', e.target.checked)}
                    className="rounded accent-forge-600"
                  />
                  <span className="text-xs text-gray-500">Currently working here</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea
                value={exp.description}
                onChange={e => update(exp.id, 'description', e.target.value)}
                placeholder="• Led migration of monolith to microservices, reducing deploy time by 40%&#10;• Mentored 3 junior engineers and ran weekly code reviews&#10;• Built real-time dashboard used by 10k+ daily active users"
                rows={4}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500 resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 hover:border-forge-400 text-gray-400 hover:text-forge-600 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
      >
        + Add Experience
      </button>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text', disabled = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
      />
    </div>
  )
}
