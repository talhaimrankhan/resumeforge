import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige7({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#3b0764', accentText: '#9333ea', dividerColor: '#e9d5ff', font: '' }} />
}
