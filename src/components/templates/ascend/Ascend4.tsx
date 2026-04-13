import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend4({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#7c3aed', accentText: '#7c3aed', accentSide: '#c4b5fd', font: '' }} />
}
