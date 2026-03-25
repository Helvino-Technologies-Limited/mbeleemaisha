import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle2, Download } from 'lucide-react'
import { getSiteContent } from '@/lib/content'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const metadata = { title: 'Membership | Mbelee Maisha' }

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
        <section className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="card p-8">
                <h2 className="section-title text-2xl mb-6">Requirements</h2>
                <ul className="space-y-4">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 size={18} className="text-[#22c55e] shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>

                {c.terms_pdf_url && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">Read our full terms and conditions before applying:</p>
                    <a
                      href={`${API_URL}${c.terms_pdf_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1a1f5e] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-900 transition-colors"
                    >
                      <Download size={16} />
                      Download Terms &amp; Conditions
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <div className="card p-8">
                  <h2 className="section-title text-2xl mb-2">Pay via MPESA</h2>
                  <p className="text-gray-500 text-sm mb-6">Use Lipa na MPESA to pay registration fee and monthly contributions.</p>
                  <div className="bg-[#1a1f5e] rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wide">Paybill Number</p>
                        <p className="text-[#0ea5e9] font-bold text-3xl">{c.paybill}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wide">Account Number</p>
                        <p className="text-[#22c55e] font-bold text-3xl">{c.account}</p>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs">Registration Fee: KSH {c.reg_fee}</p>
                  </div>
                </div>
                <div className="card p-6">
                  <h3 className="font-bold text-[#1a1f5e] mb-2">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">Contact our office for assistance with your application.</p>
                  <a href={`tel:${c.phone.replace(/\D/g,'')}`} className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900 !text-sm">
                    Call {c.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
