export default function Footer() {
  return (
    <footer className="bg-forge-950 border-t border-white/5 py-10" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo-icon.png"
              alt="ResumeForge logo"
              style={{ height: '34px', width: 'auto' }}
              className="brightness-0 invert opacity-80"
              loading="lazy"
            />
            <span className="text-white/80 font-bold tracking-tight">ResumeForge</span>
          </div>
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} ResumeForge. Free resume builder &amp; CV maker online.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6 text-sm text-white/30 list-none m-0 p-0">
              <li><a href="#features" className="hover:text-white/60 transition-colors">Features</a></li>
              <li><a href="#templates" className="hover:text-white/60 transition-colors">Templates</a></li>
              <li><a href="#pricing" className="hover:text-white/60 transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white/60 transition-colors">FAQ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
