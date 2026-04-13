import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige1({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#1e1b4b', accentText: '#4338ca', dividerColor: '#c7d2fe', font: '' }} />
}
