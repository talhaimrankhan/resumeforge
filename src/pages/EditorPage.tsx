import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { ResumeEditorProvider, useResumeEditor } from '../context/ResumeEditorContext'
import WizardLayout from '../components/editor/WizardLayout'
import PersonalInfoStep from '../components/editor/steps/PersonalInfoStep'
import SummaryStep from '../components/editor/steps/SummaryStep'
import ExperienceStep from '../components/editor/steps/ExperienceStep'
import EducationStep from '../components/editor/steps/EducationStep'
import SkillsStep from '../components/editor/steps/SkillsStep'
import ExtrasStep from '../components/editor/steps/ExtrasStep'
import PreviewStep from '../components/editor/steps/PreviewStep'
import { useResumes } from '../hooks/useResumes'
import { getTemplateCategory } from '../lib/constants/templates'
import type { Resume, WizardStep } from '../lib/types'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SEO from '../components/seo/SEO'

function StepContent() {
  const { step, templateId } = useResumeEditor()
  const hasExtras = getTemplateCategory(templateId) !== 'spark'

  if (step === 1) return <PersonalInfoStep />
  if (step === 2) return <SummaryStep />
  if (step === 3) return <ExperienceStep />
  if (step === 4) return <EducationStep />
  if (step === 5) return <SkillsStep />
  if (step === 6 && hasExtras) return <ExtrasStep />
  if ((step === 7 && hasExtras) || (step === 6 && !hasExtras)) return <PreviewStep />
  return <PersonalInfoStep />
}

export default function EditorPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getResume } = useResumes()
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)

  const stepParam = parseInt(searchParams.get('step') ?? '1', 10)
  const initialStep = (isNaN(stepParam) || stepParam < 1 ? 1 : stepParam) as WizardStep

  useEffect(() => {
    if (!id) { navigate('/dashboard'); return }
    getResume(id).then(r => {
      if (!r) navigate('/dashboard')
      else setResume(r)
      setLoading(false)
    })
  }, [id, getResume, navigate])

  if (loading || !resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <>
    <SEO title="Edit Resume" description="Edit your resume in ResumeForge." noIndex />
    <ResumeEditorProvider
      resumeId={resume.id}
      templateId={resume.template_id}
      initialData={resume.form_data}
      initialStep={initialStep}
    >
      <WizardLayout>
        <StepContent />
      </WizardLayout>
    </ResumeEditorProvider>
    </>
  )
}
