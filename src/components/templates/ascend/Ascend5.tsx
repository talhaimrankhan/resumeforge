import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend5({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#b91c1c', accentText: '#b91c1c', accentSide: '#fca5a5', font: '' }} />
}
