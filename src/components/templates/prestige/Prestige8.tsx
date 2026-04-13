import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige8({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#431407', accentText: '#ea580c', dividerColor: '#fed7aa', font: '' }} />
}
