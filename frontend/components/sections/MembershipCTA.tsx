import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function MembershipCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1f5e] rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#0ea5e9]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ec4899]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#ec4899]/20 text-[#ec4899] px-4 py-1 rounded-full text-sm font-semibold mb-5">Join Today</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                Become a Member of<br /><span className="text-[#0ea5e9]">Mbelee Maisha</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Registration is simple, affordable, and immediately provides access to all our welfare services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/membership" className="btn-primary">Apply for Membership <ArrowRight size={16} /></Link>
                <Link href="/contact" className="btn-outline">Contact Us</Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-6">Membership Requirements</h3>
              <ul className="space-y-3 mb-8">
                {['Must be 18 years and above','Must be of good character and sound mind',
                  'Fill and sign the application form','Pay KSH 200 registration fee',
                  'Able to pay monthly contributions'].map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle2 size={16} className="text-[#22c55e] shrink-0" />{s}
                  </li>
                ))}
              </ul>
              <div className="p-5 bg-white/10 rounded-2xl border border-white/15">
                <p className="text-white/50 text-xs mb-3 uppercase tracking-wide">Pay via MPESA</p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-white/60 text-xs">Paybill</p>
                    <p className="text-[#0ea5e9] font-bold text-2xl">247247</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div>
                    <p className="text-white/60 text-xs">Account</p>
                    <p className="text-[#22c55e] font-bold text-2xl">529152</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
