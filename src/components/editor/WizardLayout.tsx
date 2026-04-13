import { useNavigate } from 'react-router-dom'
import { useResumeEditor } from '../../context/ResumeEditorContext'
import { getTemplateCategory } from '../../lib/constants/templates'
import type { WizardStep } from '../../lib/types'
import LoadingSpinner from '../common/LoadingSpinner'

interface StepDef {
  step: WizardStep
  label: string
  icon: string
}

function getSteps(templateId: string): StepDef[] {
  const hasExtras = getTemplateCategory(templateId) !== 'spark'
  const steps: StepDef[] = [
    { step: 1, label: 'Personal Info', icon: '👤' },
    { step: 2, label: 'Summary',      icon: '📝' },
    { step: 3, label: 'Experience',   icon: '💼' },
    { step: 4, label: 'Education',    icon: '🎓' },
    { step: 5, label: 'Skills',       icon: '⚙️' },
  ]
  if (hasExtras) steps.push({ step: 6, label: 'Extras', icon: '✨' })
  steps.push({ step: (hasExtras ? 7 : 6) as WizardStep, label: 'Preview', icon: '👁' })
  return steps
}

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  const { step, setStep, templateId, saving, isDirty, saveNow, resumeId } = useResumeEditor()
  const navigate = useNavigate()
  const steps = getSteps(templateId)
  const currentIdx = steps.findIndex(s => s.step === step)
  const progress = ((currentIdx + 1) / steps.length) * 100

  function goNext() {
    const next = steps[currentIdx + 1]
    if (next) { saveNow(); setStep(next.step) }
  }

  function goBack() {
    const prev = steps[currentIdx - 1]
    if (prev) setStep(prev.step)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-forge-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo-icon.png`} alt="ResumeForge" style={{ height: '32px', width: 'auto' }} />
            <span className="font-extrabold text-forge-900 text-[15px] tracking-tight">ResumeForge</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex-1 max-w-xs mx-4">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-forge-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 text-center mt-0.5">Step {currentIdx + 1} of {steps.length}</div>
        </div>

        {/* Save status */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {saving ? (
            <><LoadingSpinner size="sm" /><span>Saving…</span></>
          ) : isDirty ? (
            <span className="text-amber-500">Unsaved</span>
          ) : (
            <span className="text-green-500">✓ Saved</span>
          )}
          <button
            onClick={() => navigate(`/resume/${resumeId}/preview`)}
            className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Preview
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar steps */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 pt-6 px-3">
          {steps.map((s, i) => {
            const isActive = s.step === step
            const isDone = i < currentIdx
            return (
              <button
                key={s.step}
                onClick={() => setStep(s.step)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-1 text-left ${
                  isActive
                    ? 'bg-forge-600 text-white font-semibold'
                    : isDone
                    ? 'text-gray-500 hover:bg-gray-50'
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{isDone && !isActive ? '✓' : s.icon}</span>
                {s.label}
              </button>
            )
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4 sm:p-8 max-w-3xl w-full mx-auto">
            {children}
          </div>

          {/* Bottom nav */}
          <div className="bg-white border-t border-gray-100 px-4 sm:px-8 py-4 flex justify-between items-center">
            <button
              onClick={goBack}
              disabled={currentIdx === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-forge-600 disabled:opacity-30 transition-colors"
            >
              ← Back
            </button>
            <div className="flex gap-2 lg:hidden text-xs text-gray-400">
              {steps[currentIdx]?.icon} {steps[currentIdx]?.label}
            </div>
            {currentIdx < steps.length - 1 ? (
              <button
                onClick={goNext}
                className="flex items-center gap-2 bg-forge-600 hover:bg-forge-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => navigate(`/resume/${resumeId}/preview`)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Finish & Preview ↗
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
