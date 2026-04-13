import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import type { ResumeFormData, WizardStep } from '../lib/types'
import { EMPTY_FORM_DATA } from '../lib/types'
import { useResumes } from '../hooks/useResumes'

interface ResumeEditorContextValue {
  resumeId: string
  templateId: string
  formData: ResumeFormData
  step: WizardStep
  saving: boolean
  isDirty: boolean
  setStep: (s: WizardStep) => void
  updateFormData: (updates: Partial<ResumeFormData>) => void
  saveNow: () => Promise<void>
}

const Ctx = createContext<ResumeEditorContextValue | null>(null)

export function ResumeEditorProvider({
  resumeId,
  templateId,
  initialData,
  initialStep,
  children,
}: {
  resumeId: string
  templateId: string
  initialData: ResumeFormData
  initialStep: WizardStep
  children: React.ReactNode
}) {
  const { updateResume } = useResumes()
  const [formData, setFormData] = useState<ResumeFormData>(initialData ?? EMPTY_FORM_DATA)
  const [step, setStep] = useState<WizardStep>(initialStep)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const saveNow = useCallback(async () => {
    setSaving(true)
    await updateResume(resumeId, { form_data: formData })
    setSaving(false)
    setIsDirty(false)
  }, [resumeId, formData, updateResume])

  const updateFormData = useCallback((updates: Partial<ResumeFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    setIsDirty(true)
    // Debounced auto-save
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      await updateResume(resumeId, { form_data: { ...formData, ...updates } })
      setSaving(false)
      setIsDirty(false)
    }, 2000)
  }, [resumeId, formData, updateResume])

  useEffect(() => {
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current) }
  }, [])

  return (
    <Ctx.Provider value={{ resumeId, templateId, formData, step, saving, isDirty, setStep, updateFormData, saveNow }}>
      {children}
    </Ctx.Provider>
  )
}

export function useResumeEditor() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useResumeEditor must be inside ResumeEditorProvider')
  return ctx
}
