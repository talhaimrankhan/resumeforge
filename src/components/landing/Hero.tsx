import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const { user, openAuthModal } = useAuth()
  const navigate = useNavigate()

  function handleGetStarted() {
    if (user) navigate('/dashboard')
    else openAuthModal()
  }

  return (
    <section aria-label="Hero — Free Resume Builder" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forge-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-forge-950 via-forge-900 to-purple-950" />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-forge-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">New</span>
          <span className="text-white/70 text-xs">30 professionally designed templates</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Free Resume Builder{' '}
          <span className="relative inline-block">
            <span className="text-gradient-forge">&amp; CV Maker</span>
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Build a professional, ATS-ready resume in minutes. Choose from 30 templates across 3 tiers,
          fill in a guided wizard, and download as PDF or PNG — free to start, no subscription needed.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGetStarted}
            className="group bg-forge-600 hover:bg-forge-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-forge-600/30"
          >
            Start Building for Free
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </button>
          <a
            href="#templates"
            className="bg-white/10 hover:bg-white/15 backdrop-blur border border-white/15 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:scale-[1.02]"
          >
            Browse Templates
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { icon: '🎨', value: '30',        label: 'Templates', valueClass: 'text-forge-300',  iconClass: '' },
            { icon: '✦',  value: '3',         label: 'Tiers',     valueClass: 'text-purple-300', iconClass: 'text-purple-300' },
            { icon: '⬇',  value: 'PDF + PNG', label: 'Export',    valueClass: 'text-sky-300',    iconClass: 'text-sky-300' },
            { icon: '✓',  value: '100%',      label: 'ATS-Ready', valueClass: 'text-gold-400',   iconClass: 'text-gold-400' },
          ].map(stat => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl px-4 py-5 transition-all"
            >
              <span className={`text-2xl leading-none ${stat.iconClass}`}>{stat.icon}</span>
              <span className={`text-2xl font-extrabold tracking-tight ${stat.valueClass}`}>
                {stat.value}
              </span>
              <span className="text-white/40 text-xs uppercase tracking-widest font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
