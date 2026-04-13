import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Resume } from '../../lib/types'
import { getTemplateById, CATEGORY_META } from '../../lib/constants/templates'

interface Props {
  resume: Resume
  onDelete: (id: string) => void
}

export default function ResumeCard({ resume, onDelete }: Props) {
  const navigate = useNavigate()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const template = getTemplateById(resume.template_id)
  const meta = template ? CATEGORY_META[template.category] : null

  const updatedAt = new Date(resume.updated_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden group">
      {/* Color bar */}
      <div
        className="h-2"
        style={{ background: template?.thumbnail_color ?? '#4f46e5' }}
      />

      <div className="p-5">
        {/* Badge + template */}
        <div className="flex items-center gap-2 mb-3">
          {meta && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.badgeColor}`}>
              {meta.badge}
            </span>
          )}
          <span className="text-xs text-gray-400 font-medium">{template?.name ?? 'Unknown Template'}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-forge-900 text-base mb-1 truncate">{resume.title}</h3>
        <p className="text-xs text-gray-400 mb-4">Last edited {updatedAt}</p>

        {/* Quick stats */}
        <div className="flex gap-3 text-xs text-gray-400 mb-4">
          <span>{resume.form_data.experience?.length ?? 0} jobs</span>
          <span>·</span>
          <span>{resume.form_data.education?.length ?? 0} schools</span>
          <span>·</span>
          <span>{resume.form_data.skills?.length ?? 0} skills</span>
        </div>

        {/* Actions */}
        {confirmDelete ? (
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(resume.id)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Confirm Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/resume/${resume.id}/edit`)}
              className="flex-1 bg-forge-600 hover:bg-forge-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => navigate(`/resume/${resume.id}/preview`)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              Preview
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
