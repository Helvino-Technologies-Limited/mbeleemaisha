import { Zap, Award, Users, Lock, Building2, Sliders } from 'lucide-react'

const reasons = [
  { icon: Zap,       title: 'Timely Claim Processing',     desc: 'Immediate response when you need it most — no delays during emergencies.' },
  { icon: Award,     title: 'Professionalism & Integrity', desc: 'Top-notch standards maintained across all services and staff.' },
  { icon: Users,     title: 'Skilled Friendly Staff',      desc: 'Experienced, qualified, and compassionate team always ready to help.' },
  { icon: Lock,      title: 'Confidentiality',             desc: 'Ethical secrecy and privacy maintained for all member information.' },
  { icon: Building2, title: 'Accessible Offices',          desc: 'Conveniently located and accessible to all members.' },
  { icon: Sliders,   title: 'Claim Flexibility',           desc: 'Flexible claim options tailored to meet diverse member needs.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-[#ec4899]/10 text-[#ec4899] px-4 py-1 rounded-full text-sm font-semibold mb-4">Why Choose Us</span>
          <h2 className="section-title mb-4">Reasons to Trust Mbelee Maisha</h2>
          <p className="text-gray-500">We go beyond welfare — we build lasting relationships based on care, trust, and results.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 group hover:border-[#0ea5e9] border border-transparent">
              <div className="w-12 h-12 bg-[#1a1f5e] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0ea5e9] transition-colors duration-300">
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-[#1a1f5e] mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
