import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark4({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#334155', accentLight: '#f1f5f9', font: 'tracking-tight' }} />
}
