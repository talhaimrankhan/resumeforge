import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResumes } from '../hooks/useResumes'
import TemplateRenderer from '../components/templates/TemplateRenderer'
import { exportAsPDF, exportAsPNG } from '../lib/export'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SEO from '../components/seo/SEO'
import type { Resume } from '../lib/types'

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getResume } = useResumes()
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null)

  useEffect(() => {
    if (!id) { navigate('/dashboard'); return }
    getResume(id).then(r => {
      if (!r) navigate('/dashboard')
      else setResume(r)
      setLoading(false)
    })
  }, [id, getResume, navigate])

  async function handleExport(type: 'pdf' | 'png') {
    setExporting(type)
    try {
      if (type === 'pdf') await exportAsPDF('resume-preview')
      else await exportAsPNG('resume-preview')
    } finally {
      setExporting(null)
    }
  }

  if (loading || !resume) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>
  }

  return (
    <>
    <SEO title="Resume Preview" description="Preview and download your resume." noIndex />
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-30 no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-forge-600 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('png')}
            disabled={!!exporting}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-60 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {exporting === 'png' ? <LoadingSpinner size="sm" /> : '🖼'}
            PNG
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={!!exporting}
            className="flex items-center gap-2 bg-forge-600 hover:bg-forge-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {exporting === 'pdf' ? <LoadingSpinner size="sm" color="text-white" /> : '📄'}
            Download PDF
          </button>
        </div>
      </header>

      {/* Resume */}
      <div className="py-10 px-4 flex justify-center">
        <div
          className="bg-white shadow-2xl"
          style={{ width: '210mm', minHeight: '297mm', maxWidth: '100%' }}
        >
          <TemplateRenderer templateId={resume.template_id} data={resume.form_data} />
        </div>
      </div>
    </div>
    </>
  )
}
