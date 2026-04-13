import { v4 as uuidv4 } from 'uuid'
import { useResumeEditor } from '../../../context/ResumeEditorContext'
import type { EducationEntry } from '../../../lib/types'

export default function EducationStep() {
  const { formData, updateFormData } = useResumeEditor()
  const education = formData.education

  function add() {
    updateFormData({
      education: [...education, {
        id: uuidv4(), institution: '', degree: '', field: '',
        startDate: '', endDate: '', gpa: '',
      }],
    })
  }

  function update(id: string, field: keyof EducationEntry, value: string) {
    updateFormData({
      education: education.map(e => e.id === id ? { ...e, [field]: value } : e),
    })
  }

  function remove(id: string) {
    updateFormData({ education: education.filter(e => e.id !== id) })
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-forge-900 mb-1">Education</h2>
      <p className="text-gray-400 text-sm mb-6">Add your academic background, most recent first.</p>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={edu.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Education {idx + 1}</span>
              <button onClick={() => remove(edu.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Institution *" value={edu.institution} onChange={v => update(edu.id, 'institution', v)} placeholder="MIT" />
              <Field label="Degree *" value={edu.degree} onChange={v => update(edu.id, 'degree', v)} placeholder="Bachelor of Science" />
              <Field label="Field of Study" value={edu.field} onChange={v => update(edu.id, 'field', v)} placeholder="Computer Science" />
              <Field label="GPA" value={edu.gpa} onChange={v => update(edu.id, 'gpa', v)} placeholder="3.9/4.0" />
              <Field label="Start Date" value={edu.startDate} onChange={v => update(edu.id, 'startDate', v)} type="month" />
              <Field label="End Date" value={edu.endDate} onChange={v => update(edu.id, 'endDate', v)} type="month" />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 hover:border-forge-400 text-gray-400 hover:text-forge-600 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
      >
        + Add Education
      </button>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
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
        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500 transition-colors"
      />
    </div>
  )
}
