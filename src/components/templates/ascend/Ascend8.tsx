import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend8({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#0e7490', accentText: '#0e7490', accentSide: '#67e8f9', font: '' }} />
}
