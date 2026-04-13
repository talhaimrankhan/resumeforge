import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark10({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#0f172a', accentLight: '#e2e8f0', font: 'tracking-tight' }} />
}
