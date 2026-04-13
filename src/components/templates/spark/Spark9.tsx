import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark9({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#d97706', accentLight: '#fef3c7', font: '' }} />
}
