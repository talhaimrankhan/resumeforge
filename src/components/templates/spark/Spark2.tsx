import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark2({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#0ea5e9', accentLight: '#e0f2fe', font: '' }} />
}
