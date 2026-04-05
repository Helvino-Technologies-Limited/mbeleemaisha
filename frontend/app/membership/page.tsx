import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle2, Download } from 'lucide-react'
import { getSiteContent } from '@/lib/content'
import ApplicationForm from './ApplicationForm'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const metadata = {
  title: 'Become a Member',
  description:
    'Join Mbelee Maisha Welfare Organization today. Requirements, registration fee (KSH 200), and MPESA payment details. Protect your family with medical, funeral, and education cover.',
  alternates: { canonical: 'https://mbeleemaisha.org/membership' },
  openGraph: {
    title: 'Become a Member | Mbelee Maisha',
    description: 'Join Kenya\'s trusted welfare organization. KSH 200 registration. MPESA Paybill 247247.',
    url: 'https://mbeleemaisha.org/membership',
  },
}

export default async function MembershipPage() {
  const c = await getSiteContent()
  const requirements = c.requirements.split('\n').filter(Boolean)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#1a1f5e] py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#0ea5e9]/20 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">Membership</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Become a Member</h1>
            <p className="text-white/70 text-lg">Join Mbelee Maisha and protect your family today.</p>
          </div>
        </section>
        {/* Hero image strip */}
        <div className="h-56 md:h-72 overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=80&auto=format&fit=crop"
            alt="Happy Mbelee Maisha welfare organization members Kenya"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a1f5e]/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-xl md:text-2xl font-bold text-center px-4">
              Join thousands of families already protected
            </p>
          </div>
        </div>

        {/* Requirements + MPESA side panel */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="card p-6">
                <h2 className="font-bold text-[#1a1f5e] text-base mb-4">Requirements</h2>
                <ul className="space-y-2.5">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm">
                      <CheckCircle2 size={15} className="text-[#22c55e] shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
                {c.terms_pdf_url && (
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <a href={`${API_URL}/api/upload/terms`} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1a1f5e] text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                      <Download size={13} /> Terms &amp; Conditions
                    </a>
                  </div>
                )}
              </div>

              <div className="card p-6">
                <h2 className="font-bold text-[#1a1f5e] text-base mb-1">Pay via MPESA</h2>
                <p className="text-gray-500 text-xs mb-4">Registration fee and monthly contributions.</p>
                <div className="bg-[#1a1f5e] rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white/40 text-xs">Paybill</p>
                      <p className="text-[#0ea5e9] font-bold text-2xl">{c.paybill}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Account</p>
                      <p className="text-[#22c55e] font-bold text-2xl">{c.account}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs">Reg. Fee: KSH {c.reg_fee}</p>
                </div>
              </div>

              <div className="card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#1a1f5e] mb-1">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">Our team is ready to assist you with your application.</p>
                </div>
                <a href={`tel:${c.phone.replace(/\D/g,'')}`}
                  className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm justify-center">
                  Call {c.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Online Application Form */}
        <section className="py-16 bg-white" id="apply">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#22c55e]/10 text-[#22c55e] px-4 py-1 rounded-full text-sm font-semibold mb-3">Apply Online</span>
              <h2 className="text-3xl font-bold text-[#1a1f5e] mb-3">Submit Your Application</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Fill in the form below. Our admin team will review it and contact you within 1–3 business days.</p>
            </div>
            <ApplicationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
