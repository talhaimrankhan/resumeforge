import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend6({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#c2410c', accentText: '#c2410c', accentSide: '#fdba74', font: '' }} />
}
