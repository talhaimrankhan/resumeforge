import React from 'react'

interface State { hasError: boolean; error: Error | null }

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-forge-900 mb-2">Something went wrong</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-forge-600 hover:bg-forge-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
