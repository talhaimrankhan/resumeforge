import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend3({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#0d9488', accentText: '#0d9488', accentSide: '#99f6e4', font: '' }} />
}
