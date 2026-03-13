import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = { title: 'Contact | Mbelee Maisha' }

export default function ContactPage() {
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
                  { icon: Phone,  title: 'Phone',        value: '0140-166773',           href: 'tel:0140166773' },
                  { icon: Mail,   title: 'Email',        value: 'info@mbeleemaisha.com', href: 'mailto:info@mbeleemaisha.com' },
                  { icon: MapPin, title: 'Address',      value: 'P.O Box 68 Siaya, Awello Junction along Siaya Kadenge Road', href: null },
                  { icon: Clock,  title: 'Working Hours',value: 'Mon–Fri: 8:00AM – 5:00PM\nWeekends: On call support', href: null },
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
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" placeholder="07XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" placeholder="How can we help?" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center !bg-[#1a1f5e] hover:!bg-blue-900">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
