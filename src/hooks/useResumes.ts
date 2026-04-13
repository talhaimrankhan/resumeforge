import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Resume } from '../lib/types'
import { EMPTY_FORM_DATA } from '../lib/types'

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchResumes = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false })
    if (error) setError(error.message)
    else setResumes((data as Resume[]) || [])
    setLoading(false)
  }, [])

  const createResume = useCallback(async (
    templateId: string,
    title = 'Untitled Resume'
  ): Promise<Resume | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data, error } = await supabase
      .from('resumes')
      .insert({ user_id: user.id, template_id: templateId, title, form_data: EMPTY_FORM_DATA })
      .select()
      .single()
    if (error) { setError(error.message); return null }
    return data as Resume
  }, [])

  const updateResume = useCallback(async (
    id: string,
    updates: Partial<Pick<Resume, 'title' | 'form_data' | 'template_id'>>
  ) => {
    const { error } = await supabase
      .from('resumes')
      .update(updates)
      .eq('id', id)
    if (error) setError(error.message)
    else setResumes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
    return { error: error?.message ?? null }
  }, [])

  const deleteResume = useCallback(async (id: string) => {
    const { error } = await supabase.from('resumes').delete().eq('id', id)
    if (error) setError(error.message)
    else setResumes(prev => prev.filter(r => r.id !== id))
    return { error: error?.message ?? null }
  }, [])

  const getResume = useCallback(async (id: string): Promise<Resume | null> => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data as Resume
  }, [])

  return { resumes, loading, error, fetchResumes, createResume, updateResume, deleteResume, getResume }
}
