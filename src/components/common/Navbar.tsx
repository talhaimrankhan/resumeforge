import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../auth/AuthModal'

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Navbar() {
  const { user, signOut, openAuthModal, showAuthModal, closeAuthModal } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const fullName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'User'
  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url
  const initials = getInitials(fullName)
  const isLanding = location.pathname === '/'

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  async function handleSignOut() {
    setProfileOpen(false)
    await signOut()
    navigate('/')
  }

  const landingLinks = [
    { href: '#features', label: 'Features' },
    { href: '#templates', label: 'Templates' },
    { href: '#pricing', label: 'Pricing' },
  ]

  function isActive(path: string) {
    return location.pathname === path
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-lg border-b border-gray-100/80 shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img src="/logo-icon.png" alt="ResumeForge — Free Resume Builder" style={{ height: '38px', width: 'auto' }} className="group-hover:opacity-90 transition-opacity" />
              <span className="font-extrabold text-forge-900 text-[17px] tracking-tight">ResumeForge</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {user && !isActive('/dashboard') && (
                <Link
                  to="/dashboard"
                  className="text-sm font-medium px-3.5 py-2 rounded-lg transition-colors text-gray-500 hover:text-forge-700 hover:bg-forge-50"
                >
                  Dashboard
                </Link>
              )}
              {isLanding && landingLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-forge-700 hover:bg-forge-50 font-medium px-3.5 py-2 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(v => !v)}
                    className={`flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl transition-all border ${
                      profileOpen
                        ? 'bg-forge-50 border-forge-200 shadow-sm'
                        : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full flex-shrink-0 ring-2 ring-white shadow-sm overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-forge-400 to-forge-700 flex items-center justify-center">
                          <span className="text-white text-[11px] font-bold">{initials}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-800 max-w-[110px] truncate">{fullName}</span>
                    <svg
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                      style={{ animation: 'fadeSlideUp 0.15s ease' }}
                    >
                      {/* User info */}
                      <div className="px-4 py-3.5 border-b border-gray-50 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden">
                          {avatarUrl ? (
                            <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-forge-400 to-forge-700 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{initials}</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{fullName}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <button
                          onClick={() => { setProfileOpen(false); navigate('/settings') }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-forge-700 transition-colors text-left"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Account Settings
                        </button>
                      </div>

                      <div className="border-t border-gray-50 py-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={openAuthModal}
                    className="text-sm font-semibold text-gray-600 hover:text-forge-700 px-4 py-2 rounded-lg hover:bg-forge-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={openAuthModal}
                    className="bg-forge-600 hover:bg-forge-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:shadow-forge-500/20 hover:scale-[1.02]"
                  >
                    Get Started Free
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-forge-600 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-0.5">
            {user && !isActive('/dashboard') && (
              <Link to="/dashboard" className="block text-sm text-gray-600 hover:text-forge-600 py-2 px-3 rounded-lg hover:bg-forge-50" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            )}
            {isLanding && landingLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-600 hover:text-forge-600 py-2 px-3 rounded-lg hover:bg-forge-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <div className="space-y-0.5">
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden ring-2 ring-forge-100">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-forge-400 to-forge-700 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{initials}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{fullName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/settings" className="block text-sm text-gray-600 hover:text-forge-600 py-2 px-3 rounded-lg hover:bg-forge-50" onClick={() => setMobileOpen(false)}>Account Settings</Link>
                  <button onClick={handleSignOut} className="w-full text-sm text-red-500 text-left py-2 px-3 rounded-lg hover:bg-red-50">Sign Out</button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <button onClick={() => { openAuthModal(); setMobileOpen(false) }} className="text-sm font-semibold text-gray-600 text-left px-3 py-2">Sign In</button>
                  <button onClick={() => { openAuthModal(); setMobileOpen(false) }} className="bg-forge-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">Get Started Free</button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuthModal && <AuthModal onClose={closeAuthModal} />}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
