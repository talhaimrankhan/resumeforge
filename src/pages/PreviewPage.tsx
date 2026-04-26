import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResumes } from '../hooks/useResumes'
import TemplateRenderer from '../components/templates/TemplateRenderer'
import { exportAsPDF, exportAsPNG } from '../lib/export'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SEO from '../components/seo/SEO'
import type { Resume } from '../lib/types'

const A4_PX = 794

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getResume } = useResumes()
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayScale, setDisplayScale] = useState(1)

  useEffect(() => {
    if (!id) { navigate('/dashboard'); return }
    getResume(id).then(r => {
      if (!r) navigate('/dashboard')
      else setResume(r)
      setLoading(false)
    })
  }, [id, getResume, navigate])

  function computeScale(): number {
    if (!containerRef.current) return 1
    const available = containerRef.current.clientWidth - 32
    return available < A4_PX ? available / A4_PX : 1
  }

  useEffect(() => {
    const update = () => setDisplayScale(computeScale())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  async function handleExport(type: 'pdf' | 'png') {
    setExporting(type)
    setDisplayScale(1)
    // Wait for React to repaint at full scale before capturing
    await new Promise<void>(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    )
    try {
      if (type === 'pdf') await exportAsPDF('resume-preview')
      else await exportAsPNG('resume-preview')
    } finally {
      setExporting(null)
      setDisplayScale(computeScale())
    }
  }

  if (loading || !resume) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>
  }

  const scaledWidth = A4_PX * displayScale
  const scaledHeight = (297 / 210) * A4_PX * displayScale

  return (
    <>
    <SEO title="Resume Preview" description="Preview and download your resume." noIndex />
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-3 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-30 no-print">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-forge-600 transition-colors min-w-0"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline truncate">Back to Dashboard</span>
          <span className="sm:hidden">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('png')}
            disabled={!!exporting}
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-60 text-gray-700 text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl transition-colors"
          >
            {exporting === 'png' ? <LoadingSpinner size="sm" /> : '🖼'}
            PNG
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={!!exporting}
            className="flex items-center gap-1.5 bg-forge-600 hover:bg-forge-700 disabled:opacity-60 text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl transition-colors"
          >
            {exporting === 'pdf' ? <LoadingSpinner size="sm" color="text-white" /> : '📄'}
            <span className="sm:hidden">PDF</span>
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      {/* Resume — scales to fit screen on mobile */}
      <div className="py-6 sm:py-10 px-4 overflow-x-hidden" ref={containerRef}>
        <div
          style={{
            margin: '0 auto',
            width: scaledWidth,
            height: scaledHeight,
            overflow: 'hidden',
          }}
        >
          <div
            id="resume-preview"
            className="bg-white shadow-2xl"
            style={{
              width: A4_PX,
              minHeight: (297 / 210) * A4_PX,
              transform: `scale(${displayScale})`,
              transformOrigin: 'top left',
            }}
          >
            <TemplateRenderer templateId={resume.template_id} data={resume.form_data} />
          </div>
        </div>

        {displayScale < 1 && (
          <p className="text-center text-xs text-gray-400 mt-3 sm:hidden">
            Preview scaled to fit · Download PDF for full quality
          </p>
        )}
      </div>
    </div>
    </>
  )
}
