import type { ResumeFormData } from '../../lib/types'

// Spark templates
import Spark1 from './spark/Spark1'
import Spark2 from './spark/Spark2'
import Spark3 from './spark/Spark3'
import Spark4 from './spark/Spark4'
import Spark5 from './spark/Spark5'
import Spark6 from './spark/Spark6'
import Spark7 from './spark/Spark7'
import Spark8 from './spark/Spark8'
import Spark9 from './spark/Spark9'
import Spark10 from './spark/Spark10'

// Ascend templates
import Ascend1 from './ascend/Ascend1'
import Ascend2 from './ascend/Ascend2'
import Ascend3 from './ascend/Ascend3'
import Ascend4 from './ascend/Ascend4'
import Ascend5 from './ascend/Ascend5'
import Ascend6 from './ascend/Ascend6'
import Ascend7 from './ascend/Ascend7'
import Ascend8 from './ascend/Ascend8'
import Ascend9 from './ascend/Ascend9'
import Ascend10 from './ascend/Ascend10'

// Prestige templates
import Prestige1 from './prestige/Prestige1'
import Prestige2 from './prestige/Prestige2'
import Prestige3 from './prestige/Prestige3'
import Prestige4 from './prestige/Prestige4'
import Prestige5 from './prestige/Prestige5'
import Prestige6 from './prestige/Prestige6'
import Prestige7 from './prestige/Prestige7'
import Prestige8 from './prestige/Prestige8'
import Prestige9 from './prestige/Prestige9'
import Prestige10 from './prestige/Prestige10'

const TEMPLATE_MAP: Record<string, React.ComponentType<{ data: ResumeFormData }>> = {
  'spark-1': Spark1,   'spark-2': Spark2,   'spark-3': Spark3,
  'spark-4': Spark4,   'spark-5': Spark5,   'spark-6': Spark6,
  'spark-7': Spark7,   'spark-8': Spark8,   'spark-9': Spark9,
  'spark-10': Spark10,
  'ascend-1': Ascend1, 'ascend-2': Ascend2, 'ascend-3': Ascend3,
  'ascend-4': Ascend4, 'ascend-5': Ascend5, 'ascend-6': Ascend6,
  'ascend-7': Ascend7, 'ascend-8': Ascend8, 'ascend-9': Ascend9,
  'ascend-10': Ascend10,
  'prestige-1': Prestige1, 'prestige-2': Prestige2, 'prestige-3': Prestige3,
  'prestige-4': Prestige4, 'prestige-5': Prestige5, 'prestige-6': Prestige6,
  'prestige-7': Prestige7, 'prestige-8': Prestige8, 'prestige-9': Prestige9,
  'prestige-10': Prestige10,
}

interface Props {
  templateId: string
  data: ResumeFormData
}

export default function TemplateRenderer({ templateId, data }: Props) {
  const Component = TEMPLATE_MAP[templateId]
  if (!Component) return (
    <div className="flex items-center justify-center h-64 text-gray-400">
      Template "{templateId}" not found
    </div>
  )
  return <Component data={data} />
}
