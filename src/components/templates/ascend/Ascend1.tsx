import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend1({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#4f46e5', accentText: '#4f46e5', accentSide: '#a5b4fc', font: '' }} />
}
