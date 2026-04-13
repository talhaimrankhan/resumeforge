import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark1({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#475569', accentLight: '#e2e8f0', font: '' }} />
}
