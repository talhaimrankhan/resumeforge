const features = [
  {
    icon: '✦',
    title: 'Spark Templates',
    description: 'Clean, single-column layouts — ideal for fresh graduates and straightforward job applications.',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
  },
  {
    icon: '◆',
    title: 'Ascend Templates',
    description: 'Two-column professional designs with certifications section — stand out in competitive roles.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: '★',
    title: 'Prestige Templates',
    description: 'Executive-grade layouts with full extras: certifications, languages, hobbies & portfolio links.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: '⬇',
    title: 'PDF & PNG Export',
    description: 'Download your resume as a print-ready PDF or a high-resolution PNG — pixel perfect every time.',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    icon: '⟳',
    title: 'Guided Wizard',
    description: 'Step-by-step editor takes you from personal info to a polished preview with auto-save throughout.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: '⚡',
    title: 'Instant Unlock',
    description: 'Unlock premium templates with a one-time payment. Your unlocked templates stay with your account forever.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
]

export default function Features() {
  return (
    <section id="features" aria-label="Resume Builder Features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-forge-50 text-forge-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            Everything you need
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-forge-900 tracking-tight mb-4">
            Resume builder features for every career stage
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            From your first job to the C-suite, ResumeForge has a resume template and a guided workflow that fits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div
              key={f.title}
              className={`group p-6 rounded-2xl border ${f.bg} ${f.border} hover:shadow-md transition-all hover:-translate-y-0.5`}
            >
              <div className={`text-2xl mb-4 ${f.color}`}>{f.icon}</div>
              <h3 className="text-lg font-bold text-forge-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
