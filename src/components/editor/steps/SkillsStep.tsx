import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useResumeEditor } from '../../../context/ResumeEditorContext'
import type { SkillLevel } from '../../../lib/types'

const LEVELS: SkillLevel[] = ['beginner', 'intermediate', 'expert']
const LEVEL_COLORS: Record<SkillLevel, string> = {
  beginner: 'bg-gray-100 text-gray-600',
  intermediate: 'bg-blue-100 text-blue-700',
  expert: 'bg-forge-100 text-forge-700',
}

export default function SkillsStep() {
  const { formData, updateFormData } = useResumeEditor()
  const skills = formData.skills
  const [input, setInput] = useState('')
  const [level, setLevel] = useState<SkillLevel>('intermediate')

  function addSkill() {
    const name = input.trim()
    if (!name) return
    updateFormData({ skills: [...skills, { id: uuidv4(), name, level }] })
    setInput('')
  }

  function updateLevel(id: string, newLevel: SkillLevel) {
    updateFormData({ skills: skills.map(s => s.id === id ? { ...s, level: newLevel } : s) })
  }

  function remove(id: string) {
    updateFormData({ skills: skills.filter(s => s.id !== id) })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); addSkill() }
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-forge-900 mb-1">Skills</h2>
      <p className="text-gray-400 text-sm mb-6">Add your key skills. Type a skill and press Enter or click Add.</p>

      {/* Input row */}
      <div className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Python, Project Management…"
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500"
        />
        <select
          value={level}
          onChange={e => setLevel(e.target.value as SkillLevel)}
          className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/20 focus:border-forge-500 bg-white"
        >
          {LEVELS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
        </select>
        <button
          onClick={addSkill}
          disabled={!input.trim()}
          className="bg-forge-600 hover:bg-forge-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Add
        </button>
      </div>

      {/* Skill tags */}
      {skills.length === 0 ? (
        <div className="text-center py-12 text-gray-300 text-sm">No skills added yet. Type above to start.</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <div
              key={skill.id}
              className="group flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 hover:border-forge-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800">{skill.name}</span>
              <select
                value={skill.level}
                onChange={e => updateLevel(skill.id, e.target.value as SkillLevel)}
                className={`text-xs rounded-lg px-1.5 py-0.5 font-semibold border-none focus:outline-none cursor-pointer ${LEVEL_COLORS[skill.level]}`}
              >
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <button
                onClick={() => remove(skill.id)}
                className="text-gray-300 hover:text-red-400 transition-colors ml-0.5"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
