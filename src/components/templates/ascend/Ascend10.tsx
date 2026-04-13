import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend10({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#9f1239', accentText: '#9f1239', accentSide: '#fda4af', font: '' }} />
}
