import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CTA() {
  const { user, openAuthModal } = useAuth()
  const navigate = useNavigate()

  function handleStart() {
    if (user) navigate('/dashboard')
    else openAuthModal()
  }

  return (
    <section id="pricing" aria-label="Pricing — Free Resume Builder" className="py-16 sm:py-24 bg-forge-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-forge-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 rounded-full px-4 py-1.5 text-sm font-semibold mb-4 sm:mb-6">
          ⚡ Start for free, upgrade anytime
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Your dream resume is<br />
          <span className="text-gradient-forge">one wizard away</span>
        </h2>
        <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-8 sm:mb-10">
          No subscriptions. No hidden fees. Pick a free template, fill in the wizard, and download — it's that simple. Unlock premium templates whenever you're ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12">
          <button
            onClick={handleStart}
            className="group bg-forge-600 hover:bg-forge-500 text-white font-bold px-10 py-4 rounded-xl text-base transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-forge-600/30"
          >
            Build My Resume — Free
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </button>
        </div>

        {/* Tier pricing summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { tier: 'Spark', badge: 'Basic', free: '3 free', paid: '7 from $4.99', color: 'border-slate-600/30 bg-slate-900/30' },
            { tier: 'Ascend', badge: 'Intermediate', free: '3 free', paid: '7 from $7.99', color: 'border-blue-600/30 bg-blue-900/20' },
            { tier: 'Prestige', badge: 'Pro', free: '3 free', paid: '7 from $12.99', color: 'border-amber-600/30 bg-amber-900/20' },
          ].map(t => (
            <div key={t.tier} className={`rounded-2xl border p-4 ${t.color}`}>
              <div className="text-xs text-white/40 mb-1">{t.badge}</div>
              <div className="text-white font-bold text-lg mb-2">{t.tier}</div>
              <div className="text-xs text-green-400 mb-1">✓ {t.free}</div>
              <div className="text-xs text-white/50">{t.paid}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
