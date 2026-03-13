import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Stethoscope, HeartHandshake, GraduationCap, CheckCircle2 } from 'lucide-react'

export const metadata = { title: 'Services | Mbelee Maisha' }

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#1a1f5e] py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#0ea5e9]/20 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Welfare Packages</h1>
            <p className="text-white/70 text-lg">Three packages designed to protect your family at every stage of life.</p>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Stethoscope size={24} className="text-[#0ea5e9]" />
                  </div>
                  <div>
                    <p className="text-[#0ea5e9] text-xs font-bold uppercase tracking-widest">Package 01</p>
                    <h2 className="font-bold text-2xl text-[#1a1f5e]">Medical Package</h2>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">Mbelee Maisha pays hospital bills when a member is admitted in public and mission hospitals. We ensure you focus on recovery, not bills.</p>
                <ul className="space-y-3">
                  {['KSH 100,000 coverage for principal member','KSH 50,000 per dependant annually','Covers public and mission hospitals','Quick claim processing'].map(b => (
                    <li key={b} className="flex items-center gap-3 text-gray-700 text-sm">
                      <CheckCircle2 size={16} className="text-[#0ea5e9] shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 text-center">
                <p className="text-[#0ea5e9] text-sm font-semibold uppercase tracking-wide mb-2">From</p>
                <p className="text-5xl font-bold text-[#1a1f5e]">KSH 350</p>
                <p className="text-gray-400 text-sm mt-1">per month</p>
                <div className="mt-6 pt-6 border-t border-blue-200 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Max coverage</span><span className="font-bold text-[#1a1f5e]">KSH 100,000</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Per dependant</span><span className="font-bold text-[#1a1f5e]">KSH 50,000</span></div>
                </div>
              </div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 bg-pink-50 rounded-3xl p-8 border border-pink-100">
                <p className="text-[#ec4899] text-sm font-semibold uppercase tracking-wide mb-4">Benefits Include</p>
                {['KSH 50,000 cash for funeral arrangements','Burial coffin provided','Two weeks mortuary bill covered','Transport of body to home','Two tents & 200 plastic chairs','Coffin trolley and lowering gear'].map(b => (
                  <div key={b} className="flex items-center gap-2 py-2 text-sm text-gray-700 border-b border-pink-100 last:border-0">
                    <CheckCircle2 size={14} className="text-[#ec4899] shrink-0" />{b}
                  </div>
                ))}
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
                    <HeartHandshake size={24} className="text-[#ec4899]" />
                  </div>
                  <div>
                    <p className="text-[#ec4899] text-xs font-bold uppercase tracking-widest">Package 02</p>
                    <h2 className="font-bold text-2xl text-[#1a1f5e]">Last Expense Package</h2>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">In times of grief, Mbelee Maisha offers last respect services to members and their beneficiaries — covering everything from the coffin to transport, so families can focus on healing.</p>
              </div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <GraduationCap size={24} className="text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-[#22c55e] text-xs font-bold uppercase tracking-widest">Package 03</p>
                    <h2 className="font-bold text-2xl text-[#1a1f5e]">Child Education Savings</h2>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">A voluntary savings plan targeting Grade 1 through Grade 4, making early education affordable and stress-free.</p>
                <ul className="space-y-3">
                  {['Targets Grade 1 – Grade 4','Monthly contribution: KSH 350 per child','Voluntary and flexible plan'].map(b => (
                    <li key={b} className="flex items-center gap-3 text-gray-700 text-sm">
                      <CheckCircle2 size={16} className="text-[#22c55e] shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 rounded-3xl p-8 border border-green-100 text-center">
                <p className="text-[#22c55e] text-sm font-semibold uppercase tracking-wide mb-2">Monthly</p>
                <p className="text-5xl font-bold text-[#1a1f5e]">KSH 350</p>
                <p className="text-gray-400 text-sm mt-1">per child</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
