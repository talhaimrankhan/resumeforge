import { useState } from 'react'
import type { Template } from '../../lib/types'
import LoadingSpinner from '../common/LoadingSpinner'

interface Props {
  template: Template
  onClose: () => void
  onSuccess: () => void
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
  return digits
}

export default function PaymentModal({ template, onClose, onSuccess }: Props) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1800))
    setProcessing(false)
    setSucceeded(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    onSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-forge-900 to-forge-700 p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ background: template.thumbnail_color }}
            >
              {template.name[0]}
            </div>
            <div>
              <div className="text-white font-bold">{template.name}</div>
              <div className="text-white/60 text-sm capitalize">{template.category} template</div>
            </div>
            <div className="ml-auto text-gold-400 font-extrabold text-xl">${template.price.toFixed(2)}</div>
          </div>
        </div>

        {succeeded ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="font-bold text-forge-900 text-lg mb-1">Payment Successful!</h3>
            <p className="text-gray-500 text-sm">Template unlocked. Redirecting…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Fake Stripe branding */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              Secured by Stripe
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number</label>
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500 font-mono tracking-widest"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Cardholder Name</label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500 font-mono"
                />
              </div>
              <div className="w-24">
                <label className="block text-xs font-semibold text-gray-600 mb-1">CVV</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  maxLength={4}
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forge-500/30 focus:border-forge-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-forge-600 hover:bg-forge-700 disabled:opacity-70 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <LoadingSpinner size="sm" color="text-white" />
                  Processing…
                </>
              ) : (
                `Pay $${template.price.toFixed(2)}`
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              This is a demo. No real payment is processed.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
