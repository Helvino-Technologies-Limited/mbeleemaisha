'use client'
import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setError('Failed to send message. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={56} className="text-[#22c55e] mx-auto mb-4" />
        <h3 className="font-bold text-[#1a1f5e] text-xl mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm">We will get back to you shortly. Check your email for confirmation.</p>
        <button onClick={() => setSuccess(false)} className="mt-6 btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm">
          Send Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input type="text" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
          placeholder="Your full name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
          placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input type="tel" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
          placeholder="07XX XXX XXX" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea rows={4} required value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
          placeholder="How can we help?" />
      </div>
      <button type="submit" disabled={loading}
        className="btn-primary w-full justify-center !bg-[#1a1f5e] hover:!bg-blue-900 disabled:opacity-60">
        {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
      </button>
    </form>
  )
}
