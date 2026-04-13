import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark5({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#0891b2', accentLight: '#cffafe', font: '' }} />
}
