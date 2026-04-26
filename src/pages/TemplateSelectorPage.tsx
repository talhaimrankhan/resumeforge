import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import SEO from '../components/seo/SEO'
import PaymentModal from '../components/payment/PaymentModal'
import TemplateRenderer from '../components/templates/TemplateRenderer'
import { TEMPLATES_BY_CATEGORY, CATEGORY_META } from '../lib/constants/templates'
import { SAMPLE_RESUME_DATA } from '../lib/constants/sampleData'
import { useTemplates } from '../hooks/useTemplates'
import { useResumes } from '../hooks/useResumes'
import type { Template, TemplateCategory } from '../lib/types'
import toast from 'react-hot-toast'

// Renders the actual template scaled down to fit a card thumbnail
const FULL_WIDTH = 794  // px — A4 at 96dpi
const FULL_HEIGHT = FULL_WIDTH * (297 / 210) // A4 aspect ratio

function ScaledTemplatePreview({ templateId, displayWidth }: { templateId: string; displayWidth: number }) {
  const scale = displayWidth / FULL_WIDTH
  const displayHeight = FULL_HEIGHT * scale

  return (
    <div
      style={{ width: displayWidth, height: displayHeight, overflow: 'hidden', position: 'relative' }}
    >
      <div
        style={{
          width: FULL_WIDTH,
          height: FULL_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <TemplateRenderer templateId={templateId} data={SAMPLE_RESUME_DATA} />
      </div>
    </div>
  )
}

export default function TemplateSelectorPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TemplateCategory>('spark')
  const [paymentTarget, setPaymentTarget] = useState<Template | null>(null)
  const [titleTarget, setTitleTarget] = useState<Template | null>(null)
  const [titleInput, setTitleInput] = useState('')
  const [creating, setCreating] = useState(false)
  const { isUnlocked, fetchUnlocked, unlockTemplate } = useTemplates()
  const { createResume } = useResumes()

  useEffect(() => { fetchUnlocked() }, [fetchUnlocked])

  function promptTitle(template: Template) {
    setTitleInput('')
    setTitleTarget(template)
  }

  async function handleCreateWithTitle() {
    if (!titleTarget) return
    const title = titleInput.trim() || titleTarget.name
    setCreating(true)
    const resume = await createResume(titleTarget.id, title)
    setCreating(false)
    setTitleTarget(null)
    if (!resume) { toast.error('Failed to create resume'); return }
    navigate(`/resume/${resume.id}/edit`)
  }

  async function handleSelectTemplate(template: Template) {
    if (!isUnlocked(template.id)) {
      setPaymentTarget(template)
      return
    }
    promptTitle(template)
  }

  async function handlePaymentSuccess() {
    if (!paymentTarget) return
    const { error } = await unlockTemplate(paymentTarget.id)
    if (error) { toast.error(error); return }
    toast.success(`${paymentTarget.name} unlocked!`)
    const template = paymentTarget
    setPaymentTarget(null)
    promptTitle(template)
  }

  const tabs: TemplateCategory[] = ['spark', 'ascend', 'prestige']

  return (
    <>
    <SEO title="Choose a Resume Template" description="Browse 30 professional resume templates across 3 tiers." noIndex />
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-forge-900 tracking-tight mb-1">Choose a Template</h1>
          <p className="text-gray-400 text-sm">Select a template to start building your resume. Free templates are ready immediately.</p>
        </div>

        {/* Tier tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-8 w-full sm:w-fit">
          {tabs.map(tab => {
            const meta = CATEGORY_META[tab]
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-forge-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-forge-600'
                }`}
              >
                <span>{meta.icon}</span>
                {meta.label}
              </button>
            )
          })}
        </div>

        {/* Tier info */}
        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_META[activeTab].badgeColor}`}>
              {CATEGORY_META[activeTab].badge}
            </span>
            <p className="text-sm text-gray-500">{CATEGORY_META[activeTab].tagline}</p>
          </div>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TEMPLATES_BY_CATEGORY[activeTab].map(template => {
            const unlocked = isUnlocked(template.id)
            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all text-left"
              >
                {/* Scaled real template preview */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-white">
                  <ScaledTemplatePreview templateId={template.id} displayWidth={220} />
                </div>

                {/* Lock overlay for paid */}
                {!unlocked && (
                  <div className="absolute inset-0 bg-forge-950/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                    <div className="bg-white/95 rounded-xl p-3 text-center shadow-lg">
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="text-xs font-bold text-forge-900">${template.price.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Click to unlock</div>
                    </div>
                  </div>
                )}

                {/* Free badge */}
                {template.is_free && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    Free
                  </div>
                )}

                {/* Unlocked badge */}
                {!template.is_free && unlocked && (
                  <div className="absolute top-2 right-2 bg-gold-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    Unlocked
                  </div>
                )}

                {/* Name */}
                <div className="p-3 border-t border-gray-50">
                  <div className="font-semibold text-sm text-forge-900 truncate">{template.name}</div>
                  {!template.is_free && !unlocked && (
                    <div className="text-xs text-gray-400">${template.price.toFixed(2)}</div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </main>

      {paymentTarget && (
        <PaymentModal
          template={paymentTarget}
          onClose={() => setPaymentTarget(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {titleTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-extrabold text-forge-900 mb-1">Name your resume</h2>
            <p className="text-sm text-gray-400 mb-5">Give this resume a title so you can find it later.</p>
            <input
              type="text"
              autoFocus
              placeholder={`e.g. Software Engineer at Google`}
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreateWithTitle() }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-forge-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forge-500 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setTitleTarget(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWithTitle}
                disabled={creating}
                className="flex-1 bg-forge-600 hover:bg-forge-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                {creating ? 'Creating…' : 'Start Building'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
