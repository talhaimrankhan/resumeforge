import { useNavigate } from 'react-router-dom'
import SEO from '../components/seo/SEO'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." noIndex />
      <div className="min-h-screen bg-forge-950 flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl font-extrabold text-forge-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-white/40 text-sm mb-8">The page you're looking for doesn't exist or was moved.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-forge-600 hover:bg-forge-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </>
  )
}
