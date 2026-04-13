import { useResumeEditor } from '../../../context/ResumeEditorContext'

const MAX = 500

export default function SummaryStep() {
  const { formData, updateFormData } = useResumeEditor()
  const summary = formData.summary
  const count = summary.length

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-forge-900 mb-1">Professional Summary</h2>
      <p className="text-gray-400 text-sm mb-6">A 2–4 sentence overview of your career and key strengths. This is the first thing recruiters read.</p>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-600">Summary</label>
          <span className={`text-xs ${count > MAX * 0.9 ? 'text-red-400' : 'text-gray-400'}`}>{count}/{MAX}</span>
        </div>
        <textarea
          value={summary}
          onChange={e => updateFormData({ summary: e.target.value.slice(0, MAX) })}
          placeholder="Results-driven software engineer with 5+ years building scalable web applications. Passionate about clean code, user experience, and shipping products that matter..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500 resize-none bg-white transition-colors leading-relaxed"
        />
      </div>

      <div className="mt-6 p-4 bg-forge-50 rounded-xl border border-forge-100">
        <p className="text-xs font-semibold text-forge-700 mb-1">💡 Tips for a strong summary</p>
        <ul className="text-xs text-forge-600 space-y-1 list-disc list-inside">
          <li>Lead with your job title and years of experience</li>
          <li>Include 2–3 key skills or technologies</li>
          <li>Mention your biggest achievement or impact</li>
          <li>Keep it under 100 words for best results</li>
        </ul>
      </div>
    </div>
  )
}
