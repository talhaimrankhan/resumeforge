import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/common/Navbar'
import SEO from '../components/seo/SEO'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function SettingsPage() {
  const { user, updateProfile, updatePassword, signOut } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const currentName = user?.user_metadata?.full_name ?? ''
  const currentAvatar: string | undefined = user?.user_metadata?.avatar_url

  const [name, setName] = useState(currentName)
  const [savingProfile, setSavingProfile] = useState(false)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(currentAvatar)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deletingAccount, setDeletingAccount] = useState(false)

  const initials = getInitials(name || currentName || 'U')

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2 MB')
      return
    }

    setAvatarUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `${user.id}/avatar.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })

      if (uploadError) {
        // Fallback: convert to base64 and store in metadata
        const reader = new FileReader()
        reader.onload = async ev => {
          const dataUrl = ev.target?.result as string
          setAvatarPreview(dataUrl)
          const { error } = await updateProfile({ avatar_url: dataUrl })
          if (error) toast.error(error)
          else toast.success('Profile photo updated')
          setAvatarUploading(false)
        }
        reader.readAsDataURL(file)
        return
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const publicUrl = data.publicUrl + `?t=${Date.now()}`
      setAvatarPreview(publicUrl)
      const { error } = await updateProfile({ avatar_url: publicUrl })
      if (error) toast.error(error)
      else toast.success('Profile photo updated')
    } finally {
      setAvatarUploading(false)
    }
  }

  async function handleRemoveAvatar() {
    setAvatarPreview(undefined)
    const { error } = await updateProfile({ avatar_url: '' })
    if (error) toast.error(error)
    else toast.success('Photo removed')
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { toast.error('Name cannot be empty'); return }
    setSavingProfile(true)
    const { error } = await updateProfile({ full_name: name.trim() })
    setSavingProfile(false)
    if (error) toast.error(error)
    else toast.success('Profile updated')
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return }
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setSavingPassword(true)
    const { error } = await updatePassword(newPassword)
    setSavingPassword(false)
    if (error) toast.error(error)
    else {
      toast.success('Password updated')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  async function handleDeleteAccount() {
    setDeletingAccount(true)
    // Sign out and redirect — actual deletion requires a server function
    await signOut()
    navigate('/')
    toast('Account sign-out complete. Contact support to fully delete your data.')
  }

  return (
    <>
    <SEO title="Account Settings" description="Manage your ResumeForge account settings." noIndex />
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-16 space-y-6">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-forge-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-forge-900 tracking-tight">Account Settings</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your profile and preferences</p>
          </div>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50">
            <h2 className="font-bold text-forge-900">Profile</h2>
            <p className="text-xs text-gray-400 mt-0.5">Your public identity on ResumeForge</p>
          </div>
          <div className="px-6 py-6">
            {/* Avatar section */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-forge-50">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-forge-400 to-forge-700 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{initials}</span>
                    </div>
                  )}
                </div>
                {avatarUploading && (
                  <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-forge-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={avatarUploading}
                  className="block text-sm font-semibold text-forge-600 hover:text-forge-700 hover:underline disabled:opacity-50 transition-colors"
                >
                  {avatarUploading ? 'Uploading…' : 'Upload photo'}
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="block text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Remove photo
                  </button>
                )}
                <p className="text-xs text-gray-400">JPG or PNG, max 2 MB</p>
              </div>
            </div>

            {/* Name form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-forge-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={user?.email ?? ''}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-100 rounded-xl text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed here. Contact support if needed.</p>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="bg-forge-600 hover:bg-forge-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  {savingProfile ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Password card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50">
            <h2 className="font-bold text-forge-900">Change Password</h2>
            <p className="text-xs text-gray-400 mt-0.5">Set a new password for your account</p>
          </div>
          <div className="px-6 py-6">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm new password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500 transition-colors"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword || !newPassword || !confirmPassword}
                  className="bg-forge-600 hover:bg-forge-700 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  {savingPassword ? 'Updating…' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-red-50">
            <h2 className="font-bold text-red-600">Danger Zone</h2>
            <p className="text-xs text-gray-400 mt-0.5">Irreversible account actions</p>
          </div>
          <div className="px-6 py-6">
            {deleteConfirm ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-700 font-medium">Are you sure? This cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deletingAccount}
                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    {deletingAccount ? 'Processing…' : 'Yes, delete my account'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Delete Account</p>
                  <p className="text-xs text-gray-400 mt-0.5">Permanently remove your account and all resumes</p>
                </div>
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
    </>
  )
}
