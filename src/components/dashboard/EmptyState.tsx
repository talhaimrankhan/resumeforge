import { useNavigate } from 'react-router-dom'

export default function EmptyState() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4">📄</div>
      <h3 className="text-xl font-bold text-forge-900 mb-2">No resumes yet</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        Pick a template, fill in the wizard, and download your polished resume in minutes.
      </p>
      <button
        onClick={() => navigate('/templates')}
        className="bg-forge-600 hover:bg-forge-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
      >
        Create Your First Resume
      </button>
    </div>
  )
}
