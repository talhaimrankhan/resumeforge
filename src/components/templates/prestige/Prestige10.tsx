import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige10({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#18181b', accentText: '#71717a', dividerColor: '#e4e4e7', font: 'tracking-tight' }} />
}
