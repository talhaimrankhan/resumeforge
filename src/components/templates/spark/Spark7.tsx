import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark7({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#dc2626', accentLight: '#fee2e2', font: '' }} />
}
