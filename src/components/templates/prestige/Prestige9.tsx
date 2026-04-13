import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige9({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#042f2e', accentText: '#14b8a6', dividerColor: '#99f6e4', font: '' }} />
}
