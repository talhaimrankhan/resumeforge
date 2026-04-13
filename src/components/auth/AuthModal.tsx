import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

type Tab = 'signin' | 'signup' | 'magic'

interface AuthModalProps {
  onClose: () => void
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const { signIn, signUp, signInWithMagicLink } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('signin')
  const [loading, setLoading] = useState(false)

  // sign in / sign up fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [magicEmail, setMagicEmail] = useState('')
  const [magicSent, setMagicSent] = useState(false)

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (tab === 'signup') {
      const { error } = await signUp(email, password, fullName)
      if (error) { toast.error(error); setLoading(false); return }
      toast.success('Account created! Check your email to verify.')
      onClose()
    } else {
      const { error } = await signIn(email, password)
      if (error) { toast.error(error); setLoading(false); return }
      toast.success('Welcome back!')
      onClose()
      navigate('/dashboard')
    }
    setLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await signInWithMagicLink(magicEmail)
    if (error) { toast.error(error); setLoading(false); return }
    setMagicSent(true)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forge-950/75"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-[fadeSlideUp_0.25s_ease]">
        {/* Header */}
        <div className="bg-gradient-to-br from-forge-900 to-forge-700 px-8 py-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-center gap-4">
            <img src="/logo-icon.png" alt="ResumeForge" style={{ height: '61px', width: 'auto' }} className="brightness-0 invert" />
            <p className="text-white/80 text-lg font-semibold">
              {tab === 'signup' ? 'Create your free account' : tab === 'magic' ? 'Sign in with a magic link' : 'Welcome back'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(['signin', 'signup', 'magic'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === t
                  ? 'text-forge-600 border-b-2 border-forge-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t === 'signin' ? 'Sign In' : t === 'signup' ? 'Sign Up' : 'Magic Link'}
            </button>
          ))}
        </div>

        <div className="p-8">
          {tab === 'magic' ? (
            magicSent ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✉️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Check your inbox</h3>
                <p className="text-gray-500 text-sm">
                  We sent a magic link to <strong>{magicEmail}</strong>. Click it to sign in instantly.
                </p>
                <button
                  onClick={() => { setMagicSent(false); setMagicEmail('') }}
                  className="mt-4 text-forge-600 text-sm hover:underline"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    type="email"
                    required
                    value={magicEmail}
                    onChange={e => setMagicEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-forge-600 hover:bg-forge-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                >
                  {loading ? 'Sending…' : 'Send Magic Link'}
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {tab === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-forge-600 hover:bg-forge-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
              >
                {loading ? 'Please wait…' : tab === 'signup' ? 'Create Account' : 'Sign In'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
