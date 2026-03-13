import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function AboutPreview() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-[#0ea5e9]/10 text-[#0ea5e9] px-4 py-1 rounded-full text-sm font-semibold mb-4">Who We Are</span>
            <h2 className="section-title mb-6">A Community Built on <span className="text-[#ec4899]">Trust & Care</span></h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mbelee Maisha is a registered welfare organization whose main objective is to support
              members and their beneficiaries in covering medical bills and funeral expenses during
              unforeseen events — while maintaining the dignity of every member.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our vision is to become a premier welfare services provider and an employer of many
              unemployed women and youth, offering quality welfare services across Kenya.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Registered welfare organization in Kenya',
                'Serving both urban and rural communities',
                'Empowering women and youth with opportunities',
                'Committed to dignity, integrity, and confidentiality',
              ].map(p => (
                <li key={p} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={16} className="text-[#22c55e] shrink-0" />{p}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-primary !bg-[#1a1f5e] hover:!bg-blue-900">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-[#1a1f5e] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#0ea5e9]/20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ec4899]/20 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-2">Our Mission</h3>
              <div className="w-12 h-1 bg-[#ec4899] rounded-full mb-6"></div>
              <p className="text-white/70 leading-relaxed mb-8">
                To support our members through life's most difficult moments with timely, dignified,
                and compassionate welfare services.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-[#0ea5e9] font-bold">Medical</p>
                  <p className="text-white/60 text-xs mt-1">Hospital bill coverage up to KSH 100K</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-[#ec4899] font-bold">Funeral</p>
                  <p className="text-white/60 text-xs mt-1">Full last expense support</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 col-span-2">
                  <p className="text-[#22c55e] font-bold">Education</p>
                  <p className="text-white/60 text-xs mt-1">Child education savings plan Grade 1–4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
