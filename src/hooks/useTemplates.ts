import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { TEMPLATES } from '../lib/constants/templates'

export function useTemplates() {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  const fetchUnlocked = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('unlocked_templates')
      .select('template_id')
    const ids = new Set<string>((data ?? []).map((r: { template_id: string }) => r.template_id))
    setUnlockedIds(ids)
    setLoading(false)
  }, [])

  const unlockTemplate = useCallback(async (templateId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }
    const { error } = await supabase
      .from('unlocked_templates')
      .insert({ user_id: user.id, template_id: templateId })
    if (!error) setUnlockedIds(prev => new Set([...prev, templateId]))
    return { error: error?.message ?? null }
  }, [])

  function isUnlocked(templateId: string): boolean {
    const t = TEMPLATES.find(t => t.id === templateId)
    return t?.is_free || unlockedIds.has(templateId) || false
  }

  return { unlockedIds, loading, fetchUnlocked, unlockTemplate, isUnlocked }
}
