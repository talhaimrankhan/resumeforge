import { SparkLayout } from '../shared'
import type { ResumeFormData } from '../../../lib/types'
export default function Spark6({ data }: { data: ResumeFormData }) {
  return <SparkLayout data={data} cfg={{ accent: '#16a34a', accentLight: '#dcfce7', font: '' }} />
}
