import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TemplateRenderer from '../templates/TemplateRenderer'
import { SAMPLE_RESUME_DATA } from '../../lib/constants/sampleData'

const FULL_WIDTH = 794
const FULL_HEIGHT = FULL_WIDTH * (297 / 210)

function ScaledPreview({ templateId, displayWidth }: { templateId: string; displayWidth: number }) {
  const scale = displayWidth / FULL_WIDTH
  const displayHeight = FULL_HEIGHT * scale
  return (
    <div style={{ width: displayWidth, height: displayHeight, overflow: 'hidden', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
      <div style={{
        width: FULL_WIDTH,
        height: FULL_HEIGHT,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <TemplateRenderer templateId={templateId} data={SAMPLE_RESUME_DATA} />
      </div>
    </div>
  )
}

const tiers = [
  {
    id: 'spark',
    templateId: 'spark-1',
    name: 'Spark',
    badge: 'Basic',
    badgeClass: 'bg-slate-100 text-slate-700',
    description: '10 single-column templates. 3 free, 7 from $4.99.',
    free: 3,
    paid: 7,
    price: '$4.99',
  },
  {
    id: 'ascend',
    templateId: 'ascend-1',
    name: 'Ascend',
    badge: 'Intermediate',
    badgeClass: 'bg-blue-100 text-blue-700',
    description: '10 sidebar-layout templates with certifications. 3 free, 7 from $7.99.',
    free: 3,
    paid: 7,
    price: '$7.99',
  },
  {
    id: 'prestige',
    templateId: 'prestige-1',
    name: 'Prestige',
    badge: 'Pro',
    badgeClass: 'bg-amber-100 text-amber-700',
    description: '10 premium templates with full extras. 3 free, 7 from $12.99.',
    free: 3,
    paid: 7,
    price: '$12.99',
  },
]

export default function TemplatePreviews() {
  const { user, openAuthModal } = useAuth()
  const navigate = useNavigate()

  function handleBrowse() {
    if (user) navigate('/templates')
    else openAuthModal()
  }

  return (
    <section id="templates" aria-label="Resume Templates" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-forge-50 text-forge-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            30 professional resume templates
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-forge-900 tracking-tight mb-4">
            Free &amp; premium resume templates for every ambition
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Every tier starts with 3 free resume templates. Unlock premium designs when you're ready to level up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map(tier => (
            <div key={tier.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group">
              {/* Real template preview */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center">
                <ScaledPreview templateId={tier.templateId} displayWidth={180} />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tier.badgeClass}`}>{tier.badge}</span>
                  <span className="text-sm font-bold text-forge-900">{tier.name}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{tier.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    {tier.free} Free
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gold-400 inline-block" />
                    {tier.paid} Premium from {tier.price}
                  </span>
                </div>
                <button
                  onClick={handleBrowse}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-forge-50 text-forge-700 hover:bg-forge-600 hover:text-white transition-all group-hover:bg-forge-600 group-hover:text-white"
                >
                  Browse {tier.name} Templates
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
