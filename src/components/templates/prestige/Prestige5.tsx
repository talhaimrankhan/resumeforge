import { PrestigeLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Prestige5({ data }: { data: ResumeFormData }) {
  return <PrestigeLayout data={data} cfg={{ headerBg: '#831843', accentText: '#be185d', dividerColor: '#fbcfe8', font: '' }} />
}
