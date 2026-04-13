import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark3({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#10b981', accentLight: '#d1fae5', font: '' }} />
}
