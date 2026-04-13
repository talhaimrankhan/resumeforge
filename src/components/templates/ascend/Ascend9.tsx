import { AscendLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Ascend9({ data }: { data: ResumeFormData }) {
  return <AscendLayout data={data} cfg={{ sidebarBg: '#7e22ce', accentText: '#7e22ce', accentSide: '#d8b4fe', font: '' }} />
}
