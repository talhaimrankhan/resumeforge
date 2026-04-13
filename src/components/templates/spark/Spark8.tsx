import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark8({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#7c3aed', accentLight: '#ede9fe', font: '' }} />
}
