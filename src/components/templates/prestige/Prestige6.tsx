import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige6({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#134e4a', accentText: '#0d9488', dividerColor: '#99f6e4', font: '' }} />
}
