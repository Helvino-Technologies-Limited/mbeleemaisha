'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
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
    } catch (err) {
      setError('Failed to send message. Please call us directly on 0140-166773.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#1a1f5e] py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#0ea5e9]/20 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">Contact</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-white/70 text-lg">We are here to help. Reach out to us any time.</p>
          </div>
        </section>

        <section className="py-24 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                {[
                  { icon: Phone,  title: 'Phone',         value: '0140-166773',           href: 'tel:0140166773' },
                  { icon: Mail,   title: 'Email',         value: 'info@mbeleemaisha.com', href: 'mailto:info@mbeleemaisha.com' },
                  { icon: MapPin, title: 'Address',       value: 'P.O Box 68 Siaya, Awello Junction along Siaya Kadenge Road', href: null },
                  { icon: Clock,  title: 'Working Hours', value: 'Mon–Fri: 8:00AM – 5:00PM\nWeekends: On call support', href: null },
                ].map(({ icon: Icon, title, value, href }) => (
                  <div key={title} className="card p-6 flex items-start gap-5">
                    <div className="w-12 h-12 bg-[#1a1f5e] rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1f5e] mb-1">{title}</p>
                      {href
                        ? <a href={href} className="text-[#0ea5e9] hover:underline text-sm">{value}</a>
                        : <p className="text-gray-600 text-sm whitespace-pre-line">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-8">
                <h2 className="section-title text-2xl mb-6">Send a Message</h2>

                {success ? (
                  <div className="text-center py-10">
                    <CheckCircle2 size={56} className="text-[#22c55e] mx-auto mb-4" />
                    <h3 className="font-bold text-[#1a1f5e] text-xl mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm">We will get back to you shortly. Check your email for confirmation.</p>
                    <button onClick={() => setSuccess(false)}
                      className="mt-6 btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm">
                      Send Another
                    </button>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
