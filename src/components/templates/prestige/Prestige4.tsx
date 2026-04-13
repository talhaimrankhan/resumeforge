import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige4({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#312e81', accentText: '#6366f1', dividerColor: '#e0e7ff', font: '' }} />
}
