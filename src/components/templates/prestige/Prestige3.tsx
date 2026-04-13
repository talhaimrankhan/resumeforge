import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige3({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#064e3b', accentText: '#059669', dividerColor: '#a7f3d0', font: '' }} />
}
