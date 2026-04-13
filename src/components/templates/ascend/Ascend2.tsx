import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend2({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#0369a1', accentText: '#0369a1', accentSide: '#7dd3fc', font: '' }} />
}
