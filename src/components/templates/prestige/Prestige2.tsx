import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige2({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#7f1d1d', accentText: '#b91c1c', dividerColor: '#fecaca', font: '' }} />
}
