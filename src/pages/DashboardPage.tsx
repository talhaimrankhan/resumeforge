import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useResumes } from '../hooks/useResumes'
import Navbar from '../components/common/Navbar'
import ResumeCard from '../components/dashboard/ResumeCard'
import EmptyState from '../components/dashboard/EmptyState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SEO from '../components/seo/SEO'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { resumes, loading, fetchResumes, deleteResume } = useResumes()

  useEffect(() => { fetchResumes() }, [fetchResumes])

  async function handleDelete(id: string) {
    const { error } = await deleteResume(id)
    if (error) toast.error(error)
    else toast.success('Resume deleted')
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there'

  return (
    <>
    <SEO title="My Resumes" description="Manage your resumes on ResumeForge." noIndex />
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forge-900 tracking-tight">
              Hey, {firstName} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {resumes.length > 0
                ? `You have ${resumes.length} resume${resumes.length > 1 ? 's' : ''}`
                : 'Ready to forge your first resume?'}
            </p>
          </div>
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-2 bg-forge-600 hover:bg-forge-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Resume
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
        ) : resumes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {resumes.map(resume => (
              <ResumeCard key={resume.id} resume={resume} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
    </>
  )
}
